import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import tutorialcontent1 from "@assets/playerTutorials/그림1.png";
import tutorialcontent2 from "@assets/playerTutorials/그림2.png";
import tutorialcontent3 from "@assets/playerTutorials/그림3.png";
import tutorialcontent4 from "@assets/playerTutorials/그림4.png";
import tutorialcontent5 from "@assets/playerTutorials/그림5.png";
import tutorialcontent6 from "@assets/playerTutorials/그림6.png";
import tutorialcontent7 from "@assets/playerTutorials/그림7.png";
import tutorialcontent8 from "@assets/playerTutorials/그림8.png";
import TutorialContent from "./TutorialContents";
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
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 4000, // 자동 캐러셀 속도
  };

  const [tutorialContents, setTutorialContents] =
    useState<ITutorialContentList>([
      {
        contentId: 1,
        title: "0번 제목",
        imgSrc: tutorialcontent1,
      },
      {
        contentId: 2,
        title: "0번 제목",
        imgSrc: tutorialcontent2,
      },
      {
        contentId: 3,
        title: "0번 제목",
        imgSrc: tutorialcontent3,
      },
      {
        contentId: 4,
        title: "0번 제목",
        imgSrc: tutorialcontent4,
      },
      {
        contentId: 5,
        title: "0번 제목",
        imgSrc: tutorialcontent5,
      },
      {
        contentId: 6,
        title: "0번 제목",
        imgSrc: tutorialcontent6,
      },
      {
        contentId: 7,
        title: "0번 제목",
        imgSrc: tutorialcontent7,
      },
      {
        contentId: 8,
        title: "0번 제목",
        imgSrc: tutorialcontent8,
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
    <div className="tutorial-carousel-wrapper">
      <Slider {...settings} className="carousel-libreary-slide">
        {tutorialContents.map((item, index) => {
          return <TutorialContent contents={item} key={item.contentId} />;
        })}
      </Slider>
    </div>
  );
}
