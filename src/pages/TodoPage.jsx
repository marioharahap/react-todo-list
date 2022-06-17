import React from 'react';
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from '../components/todoItemClass';
import Axios from 'axios';


class TodoPage extends React.Component {
  state = {
    todo: [],
    inputTodo: ""
  }

  url = 'https://my-json-server.typicode.com/marioharahap/react-todo-list/todo'

  fetchTodo = () => {
    Axios.get(this.url)
      .then((response) => {
        // alert("Helloooo");
        console.log(response.data)
        this.setState({ todo: response.data })
      })
      .catch((err) => {
        alert("Terjadi kesalahan !")
      })
  }

  deleteTodo = (id) => {
    Axios.delete(`${this.url}/${id}`)
      .then(() => {
        alert("Berhasil delete todo!");
        this.fetchTodo()
      })
      .catch((err) => {
        alert("Terjadi kesalahan !")
      })
  }

  completeTodo = (id) => {
    Axios.patch(`${this.url}/${id}`, {
      isFinished: true
    })
      .then(() => {
        alert("Berhasil complete todo!")
        this.fetchTodo()
      })
      .catch((err) => {
        alert("Terjadi kesalahan !")
      })
  }

  renderTodoList = () => {
    return this.state.todo.map((todoItem) => {
      return (
          <TodoItem key={todoItem.id}
            completeTodoHandler={this.completeTodo}
            deleteTodoHandler={this.deleteTodo}
            todoData={todoItem} 
          />
      )
    })
  }

  addTodo = () => {
    Axios.post(`${this.url}`, {
      activity: this.state.inputTodo,
      isFinished: false,
    })
      .then(() => {
        alert("Berhasil menambahkan Todo!")
        this.fetchTodo()
      })
      .catch((err) => {
        alert("Terjadi kesalahan !")
      })
  }



  inputHandler = (event) => {
    this.setState({ inputTodo: event.target.value });
  }

  componentDidMount() {
    this.fetchTodo()
  }

  // componentDidUpdate() {
  //   alert("Component UPDATE")
  // }


  render() {
    // alert("component RENDER")
    return (
      <div>
        <h1>Todo List</h1>
        <button className="btn btn-info" onClick={this.fetchTodo}>Get My Todo List</button>
        {this.renderTodoList()}
        <div>
          <input onChange={this.inputHandler} type="text" className="mx-3" />
          <button onClick={this.addTodo} className="btn btn-primary">Add Todo</button>
        </div>
      </div>
    );
  }
}

export default TodoPage;