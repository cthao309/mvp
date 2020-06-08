import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Components/Home/Home.js';
import Practice from './Components/Practice/Practice.js';
import Addcard from './Components/Addcard/Addcard.js';
import CreateAccount from './Components/CreateAccount/CreateAccount.js';
import Login from './Components/Login/Login.js';
import Modal from './Components/Modal/Modal.js';

import './App.css';

import dummyData from './dummyData.js';

let lastMessage = {
  question: 'Finished',
  answer: 'Congrats'
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      flashcard: [],
      dataLen: 0,
      showModal: false,
      message: '',
      showNav: false
    }
  }

  componentDidMount() {
    lastMessage.id = dummyData.length;
    dummyData.push(lastMessage);
    this.setState({ flashcard: dummyData})
  }

  handleSelectLevel(el) {
    console.log('Select level: ', el)
    axios.get(`http://localhost:5555/api/v1/${el}`)
      .then(({data}) => {
        console.log('Ajax call (data) => ', data);

        lastMessage.id = data.length;

        data.push(lastMessage)

        this.setState({
          flashcard: data,
         })
      })
      .catch(err => console.log('Error GET => ', err))
  }

  handleSaveData(data) {
    console.log('Save data => ', data)
  }

  handleAddCard(obj) {
    axios.post(`http://localhost:5555/api/v1/`, obj)
      .then(res => {
        console.log('POST call (res) => ', res)
        if(res.data !== 'Card is created') {
          this.setState({
            showModal: true,
            message: res.data
          });
        } else {
          this.setState({
            showModal: true,
            message: res.data
          });
        }
      })
      .catch(err => console.log('Error POST => ', err))
  }

  handleNavigationClick(page) {
    this.setState({ page: page });
  }

  showModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleCreateAccount(userInfo) {
    console.log('Creating user Account')
  }

  handleLogin(userInfo) {
    console.log('Processing user log in')
  }

  showNav() {
    console.log('toggle menu...')
    this.setState({ showNav: !this.state.showNav })
  }

  render() {

    console.log('App.js (data) => ', this.state.flashcard)
    let classes = ['links', 'textStyle', 'hover'];

    return (
      <div className="App">
        <div id="menuToggle">
          <input type="checkbox" onClick={this.showNav.bind(this)} />
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Router>
          <div className="App_container">
            {this.state.showNav ?
              <nav className="Nav_container">
                <ul className="Navigation">
                  <li>
                    <Link
                      className={this.state.page === 'home' ? classes.join(' ') + ' active' : classes.join(' ')}
                      onClick={this.handleNavigationClick.bind(this, 'home')}
                      to="/">
                        Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={this.state.page === 'practice' ? classes.join(' ') + ' active' : classes.join(' ')}
                      onClick={this.handleNavigationClick.bind(this, 'practice')}
                      to="/practice">Practice</Link>
                  </li>
                  <li>
                    <Link
                      className={this.state.page === 'addcard' ? classes.join(' ') + ' active' : classes.join(' ')}
                      onClick={this.handleNavigationClick.bind(this, 'addcard')}
                      to="/addcard">Add Card</Link>
                  </li>
                  <li>
                    <Link
                      className={this.state.page === 'createAccount' ? classes.join(' ') + ' active' : classes.join(' ')}
                      onClick={this.handleNavigationClick.bind(this, 'createAccount')}
                      to="/createAccount">Create Account</Link>
                  </li>
                  <li>
                    <Link
                      className={this.state.page === 'login' ? classes.join(' ') + ' active' : classes.join(' ')}
                      onClick={this.handleNavigationClick.bind(this, 'login')}
                      to="/login">Sign-in</Link>
                  </li>
                </ul>
              </nav> : <nav className="Empty_nav"></nav>
            }

            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/practice">
                <Practice
                  data={this.state.flashcard}
                  handleSelectLevel={this.handleSelectLevel.bind(this)}
                  handleSaveData={this.handleSaveData.bind(this)}
                />
              </Route>
              <Route path="/addcard">
                <Addcard handleAddCard={this.handleAddCard.bind(this)} />
                {this.state.showModal ? <Modal showModal={this.showModal.bind(this)} message={this.state.message} heading={'Creating Card'}/> : ''}
              </Route>
              <Route path="/createAccount">
                <CreateAccount handleCreateAccount={this.handleCreateAccount.bind(this)} />
              </Route>
              <Route path="/login">
                <Login handleLogin={this.handleLogin.bind(this)} />
              </Route>
              <Route path="/">
                <Home />
              </Route>
              <Route path="*">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
