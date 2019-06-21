import React, { Component } from 'react';
import io from 'socket.io-client';
import './App.css';

export default class App extends Component {

  componentDidMount() {
    const socket = io('http://localhost:3001');
    socket.on('DATA_CENTER_NAME_EVENT', (data) => {
      console.log(data.payload);
    });
  }

  render() {
    return (
      <p>Hello world</p>
    );
  }
}
