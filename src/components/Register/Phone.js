import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

import Svg from '../svgs/Svg';
import { styles } from './style/Style';
import { lu } from '../../modules/utils/unit';

export default class Phone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telephone: null,
    };
  }

  inputPhone = (telephone) => {
    this.setState(() => ({ telephone }));
  }

  render() {
    const { telephone } = this.state;
    return (
      <View style={styles.userInputItem}>
        <Svg icon="username" size={32 * lu} color="#c3c3c3" />
        <TextInput
          placeholder="请输入用户名（手机号码）"
          keyboardType="numeric"
          value={telephone}
          maxLength={11}
          onChangeText={this.inputPhone}
          style={styles.TextInput}
        />
      </View>
    );
  }
}
