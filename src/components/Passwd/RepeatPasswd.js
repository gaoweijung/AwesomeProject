import React, { Component } from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import { lu, width } from '../../modules/utils/unit';
import Svg from '../svgs/Svg';

export default class UserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repeatPasswd: null,
    };
  }

  render() {
    const { repeatPasswd } = this.state;
    return (
      <View style={{
        height: 88 * lu,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30 * lu,
        borderWidth: 1 * lu,
        borderColor: '#f2f2f2',
        backgroundColor: '#fff',
      }}
      >
        <Svg icon="password" size={28 * lu} color="#c3c3c3" />
        <TextInput
          style={{
            height: 88 * lu, width: width - 118 * lu, position: 'absolute', left: 88 * lu, fontSize: 28 * lu, color: '#989898',
          }}
          placeholder="确定新密码"
          value={repeatPasswd}
          textContentType="username"
          onChangeText={text => this.setState({ repeatPasswd: text })}
        />
      </View>
    );
  }
}
