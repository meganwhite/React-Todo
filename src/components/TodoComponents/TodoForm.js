import React from 'react';

// notes

class TodoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      todo: ''
    };
  }

  componentDidMount() {
    return localStorage.getItem('currItem') ? this.setState({todo: localStorage.getItem('currItem')}) : null
  }
  handleChanges = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value
    });
    await localStorage.setItem("currItem", this.state.item)
  };

  submitItem = e => {
    e.preventDefault();
    this.props.addItem(this.state.item);
    this.setState({item: ''})
    localStorage.setItem("currItem", '')
  };

  render() {
    return (
      <form onSubmit={this.submitItem}>
        <input
          type="text"
          value={this.state.item}
          name="item"
          onChange={this.handleChanges}
        />
        <button>Add</button>
      </form>
    );
  }
}

export default TodoForm;
