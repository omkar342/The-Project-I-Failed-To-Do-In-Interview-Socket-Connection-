import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [inputMessage, setInputMessage] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("Connected to the server from frontend");
    });

    socket.on("message", (data) => {
      setMessages(data);
      // alert(`Message is ${data}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const socket = io("http://localhost:3000");
    socket.emit("message", inputMessage);
    setInputMessage("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <form
          action=""
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <label htmlFor="">Input your message</label>
          <input
            value={inputMessage}
            type="text"
            onChange={(event) => setInputMessage(event.target.value)}
          />
          <button>Send</button>
        </form>
        <h1>{messages}</h1>
      </header>
    </div>
  );
}

export default App;
