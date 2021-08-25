import React from 'react';
import { Searchbar } from './Components/Searchbar/Searchbar.jsx';
import ImageApiService from './ApiService/apiService.js';
import { ImageGallery } from './Components/ImageGallery/ImageGallery.jsx';
import { ToastContainer, toast } from 'react-toastify';

import styles from './Components/AppComponent/App.module.scss';
import debounce from 'lodash.debounce';

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
      // errorMessage(404);
      console.log('404');
      return;
    }

    return response.hits;
  };

  onSubmit = async (query) => {
    const response = await imageApiService.fetchRequest(query);

    const imagesArray = await this.proceedResponse(response);

    if (imagesArray.length === 0) {
      // warningMessage();
      console.log('warning');
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

  render() {
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.onSubmit} onClear={this.onClear} />
        <ImageGallery imagesArray={this.state.imagesArray} />
      </div>
    );
  }
}

export default App;
