import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import appPathList from '../../services/services';
import { lu, width } from '../../modules/utils/unit';
import Svg from '../svgs/Svg';

const { rootPath } = appPathList;

const Avatar = (props) => {
  const { userHead, changeAvatar } = props;
  return (
    <View style={{
      width,
      height: 176 * lu,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 30 * lu,
      borderBottomColor: '#f2f2f2',
      borderBottomWidth: 1,
      backgroundColor: '#fff',
    }}
    >
      <Text style={{
        fontSize: 28 * lu,
        color: '#565656',
      }}
      >
        头像
      </Text>
      <TouchableWithoutFeedback onPress={changeAvatar}>
        <View style={{
          position: 'absolute',
          right: 30 * lu,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        >
          <Image
            source={{ uri: rootPath + userHead }}
            style={{
              width: 116 * lu,
              height: 116 * lu,
              borderRadius: 58 * lu,
              right: 20 * lu,
              borderColor: '#f2f2f2',
              borderWidth: 0.5,
            }}
          />
          <Svg
            icon="right"
            size={28 * lu}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

Avatar.propTypes = {
  userHead: PropTypes.string.isRequired,
  changeAvatar: PropTypes.func.isRequired,
};

export default Avatar;
