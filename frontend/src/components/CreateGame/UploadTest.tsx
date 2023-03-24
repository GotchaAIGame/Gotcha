import React from "react";

export default function UploadTest() {
  let imagesObject: string[] = [];

  function handleFileSelect(evt: React.ChangeEvent<HTMLInputElement>): void {
    // const files: FileList | null = evt.target.files;
    const { files } = evt.target;

    // Loop through the FileList and render image files as thumbnails.
    if (files) {
      for (let i = 0; i < files?.length; i += 1) {
        const f: File | undefined = files[i];

        const reader: FileReader = new FileReader();

        // Closure to capture the file information.
        // eslint-disable-next-line no-loop-func
        reader.onload = function (e: ProgressEvent<FileReader>): void {
          displayImgData(e.target?.result as string);
          addImage(e.target?.result as string);
        };

        reader.readAsDataURL(f);
      }
    }
  }

  function loadFromLocalStorage(): void {
    const images: string[] | null = JSON.parse(
      localStorage.getItem("images") || "[]"
    );

    if (images !== null && images.length > 0) {
      imagesObject = images;

      images.forEach((image) => {
        if (typeof image === "string") {
          displayImgData(image);
        }
      });
    }
  }

  // Local Storage 저장 함수
  function addImage(imgData: string): void {
    imagesObject.push(imgData);

    localStorage.setItem("images", JSON.stringify(imagesObject));
  }

  // 미리보기 이미지 생성 함수
  function displayImgData(imgData: string): void {
    const span: HTMLSpanElement = document.createElement("span");
    span.innerHTML = `<img class="thumb" src="${imgData}"/>`;
    document.getElementById("list")?.insertBefore(span, null);
  }

  // LocalStorage 이미지 데이터 삭제
  function deleteImages(): void {
    imagesObject = [];
    localStorage.removeItem("images");
    document.getElementById("list")!.innerHTML = "";
  }

  return (
    <div style={{ border: "2px solid black", padding: "30px" }}>
      <p>테스트</p>
      <p>큭큭</p>

      <input type="file" id="files" onChange={handleFileSelect} />

      <p id="state">No images stored in your browser.</p>
      <div id="list" />
      <button type="button" id="deleteImgs" onClick={deleteImages}>
        Delete Images
      </button>
      <button type="button" onClick={loadFromLocalStorage}>
        불러오기
      </button>
    </div>
  );
}
