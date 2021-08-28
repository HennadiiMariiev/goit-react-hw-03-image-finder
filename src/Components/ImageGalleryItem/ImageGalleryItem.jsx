import styles from './ImageGalleryItem.module.scss';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CommentIcon from '@material-ui/icons/Comment';
import GetAppIcon from '@material-ui/icons/GetApp';

const onLoadClick = (href) => {
  const FileSaver = require('file-saver');
  FileSaver.saveAs(href, 'image.jpg');
};

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, likes, views, comments, downloads, onClick }) => {
  const { Card, Card__wrapper, Stats, Stats__item, Card__image, Material__icon, Stats__load } = styles;

  return (
    <li className={Card}>
      <div className={Card__wrapper}>
        <img src={webformatURL} alt={tags} data-large_img={largeImageURL} className={Card__image} onClick={onClick} />

        <div className={Stats}>
          <p className={Stats__item}>
            <ThumbUpIcon className={Material__icon} />
            {likes}
          </p>
          <p className={Stats__item}>
            <VisibilityIcon className={Material__icon} />
            {views}
          </p>
          <p className={Stats__item}>
            <CommentIcon className={Material__icon} />
            {comments}
          </p>
          <p className={Stats__item}>
            <GetAppIcon className={Material__icon} />
            {downloads}
          </p>
        </div>
        <button className={Stats__load} onClick={() => onLoadClick(webformatURL)} type="button">
          <GetAppIcon />
        </button>
      </div>
    </li>
  );
};
