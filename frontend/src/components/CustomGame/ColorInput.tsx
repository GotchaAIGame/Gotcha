import React, { useState } from "react";
import { ChromePicker } from "react-color";

export default function ColorInput() {
  const [themeColor, setThemeColor] = useState<string>("5551FF");

  return (
    <div className="color-input-container">
      <div className="modal-input-header">
        <p>테마 색깔</p>
      </div>
      <ChromePicker
        className="color-picker"
        color={themeColor}
        // onChange={(color) => colorHandler(color.hex)}
      />
    </div>
  );
}
