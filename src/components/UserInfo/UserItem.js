import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import { lu, width } from '../../modules/utils/unit';
import Svg from '../svgs/Svg';


const UserItem = (props) => {
  const {
    data,
    title,
    // eslint-disable-next-line react/prop-types
    style,
    openModifier,
  } = props;
  return (
    <View style={{
      width,
      height: 88 * lu,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 30 * lu,
      borderBottomColor: '#f2f2f2',
      borderBottomWidth: 1,
      backgroundColor: '#fff',
      ...style,
    }}
    >
      <Text style={{
        fontSize: 28 * lu,
        color: '#565656',
      }}
      >
        {title}
      </Text>
      <TouchableWithoutFeedback onPress={openModifier}>
        <View style={{
          position: 'absolute',
          right: 30 * lu,
          height: 88 * lu,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        >
          <Text style={{
            fontSize: 24 * lu,
            height: 88 * lu,
            lineHeight: 88 * lu,
            marginRight: 20 * lu,
          }}
          >
            {data}
          </Text>
          <Svg
            icon="right"
            size={28 * lu}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

UserItem.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.string,
  openModifier: PropTypes.func.isRequired,
};

UserItem.defaultProps = {
  data: '',
};

export default UserItem;
