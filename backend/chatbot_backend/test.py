# from ollama import chat
#
#
# while True:
#     question = input("Ask your question?")
#     messages = [{"role":"user", "content":question}]
#     response = chat(model="phi3:mini", messages=messages)
#     print(response)

import requests
import json


OPENROUTER_API_KEY = "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"
response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    },
    data=json.dumps({
        "model": "mistralai/mistral-7b-instruct",
        "messages": [
            {
                "role": "user",
                "content": "What is the meaning of life?"
            }
        ],

    })
)
if response.status_code == 200:
    result = response.json()
    message = result['choices'][0]['message']['content']
    print("Response from model:")
    print(message)
else:
    print("Error:", response.status_code)
    print(response.text)

