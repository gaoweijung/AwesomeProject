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
      telephone: null,
    };
  }

  render() {
    const { telephone } = this.state;
    return (
      <View style={{
        height: 88 * lu,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 120 * lu,
        paddingLeft: 30 * lu,
        borderWidth: 4 * lu,
        borderColor: '#f2f2f2',
        backgroundColor: '#fff',
      }}
      >
        <Svg icon="phone" size={32 * lu} color="#c3c3c3" />
        <TextInput
          style={{
            height: 88 * lu, width: width - 118 * lu, position: 'absolute', left: 88 * lu, fontSize: 28 * lu, color: '#989898',
          }}
          placeholder="请输入用户名(手机号码)"
          value={telephone}
          textContentType="username"
          onChangeText={text => this.setState({ telephone: text })}
        />
      </View>
    );
  }
}
