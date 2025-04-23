import React, { useState } from "react";
import ChatWindow from "./ChatWindow/ChatWindow";
import InputArea from "./InputArea/InputArea";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  const addMessage = (message) => {
    setChatHistory((prevHistory) => [...prevHistory, message]); // Update chat history
    if (message.sender === "User") {
      hitAPI(message.message); // Call API only for user messages
    }
  };

  const hitAPI = async (userMessage) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/process", { text: userMessage });
      setChatHistory((prevHistory) => [...prevHistory, { sender: "Bot", message: response.data.received_text }]);
    } catch (error) {
      console.error("Error sending message to API:", error);
      setChatHistory((prevHistory) => [...prevHistory, { sender: "Bot", message: "An error occurred while communicating with the server." }]);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Rishu Bot</h1>
      <ChatWindow chatHistory={chatHistory} />
      <InputArea addMessage={addMessage} />
    </div>
  );
}

export default App;
