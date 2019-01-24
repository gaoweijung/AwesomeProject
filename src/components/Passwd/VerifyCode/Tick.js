/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Text } from 'react-native';

import { lu } from '../../../modules/utils/unit';

export default class Tick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickText: '验证码',
      isGettingCode: false,
    };
  }

  startTick = () => {
    const { isGettingCode } = this.state;
    if (!isGettingCode) {
      const { start } = this.props;
      start();
      let time = 60;
      this.setState(() => ({ isGettingCode: true, tickText: `${time}s` }));
      const intervalId = setInterval(() => {
        if (time === 1) {
          clearInterval(intervalId);
          this.setState(() => ({ isGettingCode: false, tickText: '验证码' }));
        } else {
          time -= 1;
          this.setState(() => ({ tickText: `${time}s` }));
        }
      }, 1000);
    }
  }

  render() {
    const {
      tickText,
      isGettingCode,
    } = this.state;
    return (
      <Text
        style={{
          backgroundColor: isGettingCode ? '#FFB3D7' : '#FF4273',
          width: 120 * lu,
          height: 50 * lu,
          lineHeight: 50 * lu,
          position: 'absolute',
          right: 30 * lu,
          borderRadius: 8 * lu,
          fontSize: 28 * lu,
          color: '#fff',
          textAlign: 'center',
        }}
        onPress={this.startTick}
      >
        {tickText}
      </Text>
    );
  }
}
