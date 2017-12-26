import React, { Component } from "react";
import PropTypes from 'prop-types';

class Countdown extends Component {
  static propTypes = {
    seconds: PropTypes.number.isRequired,
    onRef: PropTypes.func,
    onTick: PropTypes.func,
    onComplete: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = { time: {}, seconds: props.seconds };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    this.props.onRef(this);
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.props.onRef(undefined)
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    this.props.onTick && this.props.onTick(seconds);

    // Check if we're at zero.
    if (seconds == 0) {
      this.props.onComplete && this.props.onComplete();
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div>minutes: {this.state.time.m}, seconds: {this.state.time.s}</div>)
  }
}

export default Countdown;
