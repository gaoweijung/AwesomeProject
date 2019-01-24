import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import Svg from '../../components/svgs/Svg';
import { lu } from '../../modules/utils/unit';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{
        height: 98 * lu,
        backgroundColor: '#fff',
        flexDirection: 'row',
      }}>
        <TouchableWithoutFeedback>
          <View style={{
            width: 231 * lu,
            height: 98 * lu,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Svg icon="Collection" color="#ff9c4a" size={24 * lu} />
            <Text style={{
              fontSize: 24 * lu,
              color: '#ff9c4a',
              marginTop: 5 * lu,  
            }}>收藏</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={{
          flex: 1, 
          color: '#fff',
          lineHeight: 98 * lu,
          textAlign: 'center',
          fontSize: 28 * lu,
          backgroundColor: '#FF616F',
        }}>进入阅读</Text>
        <TouchableWithoutFeedback>
          <View style={{
            width: 231 * lu,
            height: 98 * lu,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Svg icon="comment" color="#ff9c4a" size={24 * lu} />
            <Text style={{
              fontSize: 24 * lu,
              color: '#ff9c4a',
              marginTop: 5 * lu,
            }}>评论</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
