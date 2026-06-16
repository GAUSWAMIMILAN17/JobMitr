import { useState, useRef, useEffect } from "react";
import Navbar from "../components_lite/Navbar.jsx";
import Footer from "../components_lite/Footer.jsx";
import axios from "axios";
import { CHAT_API_ENDPOINT } from "../../utils/data.js";
import ReactMarkdown from "react-markdown";

// ─── Sidebar Item ─────────────────────────────────────────────────────────────
function SidebarItem({ chat, isActive, onClick, onDelete }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
        isActive
          ? "bg-amber-400/15 text-amber-400"
          : "text-white/50 hover:bg-white/[0.07] hover:text-white/85"
      }`}
    >
      <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 16c0 1.1-.9 2-2 2H7l-4 4V6a2 2 0 012-2h14a2 2 0 012 2v10z" />
      </svg>
      <span className="truncate flex-1">{chat.title}</span>
      {(hovered || isActive) && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(chat._id); }}
          className="p-0.5 rounded hover:bg-white/10 text-white/30 hover:text-red-400 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ chats, activeChatId, onSelectChat, onNewChat, onDeleteChat }) {
  const [chatTitle, setChatTitle] = useState("");
  return (
    <aside className="w-64 flex flex-col border-r border-white/[0.07] shrink-0" style={{ background: "#0f1f35" }}>
      <div className="p-3 border-b border-white/[0.07]">
        <input
          type="text"
          placeholder="Chat title..."
          value={chatTitle}
          onChange={(e) => setChatTitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded-lg text-sm outline-none text-white/75 placeholder-white/30 border border-white/10"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <button
          onClick={() => { onNewChat(chatTitle); setChatTitle(""); }}
          className="w-full py-2 rounded-lg text-sm font-semibold transition-all hover:-translate-y-px"
          style={{ background: "#f59e0b", color: "#0f1f35" }}
        >
          + New Chat
        </button>
      </div>
      <p className="px-3 py-2 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
        Chats
      </p>
      <div className="flex-1 overflow-y-auto px-2 space-y-0.5 custom-scroll">
        {chats.map((chat) => (
          <SidebarItem
            key={chat._id}
            chat={chat}
            isActive={activeChatId === chat._id}
            onClick={() => onSelectChat(chat._id)}
            onDelete={() => onDeleteChat(chat._id)}
          />
        ))}
      </div>
    </aside>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 group ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1" style={{ background: "#0f1f35" }}>
          <svg className="w-4 h-4" fill="none" stroke="#f59e0b" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )}

      <div className={`relative max-w-[75%] ${isUser ? "order-first" : ""}`}>
        <div
          className={`px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "text-white/90"
              : "text-gray-800"
          }`}
          style={
            isUser
              ? { background: "#0f1f35", borderRadius: "14px 14px 4px 14px" }
              : { background: "#f7f8fa", borderRadius: "4px 14px 14px 14px", border: "0.5px solid #eee" }
          }
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words m-0">{message.content}</p>
          ) : (
            <div className="
              prose prose-sm max-w-none
              prose-headings:font-semibold prose-headings:text-[#0f1f35]
              prose-h1:text-base prose-h2:text-sm prose-h3:text-sm
              prose-headings:mt-3 prose-headings:mb-1 prose-headings:first:mt-0
              prose-p:my-1 prose-p:leading-relaxed
              prose-li:my-0.5
              prose-ul:my-1 prose-ol:my-1
              prose-ul:pl-4 prose-ol:pl-4
              prose-strong:text-[#0f1f35] prose-strong:font-semibold
              prose-code:bg-white prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:text-[#0f1f35] prose-code:border prose-code:border-gray-200
              prose-pre:bg-white prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg prose-pre:text-xs
            ">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        <button
          onClick={handleCopy}
          className={`absolute -bottom-5 ${isUser ? "left-0" : "right-0"} opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-all`}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>

      {isUser && (
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 text-xs font-bold"
          style={{ background: "#f59e0b", color: "#0f1f35" }}
        >
          RK
        </div>
      )}
    </div>
  );
}
// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#0f1f35" }}>
        <svg className="w-4 h-4" fill="none" stroke="#f59e0b" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div className="border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1" style={{ background: "#f7f8fa" }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#0f1f35" }}>
        <svg className="w-6 h-6" fill="none" stroke="#f59e0b" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold" style={{ color: "#0f1f35" }}>JobMitra AI</h1>
      <p className="text-gray-400 text-base max-w-sm">
        Discover jobs, prepare for interviews, and accelerate your career journey with AI.
      </p>
    </div>
  );
}

// ─── Chat Input ───────────────────────────────────────────────────────────────
function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  };

  return (
    <div className="p-4 border-t border-gray-100 bg-white shrink-0">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-200 focus-within:border-gray-300 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything"
            rows={1}
            className="flex-1 bg-transparent text-gray-800 text-sm placeholder-gray-400 resize-none outline-none leading-relaxed max-h-40"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="p-2 rounded-xl transition-all shrink-0"
            style={{
              background: input.trim() && !disabled ? "#0f1f35" : "#e5e7eb",
              cursor: input.trim() && !disabled ? "pointer" : "not-allowed",
            }}
          >
            <svg className="w-4 h-4 rotate-90" fill="none" stroke={input.trim() && !disabled ? "#f59e0b" : "#9ca3af"} strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">
          JobMitra AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}

// ─── Chat Area ────────────────────────────────────────────────────────────────
function ChatArea({ chat, onSend, isTyping }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages, isTyping]);

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col bg-white min-h-0">
        <EmptyState />
        <ChatInput onSend={onSend} disabled={false} />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white min-h-0">
      <div className="px-6 py-3 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
        <h2 className="text-sm font-medium truncate" style={{ color: "#0f1f35" }}>{chat.title}</h2>
        <span className="text-xs px-2.5 py-1 rounded-lg" style={{ background: "rgba(15,31,53,0.06)", color: "#0f1f35" }}>
          JobMitra AI
        </span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scroll">
        <div className="max-w-3xl mx-auto px-6 py-6 space-y-8">
          {chat.messages?.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <h2 className="text-xl font-medium text-gray-300">Start Conversation</h2>
            </div>
          ) : (
            chat.messages?.map((msg, i) => <MessageBubble key={i} message={msg} />)
          )}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      <ChatInput onSend={onSend} disabled={isTyping} />
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await axios.get(`${CHAT_API_ENDPOINT}/allChats`, { withCredentials: true });
      setChats(res.data.chats);
    } catch (error) {
      console.error("Fetch chats error:", error);
    }
  };

  const activeChat = chats.find((c) => c._id === activeChatId) || null;

  const handleNewChat = async (title) => {
    try {
      const res = await axios.post(`${CHAT_API_ENDPOINT}/newChat`, { title: title || "New Chat" }, { withCredentials: true });
      setChats((prev) => [res.data.chat, ...prev]);
    } catch (error) {
      console.error("New chat error:", error);
    }
  };

  const handleDeleteChat = async (id) => {
    try {
      await axios.delete(`${CHAT_API_ENDPOINT}/delete/${id}`, { withCredentials: true });
      setChats((prev) => prev.filter((c) => c._id !== id));
      if (activeChatId === id) setActiveChatId(null);
    } catch (error) {
      console.error("Delete chat error:", error);
    }
  };

  const handleSelectChat = async (id) => {
    try {
      const res = await axios.get(`${CHAT_API_ENDPOINT}/singleChat/${id}`, { withCredentials: true });
      setActiveChatId(id);
      setChats((prev) => prev.map((chat) => (chat._id === id ? res.data.chat : chat)));
    } catch (error) {
      console.error("Select chat error:", error);
    }
  };

  const handleSend = async (text) => {
    let currentChatId = activeChatId;
    try {
      setIsTyping(true);

      if (!currentChatId) {
        const title = text.split(" ").slice(0, 3).join(" ");
        const createRes = await axios.post(`${CHAT_API_ENDPOINT}/newChat`, { title: title || "New Chat" }, { withCredentials: true });
        const newChat = { ...createRes.data.chat, messages: [] };
        setChats((prev) => [newChat, ...prev]);
        setActiveChatId(newChat._id);
        currentChatId = newChat._id;
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat._id === currentChatId
            ? { ...chat, messages: [...(chat.messages || []), { role: "user", content: text }] }
            : chat
        )
      );

      const res = await axios.post(`${CHAT_API_ENDPOINT}/message`, { chatId: currentChatId, message: text }, { withCredentials: true });
      setChats((prev) => prev.map((chat) => (chat._id === currentChatId ? res.data.chat : chat)));
    } catch (error) {
      console.error("Send message error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(15,31,53,0.15); border-radius: 99px; }
        @keyframes bounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
        .animate-bounce { animation: bounce 1s infinite; }
      `}</style>
      <div className="flex flex-col w-full h-screen bg-white font-sans">
        <Navbar />
        <div className="flex flex-1 min-h-0">
          <Sidebar
            chats={chats}
            activeChatId={activeChatId}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            onDeleteChat={handleDeleteChat}
          />
          <ChatArea chat={activeChat} onSend={handleSend} isTyping={isTyping} />
        </div>
      </div>
      <Footer />
    </>
  );
}