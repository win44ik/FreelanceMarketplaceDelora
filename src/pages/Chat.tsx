import { useState } from "react";
import { Send, Image, Flag, Shield, ArrowLeft } from "lucide-react";
import { CHATS, MESSAGES, USERS } from "../data/mock";

const me = "me";

export default function Chat() {
  const [activeChat, setActiveChat] = useState<string | null>(CHATS[0].id);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const [showMobileList, setShowMobileList] = useState(true);

  const chat = CHATS.find(c => c.id === activeChat);
  const otherUserId = chat?.participants.find(p => p !== me);
  const otherUser = USERS.find(u => u.id === otherUserId);
  const chatMessages = messages.filter(m => m.chatId === activeChat);

  const send = () => {
    if (!message.trim() || !activeChat) return;
    setMessages(prev => [...prev, {
      id: `m${Date.now()}`, chatId: activeChat, senderId: me,
      text: message, createdAt: new Date().toISOString(),
    }]);
    setMessage("");
  };

  const selectChat = (id: string) => {
    setActiveChat(id);
    setShowMobileList(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex" style={{ backgroundColor: "#F8F6FF" }}>
      {/* Chat list */}
      <div className={`${showMobileList ? "flex" : "hidden"} md:flex flex-col w-full md:w-80 border-r bg-white`}
        style={{ borderColor: "#E8E4FA" }}>
        <div className="p-4 border-b" style={{ borderColor: "#E8E4FA" }}>
          <h2 className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: "#241C40" }}>
            Сообщения
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CHATS.map(c => {
            const otherId = c.participants.find(p => p !== me);
            const other = USERS.find(u => u.id === otherId);
            const active = c.id === activeChat;
            return (
              <button key={c.id} onClick={() => selectChat(c.id)}
                className="w-full flex items-center gap-3 p-4 transition-colors hover:bg-purple-50 text-left"
                style={{ backgroundColor: active ? "#F0EBFF" : "transparent" }}>
                <div className="relative shrink-0">
                  <img src={other?.avatar} alt={other?.name} className="w-11 h-11 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: "#2ECC71" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate" style={{ color: "#241C40" }}>{other?.name}</p>
                    <span className="text-xs shrink-0 ml-1" style={{ color: "#6B6B8A" }}>
                      {new Date(c.lastMessageAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs truncate" style={{ color: "#6B6B8A" }}>{c.lastMessage}</p>
                    {c.unread > 0 && (
                      <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold shrink-0 ml-1"
                        style={{ backgroundColor: "#6F4BF2", color: "#fff" }}>
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Message area */}
      {!showMobileList && (
        <div className="flex-1 flex flex-col md:flex">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-white border-b" style={{ borderColor: "#E8E4FA" }}>
            <button onClick={() => setShowMobileList(true)} className="md:hidden p-1.5" style={{ color: "#6B6B8A" }}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img src={otherUser?.avatar} alt={otherUser?.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: "#241C40" }}>{otherUser?.name}</p>
              <p className="text-xs" style={{ color: "#2ECC71" }}>Онлайн</p>
            </div>
            <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-red-50"
              style={{ color: "#E74C3C", borderColor: "#E74C3C" }}>
              <Flag className="w-3.5 h-3.5" /> Пожаловаться
            </button>
            <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
              style={{ color: "#6B6B8A", borderColor: "#E8E4FA" }}>
              <Shield className="w-3.5 h-3.5" /> Блокировать
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {chatMessages.map(msg => {
              const isMe = msg.senderId === me;
              const sender = USERS.find(u => u.id === msg.senderId);
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                  {!isMe && <img src={sender?.avatar} alt={sender?.name} className="w-8 h-8 rounded-full object-cover shrink-0" />}
                  <div className="max-w-xs lg:max-w-md">
                    <div className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={{
                        backgroundColor: isMe ? "#6F4BF2" : "#fff",
                        color: isMe ? "#fff" : "#1A1A2E",
                        borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        border: isMe ? "none" : "1px solid #E8E4FA",
                      }}>
                      {msg.text}
                    </div>
                    <p className={`text-xs mt-1 ${isMe ? "text-right" : ""}`} style={{ color: "#6B6B8A" }}>
                      {new Date(msg.createdAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t" style={{ borderColor: "#E8E4FA" }}>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-purple-50 transition-colors" style={{ color: "#6F4BF2" }}>
                <Image className="w-5 h-5" />
              </button>
              <input value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Написать сообщение..."
                className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
                style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
              <button onClick={send}
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#6F4BF2" }}>
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop: show message area always */}
      <div className={`hidden md:flex flex-1 flex-col`}>
        <div className="flex items-center gap-3 px-4 py-3 bg-white border-b" style={{ borderColor: "#E8E4FA" }}>
          <img src={otherUser?.avatar} alt={otherUser?.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-semibold text-sm" style={{ color: "#241C40" }}>{otherUser?.name}</p>
            <p className="text-xs" style={{ color: "#2ECC71" }}>Онлайн</p>
          </div>
          <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-red-50"
            style={{ color: "#E74C3C", borderColor: "#E74C3C" }}>
            <Flag className="w-3.5 h-3.5" /> Пожаловаться
          </button>
          <button className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-gray-50"
            style={{ color: "#6B6B8A", borderColor: "#E8E4FA" }}>
            <Shield className="w-3.5 h-3.5" /> Блокировать
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {chatMessages.map(msg => {
            const isMe = msg.senderId === me;
            const sender = USERS.find(u => u.id === msg.senderId);
            return (
              <div key={msg.id} className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"}`}>
                {!isMe && <img src={sender?.avatar} alt={sender?.name} className="w-8 h-8 rounded-full object-cover shrink-0" />}
                <div className="max-w-xs lg:max-w-md">
                  <div className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={{
                      backgroundColor: isMe ? "#6F4BF2" : "#fff",
                      color: isMe ? "#fff" : "#1A1A2E",
                      borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      border: isMe ? "none" : "1px solid #E8E4FA",
                    }}>
                    {msg.text}
                  </div>
                  <p className={`text-xs mt-1 ${isMe ? "text-right" : ""}`} style={{ color: "#6B6B8A" }}>
                    {new Date(msg.createdAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-4 py-3 bg-white border-t" style={{ borderColor: "#E8E4FA" }}>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-purple-50 transition-colors" style={{ color: "#6F4BF2" }}>
              <Image className="w-5 h-5" />
            </button>
            <input value={message} onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Написать сообщение..."
              className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none"
              style={{ borderColor: "#E8E4FA", backgroundColor: "#F8F6FF" }} />
            <button onClick={send}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#6F4BF2" }}>
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
