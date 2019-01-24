import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

import Svg from '../svgs/Svg';
import { styles } from './style/Style';
import { lu } from '../../modules/utils/unit';

export default class PasswordCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passWordConfirm: null,
    };
  }

  inputPasswdCheck = (passWordConfirm) => {
    this.setState(() => ({ passWordConfirm }));
  }

  render() {
    const { passWordConfirm } = this.state;
    return (
      <View style={styles.userInputItem}>
        <Svg icon="password" size={32 * lu} color="#c3c3c3" />
        <TextInput
          placeholder="请再次输入密码"
          value={passWordConfirm}
          maxLength={18}
          secureTextEntry
          onChangeText={this.inputPasswdCheck}
          style={styles.TextInput}
        />
      </View>
    );
  }
}
