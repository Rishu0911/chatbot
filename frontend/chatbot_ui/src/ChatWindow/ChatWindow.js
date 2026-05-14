import React from "react";
import'./chat_window.css'

function ChatWindow({ chatHistory }) {
  return (
    <div className="chat-window">
    {chatHistory.map((chat, index) => (
      <div
        key={index}
        className={`chat-message ${chat.sender === 'User' ? 'user-message' : 'bot-message'}`}
      >
        {chat.message}
      </div>
    ))}
  </div>
  );
}

export default ChatWindow;
