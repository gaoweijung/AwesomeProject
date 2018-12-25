import React, { Component } from 'react';
import { View, Text, StatusBar, ImageBackground, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';

import SvgRemote from 'react-native-remote-svg';

const { width } = Dimensions.get('window');
const lu = width / 750;
const mine = [
  {
    svgSrc: require('../assets/svgs/write.svg'),
    name: '我的投稿',
  },
  {
    svgSrc: require('../assets/svgs/follow.svg'),
    name: '我的关注',
  },
  {
    svgSrc: require('../assets/svgs/myWallet.svg'),
    name: '我的钱包',
  },
  {
    svgSrc: require('../assets/svgs/messages.svg'),
    name: '我的消息',
  }
];
// const logIn = <View style={{}}></View>

export default class Percenter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        products: 0,
        subscribes: 0,
        fans: 0,
      },
      isSigned: false,
      isLogined: false,
    };
  }

  sign = () => {
    if(!this.state.isSigned) {
      this.setState(() => ({isSigned: true}))
    }
  }

  fetchStatus = async () => {
    
  }

  render() {

    let {
      products,
      subscribes,
      fans
    } = this.state.user;

    return (
      <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
        <StatusBar
          translucent={true}
          backgroundColor='transparent'
          barStyle='dark-content' />

        <ImageBackground
          source={require('../assets/images/person_bg.png')}
          style={{ width: width, height: 294 * lu, }}>
          <View style={{ marginTop: 40 * lu, height: 88 * lu, justifyContent: 'center', }}>
            <TouchableWithoutFeedback>
              <View style={{ position: 'absolute', right: 30 * lu, }}>
                <SvgRemote
                  source={require('../assets/svgs/theMsg.svg')}
                  style={{ width: 32 * lu, height: 32 * lu }} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ height: 166 * lu, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../assets/images/person.png')}
              style={{ width: 116 * lu, height: 116 * lu, borderRadius: 58 * lu, marginLeft: 30 * lu, marginRight: 24 * lu, }} />
            <Text style={{ fontSize: 26 * lu, color: '#fff' }}>火火俄有</Text>
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
                justifyContent: 'center'
              }}>

                {!this.state.isSigned && (<Image
                  source={{ uri: 'http://cdn.qcacg.com/mobile/img/app_userInfo/Signin.png' }}
                  style={{ width: 26 * lu, height: 28 * lu, marginRight: 10 * lu, }} />
                )}
                <Text style={{ fontSize: 28 * lu, color: '#FFF' }}>{this.state.isSigned ? '已签到' : '签到'}</Text>
              </View>

            </TouchableWithoutFeedback>
          </View>

        </ImageBackground>

        <View style={{ flexDirection: 'row', height: 98 * lu, backgroundColor: '#FFF', marginBottom: 10 * lu, }}>
          <View style={{ flex: 1, alignItems: 'center', }}>
            <Text style={{ fontSize: 28 * lu, color: '#8F8F94', marginVertical: 8 * lu, }}>{products}</Text>
            <Text style={{ fontSize: 24 * lu, color: '#656565', }}>作品</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', }}>
            <Text style={{ fontSize: 28 * lu, color: '#8F8F94', marginVertical: 8 * lu }}>{subscribes}</Text>
            <Text style={{ fontSize: 24 * lu, color: '#656565', }}>关注</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', }}>
            <Text style={{ fontSize: 28 * lu, color: '#8F8F94', marginVertical: 8 * lu }}>{fans}</Text>
            <Text style={{ fontSize: 24 * lu, color: '#656565', }}>粉丝</Text>
          </View>
        </View>


        <View style={{ height: 88 * lu, backgroundColor: '#FFF' }}>
          <Text style={{ marginLeft: 30 * lu, height: 88 * lu, textAlignVertical: 'center', fontSize: 28 * lu, color: '#333333' }}>个人中心</Text>
        </View>

        <View style={{ height: 136 * lu, flexDirection: 'row', backgroundColor: '#FFF' }}>

          {mine.map((item, index) => (
            <TouchableWithoutFeedback key={index}>
              <View style={{
                flex: 1,
                borderWidth: .5 * lu,
                borderColor: '#F2F2F2',
                height: 136 * lu,
                alignItems: 'center',
                paddingTop: 30 * lu,

              }}>
                <SvgRemote
                  source={item.svgSrc}
                  style={{ height: 32 * lu, width: 32 * lu, }} />
                <Text style={{
                  fontSize: 28 * lu,
                  color: '#565656',
                  height: 74 * lu,
                  textAlign: 'center',
                  textAlignVertical: 'center'
                }}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}


        </View>

      </View>
    );
  }
}
