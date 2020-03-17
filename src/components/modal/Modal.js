import React, { Component, createRef } from "react";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillMount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = ({ key }) => {
    if (key === "Escape") {
      this.props.onClose();
    }
  };

  closeByClick = ({ target, currentTarget }) => {
    if (target !== currentTarget) {
      this.props.onClose();
    }
  };

  backdropRef = createRef();

  handleBackdropClick = e => {
    const { current } = this.backdropRef;
    if (current && e.target !== current) {
      return;
    }
    this.props.onClose();
  };

  render() {
    const { url } = this.props;
    return (
      <div
        className="Overlay"
        onClick={this.handleBackdropClick}
        ref={this.backdropRef}
      >
        <div onClick={this.closeByClick} className="Modal">
          <img src={url} alt="img" />
        </div>
      </div>
    );
  }
}

export default Modal;
