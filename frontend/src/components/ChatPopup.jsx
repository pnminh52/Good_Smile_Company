import { useState } from "react";
import { Drawer, Button, Input, message as antdMessage } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { getChatBot } from "../api/chatbot";

const { TextArea } = Input;

const ChatPopup = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // ✅ thêm loading

  const toggleDrawer = () => setOpen(!open);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const data = await getChatBot(text);
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      antdMessage.error("Lỗi gửi tin nhắn, thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Nút mở chat */}
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined />}
        size="large"
        className="!fixed bottom-6 right-6 z-50"
        onClick={toggleDrawer}
      />

      {/* Drawer chat */}
      <Drawer
        title="Chat với Bot"
        placement="right"
        width={320}
        onClose={toggleDrawer}
        open={open}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto mb-3 border border-gray-200 rounded p-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`my-1 ${
                  msg.from === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-1 rounded-lg ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <TextArea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={(e) => {
                e.preventDefault();
                if (!loading) sendMessage();
              }}
              placeholder="Nhập tin nhắn..."
              disabled={loading}
            />
            <Button type="primary" onClick={sendMessage} loading={loading}>
              Gửi
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ChatPopup;
