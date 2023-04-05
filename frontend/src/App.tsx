import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import Routers from "./pages/Routers";
import Footbar from "./components/common/Footbar";
import AutoToTop from "./components/common/AutoToTop";
import "./styles/App.scss";

function usePageViews() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("UA-259293592-1");
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  }, [location]);
}

function App() {
  usePageViews();

  // user 가입 이벤트
  ReactGA.event({
    category: "User",
    action: "Created an Account",
  });
  // url 클릭 이벤트
  ReactGA.event({
    category: "Content",
    action: "Click Link",
    label: "link url",
  });
  // error 발생 기록
  ReactGA.exception({
    description: "An error ocurred",
    fatal: true,
  });

  return (
    <div className="App">
      <AutoToTop />
      <div className="app-main-container">
        <div>
          <Routers />
        </div>
      </div>
      <footer>
        <Footbar />
      </footer>
    </div>
  );
}

export default App;
