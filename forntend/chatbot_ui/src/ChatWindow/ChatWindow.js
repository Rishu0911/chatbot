import React from "react";

function ChatWindow({ chatHistory }) {
  return (
    <div className="chat-window border rounded p-3 mb-3">
      {chatHistory.map((chat, index) => (
        <div key={index} className="chat-message">
          <strong>{chat.sender}:</strong> {chat.message}
        </div>
      ))}
    </div>
  );
}

export default ChatWindow;
