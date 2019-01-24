import React, { Component } from 'react';
import { View, TextInput, Text, } from 'react-native';

import Svg from '../svgs/Svg';
import { styles } from './style/Style';
import { lu, width } from '../../modules/utils/unit';


export default class ValidateCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGettingCode: false,
      btnText: '验证码',
    };
  }

  _onPress = () => {
    this.props.sendEMSCode();
    let btnText = 60;
    this.setState(() => ({ isGettingCode: true, btnText: btnText, }));
    console.log(btnText);
    let intervalId = setInterval(() => {
      btnText --;
      this.setState({btnText});
      if(btnText == 0) {
        clearInterval(intervalId);
        this.setState({btnText: '验证码', isGettingCode: false});
      }
    }, 1000);
  }


  shouldComponentUpdate = (nextProps, nextState) => { 
    let scu = this.props.validateCode  !== nextProps.validateCode || this.state.isGettingCode !== nextState.isGettingCode || this.state.btnText !== nextState.btnText;
    console.log(scu);
    return scu;
  } // 判断组件是否应该更新

  render() {
    console.log('渲染validateCode')
    return (
      <View style={styles.userInputItem}>
        <Svg icon="validate" size={32 * lu} color="#c3c3c3" />
        <TextInput
          placeholder="验证码"
          value={this.props.validateCode}
          maxLength={11}
          onChangeText={this.props.inputValidateCode}
          style={{ ...styles.TextInput, width: 0.5 * width }}
        />
        <Text style={{
          backgroundColor: this.state.isGettingCode ? '#FFB3D7' : '#FF4273',
          width: 120 * lu,
          height: 50 * lu,
          lineHeight: 50 * lu,
          position: 'absolute',
          right: 30 * lu,
          borderRadius: 8 * lu,
          fontSize: 28 * lu,
          color: '#fff',
          textAlign: 'center',
        }} onPress={this._onPress}>{this.state.btnText}</Text>
      </View>
    );
  }
}
