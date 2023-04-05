import React from "react";
import { ChromePicker } from "react-color";

export default function ColorInput(props: any) {
  const { themeColor, colorHandler } = props;
  // const [themeColor, setThemeColor] = useState<string>("5551FF");

  // const colorHandler = (color: string) => {
  //   setThemeColor(color);
  // };

  return (
    <div className="color-input-container">
      <div className="modal-input-header">
        <p>테마 색깔</p>
      </div>
      <ChromePicker
        className="color-picker"
        color={themeColor}
        onChange={(color) => colorHandler(color.hex)}
      />
    </div>
  );
}
