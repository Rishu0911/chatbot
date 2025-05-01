import { useEffect, useState } from "react";
import httpHandler from "./http/HttpHandler";
import ChatWindow from "./ChatWindow/ChatWindow"
import InputArea from "./InputArea/InputArea"
import { useNavigate } from "react-router-dom";
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


  function Home() {
    const [chatHistory, setChatHistory] = useState([]);
    const navigate = useNavigate()
   

    useEffect(() => {
       getChats()
    }, []); 
  
  const addMessage = (message) => {
    setChatHistory((prevHistory) => [...prevHistory, message]); // Update chat history
    if (message.sender === "User") {
      hitAPI(message.message); 
    }
  };

  const hitAPI = async (userMessage) => {
    try {
        const response = await httpHandler.post("/agent/process", { text: userMessage });
        setChatHistory((prevHistory) => [...prevHistory, { sender: "Bot", message: response.data.received_text }]);
    } catch (error) {
      console.error("Error sending message to API:", error);
      setChatHistory((prevHistory) => [...prevHistory, { sender: "Bot", message: "An error occurred while communicating with the server." }]);
    }
  };
  const handleLogout = () => {
    // Clear user session or tokens here (e.g., localStorage or cookies)
    localStorage.removeItem("token");
    alert("You have been logged out!");
  
    // Redirect to the login page
    navigate("/auth")
  };
   
  const getChats = async () => {
    console.log("Get chats inside")
    try {
        const response = await httpHandler.get("/agent/chats");
        console.log(response.data)
        response.data.forEach(element => {
            console.log(element.query)
            setChatHistory((prevHistory) => [...prevHistory, { sender: "User", message: element.query}]);
            console.log(element.response)
            setChatHistory((prevHistory) => [...prevHistory, { sender: "Bot", message: element.response }]);
        });
    } catch (error) {
      console.error("Error sending message to API:", error);
    }
  };
  

    return (
      <div className="chat-wrapper">
        {/* <h1 className="text-center">Bot</h1>
        <div className="text-end">
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button> */}
    {/* </div> */}
    <div className="top-bar">
      <div className="title">Serapi</div>
      <button className="logout-button" onClick={handleLogout} title="Logout">
        <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
        <ChatWindow chatHistory={chatHistory} />
        <InputArea addMessage={addMessage} />
      </div>
    );
  }
  
  export default Home;