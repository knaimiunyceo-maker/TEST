"""
Backend API Tests for Stripe Checkout Integration - THE BRIDGE Travel Website
Tests the 30% deposit payment flow with Stripe checkout
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Experience prices as defined in server.py
EXPERIENCE_PRICES = {
    "self-defense": 1490.00,
    "visual-storytelling": 1690.00,
    "language-practice": 890.00,
}


class TestExperiencePricesAPI:
    """Tests for /api/experience-prices endpoint"""
    
    def test_get_experience_prices_returns_200(self):
        """Test experience prices endpoint returns 200"""
        response = requests.get(f"{BASE_URL}/api/experience-prices")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, dict)
    
    def test_experience_prices_has_all_experiences(self):
        """Verify all 3 experiences have prices"""
        response = requests.get(f"{BASE_URL}/api/experience-prices")
        assert response.status_code == 200
        data = response.json()
        
        expected_experiences = ["self-defense", "visual-storytelling", "language-practice"]
        for exp_id in expected_experiences:
            assert exp_id in data, f"Experience {exp_id} not found in prices"
    
    def test_experience_prices_correct_values(self):
        """Verify experience prices match expected values"""
        response = requests.get(f"{BASE_URL}/api/experience-prices")
        assert response.status_code == 200
        data = response.json()
        
        # self-defense: €1490, deposit 30% = €447
        assert data["self-defense"]["price"] == 1490.00
        assert data["self-defense"]["deposit"] == 447.00
        assert data["self-defense"]["currency"] == "eur"
        
        # visual-storytelling: €1690, deposit 30% = €507
        assert data["visual-storytelling"]["price"] == 1690.00
        assert data["visual-storytelling"]["deposit"] == 507.00
        assert data["visual-storytelling"]["currency"] == "eur"
        
        # language-practice: €890, deposit 30% = €267
        assert data["language-practice"]["price"] == 890.00
        assert data["language-practice"]["deposit"] == 267.00
        assert data["language-practice"]["currency"] == "eur"
    
    def test_deposit_is_30_percent(self):
        """Verify deposit is exactly 30% of price"""
        response = requests.get(f"{BASE_URL}/api/experience-prices")
        assert response.status_code == 200
        data = response.json()
        
        for exp_id, exp_data in data.items():
            expected_deposit = round(exp_data["price"] * 0.30, 2)
            assert exp_data["deposit"] == expected_deposit, \
                f"Deposit for {exp_id} should be {expected_deposit}, got {exp_data['deposit']}"


class TestStripeCheckoutAPI:
    """Tests for /api/bookings/checkout endpoint"""
    
    def test_checkout_endpoint_exists(self):
        """Test checkout endpoint exists and requires POST"""
        response = requests.get(f"{BASE_URL}/api/bookings/checkout")
        # GET should return 404 or 405 (endpoint only accepts POST)
        assert response.status_code in [404, 405]
    
    def test_checkout_requires_all_fields(self):
        """Test checkout validates required fields"""
        # Missing required fields
        payload = {
            "name": "Test User"
        }
        response = requests.post(f"{BASE_URL}/api/bookings/checkout", json=payload)
        assert response.status_code == 422  # Validation error
    
    def test_checkout_validates_experience_id(self):
        """Test checkout validates experience_id"""
        payload = {
            "experience_id": "invalid-experience",
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+33612345678",
            "dates": "2026-03-01 - Weekend",
            "city": "Marrakech",
            "participants": 1,
            "room_type": "shared",
            "message": "",
            "origin_url": "https://travel-bridge-1.preview.emergentagent.com"
        }
        response = requests.post(f"{BASE_URL}/api/bookings/checkout", json=payload)
        assert response.status_code == 400
        data = response.json()
        assert "Invalid experience" in data.get("detail", "")
    
    def test_checkout_self_defense_creates_session(self):
        """Test checkout for self-defense creates Stripe session with correct deposit"""
        payload = {
            "experience_id": "self-defense",
            "name": "TEST_Checkout_User",
            "email": "test.checkout@example.com",
            "phone": "+33612345678",
            "dates": "2026-03-01 - Weekend",
            "city": "Marrakech",
            "participants": 1,
            "room_type": "shared",
            "message": "Test booking",
            "origin_url": "https://travel-bridge-1.preview.emergentagent.com"
        }
        response = requests.post(f"{BASE_URL}/api/bookings/checkout", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "checkout_url" in data
        assert "session_id" in data
        assert "booking_id" in data
        assert "deposit_amount" in data
        assert "total_price" in data
        assert "currency" in data
        
        # Verify amounts (self-defense: €1490, deposit 30% = €447)
        assert data["total_price"] == 1490.00
        assert data["deposit_amount"] == 447.00
        assert data["currency"] == "eur"
        
        # Verify checkout URL is valid Stripe URL
        assert "stripe.com" in data["checkout_url"] or "checkout" in data["checkout_url"]
    
    def test_checkout_visual_storytelling_creates_session(self):
        """Test checkout for visual-storytelling creates Stripe session with correct deposit"""
        payload = {
            "experience_id": "visual-storytelling",
            "name": "TEST_Visual_User",
            "email": "test.visual@example.com",
            "phone": "+33612345678",
            "dates": "2026-04-01 - Weekend",
            "city": "Agadir",
            "participants": 1,
            "room_type": "shared",
            "message": "",
            "origin_url": "https://travel-bridge-1.preview.emergentagent.com"
        }
        response = requests.post(f"{BASE_URL}/api/bookings/checkout", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        # Verify amounts (visual-storytelling: €1690, deposit 30% = €507)
        assert data["total_price"] == 1690.00
        assert data["deposit_amount"] == 507.00
    
    def test_checkout_language_practice_creates_session(self):
        """Test checkout for language-practice creates Stripe session with correct deposit"""
        payload = {
            "experience_id": "language-practice",
            "name": "TEST_Language_User",
            "email": "test.language@example.com",
            "phone": "+33612345678",
            "dates": "2026-05-01 - 1 Week",
            "city": "Casablanca",
            "participants": 1,
            "room_type": "shared",
            "message": "",
            "origin_url": "https://travel-bridge-1.preview.emergentagent.com"
        }
        response = requests.post(f"{BASE_URL}/api/bookings/checkout", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        # Verify amounts (language-practice: €890, deposit 30% = €267)
        assert data["total_price"] == 890.00
        assert data["deposit_amount"] == 267.00
    
    def test_checkout_multiple_participants(self):
        """Test checkout calculates correct total for multiple participants"""
        payload = {
            "experience_id": "self-defense",
            "name": "TEST_Group_User",
            "email": "test.group@example.com",
            "phone": "+33612345678",
            "dates": "2026-06-01 - Weekend",
            "city": "Marrakech",
            "participants": 2,
            "room_type": "shared",
            "message": "",
            "origin_url": "https://travel-bridge-1.preview.emergentagent.com"
        }
        response = requests.post(f"{BASE_URL}/api/bookings/checkout", json=payload)
        assert response.status_code == 200
        data = response.json()
        
        # 2 participants × €1490 = €2980, deposit 30% = €894
        assert data["total_price"] == 2980.00
        assert data["deposit_amount"] == 894.00
    
    def test_checkout_validates_email_format(self):
        """Test checkout validates email format"""
        payload = {
            "experience_id": "self-defense",
            "name": "Test User",
            "email": "invalid-email",
            "phone": "+33612345678",
            "dates": "2026-03-01 - Weekend",
            "city": "Marrakech",
            "participants": 1,
            "room_type": "shared",
            "message": "",
            "origin_url": "https://travel-bridge-1.preview.emergentagent.com"
        }
        response = requests.post(f"{BASE_URL}/api/bookings/checkout", json=payload)
        assert response.status_code == 422  # Validation error


class TestPaymentStatusAPI:
    """Tests for /api/bookings/payment-status/{session_id} endpoint"""
    
    def test_payment_status_invalid_session(self):
        """Test payment status returns 404 for invalid session"""
        response = requests.get(f"{BASE_URL}/api/bookings/payment-status/invalid_session_id")
        assert response.status_code == 404
    
    def test_payment_status_endpoint_exists(self):
        """Test payment status endpoint exists"""
        # First create a checkout session
        payload = {
            "experience_id": "self-defense",
            "name": "TEST_Status_User",
            "email": "test.status@example.com",
            "phone": "+33612345678",
            "dates": "2026-07-01 - Weekend",
            "city": "Marrakech",
            "participants": 1,
            "room_type": "shared",
            "message": "",
            "origin_url": "https://travel-bridge-1.preview.emergentagent.com"
        }
        checkout_response = requests.post(f"{BASE_URL}/api/bookings/checkout", json=payload)
        
        if checkout_response.status_code == 200:
            session_id = checkout_response.json()["session_id"]
            
            # Check payment status
            status_response = requests.get(f"{BASE_URL}/api/bookings/payment-status/{session_id}")
            # Should return 200 with status info
            assert status_response.status_code == 200
            data = status_response.json()
            assert "session_id" in data
            assert "payment_status" in data


class TestBookingAPI:
    """Tests for /api/bookings/{booking_id} endpoint"""
    
    def test_get_booking_invalid_id(self):
        """Test getting booking with invalid ID returns 404"""
        response = requests.get(f"{BASE_URL}/api/bookings/invalid_booking_id")
        assert response.status_code == 404
    
    def test_get_booking_after_checkout(self):
        """Test getting booking after checkout creation"""
        # First create a checkout session
        payload = {
            "experience_id": "self-defense",
            "name": "TEST_Booking_User",
            "email": "test.booking@example.com",
            "phone": "+33612345678",
            "dates": "2026-08-01 - Weekend",
            "city": "Marrakech",
            "participants": 1,
            "room_type": "shared",
            "message": "Test booking message",
            "origin_url": "https://travel-bridge-1.preview.emergentagent.com"
        }
        checkout_response = requests.post(f"{BASE_URL}/api/bookings/checkout", json=payload)
        
        if checkout_response.status_code == 200:
            booking_id = checkout_response.json()["booking_id"]
            
            # Get booking details
            booking_response = requests.get(f"{BASE_URL}/api/bookings/{booking_id}")
            assert booking_response.status_code == 200
            data = booking_response.json()
            
            # Verify booking data
            assert data["id"] == booking_id
            assert data["experience_id"] == "self-defense"
            assert data["name"] == "TEST_Booking_User"
            assert data["email"] == "test.booking@example.com"
            assert data["total_price"] == 1490.00
            assert data["deposit_amount"] == 447.00
            assert data["payment_status"] == "pending"


class TestStripeWebhook:
    """Tests for /api/webhook/stripe endpoint"""
    
    def test_webhook_endpoint_exists(self):
        """Test webhook endpoint exists"""
        # POST without proper signature should fail
        response = requests.post(f"{BASE_URL}/api/webhook/stripe", json={})
        # Should return 400 or 503 (not 404)
        assert response.status_code in [400, 503]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
