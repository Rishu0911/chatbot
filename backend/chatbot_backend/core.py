from langchain_community.vectorstores import FAISS
from google import genai
from google.genai import types
from langchain_core.prompts import PromptTemplate
from langchain_huggingface import HuggingFaceEmbeddings


API_KEY       = ""
DB_FAISS_PATH = "vectorstore/db_faiss"
MODEL         = "gemini-2.5-flash"


CUSTOM_PROMPT_TEMPLATE = """
Use the pieces of information provided in the context to answer user's question.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Don't provide anything out of the given context.

Context: {context}
Question: {question}

Start the answer directly. No small talk, please.
"""

def query_api_llm(prompt):
    print(prompt)
    client = genai.Client(api_key=API_KEY)
    print("Checking background environment variables:")
    print("GOOGLE_API_KEY:", os.environ.get("GOOGLE_API_KEY"))

    response = client.models.generate_content(
        model=MODEL,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.7,
            max_output_tokens=800,
        )
    )
    print(response.text)
    return response.text


def set_custom_prompt(custom_prompt_template):
    prompt = PromptTemplate(template=custom_prompt_template, input_variables=["context", "question"])
    return prompt

def query_qa_chain(context, question):
    prompt = set_custom_prompt(CUSTOM_PROMPT_TEMPLATE).format(context=context, question=question)
    return query_api_llm(prompt)

def process_query(user_query):
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    db              = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
    retriever       = db.as_retriever(search_kwargs={'k': 3})
    context         = retriever.invoke(user_query)
    context_text    = "\n".join([doc.page_content for doc in context])
    response        = query_qa_chain(context_text, user_query)
    return response


