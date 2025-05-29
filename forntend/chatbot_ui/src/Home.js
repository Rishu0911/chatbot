import { useEffect, useState } from "react";
import httpHandler from "./http/HttpHandler";
import ChatWindow from "./ChatWindow/ChatWindow"
import InputArea from "./InputArea/InputArea"
import { useNavigate } from "react-router-dom";
import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faBroom } from '@fortawesome/free-solid-svg-icons';
import './spinner/spinner.css';


  function Home() {
    const [chatHistory, setChatHistory] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        getChats();
    }, []);

    const addMessage = (message) => {
        setChatHistory((prevHistory) => [...prevHistory, message]);
        if (message.sender === "User") {
            hitAPI(message.message);
        }
    };

    const hitAPI = async (userMessage) => {
        setLoading(true); 
        try {
            const response = await httpHandler.post("/agent/process", { text: userMessage });
            setChatHistory((prevHistory) => [...prevHistory, { sender: "Bot", message: response.data.received_text }]);
        } catch (error) {
            console.error("Error sending message to API:", error);
            setChatHistory((prevHistory) => [...prevHistory, { sender: "Bot", message: "An error occurred while communicating with the server." }]);
        } finally {
            setLoading(false); // 
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        alert("You have been logged out!");
        navigate("/auth");
    };

    const clear = async() => {
      setLoading(true); // 
        try {
            const response = await httpHandler.delete("/agent/chats");
            console.log(response)
            if(response.status == 200){
              setChatHistory([])
            }
        } catch (error) {
            console.error("Error getting chat history:", error);
        } finally {
            setLoading(false); // 
        }
  };

    const getChats = async () => {
        setLoading(true); // 
        try {
            const response = await httpHandler.get("/agent/chats");
            response.data.forEach((element) => {
                setChatHistory((prevHistory) => [...prevHistory, { sender: "User", message: element.query }]);
                setChatHistory((prevHistory) => [...prevHistory, { sender: "Bot", message: element.response }]);
            });
        } catch (error) {
            console.error("Error getting chat history:", error);
        } finally {
            setLoading(false); // 
        }
    };

    return (
      <>
      {/* Spinner overlay */}
      {loading && (
        <div className="spinner-overlay">
          <div className="loader"></div>
        </div>
      )}
  
      {/* Main Chat UI */}
      <div className="chat-wrapper">
        <div className="top-bar">
          <div className="title">Serapi</div>
          <div>
          <button className="logout-button" onClick={clear} title="Logout">
          <FontAwesomeIcon icon={faBroom} />
          </button>
          <button className="logout-button" onClick={handleLogout} title="Logout">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
          </div>
        </div>
        <ChatWindow chatHistory={chatHistory} />
        <InputArea addMessage={addMessage} />
      </div>
    </>
    );
  }
  
  export default Home;