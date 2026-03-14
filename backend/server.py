from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Dict
import uuid
from datetime import datetime, timezone

# Initialize Resend if available
try:
    import resend
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False

# Initialize Stripe Checkout
try:
    from emergentintegrations.payments.stripe.checkout import (
        StripeCheckout, 
        CheckoutSessionResponse, 
        CheckoutStatusResponse, 
        CheckoutSessionRequest
    )
    STRIPE_AVAILABLE = True
except ImportError:
    STRIPE_AVAILABLE = False

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', '')

if RESEND_AVAILABLE and RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# Stripe configuration
STRIPE_API_KEY = os.environ.get('STRIPE_API_KEY')

# Define experience prices for 30% deposit calculation (in EUR)
EXPERIENCE_PRICES = {
    "self-defense": 1490.00,
    "visual-storytelling": 1690.00,
    "language-practice": 890.00,
}

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    trip_interest: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    message: str
    trip_interest: Optional[str] = None


class CatalogueItem(BaseModel):
    id: str
    activity: str
    price_eur: str
    price_mad: str
    reason: str
    icon: str


class Package(BaseModel):
    id: str
    title: str
    price: str
    currency: str
    duration: str
    description: str
    image: str
    inclusions: List[str]


class Experience(BaseModel):
    id: str
    title: str
    tagline: str
    description: str
    image: str
    currency: str
    practices: List[str]
    experiences: List[str]
    destinations: List[str]
    pricing: Optional[dict] = None
    price: Optional[int] = None
    pricePerWeek: Optional[int] = None
    registrationFee: Optional[int] = None
    highlights: List[str]
    icon: str
    tracks: Optional[List[dict]] = None
    format: Optional[str] = None
    duration: Optional[str] = None
    schedule: Optional[str] = None
    maxParticipants: Optional[int] = None
    calendar: Optional[dict] = None


class Activity(BaseModel):
    id: str
    title: str
    price: str
    currency: str
    description: str
    image: str


class Trip(BaseModel):
    id: str
    title: str
    location: str
    start_date: str
    end_date: str
    spots_left: int
    total_spots: int
    price: str
    currency: str
    image: str


# Booking and Payment Models
class BookingCreate(BaseModel):
    """Model for creating a new booking"""
    experience_id: str
    name: str
    email: EmailStr
    phone: str
    dates: str
    city: str
    participants: int = 1
    room_type: str = "shared"
    message: Optional[str] = None
    origin_url: str  # Frontend origin for redirect URLs


class Booking(BaseModel):
    """Full booking model with payment info"""
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    experience_id: str
    name: str
    email: EmailStr
    phone: str
    dates: str
    city: str
    participants: int = 1
    room_type: str = "shared"
    message: Optional[str] = None
    total_price: float
    deposit_amount: float
    currency: str = "eur"
    payment_status: str = "pending"  # pending, paid, failed, refunded
    checkout_session_id: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class PaymentTransaction(BaseModel):
    """Model for tracking payment transactions"""
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    booking_id: str
    session_id: str
    amount: float
    currency: str
    payment_status: str = "initiated"  # initiated, pending, paid, failed, expired
    metadata: Optional[Dict[str, str]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CheckoutResponse(BaseModel):
    """Response for checkout session creation"""
    checkout_url: str
    session_id: str
    booking_id: str
    deposit_amount: float
    total_price: float
    currency: str


# Static data for Fair Price Catalogue
CATALOGUE = [
    {
        "id": "airport-transfer",
        "activity": "Airport Transfer",
        "price_eur": "5",
        "price_mad": "50",
        "reason": "Direct local price. No unnecessary extras.",
        "icon": "plane"
    },
    {
        "id": "surf-lesson",
        "activity": "Surf Lesson (2h)",
        "price_eur": "20",
        "price_mad": "215",
        "reason": "Lesson + equipment included. Directly with the instructor.",
        "icon": "waves"
    },
    {
        "id": "jet-ski",
        "activity": "Jet Ski Agadir (30 min)",
        "price_eur": "65",
        "price_mad": "700",
        "reason": "Pure adrenaline at the official water sports base price.",
        "icon": "zap"
    },
    {
        "id": "hammam-spa",
        "activity": "Hammam & Spa",
        "price_eur": "25",
        "price_mad": "270",
        "reason": "Full relaxation experience including scrub and massage.",
        "icon": "sparkles"
    },
    {
        "id": "quad-adventure",
        "activity": "Quad Adventure (2h)",
        "price_eur": "35",
        "price_mad": "380",
        "reason": "Explore off-road tracks at the real local price.",
        "icon": "car"
    },
    {
        "id": "cooking-class",
        "activity": "Cooking Class",
        "price_eur": "25",
        "price_mad": "270",
        "reason": "Authentic experience cooking with locals.",
        "icon": "chef"
    },
    {
        "id": "desert-experience",
        "activity": "Desert Experience (3 days / 2 nights)",
        "price_eur": "90",
        "price_mad": "970",
        "reason": "Authentic desert trip with respected local drivers.",
        "icon": "sun"
    },
    {
        "id": "city-tour",
        "activity": "Guided City Tour",
        "price_eur": "15",
        "price_mad": "160",
        "reason": "Discover the Medina through the eyes of a local guide.",
        "icon": "map"
    },
    {
        "id": "massage",
        "activity": "Traditional Massage",
        "price_eur": "30",
        "price_mad": "320",
        "reason": "Relaxing massage with local techniques.",
        "icon": "heart"
    },
    {
        "id": "sunset-experience",
        "activity": "Sunset Experience",
        "price_eur": "20",
        "price_mad": "215",
        "reason": "Watch the sunset from stunning viewpoints.",
        "icon": "sunset"
    },
    {
        "id": "group-dinner",
        "activity": "Group Dinner",
        "price_eur": "25",
        "price_mad": "270",
        "reason": "Traditional Moroccan dinner with the group.",
        "icon": "utensils"
    }
]

# Static data for main experiences - NEW "Travel • Practice • Experience" concept
# Two formats: Full Experiences (5-7 days) and Weekend Experiences (2 nights / 3 days)
EXPERIENCES = [
    {
        "id": "self-defense-holiday",
        "title": "Self-Defense Weekend",
        "tagline": "Weekend Experience",
        "description": "Un weekend intensif de 3 jours pour apprendre les techniques de self-défense. Petit groupe de 10 personnes maximum.",
        "image": "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800",
        "currency": "€",
        "format": "weekend",
        "duration": "3 jours / 2 nuits",
        "schedule": "Vendredi → Dimanche",
        "maxParticipants": 10,
        "practices": ["Self-defense techniques", "Conditioning", "Practical skills"],
        "experiences": ["Group dinner", "Free time", "Local exploration"],
        "destinations": ["Marrakech", "Agadir"],
        "price": 250,
        "highlights": [
            "2 sessions de self-défense",
            "2 nuits d'hébergement",
            "Tous les repas inclus",
            "Groupe max 10 personnes",
            "Coach certifié",
            "Certificat de participation"
        ],
        "calendar": {
            "weekend_1": "Marrakech",
            "weekend_2": "Agadir",
            "weekend_3": "Marrakech",
            "weekend_4": "Agadir"
        },
        "icon": "boxing"
    },
    {
        "id": "language-holiday",
        "title": "Language Practice Holiday",
        "tagline": "Practice English through travel",
        "description": "Cours d'anglais intensif avec 20 heures par semaine. Immersion totale au Maroc avec activités culturelles et exploration.",
        "image": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800",
        "currency": "€",
        "practices": ["English conversation", "TOEFL/IELTS prep", "Business English"],
        "experiences": ["Excursions", "Cafés", "Social activities", "Local discovery"],
        "destinations": ["Casablanca", "Marrakech"],
        "pricePerWeek": 400,
        "registrationFee": 45,
        "highlights": [
            "20 heures de cours par semaine",
            "Test de niveau gratuit",
            "Certificat de participation",
            "Groupe international (max 10)",
            "Hébergement inclus",
            "Activités culturelles"
        ],
        "icon": "languages"
    },
    {
        "id": "visual-storytelling",
        "title": "Visual Storytelling Weekend",
        "tagline": "Weekend Experience",
        "description": "Un weekend créatif pour apprendre la photo, vidéo ou drone. Capturez le Maroc avec un petit groupe de 10 personnes maximum.",
        "image": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800",
        "currency": "€",
        "format": "weekend",
        "duration": "3 jours / 2 nuits",
        "schedule": "Vendredi → Dimanche",
        "maxParticipants": 10,
        "practices": ["Filmmaking", "Photography", "Drone"],
        "experiences": ["Shooting sessions", "Golden hour", "Local exploration"],
        "destinations": ["Marrakech", "Agadir"],
        "price": 350,
        "highlights": [
            "Sessions shooting guidées",
            "2 nuits d'hébergement",
            "Tous les repas inclus",
            "Groupe max 10 personnes",
            "Formateur professionnel",
            "Accès spots exclusifs"
        ],
        "tracks": [
            {
                "id": "filmmaking",
                "title": "Filmmaking",
                "description": "Apprenez le storytelling vidéo, le cadrage et le montage."
            },
            {
                "id": "photography",
                "title": "Photography",
                "description": "Maîtrisez la composition, la lumière et le post-traitement."
            },
            {
                "id": "drone",
                "title": "Drone",
                "description": "Capturez des images aériennes spectaculaires."
            }
        ],
        "calendar": {
            "weekend_1": "Marrakech",
            "weekend_2": "Agadir",
            "weekend_3": "Marrakech",
            "weekend_4": "Agadir"
        },
        "icon": "camera"
    }
]

# Static data for upcoming trips
TRIPS = [
    {
        "id": "weekend-experience",
        "title": "Weekend Experience",
        "price": "250",
        "currency": "€",
        "duration": "2 nights",
        "description": "The entry-level experience designed to make the trip accessible. Perfect for a first taste of Morocco.",
        "image": "https://images.unsplash.com/photo-1762380831396-9ada049cd507?crop=entropy&cs=srgb&fm=jpg&w=800",
        "inclusions": [
            "2 nights accommodation",
            "1 included group activity",
            "Social events with other travelers",
            "Community atmosphere",
            "Local host and experience coordination"
        ]
    },
    {
        "id": "premium-weekend",
        "title": "Premium Weekend",
        "price": "350",
        "currency": "€",
        "duration": "2 nights",
        "description": "A more complete weekend experience with additional activities and curated local experiences.",
        "image": "https://images.unsplash.com/photo-1706007473759-981e986014d8?crop=entropy&cs=srgb&fm=jpg&w=800",
        "inclusions": [
            "2 nights accommodation",
            "2 included activities",
            "Social events",
            "Curated local experiences",
            "Community travel atmosphere",
            "Local host and coordination"
        ]
    },
    {
        "id": "explorer-experience",
        "title": "Explorer Experience",
        "price": "500",
        "currency": "€",
        "duration": "5 days / 4 nights",
        "description": "A longer travel experience to fully immerse yourself in Morocco's culture, adventures and community.",
        "image": "https://images.unsplash.com/photo-1662009833223-75d3301290bd?crop=entropy&cs=srgb&fm=jpg&w=800",
        "inclusions": [
            "5 days / 4 nights accommodation",
            "Multiple group activities",
            "Cultural experiences",
            "Social events with other travelers",
            "Local host support",
            "Curated travel itinerary"
        ]
    }
]

# Static data for optional activities
ACTIVITIES = [
    {
        "id": "surf-lessons",
        "title": "Surf Lessons",
        "price": "45",
        "currency": "€",
        "description": "Learn to ride the waves with experienced local instructors on Morocco's best surf beaches.",
        "image": "https://images.unsplash.com/photo-1706007473923-012a8f7a1da9?crop=entropy&cs=srgb&fm=jpg&w=400"
    },
    {
        "id": "desert-excursion",
        "title": "Desert Excursion",
        "price": "120",
        "currency": "€",
        "description": "Camel ride through golden dunes, traditional camp dinner and stargazing in the Sahara.",
        "image": "https://images.unsplash.com/photo-1662009867642-933d25d401fe?crop=entropy&cs=srgb&fm=jpg&w=400"
    },
    {
        "id": "quad-adventure",
        "title": "Quad & Buggy Adventure",
        "price": "75",
        "currency": "€",
        "description": "Adrenaline-pumping quad or buggy ride through desert landscapes and palm groves.",
        "image": "https://images.unsplash.com/photo-1760681554259-a8e4b1478e9f?crop=entropy&cs=srgb&fm=jpg&w=400"
    },
    {
        "id": "cooking-class",
        "title": "Moroccan Cooking Class",
        "price": "55",
        "currency": "€",
        "description": "Learn to prepare traditional tagine, couscous and Moroccan pastries with local chefs.",
        "image": "https://images.unsplash.com/photo-1762380831564-82c895083889?crop=entropy&cs=srgb&fm=jpg&w=400"
    },
    {
        "id": "city-tour",
        "title": "Guided City Tour",
        "price": "35",
        "currency": "€",
        "description": "Explore the medina, souks and hidden gems with a knowledgeable local guide.",
        "image": "https://images.unsplash.com/photo-1760727466827-f11ca401116e?crop=entropy&cs=srgb&fm=jpg&w=400"
    },
    {
        "id": "hammam-spa",
        "title": "Hammam & Spa Experience",
        "price": "65",
        "currency": "€",
        "description": "Traditional Moroccan hammam with steam bath, scrub and relaxing massage.",
        "image": "https://images.unsplash.com/photo-1600334129128-685c5582fd35?crop=entropy&cs=srgb&fm=jpg&w=400"
    },
    {
        "id": "nightlife-events",
        "title": "Nightlife Events",
        "price": "40",
        "currency": "€",
        "description": "Rooftop parties, live music and the best nightlife spots with your travel group.",
        "image": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=srgb&fm=jpg&w=400"
    },
    {
        "id": "cultural-workshop",
        "title": "Cultural Workshop",
        "price": "50",
        "currency": "€",
        "description": "Hands-on experiences: pottery, henna art, traditional music or leather crafting.",
        "image": "https://images.unsplash.com/photo-1677837488142-a85ffbffe408?crop=entropy&cs=srgb&fm=jpg&w=400"
    }
]

# Static data for upcoming trips
TRIPS = [
    {
        "id": "trip-1",
        "title": "Surf Week",
        "location": "Taghazout",
        "start_date": "2026-02-12",
        "end_date": "2026-02-18",
        "spots_left": 8,
        "total_spots": 12,
        "price": "500",
        "currency": "€",
        "image": "https://images.unsplash.com/photo-1706007473759-981e986014d8?crop=entropy&cs=srgb&fm=jpg&w=400"
    },
    {
        "id": "trip-2",
        "title": "Desert & Stars",
        "location": "Sahara Desert",
        "start_date": "2026-02-20",
        "end_date": "2026-02-24",
        "spots_left": 5,
        "total_spots": 10,
        "price": "500",
        "currency": "€",
        "image": "https://images.unsplash.com/photo-1662009833223-75d3301290bd?crop=entropy&cs=srgb&fm=jpg&w=400"
    },
    {
        "id": "trip-3",
        "title": "Marrakech Vibes",
        "location": "Marrakech",
        "start_date": "2026-03-05",
        "end_date": "2026-03-08",
        "spots_left": 10,
        "total_spots": 15,
        "price": "350",
        "currency": "€",
        "image": "https://images.unsplash.com/photo-1762380831396-9ada049cd507?crop=entropy&cs=srgb&fm=jpg&w=400"
    },
    {
        "id": "trip-4",
        "title": "Coast to Coast",
        "location": "Essaouira & Agadir",
        "start_date": "2026-03-15",
        "end_date": "2026-03-20",
        "spots_left": 6,
        "total_spots": 12,
        "price": "500",
        "currency": "€",
        "image": "https://images.unsplash.com/photo-1706007473923-012a8f7a1da9?crop=entropy&cs=srgb&fm=jpg&w=400"
    }
]


# Helper function to send email notification
async def send_notification_email(submission: ContactSubmission):
    if not RESEND_AVAILABLE or not RESEND_API_KEY:
        logger.warning("Resend not configured - skipping email notification")
        return None
    
    recipient = NOTIFICATION_EMAIL if NOTIFICATION_EMAIL else "onboarding@resend.dev"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f1de; margin: 0; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }}
            .header {{ background: linear-gradient(135deg, #264653 0%, #2a9d8f 100%); padding: 30px; text-align: center; }}
            .header h1 {{ color: white; margin: 0; font-size: 24px; }}
            .header p {{ color: #e9c46a; margin: 10px 0 0; font-size: 14px; }}
            .content {{ padding: 30px; }}
            .badge {{ display: inline-block; background: #e76f51; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }}
            .field {{ margin-bottom: 20px; }}
            .field-label {{ color: #264653; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }}
            .field-value {{ background: #f4f1de; padding: 15px; border-radius: 8px; color: #264653; }}
            .message-box {{ background: #264653; color: white; padding: 20px; border-radius: 8px; margin-top: 20px; }}
            .footer {{ background: #f4f1de; padding: 20px; text-align: center; font-size: 12px; color: #666; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>THE BRIDGE</h1>
                <p>Travel • Practice • Experience</p>
            </div>
            <div class="content">
                <span class="badge">NOUVELLE DEMANDE D'INFORMATION</span>
                
                <div class="field">
                    <div class="field-label">Nom</div>
                    <div class="field-value">{submission.name}</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Email</div>
                    <div class="field-value"><a href="mailto:{submission.email}" style="color: #2a9d8f;">{submission.email}</a></div>
                </div>
                
                <div class="field">
                    <div class="field-label">Expérience souhaitée</div>
                    <div class="field-value">{submission.trip_interest or 'Non spécifiée'}</div>
                </div>
                
                <div class="message-box">
                    <div class="field-label" style="color: #e9c46a;">Message</div>
                    <p style="margin: 10px 0 0; line-height: 1.6;">{submission.message}</p>
                </div>
            </div>
            <div class="footer">
                Reçu le {submission.created_at.strftime('%d/%m/%Y à %H:%M')} UTC<br>
                THE BRIDGE - UNYCEO France
            </div>
        </div>
    </body>
    </html>
    """
    
    params = {
        "from": SENDER_EMAIL,
        "to": [recipient],
        "subject": f"📩 Nouvelle demande de {submission.name} - THE BRIDGE",
        "html": html_content
    }
    
    try:
        email = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Email notification sent successfully: {email.get('id')}")
        return email
    except Exception as e:
        logger.error(f"Failed to send email notification: {str(e)}")
        return None


# Routes
@api_router.get("/")
async def root():
    return {"message": "THE BRIDGE API - Connecting People Through Travel"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


@api_router.get("/catalogue", response_model=List[CatalogueItem])
async def get_catalogue():
    """Get the fair price catalogue"""
    return CATALOGUE


@api_router.get("/experiences", response_model=List[Experience])
async def get_experiences():
    """Get all main experiences (Combat, Language, Visual Storytelling)"""
    return EXPERIENCES


@api_router.get("/experiences/{experience_id}")
async def get_experience(experience_id: str):
    """Get a specific experience by ID"""
    for exp in EXPERIENCES:
        if exp["id"] == experience_id:
            return exp
    raise HTTPException(status_code=404, detail="Experience not found")


@api_router.get("/packages", response_model=List[Package])
async def get_packages():
    """Get all travel packages"""
    return PACKAGES


@api_router.get("/packages/{package_id}", response_model=Package)
async def get_package(package_id: str):
    """Get a specific package by ID"""
    for pkg in PACKAGES:
        if pkg["id"] == package_id:
            return pkg
    raise HTTPException(status_code=404, detail="Package not found")


@api_router.get("/activities", response_model=List[Activity])
async def get_activities():
    """Get all optional activities"""
    return ACTIVITIES


@api_router.get("/activities/{activity_id}", response_model=Activity)
async def get_activity(activity_id: str):
    """Get a specific activity by ID"""
    for act in ACTIVITIES:
        if act["id"] == activity_id:
            return act
    raise HTTPException(status_code=404, detail="Activity not found")


@api_router.get("/trips", response_model=List[Trip])
async def get_trips():
    """Get all upcoming trips"""
    return TRIPS


@api_router.get("/trips/{trip_id}", response_model=Trip)
async def get_trip(trip_id: str):
    """Get a specific trip by ID"""
    for trip in TRIPS:
        if trip["id"] == trip_id:
            return trip
    raise HTTPException(status_code=404, detail="Trip not found")


# ============================================
# STRIPE PAYMENT ENDPOINTS
# ============================================

@api_router.post("/bookings/checkout", response_model=CheckoutResponse)
async def create_booking_checkout(booking_data: BookingCreate, request: Request):
    """
    Create a booking and initiate Stripe checkout for 30% deposit.
    """
    if not STRIPE_AVAILABLE:
        raise HTTPException(status_code=503, detail="Payment service unavailable")
    
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Stripe not configured")
    
    # Get experience price from server-side definition (SECURITY: never trust frontend)
    experience_id = booking_data.experience_id
    if experience_id not in EXPERIENCE_PRICES:
        raise HTTPException(status_code=400, detail=f"Invalid experience: {experience_id}")
    
    base_price = EXPERIENCE_PRICES[experience_id]
    total_price = base_price * booking_data.participants
    deposit_amount = round(total_price * 0.30, 2)  # 30% deposit
    
    # Create booking record
    booking = Booking(
        experience_id=experience_id,
        name=booking_data.name,
        email=booking_data.email,
        phone=booking_data.phone,
        dates=booking_data.dates,
        city=booking_data.city,
        participants=booking_data.participants,
        room_type=booking_data.room_type,
        message=booking_data.message,
        total_price=total_price,
        deposit_amount=deposit_amount,
        currency="eur",
        payment_status="pending"
    )
    
    # Store booking in database
    booking_doc = booking.model_dump()
    booking_doc['created_at'] = booking_doc['created_at'].isoformat()
    booking_doc['updated_at'] = booking_doc['updated_at'].isoformat()
    await db.bookings.insert_one(booking_doc)
    logger.info(f"Booking created: {booking.id}")
    
    # Build success/cancel URLs from frontend origin
    origin_url = booking_data.origin_url.rstrip('/')
    success_url = f"{origin_url}/book/success?session_id={{CHECKOUT_SESSION_ID}}&booking_id={booking.id}"
    cancel_url = f"{origin_url}/book?cancelled=true"
    
    # Initialize Stripe checkout
    host_url = str(request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    # Create checkout session
    checkout_request = CheckoutSessionRequest(
        amount=deposit_amount,
        currency="eur",
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={
            "booking_id": booking.id,
            "experience_id": experience_id,
            "customer_email": booking_data.email,
            "customer_name": booking_data.name,
            "deposit_percentage": "30"
        }
    )
    
    try:
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
    except Exception as e:
        logger.error(f"Stripe checkout creation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to create payment session")
    
    # Update booking with checkout session ID
    await db.bookings.update_one(
        {"id": booking.id},
        {"$set": {
            "checkout_session_id": session.session_id,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    # Create payment transaction record
    payment_transaction = PaymentTransaction(
        booking_id=booking.id,
        session_id=session.session_id,
        amount=deposit_amount,
        currency="eur",
        payment_status="initiated",
        metadata={
            "experience_id": experience_id,
            "customer_email": booking_data.email
        }
    )
    
    tx_doc = payment_transaction.model_dump()
    tx_doc['created_at'] = tx_doc['created_at'].isoformat()
    tx_doc['updated_at'] = tx_doc['updated_at'].isoformat()
    await db.payment_transactions.insert_one(tx_doc)
    logger.info(f"Payment transaction created: {payment_transaction.id}")
    
    return CheckoutResponse(
        checkout_url=session.url,
        session_id=session.session_id,
        booking_id=booking.id,
        deposit_amount=deposit_amount,
        total_price=total_price,
        currency="eur"
    )


@api_router.get("/bookings/payment-status/{session_id}")
async def get_payment_status(session_id: str, request: Request):
    """
    Check the payment status of a checkout session.
    """
    if not STRIPE_AVAILABLE:
        raise HTTPException(status_code=503, detail="Payment service unavailable")
    
    if not STRIPE_API_KEY:
        raise HTTPException(status_code=503, detail="Stripe not configured")
    
    # Find the payment transaction
    transaction = await db.payment_transactions.find_one(
        {"session_id": session_id},
        {"_id": 0}
    )
    
    if not transaction:
        raise HTTPException(status_code=404, detail="Payment session not found")
    
    # Initialize Stripe checkout
    host_url = str(request.base_url).rstrip('/')
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
    
    try:
        checkout_status: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
    except Exception as e:
        logger.error(f"Failed to get checkout status: {e}")
        raise HTTPException(status_code=500, detail="Failed to check payment status")
    
    # Map Stripe payment status
    new_status = "pending"
    if checkout_status.payment_status == "paid":
        new_status = "paid"
    elif checkout_status.status == "expired":
        new_status = "expired"
    elif checkout_status.status == "complete" and checkout_status.payment_status == "paid":
        new_status = "paid"
    
    # Update transaction and booking if status changed
    if transaction.get('payment_status') != new_status:
        now = datetime.now(timezone.utc).isoformat()
        
        # Update payment transaction
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {
                "payment_status": new_status,
                "updated_at": now
            }}
        )
        
        # Update booking payment status
        await db.bookings.update_one(
            {"id": transaction['booking_id']},
            {"$set": {
                "payment_status": new_status,
                "updated_at": now
            }}
        )
        
        logger.info(f"Payment status updated: {session_id} -> {new_status}")
        
        # Send confirmation email if paid
        if new_status == "paid":
            booking = await db.bookings.find_one(
                {"id": transaction['booking_id']},
                {"_id": 0}
            )
            if booking:
                asyncio.create_task(send_booking_confirmation_email(booking))
    
    return {
        "session_id": session_id,
        "booking_id": transaction['booking_id'],
        "payment_status": new_status,
        "amount": checkout_status.amount_total / 100,  # Convert from cents
        "currency": checkout_status.currency,
        "stripe_status": checkout_status.status
    }


@api_router.get("/bookings/{booking_id}")
async def get_booking(booking_id: str):
    """Get booking details by ID"""
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    if not STRIPE_AVAILABLE:
        raise HTTPException(status_code=503, detail="Payment service unavailable")
    
    try:
        body = await request.body()
        signature = request.headers.get("Stripe-Signature")
        
        host_url = str(request.base_url).rstrip('/')
        webhook_url = f"{host_url}/api/webhook/stripe"
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY, webhook_url=webhook_url)
        
        webhook_response = await stripe_checkout.handle_webhook(body, signature)
        
        logger.info(f"Webhook received: {webhook_response.event_type} - {webhook_response.session_id}")
        
        # Update payment status based on webhook
        if webhook_response.payment_status == "paid":
            now = datetime.now(timezone.utc).isoformat()
            
            await db.payment_transactions.update_one(
                {"session_id": webhook_response.session_id},
                {"$set": {
                    "payment_status": "paid",
                    "updated_at": now
                }}
            )
            
            # Get booking_id from metadata
            booking_id = webhook_response.metadata.get("booking_id")
            if booking_id:
                await db.bookings.update_one(
                    {"id": booking_id},
                    {"$set": {
                        "payment_status": "paid",
                        "updated_at": now
                    }}
                )
                
                # Send confirmation email
                booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
                if booking:
                    asyncio.create_task(send_booking_confirmation_email(booking))
        
        return {"status": "ok"}
    
    except Exception as e:
        logger.error(f"Webhook processing error: {e}")
        raise HTTPException(status_code=400, detail="Webhook processing failed")


async def send_booking_confirmation_email(booking: dict):
    """Send booking confirmation email after successful payment"""
    if not RESEND_AVAILABLE or not RESEND_API_KEY:
        logger.warning("Email service not available")
        return
    
    try:
        # Email to customer
        customer_email_content = f"""
        <h2>Booking Confirmation - The Bridge</h2>
        <p>Dear {booking['name']},</p>
        <p>Thank you for your deposit! Your booking has been confirmed.</p>
        
        <h3>Booking Details:</h3>
        <ul>
            <li><strong>Experience:</strong> {booking['experience_id'].replace('-', ' ').title()}</li>
            <li><strong>Dates:</strong> {booking['dates']}</li>
            <li><strong>City:</strong> {booking['city']}</li>
            <li><strong>Participants:</strong> {booking['participants']}</li>
            <li><strong>Room Type:</strong> {booking['room_type']}</li>
        </ul>
        
        <h3>Payment Summary:</h3>
        <ul>
            <li><strong>Deposit Paid (30%):</strong> €{booking['deposit_amount']:.2f}</li>
            <li><strong>Total Price:</strong> €{booking['total_price']:.2f}</li>
            <li><strong>Remaining Balance:</strong> €{booking['total_price'] - booking['deposit_amount']:.2f}</li>
        </ul>
        
        <p>A member of our team will contact you soon with next steps.</p>
        
        <p>Best regards,<br>The Bridge Team</p>
        """
        
        resend.Emails.send({
            "from": SENDER_EMAIL,
            "to": [booking['email']],
            "subject": "Booking Confirmed - The Bridge Experience",
            "html": customer_email_content
        })
        
        # Email to admin
        if NOTIFICATION_EMAIL:
            admin_email_content = f"""
            <h2>New Booking Received!</h2>
            <p><strong>Customer:</strong> {booking['name']} ({booking['email']})</p>
            <p><strong>Phone:</strong> {booking['phone']}</p>
            <p><strong>Experience:</strong> {booking['experience_id']}</p>
            <p><strong>Dates:</strong> {booking['dates']}</p>
            <p><strong>City:</strong> {booking['city']}</p>
            <p><strong>Participants:</strong> {booking['participants']}</p>
            <p><strong>Deposit Paid:</strong> €{booking['deposit_amount']:.2f}</p>
            <p><strong>Total Price:</strong> €{booking['total_price']:.2f}</p>
            <p><strong>Message:</strong> {booking.get('message', 'N/A')}</p>
            """
            
            resend.Emails.send({
                "from": SENDER_EMAIL,
                "to": [NOTIFICATION_EMAIL],
                "subject": f"New Booking: {booking['name']} - {booking['experience_id']}",
                "html": admin_email_content
            })
        
        logger.info(f"Confirmation emails sent for booking: {booking['id']}")
    
    except Exception as e:
        logger.error(f"Failed to send confirmation email: {e}")


@api_router.get("/experience-prices")
async def get_experience_prices():
    """Get experience prices for frontend display"""
    return {
        exp_id: {
            "price": price,
            "deposit": round(price * 0.30, 2),
            "currency": "eur"
        }
        for exp_id, price in EXPERIENCE_PRICES.items()
    }


# ============================================
# CONTACT ENDPOINTS
# ============================================

@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(input: ContactSubmissionCreate):
    """Submit a contact form / booking inquiry"""
    submission_dict = input.model_dump()
    submission_obj = ContactSubmission(**submission_dict)
    
    # Store in database
    doc = submission_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    _ = await db.contact_submissions.insert_one(doc)
    logger.info(f"Contact submission stored: {submission_obj.id}")
    
    # Send email notification (non-blocking)
    asyncio.create_task(send_notification_email(submission_obj))
    
    return submission_obj


@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions():
    """Get all contact submissions (admin)"""
    submissions = await db.contact_submissions.find({}, {"_id": 0}).to_list(1000)
    
    for sub in submissions:
        if isinstance(sub['created_at'], str):
            sub['created_at'] = datetime.fromisoformat(sub['created_at'])
    
    return submissions


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
