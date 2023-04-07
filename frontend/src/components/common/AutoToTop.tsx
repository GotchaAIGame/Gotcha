import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  // 랜더링 시 최상단으로 이동시킵니다. App.tsx에 적용되었습니다.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
