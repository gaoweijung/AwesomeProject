import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native';
import SvgRemote from 'react-native-remote-svg';


const { width } = Dimensions.get('window');
const lu = width / 750;

export default class RankHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{
        height: 98 * lu,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30 * lu,
      }}>
        <Text style={{
          marginLeft: 20 * lu,
          marginRight: 470 * lu,
          fontSize: 30 * lu,
          color: '#282828',
        }}>{this.props.title}</Text>
        <TouchableWithoutFeedback onPress={() => {this.props.navigate(this.props.rankList)}}>
          <View style={{ height: 88 * lu, width: 96 * lu, position: 'absolute', right: 30 * lu, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 26 * lu }}>更多</Text>
            <SvgRemote
              source={require('../../assets/svgs/right.svg')}
              style={{ width: 14 * lu, height: 26 * lu, marginTop: -4 * lu }} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
