import React from 'react';
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from '../components/todoItemClass';
import Axios from 'axios';


class TodoPage extends React.Component {
    state = {
      todoList: [],
      inputTodo: ""
    }
  
    fetchTodo = () => {
      Axios.get("http://localhost:2000/todo")
      .then((response) => {
        // alert("Helloooo");
        console.log(response.data)
        this.setState({todoList: response.data})
      })
      .catch((err) => {
          alert("Terjadi kesalahan !")
      })
  }
  
    deleteTodo = (id) => {
      Axios.delete(`http://localhost:2000/todo/${id}`) 
      .then(() => {
        alert("Berhasil delete todo!");
        this.fetchTodo()
      })
      .catch((err) => {
        alert("Terjadi kesalahan !")
    })
    }
  
    completeTodo = (id) => {
      Axios.patch(`http://localhost:2000/todo/${id}`, {
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
      return this.state.todoList.map((val) => {
        return (
          <TodoItem 
          completeTodoHandler={this.completeTodo} 
          deleteTodoHandler={this.deleteTodo} 
          todoData={val} />
        )
      })
    }
  
    addTodo = () => {
      Axios.post("http://localhost:2000/todo", {
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
          { this.renderTodoList() }
          <div>
          <input onChange={this.inputHandler} type="text" className="mx-3"/>
          <button onClick={this.addTodo} className="btn btn-primary">Add Todo</button> 
          </div>
        </div>
      );
    }
  }
  
  export default TodoPage;