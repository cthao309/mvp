import React from 'react';
import Modal from '../Modal/Modal.js';

import './CreateAccount.css';

class CreateAccount extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    password: '',
    verify_password: '',
    showModal: false
  }

  handleInputChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  clickSubmit(e) {
    e.preventDefault();

    if(this.state.verify_password !== this.state.password) {
      this.setState({
        showModal: !this.state.showModal,
        message: 'Password does not match'
      });
    } else {
      this.setState({
        first_name: '',
        last_name: '',
        password: '',
        verify_password: '',
        message: 'Successfully Created Account'
      });

      this.props.handleCreateAccount(this.state)
    }
  }

  showModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <div>
        <h2 className="textStyle">Create Account</h2>
        <form className="Form_create_account" onSubmit={this.clickSubmit.bind(this)}>
          <div className="Form_fields">
            <label className="textStyle" htmlFor="first_name">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={this.state.first_name}
              onChange = {this.handleInputChange.bind(this)} ></input>
          </div>
          <div className="Form_fields">
            <label className="textStyle" htmlFor="last_name">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={this.state.last_name}
              onChange = {this.handleInputChange.bind(this)} ></input>
          </div>
          <div className="Form_fields">
            <label className="textStyle" htmlFor="password">password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange = {this.handleInputChange.bind(this)} ></input>
          </div>
          <div className="Form_fields">
            <label className="textStyle" htmlFor="verify_password">password:</label>
            <input
              type="password"
              name="verify_password"
              value={this.state.verify_password}
              onChange = {this.handleInputChange.bind(this)} ></input>
          </div>
          <div>
            <button className="textStyle">Create Account</button>
          </div>
        </form>
        {this.state.showModal ? <Modal showModal={this.showModal.bind(this)} message={this.state.message} heading={'Creating Account'} /> : ''}
      </div>
    )
  }
}

export default CreateAccount;