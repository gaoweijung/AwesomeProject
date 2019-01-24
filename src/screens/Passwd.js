/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import Header from '../components/common/HeaderN';
import NewPasswd from '../components/Passwd/NewPasswd';
import RepeatPasswd from '../components/Passwd/RepeatPasswd';
import VerifyCode from '../components/Passwd/VerifyCode';
import { lu } from '../modules/utils/unit';
import { updatePasswd } from '../services/Passwd/services';


export default class Passwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null,
      telephone: null,
    };
  }

  setVerifyCode = (uuid) => {
    console.log(`设置uuid: ${uuid}`);
    this.setState(() => ({ uuid }));
  }

  setTelehone = async () => {
    const { navigation } = this.props;
    if (navigation.state.params) {
      const { telephone } = navigation.state.params;
      this.setState(() => ({ telephone }));
    } else {
      // eslint-disable-next-line no-undef
      const telephone = await storage.load({ key: 'telephone' });
      this.setState(() => ({ telephone }));
    }
  }

  componentDidMount = () => {
    this.setTelehone();
  }

  onConfirm = async () => {
    console.log('提交');
    const { telephone } = this.state;
    const telephoneCode = this.VerifyCode.state.verifyCode;
    console.log(`telephoneCode: ${telephoneCode}`);
    const passWord = this.NewPasswd.state.newPasswd;
    console.log(`passWord: ${passWord}`);
    const passWordConfirm = this.RepeatPasswd.state.repeatPasswd;
    console.log(`passWordConfirm: ${passWordConfirm}`);
    const { uuid } = this.state;
    const res = await updatePasswd({
      telephone,
      telephoneCode,
      passWord,
      passWordConfirm,
      uuid,
    });
    console.log(res);
  }

  render() {
    const { navigation } = this.props;
    const { telephone } = this.state;
    return (
      <View>
        <Header
          title="修改密码"
          navigation={navigation}
        />
        <NewPasswd
          ref={(c) => { this.NewPasswd = c; }}
        />
        <RepeatPasswd
          ref={(c) => { this.RepeatPasswd = c; }}
        />
        <VerifyCode
          ref={(c) => { this.VerifyCode = c; }}
          setVerifyCode={this.setVerifyCode}
          telephone={telephone}
        />
        <View style={{ alignItems: 'center', marginTop: 68 * lu }}>
          <Text
            style={{
              fontSize: 28 * lu,
              color: '#fff',
              width: 594 * lu,
              height: 68 * lu,
              borderRadius: 34 * lu,
              backgroundColor: '#ffd7b6',
              lineHeight: 68 * lu,
              textAlign: 'center',
            }}
            onPress={this.onConfirm}
          >
            确定
          </Text>
        </View>
      </View>
    );
  }
}
