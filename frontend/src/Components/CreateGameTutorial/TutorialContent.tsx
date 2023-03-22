import React from "react";

interface TutorialContentProps {
  isOpen: Record<string, boolean>;
  setIsOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export default function TutorialContent({
  isOpen,
  setIsOpen,
}: TutorialContentProps) {
  return (
    <div className="tutorial-content-container">
      <p>안녕하세요? 이곳에서 사용법을 배워보세요!</p>
      <div>
        <p>이곳에 이미지가 들어가요</p>
        {isOpen.page1 && <p>1번임</p>}
        {isOpen.page2 && <p>2번임</p>}
        {isOpen.page3 && <p>3번임</p>}
      </div>
    </div>
  );
}
