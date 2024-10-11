import React from "react";
import ReactDOM from "react-dom/client";
 
import { Provider } from "react-redux";

import gamesListStore from "./store";

import App from "./components/App"

ReactDOM.createRoot(
    document.querySelector("#put-app-here")
).render(
    <Provider store={gamesListStore} >
        <App />
    </Provider>
);