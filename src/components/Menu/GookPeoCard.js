import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';

import { lu } from '../../modules/utils/unit';

export default class GoodPeoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }



  render() {
    let { selected } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => {this.props.press(this.props.text)}}>
        <View style={{
          width: 158 * lu,
          height: 118 * lu,
          color: '#989898',
          backgroundColor: '#fff',
          borderWidth: 1 * lu,
          borderColor: selected ? '#ff4975' : '#989898',
          borderRadius: 4 * lu,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 22 * lu,
          marginBottom: 22 * lu,
        }}>
          {/* <Image  
            source={{uri: 'http://cdn.qcacg.com/mobile/img/app_newBook/goodMan.png'}}
            style={{height: 58 * lu, width: 58 * lu, marginTop: 18 * lu,}}/> */}
          <Text style={{fontSize: 24 * lu, height: 36 * lu, lineHeight: 36 * lu,}}>{this.props.text}张</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
