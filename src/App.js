import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import openSocket from 'socket.io-client'

fetch('https://purple-fury.now.sh/login', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: "gabriele",
    password: "secret",
  })
}).then(res => res.json())
  .then(
    res => {
      console.log(res)
      const socket = openSocket(`https://purple-fury.now.sh/?token=${res.token}`)
      socket.on('messages', data => {
        console.log('from-socket', data)
      })

      fetch('https://purple-fury.now.sh/messages', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: res.token,
          message: "Hello World!",
        })
      })
    }
  )

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
