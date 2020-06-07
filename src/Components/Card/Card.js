import React from 'react';
import ReactCardFlip from 'react-card-flip';

import './Card.css';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    return (
      <div>
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="vertical" >
          <div className="Card_front" >
          {this.props.card.question}
            {/* <div>{this.props.card.question}</div> */}
            <button className="Flip_card" onClick={this.handleClick}>Reveal</button>
          </div>

          <div className="Card_back">
          {this.props.card.answer}
            {/* <div>{this.props.card.answer}</div> */}
            <button className="Flip_card" onClick={this.handleClick}>Hide</button>
          </div>

        </ReactCardFlip>
        <div className="Card_movement">
          <ul>
            <li onClick={() => this.props.handleCardClick(this.props.id, 'back')} >Previous</li>
            <li>Save</li>
            <li onClick={() => this.props.handleCardClick(this.props.id, 'next')} >Next</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Card;

