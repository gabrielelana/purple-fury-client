import React, { Component } from "react";

class MessageHistory extends Component {
  render() {
    return (
      <div>
        <h1>Messaggi</h1>
        <ul>
          {this.props.messages.map(message => {
            return (
              <li key={message._id}>
                {message.username}: {message.message}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MessageHistory;
