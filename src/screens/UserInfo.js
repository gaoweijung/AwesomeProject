/* eslint-disable react/prop-types */
/* eslint-disable quote-props */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Picker from 'react-native-picker';

import appPathList from '../services/services';
import { lu, width } from '../modules/utils/unit';
import Header from '../components/UserInfo/Header';
import Avatar from '../components/UserInfo/Avatar';
import UserItem from '../components/UserInfo/UserItem';
import Popup from '../components/UserInfo/Popup';
import Signature from '../components/UserInfo/SignatureMod';

const {
  queryUser,
  updateUser,
  userUpload,
} = appPathList;
const pickerData = ['男生', '女生'];

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      jsessionId: null,
      userNameShowed: false,
      sigShowed: false,
      dateShowed: false,
    };
  }

  componentDidMount() {
    this.initPicker();
    this.getToken();
  }

  getToken = async () => {
    const jsessionId = await storage.load({ key: 'jsessionId' });
    console.log('getToken jsessionId: ', jsessionId);
    this.setState(() => ({ jsessionId }));
    this.queryUser(jsessionId);
  }

  // eslint-disable-next-line react/destructuring-assignment
  queryUser = async (jsessionId = this.state.jsessionId) => {
    try {
      const res = await axios({
        method: 'post',
        url: queryUser,
        headers: {
          // eslint-disable-next-line quote-props
          'JSESSIONID': jsessionId,
        },
        data: JSON.stringify({}),
      });
      console.log(res.data);
      this.setState(() => ({ user: res.data }));
      // const user = JSON.parse(res._bodyText);
      // this.setState(() => ({ user }));
    } catch (error) {
      console.warn(error);
    }
  }

  // updateUserHead = (image) => {

  // }

  // 更改用户信息的接口
  updateUser = async (option) => {
    try {
      const { user, jsessionId } = this.state;
      const {
        userName,
        information,
        sex,
        birthday,
      } = user;
      const updateMSG = {
        userName,
        information,
        sex,
        birthday,
      };
      // eslint-disable-next-line no-restricted-syntax
      Object.keys(option).forEach((item) => { updateMSG[item] = option[item]; });
      console.log(updateMSG);
      const res = await axios({
        method: 'post',
        url: updateUser,
        headers: {
          // eslint-disable-next-line quote-props
          'JSESSIONID': jsessionId,
        },
        data: updateMSG,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  // 更改昵称
  updateName = async () => {
    this.closeName();
    await this.updateUser({
      userName: this.name.state.name,
    });
    this.queryUser();
  }

  // 更改签名
  updateSig = async () => {
    this.closeSig();
    await this.updateUser({
      information: this.sig.state.signature,
    });
    this.queryUser();
  }

  // 上穿相片
  uploadUserHead = async (image) => {
    const { jsessionId } = this.state;
    return axios({
      url: userUpload,
      method: 'post',
      data: image,
      headers: {
        'JSESSIONID': jsessionId,
      },
    });
  }

  // 裁剪相片
  cropImage = async () => {
    const image = await ImagePicker.openPicker({
      width: 116 * lu,
      height: 116 * lu,
      cropping: true,
    });
    const res = await this.uploadUserHead(image);
    console.log(res.data);
  }

  // 初始化性别选择
  initPicker = () => {
    Picker.init({
      pickerData,
      selectedValue: ['男生'],
      onPickerConfirm: async (data) => {
        console.log(data);
        if (data[0] === '男生') {
          Picker.hide();
          await this.updateUser({ sex: 2 });
          this.queryUser();
        } else {
          Picker.hide();
          await this.updateUser({ sex: 1 });
          this.queryUser();
        }
      },
      onPickerCancel: () => {
        Picker.hide();
      },
    });
  }

  // 切换modal
  toggleModal = (option) => {
    switch (option.type) {
      case 'name':
        if (option.showed) {
          this.setState(() => ({ userNameShowed: true }));
        } else {
          this.setState(() => ({ userNameShowed: false }));
        }
        break;
      case 'sig':
        if (option.showed) {
          this.setState(() => ({ sigShowed: true }));
        } else {
          this.setState(() => ({ sigShowed: false }));
        }
        break;
      default:
        console.log('fuck');
    }
  }

  // 打开改名
  openName = () => {
    this.toggleModal({
      type: 'name',
      showed: true,
    });
  }

  // 关闭改名
  closeName = () => {
    this.toggleModal({
      type: 'name',
      showed: false,
    });
  }

  // 打开更改签名
  openSig = () => {
    this.toggleModal({
      type: 'sig',
      showed: true,
    });
  }

  // 关闭更改签名
  closeSig = () => {
    this.toggleModal({
      type: 'sig',
      showed: false,
    });
  }

  // 更改圣体
  _handleDatePicked = async (date) => {
    const birthday = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    console.log(birthday);
    this._hideDatePicker();
    await this.updateUser({ birthday });
    this.queryUser();
  }

  // 显示更改生日
  _showDatePicker = () => {
    this.setState(() => ({ dateShowed: true }));
  }

  // 隐藏更改生日
  _hideDatePicker = () => {
    this.setState(() => ({ dateShowed: false }));
  }

  // 更改密码
  changePassword = () => {
    console.log('跳转到密码更改页面');
  }

  // 退出登陆
  logout = () => {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    storage.remove({
      key: 'jsessionId',
    });
    navigation.goBack();
  }

  navigateToPasswd = () => {
    const { navigation } = this.props;
    navigation.navigate('Passwd');
  }

  render() {
    const { navigation } = this.props;
    const {
      user,
      userNameShowed,
      sigShowed,
      dateShowed,
    } = this.state;
    if (!user) {
      return null;
    }
    const {
      userHead,
      userName,
      information,
      sex,
      birthday,
    } = user;
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#f2f2f2',
      }}
      >
        <Header
          navigation={navigation}
          title="个人信息"
        />
        <Avatar
          userHead={userHead}
          changeAvatar={this.cropImage}
        />
        <UserItem
          title="昵称"
          data={userName}
          openModifier={this.openName}
        />
        <UserItem
          title="我的签名"
          data={information}
          openModifier={this.openSig}
        />
        <UserItem
          title="性别"
          data={sex}
          openModifier={Picker.show}
        />
        <UserItem
          title="生日"
          data={birthday}
          openModifier={this._showDatePicker}
          style={{ marginBottom: 28 * lu }}
        />
        <UserItem
          title="修改密码"
          openModifier={this.navigateToPasswd}
        />

        <View style={{
          height: 88 * lu,
          width,
          backgroundColor: '#fff',
          marginTop: 56 * lu,
        }}
        >
          <Text
            onPress={this.logout}
            style={{
              height: 88 * lu,
              width,
              textAlign: 'center',
              textAlignVertical: 'center',
              color: '#ff9b01',
            }}
          >
            退出登录
          </Text>
        </View>

        <Popup
          ref={(c) => { this.name = c; }}
          visible={userNameShowed}
          close={this.closeName}
          updateName={this.updateName}
        />

        <Signature
          ref={(c) => { this.sig = c; }}
          visible={sigShowed}
          close={this.closeSig}
          updateSig={this.updateSig}
        />

        <DateTimePicker
          isVisible={dateShowed}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDatePicker}
        />

      </View>
    );
  }
}
