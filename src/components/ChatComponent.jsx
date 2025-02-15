import { useState, useRef, useEffect } from "react";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState("User 1");

  const messagesEndRef = useRef(null);

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      text: input,
      sender: currentUser,
    };

    setMessages([...messages, newMessage]);
    setInput(""); // Clear input
  };

  return (
    <div className="fixed bottom-5 right-5 md:right-10 w-full md:w-96 max-w-md bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
        <span>Chat</span>
        <button
          onClick={() =>
            setCurrentUser(currentUser === "User 1" ? "User 2" : "User 1")
          }
          className="bg-white text-blue-600 px-2 py-1 rounded text-sm"
        >
          Switch: {currentUser}
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-64 md:h-80 p-3 overflow-y-auto flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg text-sm max-w-[80%] ${
              msg.sender === "User 1"
                ? "bg-blue-500 text-white self-start"
                : "bg-gray-300 text-black self-end"
            }`}
          >
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="p-3 flex gap-2 border-t bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
