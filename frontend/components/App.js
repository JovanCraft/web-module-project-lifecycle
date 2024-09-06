import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoNameInput: '',
    displayCompleted: true
  }

  onTodoNameInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }

  resetForm = () => {
    this.setState({ ...this.state, todoNameInput: ''})
  }

  setAxiosResponseError = err => {
    this.setState({ ...this.state, error: err.response.data.message })
  }

  postTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput})
    .then(res => {
      //this.fetchTodos()//this is less efficent and calls two requests at the same time
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
      this.resetForm()

    })
    .catch(this.setAxiosResponseError)
  }
  onTodoFormSubmit = evt => {
    evt.preventDefault()
    this.postTodo()
  }

  fetchTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(this.setAxiosResponseError)
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.map(todo => {
        if(todo.id !== id){
          return todo
        } else {
          return res.data.data
        }
      }) })
    })
    .catch(this.setAxiosResponseError)
  }

  toggleDisplayCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
  }
  componentDidMount() {
    this.fetchTodos()
  }
  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <TodoList
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleCompleted={this.toggleCompleted}
        />
        <Form
          onTodoFormSubmit={this.onTodoFormSubmit}
          todoNameInput={this.state.todoNameInput}
          onTodoNameInputChange={this.onTodoNameInputChange}
          toggleDisplayCompleted={this.toggleDisplayCompleted}
          displayCompleted={this.state.displayCompleted}
        />
      </div>
    )
  }
}



