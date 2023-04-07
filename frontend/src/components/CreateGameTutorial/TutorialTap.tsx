import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import tutorialcontent1 from "@assets/tutorialImages/그림1.png";
import tutorialcontent3 from "@assets/tutorialImages/그림3.png";
import tutorialcontent4 from "@assets/tutorialImages/그림4.png";
import tutorialcontent5 from "@assets/tutorialImages/그림5.png";
import tutorialcontent6 from "@assets/tutorialImages/그림6.png";
import tutorialcontent7 from "@assets/tutorialImages/그림7.png";
import tutorialcontent8 from "@assets/tutorialImages/그림8.png";
import tutorialcontent9 from "@assets/tutorialImages/그림9.png";
import tutorialcontent10 from "@assets/tutorialImages/그림10.png";
import tutorialcontent11 from "@assets/tutorialImages/그림11.png";
import tutorialcontent12 from "@assets/tutorialImages/그림12.png";
import tutorialcontent13 from "@assets/tutorialImages/그림13.png";
import tutorialcontent14 from "@assets/tutorialImages/그림14.png";

import TutorialContent from "./TutorialContent";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

interface ITutorialContent {
  contentId: number;
  title: string;
  imgSrc: any;
}

type ITutorialContentList = Array<ITutorialContent>;

// type ITutorialContents = Array<ITutorialContent>;

export default function TutorialTap() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // carousel setting
  const settings = {
    centerMode: true,
    dots: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerPadding: "5px",
  };

  const [tutorialContents, setTutorialContents] =
    useState<ITutorialContentList>([
      {
        contentId: 0,
        title: "0번 제목",
        imgSrc: tutorialcontent1,
      },
      {
        contentId: 1,
        title: "0번 제목",
        imgSrc: tutorialcontent3,
      },
      {
        contentId: 2,
        title: "0번 제목",
        imgSrc: tutorialcontent4,
      },
      {
        contentId: 3,
        title: "0번 제목",
        imgSrc: tutorialcontent5,
      },
      {
        contentId: 4,
        title: "0번 제목",
        imgSrc: tutorialcontent6,
      },
      {
        contentId: 5,
        title: "0번 제목",
        imgSrc: tutorialcontent7,
      },
      {
        contentId: 6,
        title: "0번 제목",
        imgSrc: tutorialcontent8,
      },
      {
        contentId: 7,
        title: "0번 제목",
        imgSrc: tutorialcontent9,
      },
      {
        contentId: 8,
        title: "0번 제목",
        imgSrc: tutorialcontent10,
      },
      {
        contentId: 9,
        title: "0번 제목",
        imgSrc: tutorialcontent11,
      },
      {
        contentId: 10,
        title: "0번 제목",
        imgSrc: tutorialcontent12,
      },
      {
        contentId: 11,
        title: "0번 제목",
        imgSrc: tutorialcontent13,
      },
      {
        contentId: 12,
        title: "0번 제목",
        imgSrc: tutorialcontent14,
      },
    ]);

  useEffect(() => {
    function handleClick() {
      const activatedIndex = document.getElementsByClassName("slick-current");
      const newIndex = activatedIndex[0].attributes[0].nodeValue;
      if (newIndex) {
        setCurrentSlideIndex(parseInt(newIndex, 10));
      }
    }
    // add click event listener
    document.addEventListener("mouseup", handleClick);

    // cleanup function to remove click event listener
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, []);

  return (
    <div className="tutorial-tab-main-container">
      <div className="progress-bar-wrapper">
        <hr />
        <div className="progressbar-tags-container">
          {/* 1: 기본 게임 생성 */}
          <div className="progress-bar-point-wrapper">
            <div
              className={
                currentSlideIndex < 6
                  ? "active-bar-point"
                  : "progress-bar-point"
              }
            />
          </div>
          {/* 2: 커스터마이징 */}
          <div className="progress-bar-point-wrapper">
            <div
              className={
                currentSlideIndex >= 6
                  ? "active-bar-point"
                  : "progress-bar-point"
              }
            />
          </div>
        </div>
        <div className="progressbar-tags-container">
          <span className={currentSlideIndex < 6 ? "progress-active-text" : ""}>
            기본 정보 입력
          </span>
          <span
            className={currentSlideIndex >= 6 ? "progress-active-text" : ""}
          >
            페이지 꾸미기
          </span>
        </div>
      </div>

      <Slider {...settings}>
        {tutorialContents.map((item, index) => {
          return <TutorialContent contents={item} key={item.contentId} />;
        })}
      </Slider>
    </div>
  );
}
