import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Timer() {
  // Temp Data
  const startTime = new Date(2023, 2, 23, 9, 17, 0).getTime(); // year, month(0-index), day, hour, min, sec
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const stopFlag = false;
  const { themeColor } = useSelector((state: any) => state.theme);

  useEffect(() => {
    const interval = setInterval(() => {
      const timegap = Date.now() - startTime;
      setDays(
        String(Math.floor(timegap / (1000 * 60 * 60 * 24))).padStart(2, "0")
      );
      setHours(
        String(Math.floor((timegap / (1000 * 60 * 60)) % 24)).padStart(2, "0")
      );
      setMinutes(
        String(Math.floor((timegap / 1000 / 60) % 60)).padStart(2, "0")
      );
      setSeconds(String(Math.floor((timegap / 1000) % 60)).padStart(2, "0"));
    }, 1000);

    return () => {
      if (stopFlag) {
        clearInterval(interval);
      }
    };
  }, [stopFlag]);

  return (
    <div className="timer-wrapper" style={{ backgroundColor: `${themeColor}` }}>
      {!days ? (
        <h5>Loading ...</h5>
      ) : (
        <h5>
          {days}:{hours}:{minutes}:{seconds}
        </h5>
      )}
    </div>
  );
}

export default Timer;
