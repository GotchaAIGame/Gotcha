import React from "react";

interface TutorialContentProps {
  contents: {
    contentId: number;
    title: string;
    content: string;
    imgSrc: string;
  };
}

export default function TutorialContent({ contents }: TutorialContentProps) {
  return (
    <div className="tutorial-content-container" key={contents.contentId}>
      <h3>{contents.title}</h3>
      <p>{contents.content}</p>
      <div>
        <img src={contents.imgSrc} alt="" />
      </div>
    </div>
  );
}
