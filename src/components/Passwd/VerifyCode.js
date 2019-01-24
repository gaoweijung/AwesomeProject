/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import { lu } from '../../modules/utils/unit';
import Svg from '../svgs/Svg';
import Tick from './VerifyCode/Tick';
import { fetchPhoneCode } from '../../services/Passwd/services';

export default class UserName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyCode: null,
    };
  }

  getTelephoneCode = async () => {
    const { telephone } = this.props;
    const { setVerifyCode } = this.props;
    const res = await fetchPhoneCode(telephone);
    console.log(res);
    setVerifyCode(res.data.data);
  }

  render() {
    const { verifyCode } = this.state;
    // eslint-disable-next-line react/prop-types
    return (
      <View
        style={{
          height: 88 * lu,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 30 * lu,
          borderWidth: 1 * lu,
          borderColor: '#f2f2f2',
          backgroundColor: '#fff',
        }}
      >
        <Svg icon="validate" size={28 * lu} color="#c3c3c3" />
        <TextInput
          style={{
            height: 88 * lu, width: 300 * lu, position: 'absolute', left: 88 * lu, fontSize: 28 * lu, color: '#989898',
          }}
          placeholder="输入验证码"
          value={verifyCode}
          textContentType="username"
          onChangeText={text => this.setState({ verifyCode: text })}
        />
        <Tick
          start={this.getTelephoneCode}
        />
      </View>
    );
  }
}
