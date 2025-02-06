import React, { Component } from 'react';
import moment from 'moment-timezone';
import './Watch.scss'


interface WatchProps {
  zone: string;
  name: string;
  id: string;
  removeItem: (id: string) => void;
}

interface WatchState {
  time: string;
  zone: string;
  name: string;
}

export default class Watch extends Component<WatchProps, WatchState> {
  private ticking?: NodeJS.Timeout;

  constructor(props: WatchProps) {
    super(props);
    this.state = {
      time: this.getTime(props.zone),
      zone: props.zone,
      name: props.name
    };
  }

  componentDidMount() {
    console.log("Start Clock " + this.props.id);
    this.ticking = setInterval(() => {
      this.setState({ time: moment().tz(this.state.zone).format("H:mm:ss").toString() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.ticking);
  }

  getTime = (zone: string): string => {
    return moment().tz(zone).format("H:mm:ss").toString();
  }

  removeWatch = () => {
    console.log("Remove Clock " + this.props.id);
    clearInterval(this.ticking);
    this.props.removeItem(this.props.id);
  }

  render() {
    return (
      <div className="watch-item">
        <div className="watch-name">{this.state.name}</div>
        <br />
        <div className="bg-close" onClick={this.removeWatch}></div>
        <div className="watch-content">
          <div className="watch-time">{this.state.time}</div>
        </div>
      </div>
    );
  }
}