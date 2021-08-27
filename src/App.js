import React from 'react';
import { Searchbar } from './Components/Searchbar/Searchbar.jsx';
import ImageApiService from './apiService/apiService.js';
import { ImageGallery } from './Components/ImageGallery/ImageGallery.jsx';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styles from './Components/AppComponent/App.module.scss';
import debounce from 'lodash.debounce';
import { LoadMoreButton } from './Components/LoadMoreButton/LoadMoreButton.jsx';
import scrollDown from './utils/scrollDown.js';

const imageApiService = new ImageApiService();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagesArray: [],
    };
  }

  componentDidUpdate() {}

  proceedResponse = (response) => {
    if (response.status === 404) {
      const notify = (message) => {
        toast.error(message);
      };
      notify('error 404');
      console.log('404');
      return;
    }

    return response.hits;
  };

  onSubmit = async (query) => {
    const response = await imageApiService.fetchRequest(query);

    const imagesArray = await this.proceedResponse(response);

    if (imagesArray.length === 0) {
      const notify = () => {
        toast.warn('No images founded on your query');
      };
      notify();
      return;
    }

    this.setState({
      imagesArray: [...imagesArray],
    });
  };

  onClear = () => {
    this.setState({
      imagesArray: [],
    });
  };

  loadMoreImages = async () => {
    imageApiService.nextPage();

    const currentQuery = imageApiService.query;

    const response = await imageApiService.fetchRequest(currentQuery);

    const imagesArray = await this.proceedResponse(response);

    this.setState({
      imagesArray: [...this.state.imagesArray, ...imagesArray],
    });

    scrollDown();
  };

  render() {
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onSubmit} onClear={this.onClear} />
        <ImageGallery imagesArray={this.state.imagesArray} />
        {this.state.imagesArray.length !== 0 && <LoadMoreButton loadMoreImages={this.loadMoreImages} />}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
