/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  StatusBar,
  Image,
} from 'react-native';
import axios from 'axios';

import { lu, width } from '../../modules/utils/unit';
import appPathList from '../../services/services';

const profileIcon = require('../../assets/images/profile_icon.jpg');

const StatusBarHeight = StatusBar.currentHeight;
const { getStatus, imagePath } = appPathList;

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  componentDidMount = () => {
    this.getUserHead();
  }

  getUserHead = async () => {
    try {
      const jsessionId = await storage.load({
        key: 'jsessionId',
      });
      const res = await axios({
        method: 'get',
        headers: {
          JSESSIONID: jsessionId,
        },
        url: getStatus,
        data: {},
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { image } = this.state;
    if (image) {
      image = { uri: imagePath + image };
    } else {
      image = profileIcon;
    }
    const { navigateToUserInfo } = this.props;
    return (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: 88 * lu + StatusBarHeight,
        width,
        paddingTop: StatusBarHeight,
        backgroundColor: '#fff',
        opacity: 0.8,
        borderBottomWidth: 1 * lu,
        borderBottomColor: '#c3c3c3',
      }}
      >
        <View style={{
          height: 88 * lu,
          width,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 30 * lu,
        }}
        >
          <TouchableNativeFeedback onPress={navigateToUserInfo}>
            <Image
              source={image}
              style={{
                height: 54 * lu,
                width: 54 * lu,
                borderRadius: 27 * lu,
                position: 'absolute',
                left: 30 * lu,
              }}
            />
          </TouchableNativeFeedback>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 32 * lu,
            }}
            onPress={this.fatherMethod}
          >
            动态
          </Text>


        </View>

      </View>
    );
  }
}
