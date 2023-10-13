import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
  }
  fetchTodos = () => {
    axios.get(URL)
    .then(res => {
      
    })
    .catch()
  }
  componentDidMount() {

  }
  render() {
    return null
  }
}
