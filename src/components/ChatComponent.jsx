import React, { useState, useRef, useEffect } from "react";
import Furbot_Logo from "../assets/Furbot_Logo.png";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("https://cvo-furbot.vercel.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      if (data.response) {
        const botMessage = { text: data.response, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  const handleChatOpen = () => {
    if (!isOpen) {
      setIsOpen(true);

      if (!greeted) {
        setGreeted(true); // Prevent multiple greetings
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              text: "Hi, I'm Furbot, the Mandaue City Veterinary Office info bot. How may I help you today?",
              sender: "bot",
            },
          ]);
        }, 1000);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={handleChatOpen}
        className="fixed bottom-24 right-6  duration-1000 animate-pulse bg-[#050419] text-white p-4 rounded-full shadow-lg hover:bg-[#050419] transition"
      >
        💬
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 md:right-10 w-[90%] max-w-[320px] bg-white shadow-lg rounded-lg flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-[#050419] text-white p-3 flex justify-between items-center">
            {/* Bot Image */}
            <div className="flex items-center gap-2">
              <img
                src={Furbot_Logo}
                alt="Furbot Logo"
                className="w-8 h-8 rounded-full"
              />
              <span>CVO Info Bot (Furbot)</span>
            </div>

            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} className="text-xl">
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 md:h-80 p-3 overflow-y-auto flex flex-col">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg text-sm max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-[#050419] text-white self-start"
                    : "bg-gray-300 text-black self-end"
                }`}
              >
                {msg.text}
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
              className="bg-[#050419] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatComponent;
