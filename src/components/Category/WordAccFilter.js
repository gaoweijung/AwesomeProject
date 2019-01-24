import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { width, height, lu } from '../../modules/utils/unit';
import color from '../../modules/utils/Color';

const { color_selected } = color;
const WORD_COUNT = [
  { wordCount: '全部', wordCountId: 0,},
  { wordCount: '10万字以下', wordCountId: 1, },
  { wordCount: '10-30万字', wordCountId: 2, },
  { wordCount: '50-100万字', wordCountId: 3, },
  { wordCount: '100万字以上', wordCountId: 4, },
]
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    top: 148 * lu,
    zIndex: 9,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  catesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  cateItemWrapper: {
    height: 88 * lu,
    width: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cateItem: {
    paddingHorizontal: 32 * lu,
    height: 48 * lu,
    fontSize: 28 * lu,
    borderRadius: 24 * lu,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})

export default class WordAccFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log('isCateFilterShowed: ' + this.props.isShowed);
    if(this.props.isShowed) {
      return (
        <View style={styles.container}>
          <View style={styles.catesWrapper}>
            {WORD_COUNT.map((item) => (
              <View style={styles.cateItemWrapper} key={item.wordCountId}>
                <Text
                  onPress={() => { this.props.switchWordAccId(item.wordCountId)}}
                  style={{
                    ...styles.cateItem,
                    color: this.props.wordCountId == item.wordCountId ? '#fff' : '#565656',
                    backgroundColor: this.props.wordCountId == item.wordCountId ? color_selected : '#fff',
                  }}
                >{item.wordCount}</Text>
              </View>
            ))}
          </View>
          <TouchableWithoutFeedback onPress={this.props.closeFilter}>
            <View style={{flex: 1,}}></View>
          </TouchableWithoutFeedback>
        </View>
      );  
    }
    else { 
      return null;
    }
  }
}
