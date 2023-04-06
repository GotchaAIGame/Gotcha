import React from "react";

interface TutorialContentProps {
  contents: {
    contentId: number;
    title: string;
    imgSrc: any;
  };
}

export default function TutorialContents({ contents }: TutorialContentProps) {
  return (
    <div className="tutorial-contents-container" key={contents.contentId}>
      {/* <h3>{contents.title}</h3> */}
      <div className="carousel-img-wrapper">
        <img src={contents.imgSrc} alt="" />
      </div>
    </div>
  );
}
