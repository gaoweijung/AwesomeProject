import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

import Svg from '../svgs/Svg';
import { styles } from './style/Style';
import { lu } from '../../modules/utils/unit';

export default class UserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
    };
  }

  inputUserName = (userName) => {
    this.setState(() => ({ userName }));
  }

  render() {
    const { userName } = this.state;
    console.log('渲染username');
    return (
      <View style={styles.userInputItem}>
        <Svg icon="username" size={32 * lu} color="#c3c3c3" />
        <TextInput
          placeholder="请输入昵称"
          value={userName}
          maxLength={11}
          onChangeText={this.inputUserName}
          style={styles.TextInput}
        />
      </View>
    );
  }
}
