import React from 'react';
import { Searchbar } from './Components/Searchbar/Searchbar.jsx';
import ImageApiService from './apiService/apiService.js';
import { ImageGallery } from './Components/ImageGallery/ImageGallery.jsx';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import { LoadMoreButton } from './Components/LoadMoreButton/LoadMoreButton.jsx';
import scrollDown from './utils/scrollDown.js';
import Modal from './Components/Modal/Modal.jsx';

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

  proceedResponse = (response) => {
    if (response.status === 404) {
      const notify = (message) => {
        toast.error(message);
      };
      notify('error 404');
      return;
    }

    return response.hits;
  };

  toggleLoader = () => {
    this.setState({
      isLoading: !this.state.isLoading,
    });
  };

  onSubmit = async (query) => {
    this.toggleLoader();

    try {
      const response = await imageApiService.fetchRequest(query);

      const imagesArray = await this.proceedResponse(response);

      if (imagesArray.length === 0) {
        const notify = () => {
          toast.warn('No images found on your query');
        };
        notify();
      }

      this.setState({
        imagesArray: [...imagesArray],
      });
    } catch (error) {
      const notify = () => {
        toast.error(error);
      };
      notify();
    } finally {
      this.toggleLoader();
    }
  };

  onClear = () => {
    this.setState({
      imagesArray: [],
    });
  };

  loadMoreImages = async () => {
    this.toggleLoader();
    imageApiService.nextPage();

    const currentQuery = imageApiService.query;

    try {
      const response = await imageApiService.fetchRequest(currentQuery);

      const imagesArray = await this.proceedResponse(response);

      this.setState({
        imagesArray: [...this.state.imagesArray, ...imagesArray],
      });
    } catch (error) {
      const notify = () => {
        toast.error(error);
      };
      notify();
    } finally {
      this.toggleLoader();
    }

    scrollDown();
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
        <ToastContainer />
      </div>
    );
  }
}

export default App;
