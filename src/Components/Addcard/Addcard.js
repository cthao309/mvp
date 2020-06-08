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
    this.setState({
      question: '',
      answer: '',
      difficulty: 'easy'
    });

    e.preventDefault();
    this.props.handleAddCard(this.state)
  }

  render() {
    return (
      <div>
        <h2 className="textStyle">Add card</h2>
        <form className="Form_addcard" onSubmit={this.clickSubmit.bind(this)}>
          <div className="Form_fields">
            <label className="textStyle" htmlFor="question">Word:</label>
            <input
              type="text"
              name="question"
              value={this.state.question}
              onChange = {this.handleInputChange.bind(this)} ></input>
          </div>
          <div className="Form_fields">
            <label className="textStyle" htmlFor="answer">Answer:</label>
            <input
              type="text"
              name="answer"
              value={this.state.answer}
              onChange = {this.handleInputChange.bind(this)} ></input>
          </div>
          <div className="Form_fields">
            <label className="textStyle" htmlFor="difficulty">Level of Difficulty:</label>
            <select
              name="difficulty"
              value={this.state.difficulty}
              onChange={this.handleInputChange.bind(this)}>
              <option className="textStyle" value="easy">Easy</option>
              <option className="textStyle" value="medium">Medium</option>
              <option className="textStyle" value="hard">Hard</option>
            </select>
          </div>
          <div>
            <button className="textStyle">Add card</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Addcard;
