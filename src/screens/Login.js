/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import axios from 'axios';

import Header from '../components/Login/Header';
import { lu, width } from '../modules/utils/unit';
import pathList from '../services/services';
import UserName from '../components/Login/UserName';
import UserPasswd from '../components/Login/UserPassword';

const { login } = pathList;

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  login = async () => {
    try {
      // eslint-disable-next-line no-undef
      const formData = new FormData();
      const { navigation } = this.props;
      formData.append('telephone', this.UserName.state.userName);
      formData.append('password', this.UserPasswd.state.userPasswd);
      console.log(formData);
      const res = await axios({
        method: 'post',
        url: login,
        data: formData,
      });
      ToastAndroid.show(res.data.msg, ToastAndroid.BOTTOM, ToastAndroid.SHORT);
      console.log(res);
      if (res.data.msg === 'success') {
        // eslint-disable-next-line no-undef
        storage.save({
          key: 'jsessionId',
          data: res.data.data.jsessionId,
          expires: 1000 * 3600 * 24 * 30,
        });
        // eslint-disable-next-line no-undef
        storage.save({
          key: 'telephone',
          data: this.UserName.state.userName,
          expires: 1000 * 3600 * 25 * 30,
        });
        console.log('从登录页面返回到个人中心');
        navigation.goBack();
      }
    } catch (error) {
      console.warn(error);
    }
  }

  goToFogotPasswd = () => {
    const { navigation } = this.props;
    console.log('wangjimima');
    navigation.navigate('FogotPasswd');
  }

  render() {
    console.log('渲染');
    const {
      navigation,
    } = this.props;
    return (
      <View style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}
      >
        <Header
          title="登陆"
          goBack={navigation.goBack}
        />
        <View style={{
          backgroundColor: '#f2f2f2',
          paddingTop: 30 * lu,
          flex: 1,
        }}
        >

          <View style={{
            flex: 1,
          }}
          >

            <UserName
              ref={(c) => { this.UserName = c; }}
            />
            <UserPasswd
              ref={(c) => { this.UserPasswd = c; }}
            />
            <View style={{
              height: 110 * lu,
              justifyContent: 'center',
            }}
            >
              <Text
                onPress={this.goToFogotPasswd}
                style={{
                  fontSize: 24 * lu,
                  color: '#ff9a49',
                  position: 'absolute',
                  right: 30 * lu,
                }}
              >
                忘记密码
              </Text>
            </View>

            <View style={{
              height: 68 * lu,
              alignItems: 'center',
            }}
            >
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
                onPress={this.login}
              >
                登录
              </Text>
            </View>
            <Text />
          </View>

        </View>
        <View style={{
          position: 'absolute',
          bottom: 30 * lu,
          alignItems: 'center',
          justifyContent: 'center',
          width,
        }}
        >
          <Text style={{
            fontSize: 20 * lu,
            textAlign: 'center',
          }}
          >
            点击登录，即表示同意
            <Text>使用协议</Text>
            和
            <Text>隐私策略</Text>
          </Text>
        </View>
      </View>
    );
  }
}
