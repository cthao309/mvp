import React from 'react';

import Card from '../Card/Card.js';

import './Practice.css';

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
  },
  {
    id: 4,
    question: 'Finished',
    answer: 'Congrats'
  }
]

class Practice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: SAMPLE_FLASHCARDS,
      index: 0,
      disableMoveBack: true,
      disableMoveNext: false,
      isActiveLevel: '',
      isLevelSelected: false,
      isActiveSubLevel: ''
    }

    console.log('testing practice => ', this.props.data)
  }

  componentDidMount() {
    console.log('data => ', this.props.data);

    this.setState({ flashcard: this.props.data })
  }

  handleCardClick(index, move) {
    console.log('(handleCardClick) index => ', index);

    switch(move) {
      case 'back':
        if(index !== 0) {
          console.log('move back a card...')
          index = index - 1;
          this.setState({ index: index })
        } else {
          this.setState({
            disableMoveBack: true,
            disableMoveNext: false
          })
        }
        break;
      case 'next':
        if(index !== this.state.data.length -1) {
          index = index + 1;
          this.setState({ index: index })
          this.setState({
            disableMoveBack: false,
            disableMoveNext: false
           })
        } else {
          this.setState({  disableMoveNext: true })
        }
        console.log('move to the next card...', `index: ${index}, state.index: ${this.state.index} length: ${this.state.data.length}`)
        break;
      case 'save':
        console.log('save...')
        this.props.handleSaveData([])
        break;
      case 'completed':
        console.log('mark completed...')
        let data = this.state.data;
        data.completed = true;

        this.state.data[index] = data;
        console.log('testing completed field => ', this.state)
        break;
      default:
        if(this.state.index === 0) {
          this.setState({ disableMoveNext: true })
        }
        break;
    }
  }

  handleClickLevel(level) {
    // console.log('clicked level => ', level);

    this.setState({
      isActiveLevel: level,
      isLevelSelected: true
     })

    this.props.handleSelectLevel(level)
  }

  handleSublevelClick(sub) {
    // console.log('Practice sub-level => ', sub);

    this.setState({ isActiveSubLevel: sub })
  }


  render() {
    // console.log('Practice (state) => ', this.state)

    let levelClasses = ['Level_selected', 'textStyle', 'hover'];
    let subLevelClasses = ['selected_SubLevel', 'textStyle', 'card_style_hover'];
    return (
      <div>
        <h2>Practice</h2>
        <p> Select the level you wish to practice on</p>
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
        {this.state.isLevelSelected ?
          (<ul className="Level_sub_container">
            <li
              className={this.state.isActiveSubLevel === 'viewAll' ? subLevelClasses.join(' ') + ' selectedLevel' : subLevelClasses.join(' ')}
              onClick={this.handleSublevelClick.bind(this, 'viewAll')}
              >View Cards</li>
            <li
              className={this.state.isActiveSubLevel === 'incomplete' ? subLevelClasses.join(' ') + ' selectedLevel' : subLevelClasses.join(' ')}
              onClick={this.handleSublevelClick.bind(this, 'incomplete')}
              >View Incompleted</li>
            <li
              className={this.state.isActiveSubLevel === 'startPractice' ? subLevelClasses.join(' ') + ' selectedLevel' : subLevelClasses.join(' ')}
              onClick={this.handleSublevelClick.bind(this, 'startPractice')}
              >Start Practice</li>
          </ul>)
          : ''
        }
        <Card
          card={this.state.data[this.state.index]}
          id={this.state.index}
          handleCardClick={this.handleCardClick.bind(this)}
          disableMoveBack={this.state.disableMoveBack}
          disableMoveNext={this.state.disableMoveNext}
        />
      </div>
    )
  }
}

export default Practice;
