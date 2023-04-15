import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./context";
import App from "./App";
import "./index.less";
import swDev from "./swDev";

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById("root")
);
swDev()