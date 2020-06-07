import React from 'react';
import './Addcard.css';

class Addcard extends React.Component {
  state = {

  }

  render() {
    return (
      <div>
        <h2>Add card</h2>
        <form>
          <div>
            <label htmlFor="question">Word:</label>
            <input type="text" ></input>
          </div>
          <div>
            <label htmlFor="answer">Answer:</label>
            <input type="text" ></input>
          </div>
          <div>
            <label for="cars">Level of Difficulty:</label>
            <select id="cars">
              <option value="volvo">Easy</option>
              <option value="saab">Medium</option>
              <option value="vw">Hard</option>
            </select>
          </div>
          <div>
            <button>Add card</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Addcard;
