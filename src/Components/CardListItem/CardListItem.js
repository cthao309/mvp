import React from 'react';

class CardListEntry extends React.Component {
  constructor(props) {
    super(props);

    console.log('list entry => ', this.props)
    // initialize the state
    this.state = {
      isDone: false,
      isEditing: false,
      id: this.props.id,
      db_id: this.props.db_id,
      question: this.props.item.question,
      answer: this.props.item.answer,
      difficulty: this.props.item.difficulty,
      completed: this.props.item.completed || 'false'
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
    let oldItemId = event.props.item.id;

    let modifiedGroceryItem = {
      item: this.state.item,
      quantity: this.state.quantity
    }

    // invoke the handleClickOnEditList method to update the DOM
    // this.props.handleClickOnEditList(oldItemId, modifiedGroceryItem);

    this.forceReRender();
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  forceReRender(event) {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleRemoveItemFromList(event) {
    let clickedItemId = event.props.item.id;

    // invoke the method to modify the grocery list
    // this.props.removeListItem(clickedItemId)
  }
  render() {

    let classes = [];
    if(this.state.isDone) { classes.push('done')}

    console.log('Card item => ', this.props)

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
            <input
              onChange = {this.handleInputChange}
              type='text'
              name="difficulty"
              placeholder={this.state.difficulty}
              value={this.state.difficulty}>
            </input>
          </td>
          <td>
            <input
              onChange = {this.handleInputChange}
              type='text'
              name="completed"
              placeholder={this.state.completed}
              value={this.state.completed}>
            </input>
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
              {this.props.item.completed !== undefined ? this.props.item.completed : 'false'}
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