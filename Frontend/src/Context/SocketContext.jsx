import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { accessToken } = useContext(AuthContext);
  const currentUser = accessToken ? jwtDecode(accessToken) : null;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io("http://localhost:4000");
  
    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
  
    setSocket(socketInstance);
  
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    
  currentUser && socket?.emit("newUser", currentUser._id);
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};