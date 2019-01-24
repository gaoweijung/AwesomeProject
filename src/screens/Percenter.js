/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View, Text, StatusBar, ImageBackground, Dimensions, Image, TouchableWithoutFeedback, StyleSheet,
} from 'react-native';
import axios from 'axios';

import Svg from '../components/svgs/Svg';
import appPathList from '../services/services';

const personBg = require('../assets/images/person_bg.png');

const {
  getStatus,
  imagePath,
  queryPart,
  cardsign,
} = appPathList;
const { width } = Dimensions.get('window');
const lu = width / 750;
const mine = [
  {
    icon: 'write',
    name: '我的投稿',
  },
  {
    icon: 'follow',
    name: '我的关注',
  },
  {
    icon: 'myWallet',
    name: '我的钱包',
  },
  {
    icon: 'messages',
    name: '我的消息',
  },
];
const styles = StyleSheet.create({
  loginRegis: {
    height: 166 * lu,
    flexDirection: 'row',
    alignItems: 'center',
  },
  regis: {
    width: 176 * lu,
    height: 58 * lu,
    lineHeight: 58 * lu,
    position: 'absolute',
    left: 170 * lu,
    backgroundColor: '#FFF',
    color: '#FF4575',
    opacity: 0.8,
    textAlign: 'center',
    borderRadius: 8 * lu,
  },
  login: {
    width: 176 * lu,
    height: 58 * lu,
    lineHeight: 58 * lu,
    position: 'absolute',
    right: 170 * lu,
    backgroundColor: '#FF4575',
    color: '#FFF',
    opacity: 0.8,
    textAlign: 'center',
    borderRadius: 8 * lu,
  },

});
// const logIn = <View style={{}}></View>

export default class Percenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        bookNum: 0,
        attentionNum: 0,
        fansNum: 0,
      },
      sign: false,
      loginFlag: false,
      userImage: null,
      userName: null,
      jsessionId: null,
    };
  }

  sign = () => {
    const { sign } = this.state;
    if (sign) {
      this.setState(() => ({ sign: true }));
    }
  }

  navigateToRegis = () => {
    const { navigation } = this.props;
    navigation.navigate('Register');
  }

  navigateToLogin = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  willFocusHandler = async () => {
    const jsessionId = await this.getToken();
    if (!jsessionId) {
      this.setState(() => ({ loginFlag: false }));
    } else {
      this.getLoginStatus(jsessionId);
    }
  }

  addWillFocusListener = () => {
    const { navigation } = this.props;
    this._willFocusSubscription = navigation.addListener('willFocus', this.willFocusHandler);
  }

  getToken = async () => {
    try {
      const jsessionId = await storage.load({ key: 'jsessionId' });
      return jsessionId;
    } catch (error) {
      if (error) {
        return null;
      }
    }
  }

  setIfLogined = async () => {
    this.getLoginStatus(jsessionId);
  }

  getLoginStatus = async (jsessionId) => {
    const res = await axios({
      method: 'get',
      headers: {
        JSESSIONID: jsessionId,
      },
      url: getStatus,
      data: {},
    });
    const { loginFlag, status } = res.data;
    const {
      sign,
      userId,
      userImage,
      userName,
    } = status;
    this.getAllInfo(userId);
    this.setState(() => ({
      loginFlag,
      sign,
      userImage,
      userName,
      jsessionId,
    }));
  }

  getAllInfo = async (userId) => {
    const res = await axios.get(`${queryPart}?userId=${userId}`);
    const user = res.data.guanZhuAndFenSiAndZuoPinShuData;
    this.setState(() => ({ user }));
  }

  componentDidMount = () => {
    this.addWillFocusListener();
  }

  componentWillUnmount = () => {
    this._willFocusSubscription.remove();
  }

  sign = async () => {
    const { jsessionId, sign } = this.state;
    if (!sign) {
      const res = await axios({
        method: 'get',
        url: cardsign,
        headers: {
          JSESSIONID: jsessionId,
        },
      });
      if (res.data.msg === 'success') {
        this.setState(() => ({ sign: true }));
      }
    }
  }

  navigateToUserInfo = () => {
    const { navigation } = this.props;
    navigation.navigate('UserInfo');
  }

  render() {
    const {
      user,
      loginFlag,
      sign,
      userName,
      userImage,
    } = this.state;
    const {
      bookNum,
      attentionNum,
      fansNum,
    } = user;

    return (
      <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        <ImageBackground
          source={personBg}
          style={{ width, height: 294 * lu }}
        >
          <View style={{ marginTop: 40 * lu, height: 88 * lu, justifyContent: 'center' }}>
            <TouchableWithoutFeedback onPress={this.navigateToUserInfo}>
              <View style={{ position: 'absolute', right: 30 * lu }}>
                <Svg icon="theMsg" size={32 * lu} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {loginFlag
            ? (
              <View style={{ height: 166 * lu, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{ uri: imagePath + userImage }}
                  style={{
                    width: 116 * lu,
                    height: 116 * lu,
                    borderRadius: 58 * lu,
                    marginLeft: 30 * lu,
                    marginRight: 24 * lu,
                  }}
                />
                <Text style={{ fontSize: 26 * lu, color: '#fff' }}>{userName}</Text>
                <TouchableWithoutFeedback onPress={this.sign}>
                  <View style={{
                    width: 160 * lu,
                    height: 58 * lu,
                    borderRadius: 24 * lu,
                    backgroundColor: 'rgba(247,98,137,.8)',
                    position: 'absolute',
                    right: 30 * lu,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  >

                    {!sign && (
                      <Image
                        source={{ uri: 'http://cdn.qcacg.com/mobile/img/app_userInfo/Signin.png' }}
                        style={{ width: 26 * lu, height: 28 * lu, marginRight: 10 * lu }}
                      />
                    )}
                    <Text
                      style={{ fontSize: 28 * lu, color: '#FFF' }}
                      onPress={this.sign}
                    >
                      {sign ? '已签到' : '签到'}
                    </Text>
                  </View>

                </TouchableWithoutFeedback>
              </View>
            )
            : (
              <View style={styles.loginRegis}>
                <Text style={styles.regis} onPress={this.navigateToRegis}>注册</Text>
                <Text style={styles.login} onPress={this.navigateToLogin}>登录</Text>
              </View>
            )
          }

        </ImageBackground>

        <View style={{
          flexDirection: 'row', height: 98 * lu, backgroundColor: '#FFF', marginBottom: 10 * lu,
        }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 28 * lu, color: '#8F8F94', marginVertical: 8 * lu }}>{bookNum}</Text>
            <Text style={{ fontSize: 24 * lu, color: '#656565' }}>作品</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 28 * lu, color: '#8F8F94', marginVertical: 8 * lu }}>{attentionNum}</Text>
            <Text style={{ fontSize: 24 * lu, color: '#656565' }}>关注</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 28 * lu, color: '#8F8F94', marginVertical: 8 * lu }}>{fansNum}</Text>
            <Text style={{ fontSize: 24 * lu, color: '#656565' }}>粉丝</Text>
          </View>
        </View>


        <View style={{ height: 88 * lu, backgroundColor: '#FFF' }}>
          <Text style={{
            marginLeft: 30 * lu, height: 88 * lu, textAlignVertical: 'center', fontSize: 28 * lu, color: '#333333',
          }}
          >
            个人中心

          </Text>
        </View>

        <View style={{ height: 136 * lu, flexDirection: 'row', backgroundColor: '#FFF' }}>

          {mine.map(item => (
            <TouchableWithoutFeedback key={item.name}>
              <View style={{
                flex: 1,
                borderWidth: 0.5 * lu,
                borderColor: '#F2F2F2',
                height: 136 * lu,
                alignItems: 'center',
                paddingTop: 30 * lu,

              }}
              >
                <Svg icon={item.icon} size={32 * lu} />
                <Text style={{
                  fontSize: 28 * lu,
                  color: '#565656',
                  height: 74 * lu,
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}
                >
                  {item.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}


        </View>

      </View>
    );
  }
}
