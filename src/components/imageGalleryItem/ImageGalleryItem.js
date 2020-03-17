import React from "react";

const ImageGalleryItem = ({ itemLi, onOpen }) => (
  <li className="ImageGalleryItem">
    <img
      src={itemLi.webformatURL}
      alt="img"
      className="ImageGalleryItem-image"
      onClick={() => onOpen(itemLi.largeImageURL)}
    />
  </li>
);

export default ImageGalleryItem;
