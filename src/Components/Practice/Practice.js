import React from 'react';

import Card from '../Card/Card.js';

import './Practice.css';

class Practice extends React.Component {
  state = {
    data: this.props.data,
    id: 0
  }

  componentDidMount() {
    console.log('data => ', this.state.data)
  }

  handleCardClick(id, move) {
    console.log('Save current state...', id)
    if(id !== 0 && move === 'back') {
      console.log('move back a card...')
      id = id - 1;
      this.setState({ id: id })
    } else if(id !== this.state.data.lenght -1 && move === 'next') {
      id = id + 1;
      this.setState({ id: id })
      console.log('move to the next card...', `id: ${id}, length: ${this.state.data.length}`)
    }  else {
      console.log('stay at the front card...', `id: ${id}, length: ${this.state.data.length}`)
      id = 0;
      this.setState({ id: id})
    }
  }

  render() {

    return (
      <div>
        <h2>Practice</h2>
        <ul className="Level_selection">
          <li onClick={() => this.props.handleSelectLevel('easy')}>Easy</li>
          <li onClick={() => this.props.handleSelectLevel('medium')}>Medium</li>
          <li onClick={() => this.props.handleSelectLevel('hard')}>Difficult</li>
        </ul>
        <Card
          card={this.state.data[this.state.id]}
          id={this.state.id}
          handleCardClick={this.handleCardClick.bind(this)}
        />
      </div>
    )
  }
}

export default Practice;
