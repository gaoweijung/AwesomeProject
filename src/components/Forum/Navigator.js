/* eslint-disable react/prop-types */
import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { lu, width } from '../../modules/utils/unit';
import Svg from '../svgs/Svg';

const Navigator = (props) => {
  const { navigation } = props;
  return (
    <View style={{
      paddingTop: StatusBar.currentHeight + 88 * lu,
      width,
    }}
    >
      <View style={{
        height: 88 * lu,
        width,
        flexDirection: 'row',
      }}
      >
        <TouchableOpacity onPress={() => {
          navigation.navigate('Home');
        }}
        >
          <View style={{
            width: width / 2,
            height: 88 * lu,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Svg icon="pen" color="#ff4b76" size={26 * lu} />
            <Text style={{
              fontSize: 26 * lu,
              color: '#ff4b76',
              marginLeft: 12 * lu,
            }}
            >
              评论
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Home');
        }}
        >
          <View style={{
            width: width / 2,
            height: 88 * lu,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Svg icon="themeBoard" color="#ff4b76" size={26 * lu} />
            <Text style={{
              fontSize: 26 * lu,
              color: '#ff4b76',
              marginLeft: 12 * lu,
            }}
            >
              主题
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default withNavigation(Navigator);
