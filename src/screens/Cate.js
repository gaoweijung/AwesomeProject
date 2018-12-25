import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';


const { width } = Dimensions.get('window');
const lu = width / 750;
const cates = [
  {
    cateName: '战斗',
    imgSrc: require('../assets/images/fight.png'),
  },
  {
    cateName: '幻想',
    imgSrc: require('../assets/images/fantasy.png'),
  },
  {
    cateName: '恋爱',
    imgSrc: require('../assets/images/Love.png'),
  },
  {
    cateName: '异界',
    imgSrc: require('../assets/images/Alien.png'),
  },
  {
    cateName: '搞笑',
    imgSrc: require('../assets/images/Funny.png'),
  },
  {
    cateName: '网游',
    imgSrc: require('../assets/images/games.png'),
  },
  {
    cateName: '校园',
    imgSrc: require('../assets/images/Campus.png'),
  },
  {
    cateName: '后宫',
    imgSrc: require('../assets/images/palace.png'),
  },
  {
    cateName: '推理',
    imgSrc: require('../assets/images/reasoning.png'),
  },
  {
    cateName: '科幻',
    imgSrc: require('../assets/images/science.png'),
  },
  {
    cateName: '同人',
    imgSrc: require('../assets/images/person.png'),
  },
  {
    cateName: '超能力',
    imgSrc: require('../assets/images/Superpowers.png'),
  },
  {
    cateName: '恐怖',
    imgSrc: require('../assets/images/terror.png'),
  },
  {
    cateName: '伪娘',
    imgSrc: require('../assets/images/mother.png'),
  },
  {
    cateName: '日常',
    imgSrc: require('../assets/images/daily.png'),
  },
  {
    cateName: '治愈',
    imgSrc: require('../assets/images/Cure.png'),
  },
  {
    cateName: '悬疑',
    imgSrc: require('../assets/images/Suspense.png'),
  },
  {
    cateName: '乙女',
    imgSrc: require('../assets/images/woman.png'),
  },
]


export default class Cate extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    console.log('cate page')

    return (
      <View style={{ flex: 1, backgroundColor: 'pink' }}>
        <StatusBar
          backgroundColor="#fff"
          translucent={false}
          barStyle="dark-content"
        />

        {/* header */}
        <View
          style={{
            backgroundColor: '#fff',
            borderBottomWidth: 1 * lu,
            borderBottomColor: '#c3c3c3',
          }}>
          <Text
            style={{
              height: 88 * lu,
              fontSize: 32 * lu,
              color: '#282828',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>分类</Text>
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#f2f2f2',

          }}>

          <View
            style={{
              height: 140 * lu,
              flexDirection: 'row',
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <View
                  style={{
                    width: 316 * lu,
                    height: 98 * lu,
                    paddingLeft: 30 * lu,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 8 * lu,
                    backgroundColor: '#FF96AC'
                  }}>
                  <Image
                    source={{ uri: 'http://cdn.qcacg.com/mobile/img/app_classAll/classAll.png' }}
                    style={{ width: 58 * lu, height: 58 * lu }} />
                  <Text style={{
                    fontSize: 36 * lu,
                    color: '#fff',
                    position: 'absolute',
                    right: 30 * lu,
                  }}>查看全部</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <View
                  style={{
                    width: 316 * lu,
                    height: 98 * lu,
                    paddingLeft: 30 * lu,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 8 * lu,
                    backgroundColor: '#FBBC72'
                  }}>
                  <Image
                    source={{ uri: 'http://cdn.qcacg.com/mobile/img/app_classAll/sign.png' }}
                    style={{ width: 58 * lu, height: 58 * lu }} />
                  <Text style={{
                    fontSize: 36 * lu,
                    color: '#fff',
                    position: 'absolute',
                    right: 30 * lu,
                  }}>签约作品</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingLeft: 30 * lu,

          }}>
            {
              cates.map((item, index) => (
                <TouchableWithoutFeedback key={index}>
                  <View style={{ marginRight: 30 * lu, }}>
                    <Image
                      source={item.imgSrc}
                      style={{ width: 210 * lu, height: 210 * lu, }} />
                    <Text style={{
                      fontSize: 28 * lu,
                      color: '#333333',
                      height: 58 * lu,
                      textAlign: 'center',
                      textAlignVertical: 'center',
                    }}>{item.cateName}</Text>
                  </View>
                </TouchableWithoutFeedback>
              ))
            }

          </View>

        </ScrollView>

        <View
          style={{
            height: 88 * lu,
            backgroundColor: '#fff',
          }}>

        </View>

      </View>
    );
  }
}
