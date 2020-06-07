import React from 'react';
import './Addcard.css';

class Addcard extends React.Component {
  state = {
    question: '',
    answer: '',
    difficulty: 'easy'
  }

  handleInputChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  clickSubmit(e) {
    e.preventDefault();
    this.props.handleAddCard(this.state)
  }

  render() {
    return (
      <div>
        <h2>Add card</h2>
        <form onSubmit={this.clickSubmit.bind(this)}>
          <div>
            <label htmlFor="question">Word:</label>
            <input
              type="text"
              name="question"
              value={this.state.question}
              onChange = {this.handleInputChange.bind(this)} ></input>
          </div>
          <div>
            <label htmlFor="answer">Answer:</label>
            <input
              type="text"
              name="answer"
              value={this.state.answer}
              onChange = {this.handleInputChange.bind(this)} ></input>
          </div>
          <div>
            <label htmlFor="difficulty">Level of Difficulty:</label>
            <select
              name="difficulty"
              value={this.state.difficulty}
              onChange={this.handleInputChange.bind(this)}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
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
