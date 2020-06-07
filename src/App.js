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

import './App.css';

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'Bonjour',
    answer: 'hello',
    difficulty: 'easy',
    completed: false
  },
  {
    id: 2,
    question: 'Qui',
    answer: 'yes',
    difficulty: 'medium',
    completed: false
  },
  {
    id: 3,
    question: 'Merci',
    answer: 'thank you',
    difficulty: 'hard',
    completed: false
  }
]

class App extends React.Component {
  state = {
    flashcard: SAMPLE_FLASHCARDS
  }

  componentDidMount() {
    let data = SAMPLE_FLASHCARDS;
    let len = SAMPLE_FLASHCARDS.length;
    let lastMessage = {
      id: len,
      question: 'Finished',
      answer: 'Congratuation'
    }

    data.push(lastMessage)
    this.setState({ flashcard: data})
  }

  handleSelectLevel(el) {
    console.log('Select level: ', el)
    axios.get(`http://localhost:5555/api/v1/${el}`)
      .then(data => {
        console.log('Ajax call (data) => ', data)
      })
      .catch(err => console.log(err))
  }

  handleSaveData(data) {
    console.log('Save data => ', data)
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link className="links active" to="/">Home</Link>
                </li>
                <li>
                  <Link className="links" to="/practice">Practice</Link>
                </li>
                <li>
                  <Link className="links" to="/addcard">Add Card</Link>
                </li>
              </ul>
            </nav>

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
                <Addcard />
              </Route>
              <Route path="/">
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
