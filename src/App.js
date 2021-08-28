import React from 'react';
import { Searchbar } from './Components/Searchbar/Searchbar.jsx';
import ImageApiService from './apiService/apiService.js';
import { ImageGallery } from './Components/ImageGallery/ImageGallery.jsx';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';

import notificate from './utils/notification.js';
import { LoadMoreButton } from './Components/LoadMoreButton/LoadMoreButton.jsx';
import scrollDown from './utils/scrollDown.js';
import Modal from './Components/Modal/Modal.jsx';
import ScrollToTop from 'react-scroll-up';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import 'react-toastify/dist/ReactToastify.css';
import styles from './Components/AppComponent/App.module.scss';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const imageApiService = new ImageApiService();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagesArray: [],
      isLoading: false,
      isModalOpen: false,
      modalImageIndex: null,
    };
  }

  toggleLoader = () => {
    this.setState((state) => ({
      isLoading: !state.isLoading,
    }));
  };
  // this 2 functions (onSubmit and loadMoreImages) are very similar,
  // and I was so lazy to create a new one for short-hand without code-repeat.
  // I'm sorry)) it's better to refactor it.
  onSubmit = async (query) => {
    this.toggleLoader();

    try {
      const response = await imageApiService.fetchRequest(query);

      const imagesArray = response.hits;

      this.setState({
        imagesArray: [...imagesArray],
      });

      imagesArray.length === 0
        ? notificate('warning', 'No images found on your query')
        : notificate(
            'success',
            `${imagesArray.length} new images loaded on "${imageApiService.query}" query. Total: ${this.state.imagesArray.length}`
          );
    } catch (error) {
      notificate('error', error);
    } finally {
      this.toggleLoader();
    }
  };

  loadMoreImages = async () => {
    this.toggleLoader();
    imageApiService.nextPage();

    const currentQuery = imageApiService.query;

    try {
      const response = await imageApiService.fetchRequest(currentQuery);

      const imagesArray = response.hits;

      this.setState({
        imagesArray: [...this.state.imagesArray, ...imagesArray],
      });

      if (imagesArray.length === 0) {
        notificate('warning', 'No more images found on your query');
      } else {
        notificate(
          'success',
          `${imagesArray.length} new images loaded on "${currentQuery}" query. Total: ${this.state.imagesArray.length}`
        );
      }
    } catch (error) {
      notificate('error', error);
    } finally {
      this.toggleLoader();
    }

    scrollDown();
  };

  onClear = () => {
    this.setState({
      imagesArray: [],
    });
  };

  switchModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  onGalleryListClick = (event) => {
    if (event.target.nodeName === 'IMG') {
      const index = this.state.imagesArray.findIndex((el) => el.webformatURL === event.target.src);

      this.setState({
        modalImageIndex: index,
      });
    }

    this.switchModal();
  };

  showNextImage = () => {
    let nextIndex = this.state.modalImageIndex + 1;

    if (nextIndex >= this.state.imagesArray.length) {
      nextIndex = 0;
    }

    this.setState({
      modalImageIndex: nextIndex,
    });
  };

  showPrevImage = () => {
    let prevIndex = this.state.modalImageIndex - 1;

    if (prevIndex < 0) {
      prevIndex = this.state.imagesArray.length - 1;
    }

    this.setState({
      modalImageIndex: prevIndex,
    });
  };

  render() {
    const { imagesArray, modalImageIndex, isLoading, isModalOpen } = this.state;
    const { onSubmit, onClear, onGalleryListClick, loadMoreImages, switchModal, showNextImage, showPrevImage } = this;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={onSubmit} onClear={onClear} />

        <ImageGallery imagesArray={imagesArray} onClick={onGalleryListClick} />

        {isLoading && <Loader type="Circles" color="#00BFFF" height={100} width={100} />}

        {!!imagesArray.length && !isLoading && <LoadMoreButton loadMoreImages={loadMoreImages} />}

        {isModalOpen && (
          <Modal
            images={imagesArray}
            photoIndex={modalImageIndex}
            onClose={switchModal}
            nextImage={showNextImage}
            prevImage={showPrevImage}
          />
        )}

        <ScrollToTop showUnder={160}>
          <button type="button" className={styles.icon}>
            <ExpandLessIcon />
          </button>
        </ScrollToTop>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
