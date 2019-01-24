import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { width, height, lu } from '../../modules/utils/unit';
import color from '../../modules/utils/Color';

const { color_selected } = color;
const CATEGORIES = [
  { bookTypeName: '全部', bookTypeId: '' },
  { bookTypeName: '战斗', bookTypeId: 1 },
  { bookTypeName: '幻想', bookTypeId: 2 },
  { bookTypeName: '恋爱', bookTypeId: 3 },
  { bookTypeName: '异界', bookTypeId: 4 },
  { bookTypeName: '搞笑', bookTypeId: 5 },
  { bookTypeName: '日常', bookTypeId: 6 },
  { bookTypeName: '校园', bookTypeId: 7 },
  { bookTypeName: '后宫', bookTypeId: 8 },
  { bookTypeName: '推理', bookTypeId: 9 },
  { bookTypeName: '科幻', bookTypeId: 10 },
  { bookTypeName: '治愈', bookTypeId: 11 },
  { bookTypeName: '超能力', bookTypeId: 12 },
  { bookTypeName: '恐怖', bookTypeId: 13 },
  { bookTypeName: '伪娘', bookTypeId: 14 },
  { bookTypeName: '乙女', bookTypeId: 15 },
  { bookTypeName: '同人', bookTypeId: 16 },
  { bookTypeName: '悬疑', bookTypeId: 17 },
  { bookTypeName: '网游', bookTypeId: 18 }
];
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
    width: width / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cateItem: {
    width: 120 * lu,
    height: 48 * lu,
    fontSize: 28 * lu,
    borderRadius: 24 * lu,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})

export default class CateFilter extends Component {
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
            {CATEGORIES.map((item) => (
              <View style={styles.cateItemWrapper} key={item.bookTypeId}>
                <Text
                  onPress={() => { this.props.switchBookTypeId(item.bookTypeId)}}
                  style={{
                    ...styles.cateItem,
                    color: this.props.bookTypeId == item.bookTypeId ? '#fff' : '#565656',
                    backgroundColor: this.props.bookTypeId == item.bookTypeId ? color_selected : '#fff',
                  }}
                >{item.bookTypeName}</Text>
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
