import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./Pages/Routers";
import Navbar from "./Components/common/Navbar";
import Footbar from "./Components/common/Footbar";
import AutoToTop from "./Components/common/AutoToTop";
import "./Styles/App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AutoToTop />
        <div className="app-main-container">
          <Navbar />
          <div>
            <Routers />
          </div>
        </div>
        <footer className="app-main-footer">
          <Footbar />
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
