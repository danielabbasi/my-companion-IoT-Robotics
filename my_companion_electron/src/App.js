import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';
import ImageView from './Components/ImageView';
import NotificationPrompt from './Components/NotificationPrompt';
import './App.css';
const ROSLIB = require('roslib');

const ros = new ROSLIB.Ros({
      url: 'ws://localhost:9090'
});

const topic = new ROSLIB.Topic({
      ros : ros,
      name : '/speech/input',
      messageType: 'std_msgs/String'
});

const temperature = new ROSLIB.Topic({
      ros : ros,
      name : '/temperature',
      messageType: 'my_companion/Temperature'
});

const twitter = new ROSLIB.Topic({
  ros: ros,
  name: '/twitter/tweet',
  messageType: 'my_companion/Twitter'
});

twitter.subscribe(function(message) {
  console.log(message.tweets[0].permalink)
})

temperature.subscribe(function(message) {
     console.log('Received message on ' + temperature.name + ': ' +  'Temperature: ' + message.temperature + ' Sensor Name: ' + message.sensorName);
     const url = 'http://localhost:8080/api/temperatures/';
     fetch(url, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
           'Content-Type': 'application/json',
        }
     })
     .then(res => res.json())
     .then(response => console.log('Success:', JSON.stringify(response)))
});

ros.on('connection', () => {
      console.log('Connected to websocket server.');

      const message = new ROSLIB.Message({
          data: "Hello world"
      });

      topic.publish(message);
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      audio: null,
      IVStatus: false,
      NPStatus: false
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
    this.showImageView = this.showImageView.bind(this);
    this.showNotificationPrompt = this.showNotificationPrompt.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  componentDidMount() {
    this.getMicrophone();
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  showImageView() {
    if (this.state.IVStatus) {
      this.setState({IVStatus: false});
    } else {
      this.setState({IVStatus: true});
    }
  }

  showNotificationPrompt() {
    if (this.state.NPStatus) {
      this.setState({NPStatus: false});
    } else {
      this.setState({NPStatus: true});
    }
  }

  handleSubmit(event) {
    const message = new ROSLIB.Message({
      data: this.state.value
    });
    topic.publish(message);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <div className="controls">
          {<button onClick={this.toggleMicrophone}>
            {this.state.audio ? 'Stop Microphone' : 'Enable Microphone Input'}
          </button> }
          {<button onClick={this.showImageView}>
            {this.state.IVStatus ? 'Hide IV' : 'Show IV'}
          </button> }
          {<button onClick={this.showNotificationPrompt}>
            {this.state.NPStatus ? 'Hide NP' : 'Show NP'}
          </button> }
          <form onSubmit={this.handleSubmit}>
           <label>
            Name:
              <input type="text" onChange= {this.handleChange} />
            </label>
            <input type="submit" value="Chat" />
        </form>
        </div>
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
        {this.state.IVStatus ? <ImageView /> : ''}
        {this.state.NPStatus ? <NotificationPrompt /> : ''}
      </div>
    );
  }
}

export default App;
