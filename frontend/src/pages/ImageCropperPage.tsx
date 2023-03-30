import React, { useState, createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

function ImageCropperPage() {
  const [image, setImage] = useState(defaultSrc);
  const cropperRef = createRef<ReactCropperElement>();

  return (
    <div>
      <Cropper
        initialAspectRatio={1}
        src={image}
        viewMode={1}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        background
        checkOrientation={false}
      />
    </div>
  );
}

export default ImageCropperPage;
