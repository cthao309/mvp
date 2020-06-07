import React from 'react';
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
    difficulty: 'easy'
  },
  {
    id: 2,
    question: 'Qui',
    answer: 'yes',
    difficulty: 'medium'
  },
  {
    id: 3,
    question: 'Merci',
    answer: 'thank you',
    difficulty: 'hard'
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
