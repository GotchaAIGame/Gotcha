import React, { useState, useEffect } from "react";
import { useAppSelector } from "@stores/storeHooks";
import plusBtn from "@assets/smallPlusButton.svg";
import deleteBtn from "@assets/smallDeleteButton.svg";

interface UrlProps {
  eventUrl: string | null;
  urlInputRef: React.RefObject<HTMLInputElement>;
}

export default function UrlInput(props: UrlProps) {
  const { eventUrl, urlInputRef } = props;
  const [isUrlOpen, setUrlOpen] = useState<boolean>();

  const urlHandler = () => {
    setUrlOpen(!isUrlOpen);
    if (urlInputRef.current) {
      if (eventUrl) {
        urlInputRef.current.value = eventUrl;
      }
    }
  };

  return (
    <div
      className="url-input-container"
      style={isUrlOpen ? { minHeight: "110px" } : { minHeight: "85px" }}
    >
      <div className="modal-input-header">
        <p>이벤트 URL</p>
        <button type="button" onClick={urlHandler}>
          {isUrlOpen ? (
            <img src={deleteBtn} alt="" />
          ) : (
            <img src={plusBtn} alt="" />
          )}
        </button>
      </div>
      {isUrlOpen ? (
        <input
          type="url"
          placeholder="행사 URL을 입력해주세요"
          ref={urlInputRef}
        />
      ) : (
        <div className="empty-bottom-box" />
      )}
    </div>
  );
}
