import { Animated, TouchableWithoutFeedback, View } from 'react-native';
import React, { Component } from 'react';

import Svg from '../svgs/Svg';
import { lu } from '../../modules/utils/unit';

export default class RotateView extends Component {
  state = {
    rotateValue: new Animated.Value(0), // 透明度初始值设为0
  }

  rotate = () => {
    // eslint-disable-next-line react/prop-types
    const { update } = this.props;
    Animated.timing( // 随时间变化而执行动画
      this.state.rotateValue, // 动画中的变量值
      {
        toValue: 1, // 透明度最终变为1，即完全不透明
        duration: 1000, // 让动画持续一段时间
      },
    ).start(() => this.setState(() => ({ rotateValue: new Animated.Value(0) })));
    update();
    // 开始执行动画
  }

  render() {
    return (
      <Animated.View // 使用专门的可动画化的View组件
        style={{
          height: 98 * lu,
          width: 92 * lu,
          position: 'absolute',
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{ rotate: this.state.rotateValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }], // 将透明度指定为动画变量值
        }}
      >
        <TouchableWithoutFeedback onPress={() => { this.rotate(); }}>
          <View>
            <Svg icon="Refresh" size={32 * lu} />
          </View>
        </TouchableWithoutFeedback>

      </Animated.View>
    );
  }
}
