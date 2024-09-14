"""
Main web application service. Serves the frontend as well as
API routes for [functionality].
"""

import json

import modal
from models import DetectedIntent, Intent
from prompts import INTENT_DETECTOR
from tune import chat_completion

app = modal.App("example-hello-world")


@app.function(secrets=[modal.Secret.from_name("hackmit")])
def intent(context: str) -> DetectedIntent:
    """Detects which predefined intent context falls into."""
    res = chat_completion(
        system_context=INTENT_DETECTOR, user_question=context, stream=False
    )
    detected_intent = res[0].choices[0].message.content
    formatted_detected_intent = json.loads(detected_intent)
    typed_detected_intent = DetectedIntent(**formatted_detected_intent)
    return typed_detected_intent


@app.function(secrets=[modal.Secret.from_name("hackmit")])
def respond_to_chat(context: str) -> str:
    """Responds to a chat message."""
    detected_intent = intent.local(context=context)

    match detected_intent.intent:
        case Intent.CONVERSATION:
            # build a respond to chat function.
            return "I'm here to help. What's on your mind?"
        case Intent.EMERGENCY:
            # build a call emergency function.
            return "I'm sorry. I can't do that."
        case Intent.THERAPIST_REQUEST:
            # build a therapist request function.
            return "Here's a list of therapists."

    return "NONE"


@app.local_entrypoint()
def main():
    # run the function locally
    print(respond_to_chat.local("i want to kill myself"))
    print(respond_to_chat.local("what can you do?"))
    print(respond_to_chat.local("find me a therapist?"))

    # run the function remotely on Modal
    print(respond_to_chat.remote("whats the weather like today?"))
