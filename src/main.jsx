import React from "react";
import ReactDOM from "react-dom/client";
import ResetStyle from "./styles/ResetStyle";
import GlobalStyle from "./styles/GlobalStyle";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ResetStyle />
        <GlobalStyle />
        <App />
    </React.StrictMode>
);
