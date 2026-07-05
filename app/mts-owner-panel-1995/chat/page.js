"use client";
import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MessageSquare, Send, Bot, User, ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";

export default function OwnerChatDashboard() {
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [viewingChatMobile, setViewingChatMobile] = useState(false);
  const chatEndRef = useRef(null);

  // Poll for active chat sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch("/api/chat/admin");
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.sessions)) {
            setSessions(data.sessions);
          }
        }
      } catch (err) {
        console.error("Error loading chat sessions:", err);
      }
    };

    fetchSessions();
    const interval = setInterval(fetchSessions, 3000); // 3 seconds poll for sessions list
    return () => clearInterval(interval);
  }, []);

  // Poll for messages in the selected session
  useEffect(() => {
    if (!selectedSessionId) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chat?sessionId=${selectedSessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setMessages(data);
          }
        }
      } catch (err) {
        console.error("Error loading session messages:", err);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // 2 seconds poll for current chat messages
    return () => clearInterval(interval);
  }, [selectedSessionId]);

  // Scroll to bottom when messages load
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectSession = (sessionId) => {
    setSelectedSessionId(sessionId);
    setViewingChatMobile(true);
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedSessionId) return;

    const textToSend = replyText.trim();
    setReplyText("");

    // optimistic update locally
    const tempReplyMsg = {
      _id: "temp_" + Date.now(),
      sender: "owner",
      text: textToSend,
      visitorName: "Faizal (Owner)",
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempReplyMsg]);

    try {
      const res = await fetch("/api/chat/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selectedSessionId,
          text: textToSend
        })
      });
      if (res.ok) {
        // reload immediately to sync database ID
        const fetchRes = await fetch(`/api/chat?sessionId=${selectedSessionId}`);
        if (fetchRes.ok) {
          const freshData = await fetchRes.json();
          setMessages(freshData);
        }
      } else {
        toast.error("❌ Failed to send message");
      }
    } catch (err) {
      console.error("Error sending owner reply:", err);
      toast.error("❌ Technical error sending reply");
    }
  };

  const selectedSession = sessions.find(s => s.sessionId === selectedSessionId);

  return (
    <DashboardLayout isAdmin={true}>
      <div className="h-[calc(100vh-180px)] flex bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        
        {/* LEFT COLUMN: ACTIVE VISITOR SESSIONS */}
        <div className={`w-full md:w-80 flex-shrink-0 border-r border-slate-100 flex flex-col bg-slate-50/50 ${viewingChatMobile ? "hidden md:flex" : "flex"}`}>
          <div className="p-4 border-b border-slate-100 bg-white">
            <h2 className="font-heading font-extrabold text-slate-800 text-base uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="text-[#1251A3]" size={18} /> Active Chats
            </h2>
            <p className="text-[10px] text-slate-400 font-sans mt-0.5">Real-time support live feed</p>
          </div>
          
          <div className="flex-grow overflow-y-auto divide-y divide-slate-100">
            {sessions.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-xs text-slate-400 italic">No active conversations found.</p>
              </div>
            ) : (
              sessions.map((s) => {
                const isSelected = s.sessionId === selectedSessionId;
                const date = new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                return (
                  <button
                    key={s.sessionId}
                    onClick={() => selectSession(s.sessionId)}
                    className={`w-full p-4 text-left flex items-start justify-between gap-3 transition-colors ${
                      isSelected ? "bg-white border-l-4 border-[#1251A3]" : "hover:bg-slate-100 bg-white"
                    }`}
                  >
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-800 truncate">{s.visitorName}</span>
                        <span className="text-[9px] font-mono text-slate-400 flex-shrink-0">{date}</span>
                      </div>
                      <p className={`text-[11px] truncate mt-1 ${s.unread ? "font-bold text-slate-900" : "text-slate-500"}`}>
                        {s.latestMessage}
                      </p>
                    </div>
                    {s.unread && (
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0 mt-1 animate-pulse"></span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: CURRENT CONVERSATION PANEL */}
        <div className={`flex-grow flex flex-col bg-white ${!viewingChatMobile ? "hidden md:flex" : "flex"}`}>
          {selectedSessionId ? (
            <>
              {/* Active Session Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  {/* Back button for mobile */}
                  <button
                    onClick={() => setViewingChatMobile(false)}
                    className="md:hidden p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition mr-1"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-[#E3F0FF] text-[#1251A3] font-bold text-xs flex items-center justify-center">
                    {selectedSession?.visitorName ? selectedSession.visitorName.charAt(0) : "G"}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-800">{selectedSession?.visitorName || "Guest"}</h3>
                    <span className="text-[9px] font-mono text-slate-400">ID: {selectedSessionId.substring(5, 12)}</span>
                  </div>
                </div>
                <div className="text-[9px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider animate-pulse">
                  Live
                </div>
              </div>

              {/* Message History */}
              <div className="flex-grow p-4 overflow-y-auto space-y-3.5 bg-slate-50/30">
                {messages.map((msg, index) => {
                  const isMe = msg.sender === "owner";
                  const isAI = msg.sender === "ai";
                  
                  return (
                    <div
                      key={msg._id || index}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"} space-y-0.5`}
                    >
                      {/* Badge / Name */}
                      <span className="text-[9px] text-slate-400 font-bold uppercase ml-1">
                        {isMe ? "Faizal (Owner)" : isAI ? "AI Assistant (Offline Mode)" : (msg.visitorName || "Guest")}
                      </span>

                      {/* Text bubble */}
                      <div
                        className={`max-w-[70%] p-3 rounded-2xl text-xs whitespace-pre-line shadow-sm leading-relaxed ${
                          isMe
                            ? "bg-[#1251A3] text-white rounded-tr-none"
                            : isAI
                            ? "bg-slate-100 text-slate-600 border border-slate-200 rounded-tl-none italic"
                            : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Reply Input Box */}
              <form onSubmit={handleSendReply} className="p-3 border-t border-slate-100 flex gap-2 items-center bg-white">
                <input
                  type="text"
                  placeholder="Type manual reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-xs focus:outline-none focus:border-[#1251A3] focus:bg-white text-[#0D1B2A] transition"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="bg-[#1251A3] hover:bg-[#0A3578] disabled:opacity-40 text-white p-3 rounded-xl transition flex items-center justify-center"
                >
                  <Send size={14} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                <MessageSquare size={28} />
              </div>
              <h3 className="font-bold text-sm text-slate-700">No Chat Selected</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-[280px]">
                Click on any visitor conversation from the left sidebar to start live chatting in real time.
              </p>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}
