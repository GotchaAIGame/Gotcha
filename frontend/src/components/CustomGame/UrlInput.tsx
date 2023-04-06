import React, { useState, useEffect, SetStateAction } from "react";
import { useAppSelector } from "@stores/storeHooks";
import plusBtn from "@assets/smallPlusButton.svg";
import deleteBtn from "@assets/smallDeleteButton.svg";

interface UrlProps {
  eventUrl: string | null;
  urlInputRef: React.RefObject<HTMLInputElement>;
  isUrlOpen: boolean;
  setUrlOpen: any;
}

export default function UrlInput(props: UrlProps) {
  const { eventUrl, urlInputRef, isUrlOpen, setUrlOpen } = props;

  if (urlInputRef.current) {
    if (eventUrl) {
      urlInputRef.current.value = eventUrl;
    }
  }

  const urlHandler = () => {
    setUrlOpen(!isUrlOpen);
    console.log(eventUrl);
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
      <input
        style={{ display: `${!isUrlOpen ? "none" : ""}` }}
        type="url"
        placeholder="행사 URL을 입력해주세요"
        ref={urlInputRef}
      />
    </div>
  );
}
