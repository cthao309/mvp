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
            {this.props.card && this.props.card.question}
            <button className="Flip_card textStyle card_style_hover" onClick={this.handleClick}>Reveal</button>
          </div>

          <div className="Card_back">
            {this.props.card && this.props.card.answer}
            <button className="Flip_card textStyle card_style_hover" onClick={this.handleClick}>Hide</button>
          </div>

        </ReactCardFlip>
        <div className="Card_movement_container">
          <ul>
            <li className={this.props.disableMoveBack ? 'disable card_style_hover' : 'active card_style_hover'} onClick={() => this.props.handleCardClick(this.props.id, 'back')} >Previous</li>
            <li className="card_style_hover textStyle" onClick={() => this.props.handleCardClick(this.props.id, 'save')} >Save</li>
            <li className="card_style_hover textStyle" onClick={() => this.props.handleCardClick(this.props.id, 'completed')} >Mark As Completed</li>
            <li className={this.props.disableMoveNext ? 'disable card_style_hover' : 'active card_style_hover'} onClick={() => this.props.handleCardClick(this.props.id, 'next')} >Next</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Card;

