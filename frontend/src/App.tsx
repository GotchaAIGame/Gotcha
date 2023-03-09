import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./Pages/Routers";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <p>Nav영역</p>
          <div>
            <Routers />
          </div>
        </div>
        <div>
          <p>풋바영역</p>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
