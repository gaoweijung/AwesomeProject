import React, { Component } from 'react';
import {
  View, Text, ScrollView, StatusBar, Image, TouchableWithoutFeedback, Modal, Animated,
} from 'react-native';

// import Header from '../components/common/Header';
import Svg from '../components/svgs/Svg';
import BookInfo from '../components/Menu/BookInfo';
import { width, lu, height } from '../modules/utils/unit';
import Comment from '../components/Menu/Comment';
import GoodPeoCard from '../components/Menu/GookPeoCard';
// import Header from '../components/Menu/Header';
import Footer from '../components/Menu/Footer';


const url = 'http://cdn.qcacg.com/Controller';

class AwayPart extends Component {
  render() {
    return (
      <View style={{ width, height: 18 * lu, backgroundColor: '#f2f2f2' }} />
    );
  }
}

export default class Menu extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      bookId: this.props.navigation.getParam('bookId', 1),
      isRewardShowed: false,
      isShareShowed: false,
      transparent: true,
      fadeAnim: new Animated.Value(0),
      topPosition: new Animated.Value(0),
      giftGoodCardNum: 0,
    };
  }

  componentDidMount = () => {
    // Animated.timing(this.state.fadeAnim, {
    //   toValue: 1,
    //   duration: 5000,
    // }).start();
  }


  openReward = () => {
    // this.setState((state) => ({ isRewardShowed: !state.isRewardShowed, }));
    Animated.parallel([
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 300,
      }),
      Animated.timing(this.state.topPosition, {
        toValue: 1,
        duration: 300,
      }),
    ]).start();
    console.log('openReward called\n');
  }

  closeReward = () => {
    Animated.parallel([
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: 200,
      }),
      Animated.timing(this.state.topPosition, {
        toValue: 0,
        duration: 200,
      }),
    ]).start();
    console.log('closeReward called\n');
  }

  toggleShare = () => {
    this.setState(state => ({ isShareShowed: !state.isShareShowed }));
  }


  // 监听Scroll
  _onScroll = (event) => {
    const Y = event.nativeEvent.contentOffset.y;
    if (Y < 200) {
      st = Y * 0.005;
    } else {
      st = 1;
    }
    this._refHeader.setNativeProps({
      backgroundColor: `rgba(255,255,255,${st})`,
    });
  }

  render() {
    console.log('渲染Menu（父组件）');
    return (
      this.renderMenu()
    );
  }

  // 更改好人卡
  changeCard = (number) => {
    this.setState(() => ({ giftGoodCardNum: number }));
  }

  goBack = () => {
    console.log('返回');
    this.props.navigation.goBack();
  }


  renderMenu() {
    const { fadeAnim, giftGoodCardNum } = this.state;
    const topPosition = this.state.topPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
    });

    return (
      <View style={{ flex: 1 }}>


        <View
          ref={e => this._refHeader = e}
          style={{
            height: StatusBar.currentHeight + 88 * lu,
            paddingTop: StatusBar.currentHeight,
            position: 'absolute',
            zIndex: 9,
            backgroundColor: 'rgba(255,255,255,0)',
          }}
        >
          <View style={{
            height: 88 * lu, width, flexDirection: 'row', alignItems: 'center',
          }}
          >
            <TouchableWithoutFeedback onPress={this.goBack}>
              <View style={{ flex: 1, height: 88 * lu, justifyContent: 'center' }}>
                <Svg icon="back" size={30 * lu} style={{ position: 'absolute', left: 30 * lu }} />
              </View>
            </TouchableWithoutFeedback>
            <Text
              style={{
                flex: 2, textAlign: 'center', fontSize: 32 * lu, lineHeight: 88 * lu,
              }}
              onPress={this.fatherMethod}
            >
              目录页
              
            </Text>
            <TouchableWithoutFeedback>
              <View style={{ flex: 1, height: 88 * lu, justifyContent: 'center' }}>
                <Svg icon="more" size={35 * lu} style={{ position: 'absolute', right: 30 * lu }} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

        {/* <Header /> */}


        <ScrollView style={{ flex: 1 }} onScroll={this._onScroll}>

          <BookInfo
            openReward={this.openReward}
            toggleShare={this.toggleShare}
            bookId={this.state.bookId}
            style={{ height: StatusBar.currentHeight + 88 * lu }}
          />
          <AwayPart />
          <Comment bookId={this.state.bookId} />
          <AwayPart />

        </ScrollView>

        <Footer />


        <Animated.View style={{
          height, backgroundColor: 'rgba(0,0,0,.1)', position: 'absolute', zIndex: 999, opacity: fadeAnim, top: topPosition,
        }}
        >
          <TouchableWithoutFeedback onPress={this.closeReward}>
            <View style={{
              flex: 1,
            }}
            />
          </TouchableWithoutFeedback>

          <View style={{ height: 694 * lu, width, backgroundColor: '#fff' }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 96 * lu,
              backgroundColor: '#FF9C4A',
            }}
            >
              <Text style={{
                fontSize: 36 * lu,
                color: '#fff',
              }}
              >
                打赏
              </Text>
              <TouchableWithoutFeedback>
                <View style={{
                  position: 'absolute', right: 30 * lu, flexDirection: 'row', alignItems: 'center',
                }}
                >
                  <Text style={{
                    fontSize: 30 * lu,
                    color: '#fff',
                    textAlignVertical: 'center',
                  }}
                  >
                    好人榜
                </Text>
                  <Svg icon="right" size={28 * lu} color="#fff" style={{ marginLeft: 18 * lu }} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingTop: 70 * lu,
              paddingLeft: 30 * lu,
              height: 410 * lu,
              borderBottomWidth: 1 * lu,
              borderBottomColor: '#FF9C4A',

            }}
            >
              <GoodPeoCard text="100" selected={giftGoodCardNum == 100} press={this.changeCard} />
              <GoodPeoCard text="500" selected={giftGoodCardNum == 500} press={this.changeCard} />
              <GoodPeoCard text="1000" selected={giftGoodCardNum == 1000} press={this.changeCard} />
              <GoodPeoCard text="3000" selected={giftGoodCardNum == 3000} press={this.changeCard} />
              <GoodPeoCard text="5000" selected={giftGoodCardNum == 5000} press={this.changeCard} />
              <GoodPeoCard text="10000" selected={giftGoodCardNum == 10000} press={this.changeCard} />
              <GoodPeoCard text="30000" selected={giftGoodCardNum == 30000} press={this.changeCard} />
              <GoodPeoCard text="50000" selected={giftGoodCardNum == 50000} press={this.changeCard} />

            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 30 * lu,
              height: 90 * lu,
            }}
            >
              <Text style={{ color: '#565656', fontSize: 28 * lu }}>好人卡: </Text>
              <Text style={{ color: '#FF6E94', fontSize: 28 * lu }}>0</Text>
            </View>
            <View style={{
              height: 98 * lu,
              backgroundColor: '#f2f2f2',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            >
              <View style={{
                width: 320 * lu,
                height: 60 * lu,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FF6E94',
                position: 'absolute',
                left: 30 * lu,
                borderRadius: 10 * lu,
              }}
              >
                <Text style={{ fontSize: 28 * lu, color: '#fff' }}>充值</Text>
              </View>
              <View style={{
                width: 320 * lu,
                height: 60 * lu,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FF9C4A',
                position: 'absolute',
                right: 30 * lu,
                borderRadius: 10 * lu,
              }}
              >
                <Text style={{ fontSize: 28 * lu, color: '#fff' }}>投喂</Text>
              </View>
            </View>
          </View>
        </Animated.View>

      </View>
    );
  }
}
