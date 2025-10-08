import React, { useState } from "react";
import { getChatBot } from "../../api/chatbot";

const Chatbot = () => {
  const [open, setOpen] = useState(false); // trạng thái mở/đóng chat
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Mình có thể giúp bạn tìm sản phẩm figure nào hôm nay?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await getChatBot(input);
      const reply = res.data.reply || "Xin lỗi, mình chưa hiểu câu hỏi của bạn.";
      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages(prev => [...prev, { sender: "bot", text: "Lỗi khi kết nối chatbot." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Nút tròn mở/đóng chat */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg hover:bg-orange-600 transition"
        >
          💬
        </button>
      )}

      {/* Khung chat */}
      {open && (
        <div className="flex flex-col h-[500px] w-[300px] border rounded-lg shadow-lg bg-white">
          {/* Header */}
          <div className="bg-orange-500 text-white font-semibold text-lg text-center py-2 rounded-t-lg flex justify-between items-center px-2">
            Chatbot
            <button
              onClick={() => setOpen(false)}
              className="text-white font-bold text-lg"
            >
              ✕
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-3 py-2 rounded-2xl max-w-[80%] text-sm ${msg.sender === "user" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <p className="text-gray-400 text-sm italic">Bot đang trả lời...</p>}
          </div>

          {/* Input */}
          <div className="border-t p-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border border-gray-300 rounded-full px-3 py-1 focus:outline-none focus:border-orange-400 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full transition disabled:opacity-50 text-sm"
            >
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
