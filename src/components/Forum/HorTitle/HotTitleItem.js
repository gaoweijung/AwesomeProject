/* eslint-disable react/prop-types */
import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, TouchableOpacity } from 'react-native';

import { lu, width } from '../../../modules/utils/unit';

const HotTitleItem = (props) => {
  const { itemName, navigation } = props;
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Home');
    }}
    >
      <View style={{
        height: 92 * lu,
        width,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      >
        <Text
          style={{
            fontSize: 26 * lu,
            color: '#73b8ff',
            marginLeft: 30 * lu,
          }}
        >
          {itemName}
        </Text>
        <Text
          style={{
            width: 73 * lu,
            height: 46 * lu,
            borderRadius: 4 * lu,
            backgroundColor: '#f2f2f2',
            position: 'absolute',
            right: 30 * lu,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 26 * lu,
            color: '#989898',
          }}
        >
          进入
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default withNavigation(HotTitleItem);
