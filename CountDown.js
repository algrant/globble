/**
 * Created by guguyanhua on 12/11/15.
 * Updated by Al Grant 02/09/2017
 */
import React from 'react';
import {
    Animated,
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';

var TimerMixin = require('react-timer-mixin');

var CountDown = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    return {
      maxTime: this.props.time ? this.props.time : 60,
      currentTime: this.props.time ? this.props.time : 60,
      counting: false,
      paused: false,
      timePercentAnim: new Animated.Value(1)
    };
  },
  componentDidMount(){
    this.setInterval(this._tick, 1000);
  },

  _tick() {
    // console.log(this.state)
    if (this.state.counting && !this.state.paused) {
      this.setState({currentTime:this.state.currentTime-1});
      Animated.timing(                  // Animate over time
        this.state.timePercentAnim,            // The animated value to drive
        {
          toValue: ((this.state.currentTime-1)/this.state.maxTime), // Animate to opacity: 1 (opaque)
          duration: 800,               // Make it take a while
        }
      ).start();   
    }
  },

  _reset() {
    this.setState({currentTime: this.state.maxTime, counting: false, paused: false});
    Animated.timing(                  // Animate over time
      this.state.timePercentAnim,            // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 800,               // Make it take a while
      }
    ).start(); 
  },

  _start() {
    this.setState({counting: true, paused: false});
  },

  render(){
    var style = [styles.text];
    var {timePercentAnim} = this.state;
    console.log(timePercentAnim);
    const spin = timePercentAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const color = timePercentAnim.interpolate({
      inputRange: [0,0.1,1],
      outputRange: ['rgb(255,0,0)', 'rgb(0,255,0)','rgb(0,255,0)']
    }) 
    return <TouchableWithoutFeedback 
                  onPress={this._onPress}
                  onLongPress={this._reset}
                  >
                  <Animated.View style={{backgroundColor:color, transform: [{rotate:spin}], width: 50, height: 50}}>
                    <Text style={styles.text}>{this.props.text}{this.state.currentTime}</Text>
                  </Animated.View>

            </TouchableWithoutFeedback>;
  },
                  // <View style={{opacity:timePercentAnim, width: 50, height: 50, backgroundColor: timePercentAnim}}>
                  //   <Text style={styles.text}>{this.props.text}{this.state.currentTime}</Text>
                  // </View>
  _onPress(){
    console.log('on press', this.state)
    if (!this.state.counting) {
      this.setState({counting: true, paused: false})
    } else if (this.state.paused) {
      this.setState({paused: false})
    } else {
      this.setState({paused: true})
    }
  },

  _countdown() {
    var timer = function () {

      if (this.state.paused) {
        // this.setTimeout(timer, 1000); 
        return;
      }

      var time = this.state.time - 1;
      this.setState({time: time});
      if (time > 0) {
        this.setTimeout(timer, 1000);
      } else {
        this.setState({disabled: false});
        this.setState({time: this.props.time ? this.props.time : 60});
      }
    };
    this.setTimeout(timer.bind(this), 1000);
  }
});

var styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 40,
    lineHeight: 40,
  },
  wrapper: {
    padding: 10,
    marginRight:10,
    backgroundColor: '#e5e5e5',
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent:'space-around'
  }
});

module.exports = CountDown;
