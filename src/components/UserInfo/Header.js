import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';

import Svg from '../svgs/Svg';
import { lu, width } from '../../modules/utils/unit';

const Header = (props) => {
  // eslint-disable-next-line react/prop-types
  const { navigation, title, style } = (props);

  return (
    <View style={{
      height: StatusBar.currentHeight + 88 * lu,
      width,
      paddingTop: StatusBar.currentHeight,
      borderBottomWidth: 1,
      borderBottomColor: '#C3C3C3',
      backgroundColor: '#fff',
    }}
    >
      <View style={{
        height: 88 * lu,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        ...style,
      }}
      >
        <TouchableWithoutFeedback onPress={navigation.goBack}>
          <View style={{
            width: 90 * lu,
            height: 88 * lu,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Svg icon="back" size={30 * lu} color="#282828" />
          </View>
        </TouchableWithoutFeedback>
        <Text style={{
          width: 570 * lu,
          textAlign: 'center',
          fontSize: 32 * lu,
          color: '#282828',
        }}
        >
          {title}
        </Text>
      </View>

    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
