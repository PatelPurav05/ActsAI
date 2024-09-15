
from sinch import SinchClient
from dotenv import load_dotenv
import os
import random

load_dotenv()

def send_an_sms():
    sinch_client = SinchClient(
        key_id=os.environ.get("SINCH_KEY_ID"), #"30ad667f-217f-4e18-a4b5-c1f34a705899",
        key_secret=os.environ.get("SINCH_KEY_SECRET"), #"N6SWK2w4Fs7SLVi~-IYZD5U5IU",
        project_id=os.environ.get("SINCH_PROJ_ID")#"7b70ada2-c15c-4a06-9472-c209c37f205d"
    )

    mental_health_reminders = ["Take a Break: It's okay to pause. Your mental health is just as important as your productivity", 
    "Breathe Deeply: If you're feeling overwhelmed, take a moment to breathe slowly. Inhale peace, exhale stress", 
    "You Are Enough: Don't compare your progress to others. You're on your own journey, and that's perfectly fine.", 
    "Practice Self-Compassion: Be kind to yourself. You're doing your best, and that's worth recognizing.", 
    "Stay Connected: Reach out to someone you trust when you're feeling low. Talking helps more than you think.", 
    "Move Your Body: Even a short walk or stretch can help release tension and reset your mind.", 
    "Set Boundaries: It’s okay to say no when you need to protect your energy. Prioritize your well-being.", 
    "Celebrate Small Wins: Every step forward counts. Take a moment to appreciate your progress.", 
    "Unplug When Needed: Step away from screens and social media to reconnect with yourself.", 
    "Ask for Help: You don't have to go through tough times alone. Reaching out for support is a sign of strength."]

    send_batch_response = sinch_client.sms.batches.send(
        body=random.choice(mental_health_reminders),
        to=["+14086181249"],
        from_="+12084806284",
        delivery_report="none"
    )

    print(send_batch_response)