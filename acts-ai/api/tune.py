import json
import os

import requests


def chat_completion(system_context: str, user_question: str, stream: bool) -> list:
    """Send a chat completion request to the TuneStudio API"""
    headers, data = _build_tune_request_data(system_context, user_question, stream)
    res = _send_receive_req(headers, data, stream)
    return res


def _send_receive_req(headers: dict, data: dict, stream: bool):
    """Send the HTTP request to the API"""
    response_msgs = []
    try:
        url = "https://proxy.tune.app/chat/completions"
        response = requests.post(url, headers=headers, json=data)
        if stream:
            for line in response.iter_lines():
                if line:
                    msg = line[6:]
                    if msg != b"[DONE]":
                        response_msgs.append(json.loads(msg))
        else:
            response_msgs.append(response.json())
    except IOError:
        print("Error in _send_receive_req: I/O error with API occurred!")
        raise
    return response_msgs


def _build_tune_request_data(system_context: str, user_question: str, stream: bool):
    """Build a request's headers and data for the TuneStudio API"""
    api_key = os.getenv("TUNE_STUDIO_API_KEY")
    headers = {
        "Authorization": api_key,
        "Content-Type": "application/json",
    }
    data = {
        "temperature": 0.80,
        "messages": [
            {"role": "system", "content": system_context},
            {"role": "user", "content": user_question},
        ],
        "model": "rohan/Meta-Llama-3-8B-Instruct",
        "stream": stream,
        "penalty": 0,
        "max_tokens": 900,
    }
    return headers, data
