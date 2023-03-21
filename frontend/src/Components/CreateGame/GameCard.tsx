import React, { useState, useRef, useEffect } from "react";

export default function GameCard(Props: any) {
  const key = Props;
  console.log(key);

  const [inputImage, setInputImage] = useState<string>("");
  const uploadImage = useRef<HTMLInputElement>(null);

  // 이미지를 업로드 했을 때 실행
  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = uploadImage.current?.files;

    if (files && files.length > 0) {
      // useStateValue Update
      setInputImage(URL.createObjectURL(files[0]));

      // Local 저장, 화면 반영 (마지막 것만 저장됨)
      const reader: FileReader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>): void {
        addImage(e.target?.result as string);
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const imagesObject: string[] = [];

  // Local Storage 저장 함수
  function addImage(imgData: string): void {
    imagesObject.push(imgData);

    localStorage.setItem("images", JSON.stringify(imagesObject));
  }

  useEffect(() => {
    console.log("렌더링!");
  });

  return (
    <div className="card-wrapper">
      <header>
        <input type="text" placeholder="문제이름" />
      </header>
      {inputImage ? (
        <div className="upload-img-wrapper">
          <img src={inputImage} alt="" />
        </div>
      ) : (
        <div className="file-input-wrapper">
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={uploadHandler}
            ref={uploadImage}
          />
        </div>
      )}
      <div className="hint-text-box">힌트</div>
      <div className="hint-input-wrapper">
        <input type="text" placeholder="힌트를 추가해 주세요" />
      </div>
    </div>
  );
}
