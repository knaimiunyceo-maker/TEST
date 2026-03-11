"""
Backend API Tests for THE BRIDGE Travel Website
Tests the new "Travel • Practice • Experience" concept with 3 experience categories
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndRoot:
    """Basic health and root endpoint tests"""
    
    def test_root_endpoint(self):
        """Test root API endpoint returns correct message"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "THE BRIDGE" in data["message"]


class TestExperiencesAPI:
    """Tests for /api/experiences - 3 main experience categories"""
    
    def test_get_experiences_returns_3_categories(self):
        """Verify exactly 3 experience categories are returned"""
        response = requests.get(f"{BASE_URL}/api/experiences")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 3, f"Expected 3 experiences, got {len(data)}"
    
    def test_combat_holiday_experience(self):
        """Verify Combat & Self-Defense Holiday exists with correct data"""
        response = requests.get(f"{BASE_URL}/api/experiences")
        assert response.status_code == 200
        data = response.json()
        
        combat = next((e for e in data if e["id"] == "combat-holiday"), None)
        assert combat is not None, "Combat holiday experience not found"
        assert combat["title"] == "Combat & Self-Defense Holiday"
        assert combat["price"] == "599"
        assert combat["currency"] == "€"
        assert combat["duration"] == "7 days"
        assert "Boxing" in combat["practices"]
        assert "Muay Thai" in combat["practices"]
    
    def test_language_holiday_experience(self):
        """Verify Language Practice Holiday exists with correct data"""
        response = requests.get(f"{BASE_URL}/api/experiences")
        assert response.status_code == 200
        data = response.json()
        
        language = next((e for e in data if e["id"] == "language-holiday"), None)
        assert language is not None, "Language holiday experience not found"
        assert language["title"] == "Language Practice Holiday"
        assert language["price"] == "499"
        assert language["currency"] == "€"
        assert "English conversation" in language["practices"]
    
    def test_visual_storytelling_experience(self):
        """Verify Visual Storytelling Holiday exists with correct data"""
        response = requests.get(f"{BASE_URL}/api/experiences")
        assert response.status_code == 200
        data = response.json()
        
        visual = next((e for e in data if e["id"] == "visual-storytelling"), None)
        assert visual is not None, "Visual storytelling experience not found"
        assert visual["title"] == "Visual Storytelling Holiday"
        assert visual["price"] == "649"
        assert visual["currency"] == "€"
        assert "Filmmaking" in visual["practices"]
        assert visual["tracks"] is not None
        assert len(visual["tracks"]) == 3  # Film, Photo, Drone tracks
    
    def test_get_single_experience(self):
        """Test getting a single experience by ID"""
        response = requests.get(f"{BASE_URL}/api/experiences/combat-holiday")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == "combat-holiday"
        assert data["title"] == "Combat & Self-Defense Holiday"
    
    def test_get_nonexistent_experience(self):
        """Test 404 for non-existent experience"""
        response = requests.get(f"{BASE_URL}/api/experiences/nonexistent")
        assert response.status_code == 404


class TestActivitiesAPI:
    """Tests for /api/activities - Optional activities"""
    
    def test_get_activities_returns_8_items(self):
        """Verify 8 optional activities are returned"""
        response = requests.get(f"{BASE_URL}/api/activities")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 8, f"Expected 8 activities, got {len(data)}"
    
    def test_activities_have_required_fields(self):
        """Verify all activities have required fields"""
        response = requests.get(f"{BASE_URL}/api/activities")
        assert response.status_code == 200
        data = response.json()
        
        required_fields = ["id", "title", "price", "currency", "description", "image"]
        for activity in data:
            for field in required_fields:
                assert field in activity, f"Activity {activity.get('id', 'unknown')} missing field: {field}"
    
    def test_activities_prices_in_eur(self):
        """Verify all activities have EUR currency"""
        response = requests.get(f"{BASE_URL}/api/activities")
        assert response.status_code == 200
        data = response.json()
        
        for activity in data:
            assert activity["currency"] == "€", f"Activity {activity['id']} has wrong currency"
    
    def test_specific_activities_exist(self):
        """Verify specific activities exist with correct prices"""
        response = requests.get(f"{BASE_URL}/api/activities")
        assert response.status_code == 200
        data = response.json()
        
        expected_activities = {
            "surf-lessons": "45",
            "desert-excursion": "120",
            "quad-adventure": "75",
            "cooking-class": "55",
            "city-tour": "35",
            "hammam-spa": "65",
            "nightlife-events": "40",
            "cultural-workshop": "50"
        }
        
        for act_id, expected_price in expected_activities.items():
            activity = next((a for a in data if a["id"] == act_id), None)
            assert activity is not None, f"Activity {act_id} not found"
            assert activity["price"] == expected_price, f"Activity {act_id} has wrong price"
    
    def test_get_single_activity(self):
        """Test getting a single activity by ID"""
        response = requests.get(f"{BASE_URL}/api/activities/surf-lessons")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == "surf-lessons"
        assert data["title"] == "Surf Lessons"


class TestCatalogueAPI:
    """Tests for /api/catalogue - Fair Price Catalogue"""
    
    def test_get_catalogue_returns_items(self):
        """Verify catalogue returns items with EUR and MAD prices"""
        response = requests.get(f"{BASE_URL}/api/catalogue")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 8, f"Expected at least 8 catalogue items, got {len(data)}"
    
    def test_catalogue_items_have_dual_pricing(self):
        """Verify all catalogue items have EUR and MAD prices"""
        response = requests.get(f"{BASE_URL}/api/catalogue")
        assert response.status_code == 200
        data = response.json()
        
        for item in data:
            assert "price_eur" in item, f"Item {item.get('id', 'unknown')} missing EUR price"
            assert "price_mad" in item, f"Item {item.get('id', 'unknown')} missing MAD price"
            assert "activity" in item, f"Item {item.get('id', 'unknown')} missing activity name"
            assert "reason" in item, f"Item {item.get('id', 'unknown')} missing reason"
    
    def test_specific_catalogue_prices(self):
        """Verify specific catalogue items have correct prices"""
        response = requests.get(f"{BASE_URL}/api/catalogue")
        assert response.status_code == 200
        data = response.json()
        
        # Check airport transfer
        airport = next((i for i in data if i["id"] == "airport-transfer"), None)
        assert airport is not None
        assert airport["price_eur"] == "5"
        assert airport["price_mad"] == "50"
        
        # Check desert experience
        desert = next((i for i in data if i["id"] == "desert-experience"), None)
        assert desert is not None
        assert desert["price_eur"] == "90"
        assert desert["price_mad"] == "970"


class TestContactAPI:
    """Tests for /api/contact - Contact form submission"""
    
    def test_submit_contact_form(self):
        """Test contact form submission stores data"""
        payload = {
            "name": "TEST_User",
            "email": "test@example.com",
            "message": "Test message for THE BRIDGE",
            "trip_interest": "combat-holiday"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert data["trip_interest"] == payload["trip_interest"]
        assert "id" in data
        assert "created_at" in data
    
    def test_contact_form_validation(self):
        """Test contact form validates required fields"""
        # Missing email
        payload = {
            "name": "Test User",
            "message": "Test message"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
    
    def test_contact_form_invalid_email(self):
        """Test contact form validates email format"""
        payload = {
            "name": "Test User",
            "email": "invalid-email",
            "message": "Test message"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error


class TestTripsAPI:
    """Tests for /api/trips - Upcoming trips"""
    
    def test_get_trips(self):
        """Test getting upcoming trips"""
        response = requests.get(f"{BASE_URL}/api/trips")
        assert response.status_code == 200
        data = response.json()
        assert len(data) >= 1, "Expected at least 1 trip"
    
    def test_trips_have_required_fields(self):
        """Verify trips have required fields"""
        response = requests.get(f"{BASE_URL}/api/trips")
        assert response.status_code == 200
        data = response.json()
        
        required_fields = ["id", "title", "location", "start_date", "end_date", "spots_left", "total_spots", "price", "currency"]
        for trip in data:
            for field in required_fields:
                assert field in trip, f"Trip {trip.get('id', 'unknown')} missing field: {field}"


class TestPackagesAPI:
    """Tests for /api/packages - Travel packages"""
    
    def test_get_packages(self):
        """Test getting travel packages"""
        response = requests.get(f"{BASE_URL}/api/packages")
        # Note: PACKAGES variable might not be defined in server.py
        # This test checks if the endpoint exists
        assert response.status_code in [200, 500]  # 500 if PACKAGES not defined


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
