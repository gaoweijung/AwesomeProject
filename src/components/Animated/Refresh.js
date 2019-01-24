import React, { Component } from 'react'
import { Animated, View } from 'react-native'

import Svg from '../svgs/Svg'
import { lu } from '../../modules/utils/unit';

export default class Refresh extends Component {

  constructor (props) {
    super(props);
    this.state = {
      rotateAnim: new Animated.Value(0),
    }
  }

  componentDidMount () {
    this.startAnimation();
  }

  startAnimation = () => {
    this.state.rotateAnim.setValue(0);
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 800,
      }
    ).start(() => {this.startAnimation()});
  }

  render() {

    let { rotateAnim } = this.state;

    return (
      <Animated.View style={{
        transform: [{
          rotate: rotateAnim.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']}),
        }],
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Svg icon="loading" size={36 * lu} />
      </Animated.View>
    )
  }
}