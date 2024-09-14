"""
Main web application service. Serves the frontend as well as
API routes for [functionality].
"""

import modal
from tune import chat_completion

app = modal.App("example-hello-world")


@app.function()
def f(query):
    system_content = (
        "You answer all questions with only emojis. You are a helpful assistant."
    )
    stream = False
    res = chat_completion(
        system_context=system_content, user_question=query, stream=stream
    )
    return res


@app.local_entrypoint()
def main():
    # run the function locally
    print(f.local("whats the weather like today?"))

    # run the function remotely on Modal
    print(f.remote("whats the weather like today?"))
