import styles from './ImageGallery.module.scss';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ imagesArray }) => {
  const { ImageGallery } = styles;

  console.log('ImageGallery ', imagesArray);

  return (
    <ul className={ImageGallery}>
      {imagesArray.map(({ id, webformatURL, tags, largeImageURL, likes, views, comments, downloads }) => (
        <ImageGalleryItem
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          likes={likes}
          views={views}
          comments={comments}
          downloads={downloads}
          key={id}
        />
      ))}
    </ul>
  );
};
