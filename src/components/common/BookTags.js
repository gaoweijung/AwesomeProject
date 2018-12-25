import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';

const lu = Dimensions.get('window').width / 750;

export default class BookTags extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', ...this.props.style }}>{this.props.bookTags.map((item, index) => (
        <Text
          key={index}
          style={{
            marginRight: 8 * lu,
            paddingHorizontal: 4 * lu,
            height: 30 * lu, color: '#989898',
            fontSize: 22 * lu,
            borderWidth: 1 * lu,
            borderColor: '#565656',
            borderRadius: 4 * lu,
            textAlign: 'center',
            textAlignVertical: 'center'
          }}>
          {item.bookTypeName}
        </Text>
      ))}</View>
    )
  };
  
}
