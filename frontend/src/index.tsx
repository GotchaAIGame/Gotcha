import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ReactGA from "react-ga";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import store from "./stores/store";
import reportWebVitals from "./reportWebVitals";

const persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Google Analytics 초기화
ReactGA.initialize("UA-259293592-1");

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
