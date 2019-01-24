import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';

import Svg from '../svgs/Svg';

const { width } = Dimensions.get('window');
const lu = width / 750;


export default class Header extends Component {

  constructor(props) {
    super(props);
  }

  goBack = () => {
    this.props.goBack();
  }

  toggleType = () => {
    this.props.toggleType();
  }

  render() {

    let rankList = this.props.rankList;

    return (
      <View style={{ height: 88 * lu, width: width, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30 * lu, ...this.props.style }}>
        <TouchableWithoutFeedback onPress={this.goBack}>
          <View style={{ width: 30 * lu, height: 88 * lu, justifyContent: 'center' }}>
            <Svg icon="back" size={30 * lu} />
          </View>
        </TouchableWithoutFeedback>
        <Text style={{ width: 632 * lu, textAlign: 'center', fontSize: 32 * lu }} >{this.props.title}</Text>
        <TouchableWithoutFeedback onPress={this.toggleType}>
          <View style={{
            width: 120 * lu,
            height: 36 * lu,
            paddingLeft: 10 * lu,
            position: 'absolute',
            right: 30 * lu,
            top: 27 * lu,
            backgroundColor: '#ff9a49',
            borderRadius: 4 * lu,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 24 * lu,
              color: '#fff',
              textAlignVertical: 'center',
              marginRight: 8 * lu,
            }}>{rankList}</Text>
            <Svg icon="pulldownwhite" size={24 * lu} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}