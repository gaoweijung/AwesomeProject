import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

import Svg from '../svgs/Svg';
import { styles } from './style/Style';
import { lu } from '../../modules/utils/unit';

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passWord: null,
    };
  }

  inputPasswd = (passWord) => {
    this.setState(() => ({ passWord }));
  }

  render() {
    const { passWord } = this.state;
    return (
      <View style={styles.userInputItem}>
        <Svg icon="password" size={32 * lu} color="#c3c3c3" />
        <TextInput
          placeholder="请输入密码"
          value={passWord}
          maxLength={18}
          secureTextEntry
          onChangeText={this.inputPasswd}
          style={styles.TextInput}
        />
      </View>
    );
  }
}
