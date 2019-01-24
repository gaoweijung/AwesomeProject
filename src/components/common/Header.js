import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import PropTypes from 'prop-types';

import Svg from '../svgs/Svg';
import { lu, width } from '../../modules/utils/unit';

export default class Header extends Component {
  static propTypes = {
    goBack: PropTypes.func.isRequired,
  }

  fatherMethod = () => {
    const { goBack } = this.props;
    goBack();
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { style, title } = this.props;
    return (
      <View style={{
        height: 88 * lu,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30 * lu,
        ...style,
      }}
      >
        <TouchableNativeFeedback onPress={this.fatherMethod}>
          <View style={{ width: 30 * lu, height: 88 * lu, justifyContent: 'center' }}>
            <Svg icon="back" size={30 * lu} />
          </View>
        </TouchableNativeFeedback>
        <Text style={{ width: 632 * lu, textAlign: 'center', fontSize: 32 * lu }} onPress={this.fatherMethod}>{title}</Text>
        <TouchableNativeFeedback>
          <View>
            <Svg icon="more" size={35 * lu} />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
