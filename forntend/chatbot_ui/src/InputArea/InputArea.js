import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


function InputArea({ addMessage }) {
  const [inputText, setInputText] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setInputText(transcript);
  }, [transcript]);

  const handleSend = () => {
    if (inputText.trim()) {
      addMessage({ sender: "User", message: inputText }); // Add user message to chat history
      setInputText(""); // Clear input area
      resetTranscript(); // Reset speech transcript
    }
  };

  const handleSpeechInput = () => {
    SpeechRecognition.startListening();
  };

  return (
    <div>
      <textarea
        className="form-control mb-2"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
      ></textarea>
      <button className="btn btn-primary me-2" onClick={handleSpeechInput}>
        🎤 Speech Input
      </button>
      <button className="btn btn-success" onClick={handleSend}>
        ➡️ Send
      </button>
    </div>
  );
}

export default InputArea;
