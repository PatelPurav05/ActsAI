"""
Main web application service. Serves the frontend as well as
API routes for [functionality].
"""

import json

import modal
import requests
from models import Intent
from prompts import INTENT_DETECTOR
from tune import chat_completion
from api.emergency_email import send_emergency_email

image = modal.Image.debian_slim().pip_install(["requests", "python-dotenv"])
app = modal.App(
    "example-hello-world", image=image, secrets=[modal.Secret.from_name("hackmit")]
)


@app.function()
def intent(context: str) -> dict:
    """Detects which predefined intent context falls into."""
    res = chat_completion(
        system_context=INTENT_DETECTOR, user_question=context, stream=False
    )
    detected_intent = res[0].get("choices")[0].get("message").get("content")
    formatted_detected_intent = json.loads(detected_intent)
    return formatted_detected_intent


@app.function()
@modal.web_endpoint()
def respond_to_chat(context: str) -> str:
    """Responds to a chat message."""
    detected_intent = intent.remote(context=context)
    match detected_intent.get("intent"):
        case Intent.CONVERSATION.value:
            # build a respond to chat function.
            return "I'm here to help. What's on your mind?"
        case Intent.EMERGENCY.value:
            send_emergency_email()
            return "You may be experiencing a mental health emergency. Please call 988."
        case Intent.THERAPIST_REQUEST.value:
            # build a therapist request function.
            return "Here's a list of therapists."

    return "NONE"


@app.local_entrypoint()
def main():
    # run the function locally
    # print(respond_to_chat.local("i want to kill myself"))
    # print(respond_to_chat.local("what can you do?"))
    # print(respond_to_chat.local("find me a therapist?"))

    # run the function remotely on Modal
    # print(respond_to_chat("whats the weather like today?"))

    # Define the URL
    url = "https://devanshusp--example-hello-world-respond-to-chat.modal.run"
    params = {"context": "hi"}
    response = requests.get(url, params=params, timeout=10)
    print(response)
    print(response.text)
    print(response.status_code)
