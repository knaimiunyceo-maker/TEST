import requests
import sys
import json
from datetime import datetime

class BridgeAPITester:
    def __init__(self, base_url="https://travel-bridge-1.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_count=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Additional validation for GET requests
                if method == 'GET' and expected_count:
                    try:
                        response_data = response.json()
                        if isinstance(response_data, list) and len(response_data) == expected_count:
                            print(f"   ✅ Expected {expected_count} items, got {len(response_data)}")
                        else:
                            print(f"   ⚠️  Expected {expected_count} items, got {len(response_data) if isinstance(response_data, list) else 'non-list'}")
                    except:
                        print(f"   ⚠️  Could not parse JSON response")
                        
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"   Response: {response.text[:200]}...")

            self.results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_size": len(response.text) if response.text else 0
            })

            return success, response.json() if success and response.text else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            self.results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "TIMEOUT",
                "success": False,
                "error": "Request timeout"
            })
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.results.append({
                "test": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e)
            })
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_packages_endpoint(self):
        """Test packages endpoint - should return 3 packages"""
        return self.run_test("Get Packages", "GET", "packages", 200, expected_count=3)

    def test_activities_endpoint(self):
        """Test activities endpoint - should return 8 activities"""
        return self.run_test("Get Activities", "GET", "activities", 200, expected_count=8)

    def test_trips_endpoint(self):
        """Test trips endpoint - should return 4 trips"""
        return self.run_test("Get Trips", "GET", "trips", 200, expected_count=4)

    def test_catalogue_endpoint(self):
        """Test catalogue endpoint - should return 8 catalogue items with EUR and MAD prices"""
        success, response = self.run_test("Get Catalogue", "GET", "catalogue", 200, expected_count=8)
        
        if success and response:
            # Verify structure of catalogue items
            required_fields = ['id', 'activity', 'price_eur', 'price_mad', 'reason', 'icon']
            sample_item = response[0] if response else {}
            
            structure_valid = all(field in sample_item for field in required_fields)
            if structure_valid:
                print("   ✅ Catalogue items have correct structure")
                
                # Check specific items mentioned in requirements
                expected_activities = [
                    "Airport Transfer", "Surf Lesson (2h)", "Jet Ski Agadir (30 min)",
                    "Hammam & Spa", "Quad Adventure (2h)", "Cooking Class",
                    "Desert Experience (3 days / 2 nights)", "Guided City Tour"
                ]
                
                actual_activities = [item['activity'] for item in response]
                activities_match = all(activity in actual_activities for activity in expected_activities)
                
                if activities_match:
                    print("   ✅ All expected activities present in catalogue")
                else:
                    print(f"   ❌ Missing activities. Expected: {expected_activities}")
                    print(f"      Actual: {actual_activities}")
                    
                # Check price formats and specific prices
                price_formats_valid = True
                expected_prices = {
                    "Airport Transfer": ("5", "50"),
                    "Surf Lesson (2h)": ("20", "215"),
                    "Jet Ski Agadir (30 min)": ("65", "700"),
                    "Hammam & Spa": ("25", "270"),
                    "Quad Adventure (2h)": ("35", "380"),
                    "Cooking Class": ("25", "270"),
                    "Desert Experience (3 days / 2 nights)": ("90", "970"),
                    "Guided City Tour": ("15", "160")
                }
                
                for item in response:
                    activity = item['activity']
                    if activity in expected_prices:
                        expected_eur, expected_mad = expected_prices[activity]
                        if item['price_eur'] == expected_eur and item['price_mad'] == expected_mad:
                            print(f"   ✅ {activity}: €{item['price_eur']} / {item['price_mad']} MAD")
                        else:
                            print(f"   ❌ {activity}: Expected €{expected_eur}/{expected_mad} MAD, got €{item['price_eur']}/{item['price_mad']} MAD")
                            price_formats_valid = False
                
                if price_formats_valid:
                    print("   ✅ All prices match expected values")
                else:
                    print("   ❌ Some prices don't match expected values")
                    
            else:
                print(f"   ❌ Catalogue items missing required fields: {required_fields}")
                
        return success

    def test_contact_submission(self):
        """Test contact form submission"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "message": "This is a test message for THE BRIDGE travel website",
            "trip_interest": "Weekend Experience"
        }
        
        success, response = self.run_test("Contact Submission", "POST", "contact", 200, data=test_data)
        
        if success and response:
            print(f"   ✅ Contact submission created with ID: {response.get('id', 'N/A')}")
            return True, response.get('id')
        return False, None

    def test_get_contact_submissions(self):
        """Test getting contact submissions (admin endpoint)"""
        return self.run_test("Get Contact Submissions", "GET", "contact", 200)

    def test_individual_package(self):
        """Test getting individual package"""
        return self.run_test("Get Individual Package", "GET", "packages/weekend-experience", 200)

    def test_individual_activity(self):
        """Test getting individual activity"""
        return self.run_test("Get Individual Activity", "GET", "activities/surf-lessons", 200)

    def test_individual_trip(self):
        """Test getting individual trip"""
        return self.run_test("Get Individual Trip", "GET", "trips/trip-1", 200)

    def test_nonexistent_endpoints(self):
        """Test 404 responses for non-existent resources"""
        success1, _ = self.run_test("Non-existent Package", "GET", "packages/nonexistent", 404)
        success2, _ = self.run_test("Non-existent Activity", "GET", "activities/nonexistent", 404)
        success3, _ = self.run_test("Non-existent Trip", "GET", "trips/nonexistent", 404)
        return success1 and success2 and success3

def main():
    print("🚀 Starting THE BRIDGE API Testing...")
    print("=" * 60)
    
    tester = BridgeAPITester()
    
    # Test all endpoints
    print("\n📡 Testing Core API Endpoints...")
    tester.test_root_endpoint()
    tester.test_packages_endpoint()
    tester.test_activities_endpoint()
    tester.test_trips_endpoint()
    
    print("\n💰 Testing Fair Price Catalogue...")
    tester.test_catalogue_endpoint()
    
    print("\n📝 Testing Contact Form...")
    contact_success, contact_id = tester.test_contact_submission()
    tester.test_get_contact_submissions()
    
    print("\n🔍 Testing Individual Resource Endpoints...")
    tester.test_individual_package()
    tester.test_individual_activity()
    tester.test_individual_trip()
    
    print("\n❌ Testing Error Handling...")
    tester.test_nonexistent_endpoints()
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 FINAL RESULTS")
    print("=" * 60)
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed! API is working correctly.")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} test(s) failed.")
        
        # Show failed tests
        failed_tests = [r for r in tester.results if not r['success']]
        if failed_tests:
            print("\n❌ Failed Tests:")
            for test in failed_tests:
                error_msg = test.get('error', f'Status {test["actual_status"]}')
                print(f"   - {test['test']}: {error_msg}") 
        
        return 1

if __name__ == "__main__":
    sys.exit(main())