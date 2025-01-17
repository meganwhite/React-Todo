import React from 'react';
import TodoList from './components/TodoComponents/TodoList'
import TodoForm from './components/TodoComponents/TodoForm'
import './components/TodoComponents/Todo.css';
import './styles.scss'

const todoData = [
  {
    task: 'Organize Garage',
    id: 1528817077286,
    completed: false
  },
  {
    task: 'Bake Cookies',
    id: 1528817084358,
    completed: false
  }
];

class App extends React.Component {
  // you will need a place to store your state in this component.
  // design `App` to be the parent component of your application.
  // this component is going to take care of state, and any change handlers you need to work with your state
  constructor() {
    super();
    this.state = {
      name: 'Megan',
      todo: todoData,
    };
  }

  componentDidMount() {
    return localStorage.getItem('todos') ? this.setState({todo: JSON.parse(localStorage.getItem('todos'))}) : null
  }

  toggleItem = id => {
    console.log(id);
    this.setState({
      todo: this.state.todo.map(item => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed
          };
        } else {
          return item;
        }
      })
    });
  };

  addItem = async itemName => {
    const newItem = {
      task: itemName,
      id: Date.now(),
      completed: false
    };
    await this.setState({
      todo: [...this.state.todo, newItem]
    })
    localStorage.setItem("todos", JSON.stringify(this.state.todo))
  };

  clearCompleted = async () => {
    await this.setState({
      todo: this.state.todo.filter(item => !item.completed)
    });
    localStorage.setItem('todos', JSON.stringify(this.state.todo))
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>{this.state.name}'s To-do List</h1>
          <TodoForm addItem={this.addItem} />
        </div>
        <TodoList
          todo={this.state.todo}
          toggleItem={this.toggleItem}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

export default App;