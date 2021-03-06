import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native'
import Swiper from 'react-native-swiper'

import EitorRecom from '../components/Home/EditorRecom';
// import GoodPeoRank from '../components/Home/GoodPeoRank';
// import ClickRank from '../components/Home/ClickRank';
// import WordAccRank from '../components/Home/WordAccRank';
// import NewRank from '../components/Home/NewRank';
import WebRecom from '../components/Home/WebRecom';
// import RankHeader from '../components/Home/RankHeader';
import Svg from '../components/svgs/Svg';


const { width, height } = Dimensions.get('window')
const lu = width / 750 // the unit of length



export default class extends Component {

  // 不需要navigation 的头部
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // navigate
  navigate = (bookId) => {
    this.props.navigation.navigate('Menu', { bookId: bookId })
  }

  navigateToRank = (rankList) => {
    this.props.navigation.navigate('Rank', { rankList: rankList })
  }

  render() {

    return (
      <View style={{ flex: 1 }}>

        <StatusBar translucent={true} backgroundColor={'white'} barStyle='dark-content' />

        <View style={{ height: 108 * lu, marginTop: StatusBar.currentHeight }}>

          <View style={{
            flexDirection: 'row',
            width: width,
            height: lu * 108,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <Image source={require('../assets/images/profile_icon.jpg')}
              style={{
                width: 58 * lu,
                height: 58 * lu,
                borderRadius: 29 * lu,
                position: 'absolute',
                left: 30 * lu,
              }} />
            <Text style={{
              fontSize: 32 * lu,
              color: '#333333',
            }}>书城</Text>
            <TouchableWithoutFeedback>
            <View style={{
              height: 108 * lu,
              width: 88 * lu,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: 0,
            }}>
              <Svg icon="search1" size={28 * lu} />
            </View>
            </TouchableWithoutFeedback>

          </View>

        </View>

        <ScrollView style={{ height: height - 176 * lu - StatusBar.currentHeight, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>

          {/* 轮播图 */}
          <Swiper
            autoplay
            showsPagination
            height={lu * 316}
          >
            <View style={{
              flex: 1,
              backgroundColor: 'transparent'
            }}>
              <Image source={{ uri: 'http://cdn.qcacg.com//img/Illustration/11_01.jpg', width: width, height: 340 * lu, cache: 'force-cache' }}
                resizeMode={'stretch'}></Image>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: 'transparent'
            }}>
              <Image source={{ uri: 'http://cdn.qcacg.com//img/Illustration/11_02.jpg', width: width, height: 340 * lu, cache: 'force-cache' }}
                resizeMode={'stretch'}></Image>
            </View>
            <View style={{
              flex: 1,
              backgroundColor: 'transparent'
            }}>
              <Image source={{ uri: 'http://cdn.qcacg.com//img/Illustration/11_03.jpg', width: width, height: 340 * lu, cache: 'force-cache' }}
                resizeMode={'stretch'}></Image>
            </View>
          </Swiper>


          {/* 分类，排行榜，活动 */}

          <View style={{
            width: width,
            height: 166 * lu,
            flexDirection: 'row',
          }}>
            <TouchableWithoutFeedback>
              <View style={{
                flex: 1,
                alignItems: 'center',
                height: 166 * lu,
                paddingTop: 30 * lu,
              }}>
                <Svg icon="clses" size={58 * lu} />
                <Text style={{
                  fontSize: 28 * lu,
                  color: '#656565',
                  marginTop: 20 * lu,
                }}>分类</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { this.props.navigation.navigate('Rank') }}>
              <View style={{
                flex: 1,
                alignItems: 'center',
                height: 166 * lu,
                paddingTop: 30 * lu,
              }}>
                <Svg icon="ranks" size={58 * lu} />
                <Text style={{
                  fontSize: 28 * lu,
                  color: '#656565',
                  marginTop: 20 * lu,
                }}>排行榜</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <View style={{
                flex: 1,
                alignItems: 'center',
                height: 166 * lu,
                paddingTop: 30 * lu,
              }}>
                <Svg icon="activity" size={58 * lu} />
                <Text style={{
                  fontSize: 28 * lu,
                  color: '#656565',
                  marginTop: 20 * lu,
                }}>活动</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{
            width: width,
            height: 20 * lu,
            backgroundColor: 'rgb(242, 242, 242)',
          }}></View>

          {/* // 小编推荐 */}
          <EitorRecom navigate={this.navigate} />


          <View style={{
            width: width,
            height: 20 * lu,
            backgroundColor: 'rgb(242, 242, 242)',
          }}></View>

          {/* 好人榜 */}

          {/* <RankHeader title='好人榜' navigate={this.navigateToRank} rankList={0} />
          <GoodPeoRank navigate={this.navigate} />
          <View style={{
            width: width,
            height: 20 * lu,
            backgroundColor: 'rgb(242, 242, 242)',
          }}></View> */}

          {/* 点击榜 */}
          {/* <RankHeader title='点击榜' navigate={this.navigateToRank} rankList={1} />
          <ClickRank navigate={this.navigate} />
          <View style={{
            width: width,
            height: 20 * lu,
            backgroundColor: 'rgb(242, 242, 242)',
          }}></View> */}


          {/* 全站推荐 */}
          <WebRecom navigate={this.navigate} />
          <View style={{
            width: width,
            height: 20 * lu,
            backgroundColor: 'rgb(242, 242, 242)',
          }}></View>

          {/* 字数榜 */}

          {/* <RankHeader title='字数榜' navigate={this.navigateToRank} rankList={2} />

          <WordAccRank navigate={this.navigate} />
          <View style={{
            width: width,
            height: 20 * lu,
            backgroundColor: 'rgb(242, 242, 242)',
          }}></View> */}

          {/* 新书推荐 */}

          <View style={{
            height: 98 * lu,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 30 * lu,
            overflow: 'hidden'
          }}>
            <Svg icon="crown" size={48 * lu} />
            <Text style={{
              marginLeft: 20 * lu,
              marginRight: 470 * lu,
              fontSize: 30 * lu,
              color: '#282828',
            }}>新书推荐</Text>
            <Svg icon="Refresh" size={32 * lu} />
          </View>


          <View style={{
            width: width,
            height: 20 * lu,
            backgroundColor: 'rgb(242, 242, 242)',
          }}></View>

          {/* 最新更新
          <RankHeader title='点击榜' navigate={this.navigateToRank} />
          <NewRank navigate={this.navigate} /> */}
          {/* <ActivityIndicator animating={true} color="gray" hidesWhenStopped={true} /> */}
        </ScrollView>
      </View >
    )
  }
}