import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableWithoutFeedback } from 'react-native';

import { width, height, lu } from '../../modules/utils/unit';

// const WIDTH_FILTER = 662 * lu,
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
const WORD_COUNT = [
  { wordCount: '10万字以下', wordCountId: 1, },
  { wordCount: '10-30万字', wordCountId: 2, },
  { wordCount: '50-100万字', wordCountId: 3, },
  { wordCount: '100万字以上', wordCountId: 4, },
]

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log('render Filter');

    return (
      this.props.isShowed ?
      <View style={{
        height: height,
        width: width,
        position: 'absolute',
        zIndex: 9,
        backgroundColor: 'rgba(0,0,0,.5)',
      }}>
        <TouchableWithoutFeedback onPress={this.props.closeFilter}>
          <View style={{
            width: 88 * lu,
            height: height,
            position: 'absolute',
            left: 0,
          }}></View>
        </TouchableWithoutFeedback>

        <View style={{
          height: height,
          width: 662 * lu,
          position: 'absolute',
          right: 0,
          backgroundColor: '#fff',
        }}>
          <Text style={{
            marginTop: StatusBar.currentHeight,
            height: 88 * lu,
            lineHeight: 88 * lu,
            paddingLeft: 30 * lu,
            fontSize: 28 * lu,
            color: '#333333',
            borderBottomWidth: 1 * lu,
            borderBottomColor: '#c3c3c3',
          }}>筛选</Text>
          <Text style={{
            height: 80 * lu,
            lineHeight: 80 * lu,
            paddingLeft: 30 * lu,
            color: '#282828',
            fontSize: 24 * lu,
          }}>分类: </Text>
          <View style={{
            height: 240 * lu,
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingLeft: 30 * lu,
            borderBottomWidth: 1 * lu,
            borderBottomColor: '#c3c3c3',
          }}>
            {CATEGORIES.map((item, index) => (
              <Text
                onPress={() => { this.props.filterSwitchType(item.bookTypeId) }}
                style={{
                  height: 60 * lu,
                  lineHeight: 60 * lu,
                  width: index % 5 == 0 || index % 5 == 4 ? 94 * lu : 140 * lu,
                  textAlign: index % 5 == 0 ? 'left' : index % 5 == 4 ? 'right' : 'center',
                  fontSize: 24 * lu,
                  color: this.props.bookTypeId == item.bookTypeId ? '#ff9b49' : '#565656',
                }}
                key={item.bookTypeId}
              >{item.bookTypeName}</Text>
            ))}
          </View>

          <View style={{
            height: 220 * lu,
            borderBottomWidth: 1 * lu,
            borderBottomColor: '#c3c3c3',
          }}>
            <Text style={{
              height: 76 * lu,
              lineHeight: 76 * lu,
              paddingLeft: 30 * lu,
              fontSize: 24 * lu,
              color: '#282828',
            }}>字数: </Text>
            <View style={{
              height: 144 * lu,
              flexDirection: 'row',
              paddingLeft: 30 * lu,
            }}>
              <Text
                onPress={() => { this.props.filterSwitchCount(0) }}
                style={{
                  paddingTop: 20 * lu,
                  marginRight: 18 * lu,
                  fontSize: 24 * lu,
                  color: this.props.wordAccId == 0 ? '#ff9b49' : '#565656',
                }}>全部</Text>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
                {WORD_COUNT.map((item) => (
                  <Text
                    onPress={() => { this.props.filterSwitchCount(item.wordCountId) }}
                    key={item.wordCountId}
                    style={{
                      height: 72 * lu,
                      width: 267 * lu,
                      lineHeight: 72 * lu,
                      textAlign: 'center',
                      color: this.props.wordAccId == item.wordCountId ? '#ff9b49' : '#565656',
                      fontSize: 24 * lu,
                    }}>{item.wordCount}</Text>
                ))}
              </View>
            </View>
          </View>

          <View style={{
            height: 148 * lu,
            flexDirection: 'row',
            borderBottomWidth: 1 * lu,
            borderBottomColor: '#c3c3c3',
          }}>
            <Text style={{
              position: 'absolute',
              top: 24 * lu,
              left: 30 * lu,
              fontSize: 24 * lu,
              color: '#282828',
            }}>状态: </Text>
            <Text
              onPress={() => { this.props.filterSwitchSign(0) }}
              style={{
                position: 'absolute',
                top: 98 * lu,
                left: 124 * lu,
                fontSize: 24 * lu,
                height: 48 * lu,
                textAlignVertical: 'top',
                color: this.props.isSign == 0 ? '#ff9b49' : '#565656',
              }}>精品作品</Text>
            <Text
              onPress={() => { this.props.filterSwitchSign(1) }}
              style={{
                position: 'absolute',
                top: 98 * lu,
                left: 440 * lu,
                fontSize: 24 * lu,
                color: this.props.isSign == 1 ? '#ff9b49' : '#565656',
              }}>签约作品</Text>
          </View>

          <Text
            onPress={this.props.clear}
            style={{
              width: 286 * lu,
              height: 60 * lu,
              position: 'absolute',
              bottom: 32 * lu,
              left: 30 * lu,
              lineHeight: 60 * lu,
              textAlign: 'center',
              backgroundColor: '#F2F2F2',
              borderRadius: 8 * lu,
              color: '#FF4776',
              fontSize: 26 * lu,
            }}>清除</Text>

          <Text
            onPress={this.props.enter}
            style={{
              width: 286 * lu,
              height: 60 * lu,
              position: 'absolute',
              bottom: 32 * lu,
              left: 344 * lu,
              lineHeight: 60 * lu,
              textAlign: 'center',
              backgroundColor: '#FF4776',
              borderRadius: 8 * lu,
              color: '#F2F2F2',
              fontSize: 26 * lu,
            }}>确定</Text>

        </View>

      </View> :
      null
    );
  }
}
