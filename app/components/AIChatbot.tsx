"use client";
import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, Check, User } from "lucide-react";

interface Message {
  _id?: string;
  sender: "visitor" | "owner" | "ai";
  text: string;
  visitorName?: string;
  timestamp: string | Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [visitorName, setVisitorName] = useState("Guest");
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize session ID and load visitor name if logged in
  useEffect(() => {
    let sId = localStorage.getItem("muneem_chat_session_id");
    if (!sId) {
      sId = "sess_" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("muneem_chat_session_id", sId);
    }
    setSessionId(sId);

    // Sync visitor name from logged in session
    const muneemUserStr = localStorage.getItem("muneem_user");
    if (muneemUserStr) {
      try {
        const u = JSON.parse(muneemUserStr);
        if (u && u.name) {
          setVisitorName(u.name);
        }
      } catch (e) {
        console.error("Error reading user name for chat", e);
      }
    }
  }, []);

  // Poll for messages when chat is open
  useEffect(() => {
    if (!sessionId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat?sessionId=${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            // Check if there are new messages to play a subtle sound or update unread count
            if (data.length > messages.length) {
              const lastMsg = data[data.length - 1];
              if (!isOpen && (lastMsg.sender === "owner" || lastMsg.sender === "ai")) {
                setUnreadCount(prev => prev + 1);
              }
              setMessages(data);
            }
          }
        }
      } catch (err) {
        console.error("Error polling chat messages:", err);
      }
    };

    // Initial fetch
    fetchMessages();

    // Set polling interval
    const interval = setInterval(fetchMessages, 2500); // 2.5 seconds real-time poll
    return () => clearInterval(interval);
  }, [sessionId, messages.length, isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Clear unread count when chat is opened
  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !sessionId) return;

    const textToSend = inputText.trim();
    setInputText("");
    
    // Add message locally for immediate UI update
    const tempUserMsg: Message = {
      sender: "visitor",
      text: textToSend,
      visitorName,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, tempUserMsg]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          sender: "visitor",
          text: textToSend,
          visitorName
        })
      });
      if (res.ok) {
        const data = await res.json();
        // Trigger a fresh message list load to include potential immediate AI reply
        const fetchRes = await fetch(`/api/chat?sessionId=${sessionId}`);
        if (fetchRes.ok) {
          const freshData = await fetchRes.json();
          setMessages(freshData);
        }
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* FLOATING ACTION BUTTON */}
      {!isOpen && (
        <button
          onClick={handleToggleChat}
          className="relative bg-[#1251A3] hover:bg-[#0A3578] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95"
          style={{ width: "60px", height: "60px" }}
        >
          <MessageSquare size={26} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FF6B2B] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* CHAT WINDOW BOX */}
      {isOpen && (
        <div className="fixed inset-x-4 bottom-4 md:inset-auto md:bottom-6 md:right-6 w-auto md:w-[380px] h-[480px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-300 transform scale-100 opacity-100 z-50">
          {/* Header */}
          <div className="bg-[#1251A3] p-4 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-lg">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none">Muneem Store Support</h3>
                <span className="text-[10px] text-emerald-300 font-semibold flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  AI Assistant & Live Chat Online
                </span>
              </div>
            </div>
            <button
              onClick={handleToggleChat}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
            {messages.length === 0 ? (
              <div className="text-center py-12 px-6">
                <div className="w-12 h-12 bg-blue-100/60 text-[#1251A3] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bot size={22} />
                </div>
                <h4 className="font-bold text-xs text-slate-700">Namaste! Kaise sahayata karein?</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px] mx-auto">
                  Aap Chali, Balli ke rates ya hamari construction services ke baare mein kuch bhi pooch sakte hain.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isMe = msg.sender === "visitor";
                const isOwner = msg.sender === "owner";
                
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isMe ? "items-end" : "items-start"} space-y-1`}
                  >
                    {/* Sender Name/Badge */}
                    {!isMe && (
                      <span className="text-[9px] text-slate-400 font-bold uppercase ml-1 flex items-center gap-1">
                        {isOwner ? (
                          <>
                            <span className="bg-[#FF6B2B]/10 text-[#FF6B2B] px-1 rounded-sm text-[8px]">Owner</span>
                            Faizal (Muneem)
                          </>
                        ) : (
                          <>
                            <span className="bg-slate-200 text-slate-500 px-1 rounded-sm text-[8px]">AI</span>
                            Muneem Helper
                          </>
                        )}
                      </span>
                    )}
                    
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-xs whitespace-pre-line shadow-sm leading-relaxed ${
                        isMe
                          ? "bg-[#1251A3] text-white rounded-tr-none"
                          : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#1251A3] focus:bg-white text-[#0D1B2A] transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-[#1251A3] hover:bg-[#0A3578] disabled:opacity-40 text-white p-2.5 rounded-xl transition flex items-center justify-center"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
