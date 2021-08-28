import React from 'react';
import Lightbox from 'react-image-lightbox';
import Loader from 'react-loader-spinner';

import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './Modal.module.scss';

export default function Modal({ images, photoIndex, onClose, nextImage, prevImage }) {
  return (
    <Lightbox
      mainSrc={images[photoIndex].largeImageURL}
      nextSrc={images[(photoIndex + 1) % images.length].largeImageURL}
      prevSrc={images[(photoIndex + images.length - 1) % images.length].largeImageURL}
      onCloseRequest={onClose}
      onMovePrevRequest={prevImage}
      onMoveNextRequest={nextImage}
      loader={<Loader type="Circles" color="#00BFFF" height={100} width={100} className={styles.Spinner} />}
    />
  );
}
