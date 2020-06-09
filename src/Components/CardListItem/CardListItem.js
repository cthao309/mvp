import React from 'react';

class CardListEntry extends React.Component {
  constructor(props) {
    super(props);

    console.log('CardListItem => ', this.props)

    // initialize the state
    this.state = {
      isDone: false,
      isEditing: false,
      id: this.props.id,
      _id: this.props._id,
      question: this.props.item.question,
      answer: this.props.item.answer,
      difficulty: this.props.item.difficulty === undefined ? 'easy' : this.props.item.difficulty,
      oldLevel: this.props.item.difficulty === undefined ? 'easy' : this.props.item.difficulty,
      completed: this.props.item.completed === undefined ? 'false' : this.props.item.completed
    }

    this.forceReRender = this.forceReRender.bind(this);
    this.toggleUI = this.toggleUI.bind(this);
    this.handleEditList = this.handleEditList.bind(this);
    this.handleRemoveItemFromList = this.handleRemoveItemFromList.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClickOnList(e) {
    this.setState({
      isDone: !this.state.isDone
    });
  }

  toggleUI() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleEditList(event) {
    console.log('Modified obj => ', this.state)

    // invoke the handleClickOnEditList method to update the DOM
    this.props.handleClickOnEditList(this.state);

    this.forceReRender();
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  forceReRender(event) {
    this.setState({
      isEditing: !this.state.isEditing,
      // question: this.props.item.question,
      // answer: this.props.item.answer,
      // difficulty: this.props.item.difficulty === undefined ? 'easy' : this.props.item.difficulty,
      // oldLevel: this.props.item.difficulty === undefined ? 'easy' : this.props.item.difficulty,
      // completed: this.props.item.completed === undefined ? 'false' : this.props.item.completed
     });
  }

  handleRemoveItemFromList(event) {
    console.log('deleting => ', event.props.item.difficulty, event.props.item._id)

    // invoke the method to modify the grocery list
    this.props.removeListItem(event.props.item._id, event.props.item.difficulty)
  }
  render() {

    console.log('CardListItem (render) =>[state]: ', this.statte)
    let classes = [];
    if(this.state.isDone) { classes.push('done')}

    return (
      this.state.isEditing ? (<tr>
          <td>
            {this.props.id}
          </td>
          <td>
            <input
              onChange = {this.handleInputChange}
              type='text'
              name="question"
              placeholder={this.state.question}
              value={this.state.question} >
            </input>
          </td>
          <td>
            <input
              onChange = {this.handleInputChange}
              type='text'
              name="answer"
              placeholder={this.state.answer}
              value={this.state.answer}>
            </input>
          </td>
          <td>
            <select
              name="difficulty"
              value={this.state.difficulty}
              onChange={this.handleInputChange}>
              <option className="textStyle" value="easy">Easy</option>
              <option className="textStyle" value="medium">Medium</option>
              <option className="textStyle" value="hard">Hard</option>
            </select>
          </td>
          <td>
            <select
              name="completed"
              value={this.state.completed}
              onChange={this.handleInputChange}>
              <option className="textStyle" value="false">False</option>
              <option className="textStyle" value="true">True</option>
            </select>
          </td>
          <td>
            <span onClick = {(event) => this.handleEditList(this, event)} className="editMode"> <i className="fa fa-database"></i> </span>
            <span onClick = {(event) => this.forceReRender(this, event)} className="editMode"> <i className="fa fa-remove"></i> </span>
          </td>
        </tr>
        ):
        (
          <tr>
            <td>
              {this.props.id + 1}
            </td>
            <td onClick = {() => this.handleClickOnList(this)} className = {classes.join(' ') + ' question'}>
              {this.props.item.question}
            </td>
            <td onClick = {() => this.handleClickOnList(this)} className = {classes.join(' ') + ' answer'}>
              {this.props.item.answer}
            </td>
            <td onClick = {() => this.handleClickOnList(this)} className = {classes.join(' ') + ' difficulty'}>
              {this.props.item.difficulty}
            </td>
            <td onClick = {() => this.handleClickOnList(this)} className = {classes.join(' ') + ' completed'}>
              {this.props.item.completed ? 'True' : 'False'}
            </td>
            <td>
              <span onClick = {(event) => this.toggleUI(this, event)} className="editMode"> <i className="fa fa-edit"></i> </span>
              <span onClick = {(event) => this.handleRemoveItemFromList(this, event)} className="editMode"> <i className="fa fa-trash"></i> </span>
            </td>
          </tr>
        )
    )
  }
}

// export the component
export default CardListEntry;