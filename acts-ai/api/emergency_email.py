import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

def send_emergency_email():
    sender_email = "shreyanakum2@gmail.com"
    receiver_email = "tin50142016@gmail.com"
    password = os.getenv("GMAIL_APP_PASS")
    subject = "Emergency Alert"
    body = "There is a person experiencing a mental health emergency."

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender_email, password)
        server.send_message(message)
        print("Email sent successfully")