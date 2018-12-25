import {Animated, TouchableNativeFeedback, View} from 'react-native';
import React,{Component} from 'react';
import Svg from 'react-native-remote-svg';

export default class RotateView extends Component {

  state = {
    rotateValue: new Animated.Value(0),  // 透明度初始值设为0
  }

  rotate = () => {
    Animated.timing(                  // 随时间变化而执行动画
      this.state.rotateValue,            // 动画中的变量值
      {
        toValue: 1,                   // 透明度最终变为1，即完全不透明
        duration: 1000,              // 让动画持续一段时间
      }
    ).start(); 
    this.setState({
      rotateValue: new Animated.Value(0)
    })  
    this.props.update();
    // 开始执行动画
  }

  render() {

    return (
      <Animated.View                 // 使用专门的可动画化的View组件
        style={{
          transform: [{rotate: this.state.rotateValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']})}],         // 将透明度指定为动画变量值
        }}
      >
        <TouchableNativeFeedback onPress={() => {this.rotate()}}>
          <View style={this.props.viewStyle}>
            <Svg source={require('../../assets/svgs/Refresh.svg')} style={this.props.svgStyle} />
          </View>
        </TouchableNativeFeedback>

      </Animated.View>
    );
  }
}
