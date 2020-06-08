import React from 'react';

import './Modal.css';

const Modal = ({showModal, heading, message}) => {

  return (
    <div className="Modal textStyle">
      <section className="Modal_main">
        <div className="Form_heading">
          <h1>{heading}</h1>
          <p className="Close" onClick={() => showModal()}>X</p>
        </div>

        <div className="SocialMedia">
          <p>{message}</p>
        </div>
      </section>
    </div>
  );
};

export default Modal;
