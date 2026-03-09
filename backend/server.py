from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

# Initialize Resend if available
try:
    import resend
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False

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


class Experience(BaseModel):
    id: str
    title: str
    location: str
    description: str
    price: str
    duration: str
    image: str
    highlights: List[str]


class Trip(BaseModel):
    id: str
    title: str
    location: str
    start_date: str
    end_date: str
    spots_left: int
    total_spots: int
    price: str
    image: str


class Testimonial(BaseModel):
    id: str
    name: str
    country: str
    quote: str
    trip: str
    avatar: str


# Static data for travel packages
PACKAGES = [
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
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #E76F51;">New Contact Submission - THE BRIDGE</h2>
        <div style="background: #F4F1DE; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> {submission.name}</p>
            <p><strong>Email:</strong> {submission.email}</p>
            <p><strong>Trip Interest:</strong> {submission.trip_interest or 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px;">{submission.message}</p>
            <p style="color: #666; font-size: 12px;">Submitted at: {submission.created_at.isoformat()}</p>
        </div>
    </div>
    """
    
    params = {
        "from": SENDER_EMAIL,
        "to": [recipient],
        "subject": f"New Inquiry from {submission.name} - THE BRIDGE",
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


@api_router.get("/experiences", response_model=List[Experience])
async def get_experiences():
    """Get all travel experiences"""
    return EXPERIENCES


@api_router.get("/experiences/{experience_id}", response_model=Experience)
async def get_experience(experience_id: str):
    """Get a specific experience by ID"""
    for exp in EXPERIENCES:
        if exp["id"] == experience_id:
            return exp
    raise HTTPException(status_code=404, detail="Experience not found")


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


@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get all testimonials"""
    return TESTIMONIALS


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
