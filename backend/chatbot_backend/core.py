import requests
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
import json


# Step 1: Setup Local LLM (Ollama Phi)
def query_local_ollama(prompt):
    # Adjust this URL to match your local Ollama server setup
    print(prompt)
    url = "http://localhost:11434/api/generate"
    headers = {"Content-Type": "application/json"}
    payload = { 'model': 'phi',
        'prompt': prompt,
        'stream': False}
    response = requests.post(url, json=payload, headers=headers)
    print(response)
    return response.json().get("response", "")

def query_inbuilt_ollama(prompt):
    return ""

def query_api_llm(prompt):
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
                    "content": prompt
                }
            ],

        })
    )
    result = ""
    if response.status_code == 200:
        result = response.json()
        message = result['choices'][0]['message']['content']
        print("Response from model:")
        print(message)
        result = message
    else:
        print("Error:", response.status_code)
        print(response.text)
        result = response.text

    return result

# Step 2: Connect LLM with FAISS and Create Chain
CUSTOM_PROMPT_TEMPLATE = """
Use the pieces of information provided in the context to answer user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Don't provide anything out of the given context.

Context: {context}
Question: {question}

Start the answer directly. No small talk, please.
"""

def set_custom_prompt(custom_prompt_template):
    prompt = PromptTemplate(template=custom_prompt_template, input_variables=["context", "question"])
    return prompt

# Load Database
DB_FAISS_PATH = "vectorstore/db_faiss"
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)

# Create QA chain
def query_qa_chain(context, question):
    prompt = set_custom_prompt(CUSTOM_PROMPT_TEMPLATE).format(context=context, question=question)
    print(prompt)
    return query_api_llm(prompt)

def process_query(user_query):
    retriever = db.as_retriever(search_kwargs={'k': 3})
    context = retriever.invoke(user_query)
    context_text = "\n".join([doc.page_content for doc in context])
    print(context_text)
    response = query_qa_chain(context_text, user_query)
    print(response)
    return response


