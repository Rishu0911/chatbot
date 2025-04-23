
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.document_loaders import TextLoader
from langchain.chains import RetrievalQA
import os

from langchain_community.llms.llamacpp import LlamaCpp

# Load a pretrained Open Source LLM (Llama3, Mistral, Falcon)
llm = LlamaCpp(model_path="path/to/llama3-or-mistral.ggml", n_ctx=4096)

# Download & preprocess medical data (example: PubMed abstracts)
medical_data_path = "medical_data.txt"
if not os.path.exists(medical_data_path):
    os.system("wget -O medical_data.txt https://raw.githubusercontent.com/openmedlab/Awesome-Medical-Dataset/main/pubmed.txt")

# Load medical text files into memory
loader = TextLoader("medical_data.txt")
docs = loader.load()

# Convert text to embeddings (vector representations)
embedding_function = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Store embeddings in FAISS for efficient retrieval
vectorstore = FAISS.from_documents(docs, embedding_function)

# Create a RAG-based chatbot using RetrievalQA
rag_chain = RetrievalQA(llm=llm, retriever=vectorstore.as_retriever())

# Start chatbot loop
print("Healthcare Chatbot (Type 'exit' to quit)")
while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        print("Goodbye!")
        break
    response = rag_chain.run(user_input)
    print("Chatbot:", response)