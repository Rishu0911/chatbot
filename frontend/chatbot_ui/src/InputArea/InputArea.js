import React, { useState, useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './input.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


function InputArea({ addMessage }) {
  const [inputText, setInputText] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();
  const textareaRef = useRef(null);

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


  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px'; // Expand within limit
    }
  }, [inputText]);

  return (
    <div className="input_container">
      <textarea
        id="chatInput"
        ref={textareaRef}
        className="form-control mb-2 chat-textarea"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your message..."
      ></textarea>
      <div className="button-group">
        <button className="icon-button" onClick={handleSpeechInput}>
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
        <button className="icon-button send-button" onClick={handleSend}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}

export default InputArea;
