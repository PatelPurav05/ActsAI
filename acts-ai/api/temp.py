import requests

url = "https://devanshusp--example-hello-world-respond-to-chat.modal.run"
params = {"context": "hi"}
response = requests.get(url, params=params, timeout=200)
print(response.text)
print(response.status_code)
