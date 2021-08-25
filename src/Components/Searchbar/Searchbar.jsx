import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { ToastContainer, toast } from 'react-toastify';

import styles from './Searchbar.module.scss';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
    };
  }

  clearInput = () => {
    this.setState({
      inputValue: '',
    });

    this.props.onClear();
  };

  onInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  onFormSubmit = (event) => {
    event.preventDefault();

    if (this.isEmptyQuery()) {
      return;
    }

    this.props.onSubmit(this.state.inputValue.trim());
  };

  isEmptyQuery = () => {
    if (this.state.inputValue.trim() === '') {
      const notify = () => {
        toast.warn('Search query is empty.');
      };
      notify();
      return true;
    }
  };

  render() {
    const inputValue = this.state.inputValue;

    const {
      Searchbar,
      Searchbar__title,
      SearchForm,
      SearchForm__button,
      SearchForm__label,
      SearchForm__input,
      Material__icon,
    } = styles;

    return (
      <>
        <header className={Searchbar}>
          <h1 className={Searchbar__title}>Image finder</h1>
          <form className={SearchForm} onSubmit={this.onFormSubmit}>
            <input
              className={SearchForm__input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={inputValue}
              onChange={this.onInputChange}
            />

            <button type="submit" className={SearchForm__button}>
              <SearchIcon className={Material__icon} />
              <span className={SearchForm__label}>Search</span>
            </button>
            <button type="button" className={SearchForm__button} onClick={this.clearInput}>
              <ClearIcon className={Material__icon} />
              <span className={SearchForm__label}>Clear</span>
            </button>
          </form>
        </header>
        <ToastContainer />
      </>
    );
  }
}

export { Searchbar };
