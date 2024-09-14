from enum import Enum

# from typing import List

# from pydantic import BaseModel


# class Message(BaseModel):
#     role: str
#     content: str


# class Choice(BaseModel):
#     index: int
#     message: Message
#     finish_reason: str


# class Usage(BaseModel):
#     prompt_tokens: int
#     completion_tokens: int
#     total_tokens: int


# class ChatCompletion(BaseModel):
#     id: str
#     object: str
#     created: int
#     model: str
#     usage: Usage
#     choices: List[Choice]


# This should match 'INTENT_DETECTOR' prompt in prompts.py
class Intent(Enum):
    EMERGENCY = "EMERGENCY"
    CONVERSATION = "CONVERSATION"
    THERAPIST_REQUEST = "THERAPIST_REQUEST"


# class DetectedIntent(BaseModel):
#     intent: Intent
