import React, { Dispatch, SetStateAction } from "react";

interface modalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CustomModal({ isOpen, setIsOpen }: modalProps) {

  return (
    <div className="custom-modal-container">
      <div>
        <p>로고</p>
      </div>
      <div>
        <p>색상</p>
      </div>

    </div>
  );
}
