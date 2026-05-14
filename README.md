# Project Setup Guide

## Overview

This project consists of a Backend and a Frontend application.
Follow the steps below to set up and run the application locally.

---

# Backend Setup

## 1. Create a Virtual Environment

```bash
python -m venv venv
```

## 2. Activate the Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

### macOS/Linux

```bash
source venv/bin/activate
```

---

## 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Initial Setup (Run Only Once)

Run the following script to create the vector database from the PDF files:

```bash
python create_memory.py
```

---

## 5. Configure Environment

### Database Configuration

Update your database credentials in:

```text
database/database.py
```

### Gemini API Configuration

Set your Gemini API key and model details in:

```text
core.py
```

---

## 6. Start the Backend Server

```bash
uvicorn main:app
```

The backend server will be available at:

```text
http://localhost:8000
```

---

# Frontend Setup

## 1. Install Node Dependencies

```bash
npm install
```

---

## 2. Start the Frontend Server

```bash
npm start
```

---

# Application Status

Once both servers are running, the application will be fully operational.

---

# Tech Stack

- Python
- FastAPI
- Vector Database
- Gemini API
- Node.js
- React (if applicable)

---

# Notes

- Make sure Python and Node.js are installed on your system.
- Ensure all required environment variables and credentials are configured correctly before starting the servers.
- Run `create_memory.py` only during the initial setup or when rebuilding the vector database.

