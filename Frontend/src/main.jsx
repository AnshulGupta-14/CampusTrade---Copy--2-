// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import Context from "./Context/Context.jsx";
import AuthProvider from "./Context/AuthContext.jsx";
import { SocketContextProvider } from "./Context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // <Context>
  <BrowserRouter>
    <AuthProvider>
      <SocketContextProvider>
        <App></App>
      </SocketContextProvider>
    </AuthProvider>
  </BrowserRouter>
  // {/* </Context> */}
  // </StrictMode>
);
