import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { lu, width } from '../modules/utils/unit';
import appPathList from '../services/services';
import Header from '../components/common/HeaderN';
import Phone from '../components/Register/Phone';
import Password from '../components/Register/Password';
import PasswordCheck from '../components/Register/PasswordCheck';
import UserName from '../components/Register/UserName';
import ValidateCode from '../components/Passwd/VerifyCode';

const { registerCheckCode, register } = appPathList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  userInput: {
    height: 460 * lu,
    backgroundColor: '#f2f2f2',
    marginTop: 26 * lu,
  },
  registerButton: {
    marginTop: 68 * lu,
    height: 68 * lu,
    alignItems: 'center',
  },
  registerText: {
    width: 594 * lu,
    height: 68 * lu,
    borderRadius: 34 * lu,
    lineHeight: 68 * lu,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#FFD7B6',
  },
  state: {
    marginTop: 52 * lu,
    width,
    textAlign: 'center',
    fontSize: 24 * lu,
    color: '#989898',
  },
  registerAgreement: {
    color: '#565656',
  },

});

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      telephone: '',
      passWord: '',
      passWordConfirm: '',
      userName: '',
      validateCode: '',
      verificationMsg: {},
      uuid: '',
    };
  }

  getVerifyCode = async () => {
    try {
      console.log(`注册电话号码: ${this.state.telephone}`);
      const res = await fetch(`${registerCheckCode}?telephone=${this.state.telephone}`, {
        method: 'get',
      });
      this.setState({ verificationMsg: JSON.parse(res._bodyText) }, () => { console.log(this.state.verificationMsg); });
    } catch (error) {
      console.error(error);
    }
  }

  inputPhone = text => this.setState({ telephone: text })

  inputPasswd = text => this.setState({ passWord: text })

  inputPasswdCheck = text => this.setState({ passWordConfirm: text })

  inputUserName = text => this.setState({ userName: text })

  inputValidateCode = text => this.setState({ validateCode: text })


  fetchRegister = async () => {
    console.log('注册');
    const data = {
      telephone: this.state.telephone,
      telephoneCode: this.state.validateCode,
      userName: this.state.userName,
      passWord: this.state.userName,
      passWordConfirm: this.state.passWordConfirm,
      uuid: this.uuid,
    };
    console.log(data);
    console.log(`注册接口请求数据: ${data}`);
    const res = await fetch(register, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log(res);
    console.log(`注册接口返回信息: ${res}`);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    console.log('渲染注册画面');
    return (
      <View style={styles.container}>
        <Header
          title="注册"
          goBack={this.goBack}
        />
        <View style={styles.userInput}>
          <Phone telephone={this.state.telephone} inputPhone={this.inputPhone} />
          <Password passWord={this.state.passWord} inputPasswd={this.inputPasswd} />
          <PasswordCheck passWordConfirm={this.state.passWordConfirm} inputPasswdCheck={this.inputPasswdCheck} />
          <UserName userName={this.state.userName} inputUserName={this.inputUserName} />
          <ValidateCode validateCode={this.validateCode} inputValidateCode={this.inputValidateCode} sendEMSCode={this.getVerifyCode} />
        </View>
        <View style={styles.registerButton}>
          <Text style={styles.registerText} onPress={this.fetchRegister}>注册</Text>
        </View>
        <Text style={styles.state}>
          点击”注册“按钮，即表示同意
          <Text style={styles.registerAgreement}>注册协议</Text>
        </Text>
      </View>
    );
  }
}
