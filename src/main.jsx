import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./store/store";
import ReactDOM from "react-dom/client";
import initI18n from "./i18/i18n";

const startApp = async () => {
  await initI18n();

  ReactDOM.createRoot(
    document.getElementById("root")
  ).render(
      <Provider store={store}>
        <App />
      </Provider>
  );
};

startApp();