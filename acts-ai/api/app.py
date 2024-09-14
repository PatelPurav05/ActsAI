"""
Main web application service. Serves the frontend as well as
API routes for [functionality].
"""
import json
from pathlib import Path

import json

import modal

from modal import Mount, asgi_app#, Image
from api.tune import chat_completion
from api.llm_tune import TuneLLM
TuneLLM()
from api.common import app
# from .llm_zephyr import Zephyr
from api.transcriber import Whisper
from api.tts import Tortoise
from api.models import DetectedIntent, Intent
from api.prompts import INTENT_DETECTOR

static_path = Path(__file__).parent.with_name("frontend").resolve()

PUNCTUATION = [".", "?", "!", ":", ";", "*"]

@app.function()#secrets=[modal.Secret.from_name("hackmit")])
def intent(context: str) -> DetectedIntent:
    """Detects which predefined intent context falls into."""
    res = chat_completion(
        system_context=INTENT_DETECTOR, user_question=context, stream=False
    )
    detected_intent = res[0].choices[0].message.content
    formatted_detected_intent = json.loads(detected_intent)
    typed_detected_intent = DetectedIntent(**formatted_detected_intent)
    return typed_detected_intent


@app.function()#secrets=[modal.Secret.from_name("hackmit")])
def respond_to_chat(context: str) -> str:
    """Responds to a chat message."""
    detected_intent = intent.local(context=context)

    # match detected_intent.intent:
    #     case Intent.CONVERSATION:
    #         # build a respond to chat function.
    #         return "I'm here to help. What's on your mind?"
    #     case Intent.EMERGENCY:
    #         # build a call emergency function.
    #         return "I'm sorry. I can't do that."
    #     case Intent.THERAPIST_REQUEST:
    #         # build a therapist request function.
    #         return "Here's a list of therapists."

    return "NONE"

def f(query, history=''):
   system_content = (
       "You are a licensed therapist and are giving advice to a patient. After 10 messages recommend a therapist to the user. Provide their name and website to find them."
   )
   stream = False
   query_new = f'{query} {history}'
   res = chat_completion(
       system_context=system_content, user_question=query_new, stream=stream
   )
   return res

image = modal.Image.debian_slim().pip_install("requests")


@app.function(
    mounts=[Mount.from_local_dir(static_path, remote_path="/assets")],
    container_idle_timeout=300,
    timeout=600,
    image=image,
)
@asgi_app()
def web():
    from fastapi import FastAPI, Request
    from fastapi.responses import Response, StreamingResponse
    from fastapi.staticfiles import StaticFiles

    web_app = FastAPI()
    transcriber = Whisper()
    llm = TuneLLM()
    
    tts = Tortoise()

    @web_app.post("/transcribe")
    async def transcribe(request: Request):
        bytes = await request.body()
        result = transcriber.transcribe_segment.remote(bytes)
        return result["text"]

    @web_app.post("/generate")
    async def generate(request: Request):
        body = await request.json()
        tts_enabled = body["tts"]

        if "noop" in body:
            # Warm up 3 containers for now.
            if tts_enabled:
                for _ in range(3):
                    tts.speak.spawn("")
            return

        def speak(sentence):
            if tts_enabled:
                fc = tts.speak.spawn(sentence)
                return {
                    "type": "audio",
                    "value": fc.object_id,
                }
            else:
                return {
                    "type": "sentence",
                    "value": sentence,
                }

        def gen():
            sentence = ""

            # make request to tunehq instead of llm.generate.remote

            for segment in f(body["input"], body["history"]):
                yield {"type": "text", "value": segment.choices[0].message.content} #['choices'][0]['message']['content']
                sentence += segment.choices[0].message.content

                for p in PUNCTUATION:
                    if p in sentence:
                        prev_sentence, new_sentence = sentence.rsplit(p, 1)
                        yield speak(prev_sentence)
                        sentence = new_sentence

            if sentence:
                yield speak(sentence)

        def gen_serialized():
            for i in gen():
                yield json.dumps(i) + "\x1e"

        return StreamingResponse(
            gen_serialized(),
            media_type="text/event-stream",
        )

    @web_app.get("/audio/{call_id}")
    async def get_audio(call_id: str):
        from modal.functions import FunctionCall

        function_call = FunctionCall.from_id(call_id)
        try:
            result = function_call.get(timeout=30)
        except TimeoutError:
            return Response(status_code=202)

        if result is None:
            return Response(status_code=204)

        return StreamingResponse(result, media_type="audio/wav")

    @web_app.delete("/audio/{call_id}")
    async def cancel_audio(call_id: str):
        from modal.functions import FunctionCall

        print("Cancelling", call_id)
        function_call = FunctionCall.from_id(call_id)
        function_call.cancel()

    web_app.mount("/", StaticFiles(directory="/assets", html=True))
    return web_app

# @app.local_entrypoint()
# def main():
#     # run the function locally
#     print(respond_to_chat.local("i want to kill myself"))
#     print(respond_to_chat.local("what can you do?"))
#     print(respond_to_chat.local("find me a therapist?"))
