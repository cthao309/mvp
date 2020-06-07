import React from 'react';

import Card from '../Card/Card.js';

import './Practice.css';

class Practice extends React.Component {
  state = {
    data: this.props.data,
    id: 0,
    disableMoveBack: true,
    disableMoveNext: false,
    isActiveLevel: '',
    isActiveSubLevel: ''
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

  handleClickLevel(level) {
    console.log('clicked level => ', level)
    this.setState({ isActiveLevel: level })

    this.props.handleSelectLevel(level)
  }

  handleSublevelClick(sub) {
    console.log('Practice sub-level => ', sub);

    this.setState({ isActiveSubLevel: sub })
  }


  render() {
    console.log('state => ', this.state)

    let levelClasses = ['Level_selected', 'textStyle', 'hover'];
    let subLevelClasses = ['selected_SubLevel', 'textStyle', 'card_style_hover'];
    return (
      <div>
        <h2>Practice</h2>
        <ul className="Level_container">
          <li
            className={this.state.isActiveLevel === 'easy' ? levelClasses.join(' ') + ' selectedLevel' : levelClasses.join(' ')}
            onClick={this.handleClickLevel.bind(this, 'easy')} >Easy</li>
          <li
            className={this.state.isActiveLevel === 'medium' ? levelClasses.join(' ') + ' selectedLevel' : levelClasses.join(' ')}
           onClick={this.handleClickLevel.bind(this, 'medium')} >Medium</li>
          <li
            className={this.state.isActiveLevel === 'hard' ? levelClasses.join(' ') + ' selectedLevel' : levelClasses.join(' ')}
            onClick={this.handleClickLevel.bind(this, 'hard')} >Difficult</li>
        </ul>
        <ul className="Level_sub_container">
          <li
            className={this.state.isActiveSubLevel === 'viewAll' ? subLevelClasses.join(' ') + ' selectedLevel' : subLevelClasses.join(' ')}
            onClick={this.handleSublevelClick.bind(this, 'viewAll')}
            >View All Cards</li>
          <li
            className={this.state.isActiveSubLevel === 'incomplete' ? subLevelClasses.join(' ') + ' selectedLevel' : subLevelClasses.join(' ')}
            onClick={this.handleSublevelClick.bind(this, 'incomplete')}
            >View Only Incompleted</li>
          <li
            className={this.state.isActiveSubLevel === 'startPractice' ? subLevelClasses.join(' ') + ' selectedLevel' : subLevelClasses.join(' ')}
            onClick={this.handleSublevelClick.bind(this, 'startPractice')}
            >Start Practice</li>
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
