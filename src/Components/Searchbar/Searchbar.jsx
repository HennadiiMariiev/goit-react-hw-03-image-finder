import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

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

    this.props.onSubmit(this.state.inputValue.trim());
  };

  isEmptyQuery = async () => {
    if (this.state.inputValue.trim() === '') {
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

            <button type="submit" className={SearchForm__button} disabled={this.state.inputValue.trim() === ''}>
              <SearchIcon className={Material__icon} />
              <span className={SearchForm__label}>Search</span>
            </button>
            <button type="button" className={SearchForm__button} onClick={this.clearInput}>
              <ClearIcon className={Material__icon} />
              <span className={SearchForm__label}>Clear</span>
            </button>
          </form>
        </header>
      </>
    );
  }
}

export { Searchbar };
