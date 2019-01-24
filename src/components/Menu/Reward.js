import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native';

// import Header from '../components/common/Header';
import Svg from '../components/svgs/Svg';
import { width, height, lu} from '../modules/utils/unit';
import GoodPeoCard from './GookPeoCard';

export default class Reward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      giftGoodCardNum: 0,
    };
  }
  

  render() {
    return (
      <Animated.View style={{
        height: height, backgroundColor: 'rgba(0,0,0,.1)', position: 'absolute', zIndex: 999, opacity: fadeAnim, top: topPosition,
      }}>
        <TouchableWithoutFeedback onPress={this.closeReward}>
          <View style={{
            flex: 1,
          }}></View>
        </TouchableWithoutFeedback>

        <View style={{ height: 694 * lu, width: width, backgroundColor: '#fff' }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 96 * lu,
            backgroundColor: '#FF9C4A',
          }}>
            <Text style={{
              fontSize: 36 * lu,
              color: '#fff',
            }}>打赏</Text>
            <TouchableWithoutFeedback>
              <View style={{ position: 'absolute', right: 30 * lu, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                  fontSize: 30 * lu,
                  color: '#fff',
                  textAlignVertical: 'center',
                }}>好人榜</Text>
                <Svg icon="right" size={28 * lu} color="#fff" style={{ marginLeft: 18 * lu, }} />
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

          }}>
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
          }}>
            <Text style={{ color: '#565656', fontSize: 28 * lu, }}>好人卡: </Text>
            <Text style={{ color: '#FF6E94', fontSize: 28 * lu, }}>0</Text>
          </View>
          <View style={{
            height: 98 * lu,
            backgroundColor: '#f2f2f2',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{
              width: 320 * lu,
              height: 60 * lu,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FF6E94',
              position: 'absolute',
              left: 30 * lu,
              borderRadius: 10 * lu,
            }}>
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
            }}>
              <Text style={{ fontSize: 28 * lu, color: '#fff' }}>投喂</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  }
}
