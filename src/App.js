import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    loggedIn: false,
    loading: false,
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogOut = () => {
    this.setState({
      loggedIn: false,
      loading: true
    })
    setTimeout(() => {
      axios.delete('/auth')
      .then((response) => {
        console.log(response)
        this.setState({
          loggedIn: response.data.loggedIn,
          loading: false
        })
      })
    }, 2000)
  }

  handleLogin = () => {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      axios.post('/auth', {
          password: this.state.password
        })
      .then((response) => {
        console.log(response)
        this.setState({
          loggedIn: response.data.loggedIn,
          loading: false
        })
      })
    }, 2000)
  }

  render() {

    let loggedInHtml = null
    if (this.state.loggedIn) {
      loggedInHtml = <div>
                        <p>{this.state.loggedIn}</p> 
                        <button onClick={this.handleLogOut}>Logout</button> 
                      </div>
    } else if (this.state.loading) {
      loggedInHtml = <p>loading...</p>
    } else {
      loggedInHtml = <form onSubmit={this.handleLogin}>
                        <input 
                          type="password"
                          placeholder="Enter Password..." 
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange} />
                        <button>Log In</button>
                     </form>
    }

    return (
      <div className="App">
        {loggedInHtml}
      </div>
    );
  }
}

export default App;
