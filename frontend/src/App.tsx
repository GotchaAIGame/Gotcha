import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routers from "./pages/Routers";
import Navbar from "./components/common/Navbar";
import Footbar from "./components/common/Footbar";
import AutoToTop from "./components/common/AutoToTop";
import "./styles/App.scss";

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
