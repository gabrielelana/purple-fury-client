import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MessageHistory from "./MessageHistory.js";

import openSocket from "socket.io-client";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { username: "-", token: null, messages: [] };
  }

  componentDidMount() {
    var self = this;

    fetch("https://purple-fury.now.sh/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "gabriele",
        password: "secret"
      })
    })
      .then(res => res.json())
      .then(res => {
        self.setState({ token: res.token, username: res.username });
        console.log(res);
        const socket = openSocket(
          `https://purple-fury.now.sh/?token=${res.token}`
        );
        socket.on("messages", data => {
          self.onMessageReceived(data);
        });
      });
  }

  onMessageReceived(data) {
    console.log("from-socket", data);
    this.setState({ messages: this.state.messages.concat([data]) });
  }

  sendMessage(message) {
    fetch("https://purple-fury.now.sh/messages", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: this.state.token,
        message: message
      })
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to the chat: {this.state.username}
          </h1>
        </header>
        <MessageHistory messages={this.state.messages} />
        <button onClick={() => this.sendMessage("test message")}>
          Send Test message
        </button>
      </div>
    );
  }
}

export default App;
