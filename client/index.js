import React from "react";
import ReactDOM from "react-dom/client";
 
import store from "./store";

import App from "./components/App"
ReactDOM.createRoot(
    document.querySelector("#put-app-here")
).render(<App />);