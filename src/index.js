import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeContextProvider } from "./context/ThemeContext";
import App from "./components/App/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
