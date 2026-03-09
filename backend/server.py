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


# Static data for experiences
EXPERIENCES = [
    {
        "id": "surf-taghazout",
        "title": "Surf & Beach Experience",
        "location": "Taghazout",
        "description": "Surf, sunsets and beach community. Learn to ride waves with our experienced instructors while living the ultimate beach lifestyle.",
        "price": "From £599",
        "duration": "7 days",
        "image": "https://images.unsplash.com/photo-1706007473759-981e986014d8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxNb3JvY2NvJTIwc3VyZiUyMGJlYWNoJTIwd2F2ZXMlMjBvY2VhbnxlbnwwfHx8fDE3NzMwNjIzNjZ8MA&ixlib=rb-4.1.0&q=85&w=800",
        "highlights": ["Surf lessons daily", "Beach bonfires", "Yoga sessions", "Local food tours"]
    },
    {
        "id": "sahara-adventure",
        "title": "Sahara Desert Adventure",
        "location": "Merzouga",
        "description": "Camel rides, desert camps and starry nights. Experience the magic of the Sahara with unforgettable desert camping.",
        "price": "From £699",
        "duration": "5 days",
        "image": "https://images.unsplash.com/photo-1662009833223-75d3301290bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxNb3JvY2NvJTIwZGVzZXJ0JTIwY2FtZWwlMjBzdW5zZXQlMjB0cmF2ZWx8ZW58MHx8fHwxNzczMDYyMzYzfDA&ixlib=rb-4.1.0&q=85&w=800",
        "highlights": ["Camel trekking", "Desert camping", "Stargazing", "Traditional music"]
    },
    {
        "id": "marrakech-weekend",
        "title": "Marrakech Social Weekend",
        "location": "Marrakech",
        "description": "Culture, street food, rooftops and nightlife. Discover the vibrant heart of Morocco with fellow travelers.",
        "price": "From £399",
        "duration": "4 days",
        "image": "https://images.unsplash.com/photo-1762380831396-9ada049cd507?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwxfHxNb3JvY2NvJTIwTWFycmFrZWNoJTIwbWVkaW5hJTIwY3VsdHVyZSUyMG1hcmtldHxlbnwwfHx8fDE3NzMwNjIzNzF8MA&ixlib=rb-4.1.0&q=85&w=800",
        "highlights": ["Medina tours", "Rooftop dinners", "Hammam experience", "Souk shopping"]
    },
    {
        "id": "coastal-explorer",
        "title": "Coastal Explorer",
        "location": "Essaouira & Agadir",
        "description": "Wind, waves and coastal charm. Explore Morocco's stunning Atlantic coast and its unique blend of cultures.",
        "price": "From £549",
        "duration": "6 days",
        "image": "https://images.unsplash.com/photo-1706007473923-012a8f7a1da9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxNb3JvY2NvJTIwc3VyZiUyMGJlYWNoJTIwd2F2ZXMlMjBvY2VhbnxlbnwwfHx8fDE3NzMwNjIzNjZ8MA&ixlib=rb-4.1.0&q=85&w=800",
        "highlights": ["Coastal drives", "Fresh seafood", "Water sports", "Historic medinas"]
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
        "price": "£599",
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
        "price": "£699",
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
        "price": "£399",
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
        "price": "£549",
        "image": "https://images.unsplash.com/photo-1706007473923-012a8f7a1da9?crop=entropy&cs=srgb&fm=jpg&w=400"
    }
]

# Static data for testimonials
TESTIMONIALS = [
    {
        "id": "test-1",
        "name": "Sophie Williams",
        "country": "United Kingdom",
        "quote": "Best trip of my life! I met amazing people from all over the world and the surfing was incredible. Can't wait to come back!",
        "trip": "Surf Week - Taghazout",
        "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    {
        "id": "test-2",
        "name": "James Miller",
        "country": "Australia",
        "quote": "The desert experience was magical. Sleeping under the stars in the Sahara is something I'll never forget.",
        "trip": "Sahara Desert Adventure",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    {
        "id": "test-3",
        "name": "Emma Schmidt",
        "country": "Germany",
        "quote": "I came alone but left with friends for life. THE BRIDGE creates such a welcoming community atmosphere.",
        "trip": "Marrakech Social Weekend",
        "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    },
    {
        "id": "test-4",
        "name": "Lucas Dubois",
        "country": "France",
        "quote": "Morocco was unforgettable. The culture, the food, the people - everything exceeded my expectations!",
        "trip": "Coastal Explorer",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
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
