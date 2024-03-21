import React, { useState } from 'react';
import ImageUploading, { ImageListType } from "react-images-uploading";

export const DragAndDrop = () => {

  const [images, setImages] = useState<ImageListType>([]);

//   const handleChange = (imageList: ImageListType) => setImages(imageList);

  return (
    <>      
      <ImageUploading multiple={false} maxNumber={1} value={images} onChange={handleChange}>
      </ImageUploading>
    </>
  )
}