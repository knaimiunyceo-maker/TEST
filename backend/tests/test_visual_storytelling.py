"""
Backend API Tests for Visual Storytelling Weekend Experience
Tests the updated weekend format with €350 pricing and alternating cities
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestVisualStorytellingAPI:
    """Tests for Visual Storytelling Weekend experience"""
    
    def test_visual_storytelling_endpoint_returns_200(self):
        """Test /api/experiences/visual-storytelling returns 200"""
        response = requests.get(f"{BASE_URL}/api/experiences/visual-storytelling")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    
    def test_visual_storytelling_price_is_350(self):
        """Verify Visual Storytelling has price of €350"""
        response = requests.get(f"{BASE_URL}/api/experiences/visual-storytelling")
        assert response.status_code == 200
        data = response.json()
        
        assert data["price"] == 350, f"Expected price 350, got {data.get('price')}"
        assert data["currency"] == "€", f"Expected currency €, got {data.get('currency')}"
    
    def test_visual_storytelling_format_is_weekend(self):
        """Verify Visual Storytelling has weekend format"""
        response = requests.get(f"{BASE_URL}/api/experiences/visual-storytelling")
        assert response.status_code == 200
        data = response.json()
        
        assert data["format"] == "weekend", f"Expected format 'weekend', got {data.get('format')}"
        assert data["duration"] == "3 jours / 2 nuits", f"Expected duration '3 jours / 2 nuits', got {data.get('duration')}"
        assert data["schedule"] == "Vendredi → Dimanche", f"Expected schedule 'Vendredi → Dimanche', got {data.get('schedule')}"
    
    def test_visual_storytelling_has_alternating_cities_calendar(self):
        """Verify calendar has alternating Marrakech/Agadir pattern"""
        response = requests.get(f"{BASE_URL}/api/experiences/visual-storytelling")
        assert response.status_code == 200
        data = response.json()
        
        calendar = data.get("calendar")
        assert calendar is not None, "Calendar should not be None"
        
        # Check alternating pattern: Marrakech, Agadir, Marrakech, Agadir
        assert calendar.get("weekend_1") == "Marrakech", f"Weekend 1 should be Marrakech, got {calendar.get('weekend_1')}"
        assert calendar.get("weekend_2") == "Agadir", f"Weekend 2 should be Agadir, got {calendar.get('weekend_2')}"
        assert calendar.get("weekend_3") == "Marrakech", f"Weekend 3 should be Marrakech, got {calendar.get('weekend_3')}"
        assert calendar.get("weekend_4") == "Agadir", f"Weekend 4 should be Agadir, got {calendar.get('weekend_4')}"
    
    def test_visual_storytelling_has_three_tracks(self):
        """Verify Visual Storytelling has Film, Photo, Drone tracks"""
        response = requests.get(f"{BASE_URL}/api/experiences/visual-storytelling")
        assert response.status_code == 200
        data = response.json()
        
        tracks = data.get("tracks")
        assert tracks is not None, "Tracks should not be None"
        assert len(tracks) == 3, f"Expected 3 tracks, got {len(tracks)}"
        
        track_ids = [t["id"] for t in tracks]
        assert "filmmaking" in track_ids, "Filmmaking track should exist"
        assert "photography" in track_ids, "Photography track should exist"
        assert "drone" in track_ids, "Drone track should exist"
    
    def test_visual_storytelling_destinations(self):
        """Verify destinations include Marrakech and Agadir"""
        response = requests.get(f"{BASE_URL}/api/experiences/visual-storytelling")
        assert response.status_code == 200
        data = response.json()
        
        destinations = data.get("destinations")
        assert destinations is not None, "Destinations should not be None"
        assert "Marrakech" in destinations, "Marrakech should be in destinations"
        assert "Agadir" in destinations, "Agadir should be in destinations"
    
    def test_visual_storytelling_max_participants(self):
        """Verify max participants is 10"""
        response = requests.get(f"{BASE_URL}/api/experiences/visual-storytelling")
        assert response.status_code == 200
        data = response.json()
        
        assert data.get("maxParticipants") == 10, f"Expected maxParticipants 10, got {data.get('maxParticipants')}"


class TestExperiencesListAPI:
    """Tests for /api/experiences list endpoint"""
    
    def test_experiences_list_returns_200(self):
        """Test /api/experiences returns 200"""
        response = requests.get(f"{BASE_URL}/api/experiences")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    
    def test_experiences_list_contains_visual_storytelling(self):
        """Verify Visual Storytelling is in experiences list"""
        response = requests.get(f"{BASE_URL}/api/experiences")
        assert response.status_code == 200
        data = response.json()
        
        visual = next((e for e in data if e["id"] == "visual-storytelling"), None)
        assert visual is not None, "Visual Storytelling should be in experiences list"
        assert visual["title"] == "Visual Storytelling Weekend", f"Expected title 'Visual Storytelling Weekend', got {visual.get('title')}"
        assert visual["tagline"] == "Weekend Experience", f"Expected tagline 'Weekend Experience', got {visual.get('tagline')}"
    
    def test_experiences_list_has_three_experiences(self):
        """Verify exactly 3 experiences are returned"""
        response = requests.get(f"{BASE_URL}/api/experiences")
        assert response.status_code == 200
        data = response.json()
        
        assert len(data) == 3, f"Expected 3 experiences, got {len(data)}"


class TestSelfDefenseWeekend:
    """Tests for Self-Defense Weekend (similar format to Visual Storytelling)"""
    
    def test_self_defense_has_weekend_format(self):
        """Verify Self-Defense also has weekend format"""
        response = requests.get(f"{BASE_URL}/api/experiences")
        assert response.status_code == 200
        data = response.json()
        
        self_defense = next((e for e in data if e["id"] == "self-defense-holiday"), None)
        assert self_defense is not None, "Self-Defense experience should exist"
        assert self_defense["format"] == "weekend", f"Expected format 'weekend', got {self_defense.get('format')}"
        assert self_defense["price"] == 250, f"Expected price 250, got {self_defense.get('price')}"


class TestContactAPI:
    """Tests for contact/booking API"""
    
    def test_contact_submission_for_storytelling(self):
        """Test booking request for Visual Storytelling"""
        payload = {
            "name": "TEST_Storytelling_User",
            "email": "test_storytelling@example.com",
            "message": "BOOKING REQUEST\nExperience: Visual Storytelling Weekend\nCity: Marrakech\nDuration: Weekend (2 nuits / 3 jours)\nPrice: €350",
            "trip_interest": "Visual Storytelling Weekend"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert "id" in data
        assert "created_at" in data


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
