import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/searchbar/SearchBar";
import LoaderPage from "./components/loader/Loader";
import ImageGallery from "./components/imageGallery/ImageGallery";
import Button from "./components/button/Button";
import Modal from "./components/modal/Modal";
const KEY = "15354044-5c6c2e030b5f90cfcf13d54e3";

class App extends Component {
  state = {
    galleryItems: [],
    isLoading: false,
    error: null,
    searchQuery: "",
    page: 1,
    largeImageUrl: null,
    openModal: false
  };
  handleSubmit = e => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    axios
      .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(data =>
        this.setState(prevState => ({
          galleryItems: [...prevState.galleryItems, ...data.data.hits]
        }))
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  componentDidMount() {
    this.handleSubmit();
  }

  handleOnSubmit = async e => {
    e.preventDefault();
    await this.setState({ galleryItems: [] });
    await this.handleSubmit();
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  buttonMore = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1 }));
    this.handleSubmit();
  };

  componentDidUpdate() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth"
    });
  }

  setLargeImage = largeImageUrl => {
    this.setState({ largeImageUrl: largeImageUrl });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(state => ({ openModal: !state.openModal }));
  };

  render() {
    const { isLoading, galleryItems, searchQuery, error } = this.state;
    return (
      <div className="App">
        <SearchBar
          handleOnSubmit={this.handleOnSubmit}
          handleChange={this.handleChange}
          searchQuery={searchQuery}
        />

        <ImageGallery galleryItems={galleryItems} onOpen={this.setLargeImage} />
        {this.state.openModal && (
          <Modal url={this.state.largeImageUrl} onClose={this.toggleModal} />
        )}
        {error && (
          <h2>Whoops, something went wrong: {error.message}, homie.</h2>
        )}
        {isLoading && (
          <div className="loaderStyle">
            <LoaderPage />
          </div>
        )}
        <Button buttonMore={this.buttonMore} />
      </div>
    );
  }
}

export default App;
