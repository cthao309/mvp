import React from 'react';

import Card from '../Card/Card.js';

import './Practice.css';

class Practice extends React.Component {
  state = {
    data: this.props.data,
    id: 0,
    disableMoveBack: true,
    disableMoveNext: false
  }

  componentDidMount() {
    console.log('data => ', this.state.data)
  }

  handleCardClick(id, move) {
    console.log('(handleCardClick) id => ', id);

    switch(move) {
      case 'back':
        if(id !== 0) {
          console.log('move back a card...')
          id = id - 1;
          this.setState({ id: id })
        } else {
          this.setState({
            disableMoveBack: true,
            disableMoveNext: false
          })
        }
        break;
      case 'next':
        if(id !== this.state.data.length -1) {
          id = id + 1;
          this.setState({ id: id })
          this.setState({
            disableMoveBack: false,
            disableMoveNext: false
           })
        } else {
          this.setState({  disableMoveNext: true })
        }
        console.log('move to the next card...', `id: ${id}, state.id: ${this.state.id} length: ${this.state.data.length}`)
        break;
      case 'save':
        console.log('save...')
        this.props.handleSaveData([])
        break;
      case 'completed':
        console.log('mark completed...')
        let data = this.state.data;
        data.completed = true;

        this.state.data[id] = data;
        console.log('testing completed field => ', this.state)
        break;
      default:
        if(this.state.id === 0) {
          this.setState({ disableMoveNext: true })
        }
        break;
    }
  }


  render() {
    console.log('state => ', this.state)
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
          disableMoveBack={this.state.disableMoveBack}
          disableMoveNext={this.state.disableMoveNext}
        />
      </div>
    )
  }
}

export default Practice;
