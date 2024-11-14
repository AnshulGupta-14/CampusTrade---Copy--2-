import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../Context/AuthContext";
import axios from "../Utils/Axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../Context/SocketContext";
import "remixicon/fonts/remixicon.css";
import { useLocation } from "react-router-dom";

const Chatbox = () => {
  const location = useLocation();
  const { product } = location.state;
  const imageRef = useRef();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const [images, setImages] = useState([]);
  const { socket } = useContext(SocketContext);
  const receiverId = product.owner;
  const { accessToken } = useContext(AuthContext);
  const user = accessToken ? jwtDecode(accessToken) : null;
  const [chatid, setChatid] = useState("");

  console.log(chats[0]);
  

  const handleClick = (id) => {
    setChatid(id);
    axios
      .get(`/chat/c/${receiverId}`)
      .then((res) => {
        setMessages(res.data.messages);
      })
      .catch((err) => console.log("Error fetching chat:", err));
  };

  useEffect(() => {
    axios
      .get("/chat/getChats")
      // .get(`/chat/c/${id}`)
      .then((res) => setChats(res.data))
      .catch((err) => console.log("Error fetching chats:", err));

    axios
      .get(`/chat/c/${receiverId}`)
      .then((res) => {
        if (!res.data) {
          axios
            .post("/chat/addChat", { receiverId })
            .then((res) => {
              setChats(res.data);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async () => {
    if (!textMessage) return;

    try {
      const response = await axios.post(`/message/${chatid}`, {
        text: textMessage,
      });
      const newMessage = response.data;      
      socket.emit("sendMessage", {
        receiverId: chats[0].userIDs[1],
        data: newMessage,
      });
      setMessages((prev) => [...prev, newMessage]);
      setTextMessage("");
    } catch (err) {
      console.log("Error sending message:", err);
    }
  };

  const markAsRead = useCallback(() => {
    if (chats[0]) {
      axios
        .put(`/chat/read/${chats[0]._id}`)
        .catch((err) => console.log("Error marking chat as read:", err));
    }
  }, [chats]);

  useEffect(() => {
    // Ensure socket and at least one chat exists
    // console.log(socket);

    if (socket && chats?.length) {
      // console.log(chats.length);
      const handleGetMessage = (data) => {
        console.log("Message data received:", data);

        // if (chats[0] && chats[0]._id === data.chatId) {
        //   setMessages((prev) => [...prev, data]);
        //   markAsRead();
        // }

        // Find a matching chat based on the chatId in the message
        const matchingChat = chats.find((chat) => chat._id === data.chatId);

        if (matchingChat) {
          console.log("Ashul");
          
          setMessages((prev) => [...prev, data]);
          markAsRead();
        }
      };

      // Set up listener
      socket.on("getMessage", handleGetMessage);

      // Cleanup listener on unmount or dependency change
      return () => {
        socket.off("getMessage", handleGetMessage);
      };
    }
  }, [socket, chats, markAsRead]);

  // Ensure unique message IDs to avoid duplicate keys
  const uniqueMessages = messages.filter(
    (msg, index, self) => index === self.findIndex((m) => m._id === msg._id)
  );
  
  console.log(uniqueMessages.length);
  

  return (
    <div className="pt-[7.5%] h-[100vh] flex overflow-hidden">
      <div className="w-[30%] h-[86.5vh] p-5 overflow-y-auto flex flex-col">
        {chats.length > 0 &&
          chats.map((chat) => (
            <div
              key={chat._id}
              className="rounded-lg w-full bg-zinc-300 flex p-2 items-center gap-5"
              onClick={() => handleClick(chat._id)}
            >
              <img
                src={chat.receiver.avatar}
                alt="User Avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <div className="flex items-center gap-20">
                  <h1 className="text-xl font-semibold">
                    {chat.receiver.fullname}
                  </h1>
                  <h1 className="text-xs">
                    {new Intl.DateTimeFormat("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(chat.updatedAt))}
                  </h1>
                </div>
                <h1 className="line-clamp-1 opacity-70 text-sm">
                  {chat.lastMessage}
                </h1>
              </div>
            </div>
          ))}
      </div>
      {uniqueMessages ? (
        <div className="w-[70%] p-5 h-[86.5vh] flex flex-col gap-5 overflow-y-auto pb-16">
          {uniqueMessages.map((msg, i) => (
            <div
              key={msg._id}
              className={`${
                msg.userId === user._id
                  ? "self-end bg-[#1f60e2] text-white"
                  : "self-start bg-zinc-400"
              } w-fit p-3 py-2 rounded-lg max-w-[70%] break-words`}
            > 
              <h1 className="leading-tight">{msg.text}</h1>
              <h1 className="text-[9px] text-end">
                {new Intl.DateTimeFormat("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(msg.createdAt))}
              </h1>
            </div>
          ))}
          <div className="fixed bottom-2 flex items-center gap-5 mt-5">
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={(e) => setImages(Array.from(e.target.files))}
              className="hidden"
              multiple
            />
            <div className="group">
              <h1 className="text-xs absolute -top-1 -left-3 invisible group-hover:visible transition-all duration-300">
                Attach Images
              </h1>
              <i
                className="ri-attachment-2 px-4 text-xl"
                onClick={() => {
                  imageRef.current.click();
                }}
              ></i>
            </div>
            <textarea
              rows="1"
              placeholder="Type message here"
              className="resize-none p-3 rounded-lg w-[53vw] border border-black"
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className="p-2 bg-[#003034] text-white rounded-lg px-4"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="w-[70%] bg-black h-[86.5vh] rounded-lg"></div>
      )}
    </div>
  );
};

export default Chatbox;
