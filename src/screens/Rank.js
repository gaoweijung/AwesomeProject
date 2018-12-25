import React, { Component } from 'react';
import { View, Dimensions, Text, StatusBar, TouchableWithoutFeedback, FlatList, Modal, } from 'react-native';

import Header from '../components/Rank/Header'
import BookItem from '../components/common/BookItem'
import Triangle from '../components/svgs/Triangle'
import Check from '../components/svgs/Check'


const { width, height } = Dimensions.get('window');
const lu = width / 750;


export default class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: [],
      requestObj: {     // 请求参数
        rankList: this.props.navigation.getParam('rankList', 0),    // 好人、字数、点击
        timeRank: 0,    // 周、月、总
        bookTypeId: '', // 书类
        pageNo: 1,      // 页数
        pageSize: 10,   // 每页书的数量
      },
      pageNo: 1,        // 当前页面数
      totalPage: 1,     // 页面总数量
      itemNo: 10,       // 数据项每页
      isLoading: false, // 网络加载状态
      isTimeShowed: false, // 是否显示时间下拉列表
      isCateShowed: false, // if show the categoryList 
      isTypeShowed: false,

    };
  }

  //methods

  // keyExtractor
  _keyExtractor = (item) => item.bookId.toString();

  // all request
  fetchRank = async () => {
    try {
      let { rankList, timeRank, bookTypeId, pageNo, pageSize } = this.state.requestObj,
        data = await fetch(`http://www.qcacg.com/Controller/rank/getRankingList.shtml?rankList=${rankList}&timeRank=${timeRank}&bookTypeId=${bookTypeId}&pageNo=${pageNo}&pageSize=${[pageSize]}`);
      let { result, totalPage } = JSON.parse(data._bodyText);
      this.setState(() => ({ result, totalPage }));
    } catch (error) {
      console.error(error);
    }
  }

  // 加载更多
  fetchMore = async () => { // 没有设置全部加载完毕之后，不再触发
    try {
      let { rankList, timeRank, bookTypeId, pageSize } = this.state.requestObj,
        { pageNo } = this.state;
      this.setState(() => ({ pageNo: pageNo + 1 })); // 更新state的当前页数
      let data = await fetch(`http://www.qcacg.com/Controller/rank/getRankingList.shtml?rankList=${rankList}&timeRank=${timeRank}&bookTypeId=${bookTypeId}&pageNo=${pageNo + 1}&pageSize=${[pageSize]}`);
      let { result } = JSON.parse(data._bodyText);
      this.setState(() => ({ result: [...this.state.result, ...result] })); // 更新FlatList数据
    } catch (error) {
      console.error(error);
    }
  }

  // switch category of rank
  switchCate = (bookTypeId) => {
    if (this.state.requestObj.bookTypeId !== bookTypeId) {
      this.setState((state) => {
        let { requestObj } = state;
        requestObj.bookTypeId = bookTypeId;
        return { requestObj, isCateShowed: false, pageNo: 1 };
      }, () => {
        this.fetchRank();
        this.flatList.scrollToIndex({ viewPosition: 0, index: 0, animated: false });
      })
    }
  }

  // 切换时间
  switchTime = (timeRank) => {
    // when choose the same option, whether close the options
    this.setState(() => ({ isTimeShowed: false }));
    if (this.state.requestObj.timeRank !== timeRank) { // 只有当前时间选项与点击选项不一致，才进行
      this.setState((state) => {// 更改state
        let requestObj = state.requestObj;
        requestObj.timeRank = timeRank;
        return { requestObj };
      }, this.fetchRank); // 当timeRank更新成功后，重新进行网络请求
    }
  }

  // switch rank type
  switchType = (type) => {
    this.setState(() => ({ isTypeShowed: false }));
    if (this.state.requestObj.rankList !== type) {
      this.setState((state) => {
        let { requestObj } = state;
        requestObj.rankList = type;
        return { requestObj };
      }, this.fetchRank);
    }
  }

  // whether show type options list

  toggleType = () => {
    this.setState((state) => {
      if (state.isTypeShowed) {
        return { isTypeShowed: false };
      } else {
        return {
          isTypeShowed: true,
          isCateShowed: false,
          isTimeShowed: false,
        }
      }
    });
  }

  // if show category options list
  toggleCate = () => {
    this.setState((state) => {
      if (state.isCateShowed) {
        return { isCateShowed: false };
      } else {
        return {
          isCateShowed: true,
          isTypeShowed: false,
          isTimeShowed: false,
        }
      }
    });
  }

  // 是否显示时间列表
  toggleTime = () => {
    this.setState((state) => {
      if (state.isTimeShowed) {
        return { isTimeShowed: false };
      } else {
        return {
          isTimeShowed: true,
          isCateShowed: false,
          isTypeShowed: false,
        }
      }
    });
  }

  componentDidMount() {
    this.fetchRank();
  }

  // 导航方法

  navigate = (bookId) => {
    this.props.navigation.navigate('menu', { bookId: bookId });
  }


  // computed

  FlatListBg = () => {
    let backgroundColor = '';
    if (!this.state.isTimeShowed) {
      backgroundColor = '#fff';
    } else {
      backgroundColor = 'rgba(152, 152, 152, .5)';
    }
    return backgroundColor;
  }


  // render the time options list
  renderTimeOptions = () => {
    let { timeRank } = this.state.requestObj,
      timeOptions = ['周榜', '月榜', '总榜'];
    if (this.state.isTimeShowed) {
      return (
        <View style={{
          width: width,
          height: height - 176 * lu,
          position: 'absolute',
          top: 88 * lu,
          left: 0,
          zIndex: 1
        }}>
          <View style={{ backgroundColor: '#fff' }}>
            {timeOptions.map((item, index) => (
              <TouchableWithoutFeedback onPress={() => { this.switchTime(index) }} key={index}>
                <View style={{
                  height: 88 * lu,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f2f2f2',
                  alignItems: 'center',
                  paddingLeft: 30 * lu,
                  flexDirection: 'row'
                }}>
                  <Text style={{
                    marginRight: 600 * lu,
                    fontSize: 28 * lu,
                    color: timeRank == index ? '#ff9a49' : '#565656',
                  }}>
                    {item}
                  </Text>
                  <Check selected={index == timeRank} />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <TouchableWithoutFeedback onPress={this.toggleTime}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0, .1)'}}></View>
          </TouchableWithoutFeedback>
        </View>
      )
    } else {
      return null;
    }
  }

  render() {
    let {
      rankList,
      bookTypeId,
    } = this.state.requestObj;

    // 分类列表
    let cateArr = [
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
    let cateOptions =
      <View style={{
        width: width,
        height: height - 176 * lu,
        position: 'absolute',
        zIndex: 1,
        top: 88 * lu,
        right: 0,
      }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: '#fff',
          }}>
          {cateArr.map((item) => (
            <TouchableWithoutFeedback key={item.bookTypeId} onPress={() => { this.switchCate(item.bookTypeId) }}>
              <View style={{ width: width / 4, height: 88 * lu, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  width: 3 / 16 * width,
                  height: 44 * lu,
                  borderRadius: 22 * lu,
                  color: bookTypeId == item.bookTypeId ? '#fff' : '#565656',
                  backgroundColor: bookTypeId == item.bookTypeId ? '#ff9a49' : '#fff',
                }}>
                  {item.bookTypeName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))
          }
        </View>
        <TouchableWithoutFeedback onPress={this.toggleCate}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0, .1)'
            }}
          ></View>
        </TouchableWithoutFeedback>
      </View>

    // rankList 
    let rankTypes = ['好人榜', '点击榜', '字数榜'];
    let rankTypeOptions =
      <View style={{
        width: width,
        height: height - 88 * lu,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
      }}>
        <View style={{ backgroundColor: '#fff' }}>
          {rankTypes.map((item, index) => (
            <TouchableWithoutFeedback onPress={() => { this.switchType(index) }} key={item}>
              <View style={{
                height: 88 * lu,
                borderBottomWidth: 1,
                borderBottomColor: '#f2f2f2',
                alignItems: 'center',
                paddingLeft: 30 * lu,
                flexDirection: 'row'
              }}>
                <Text style={{
                  marginRight: 600 * lu,
                  fontSize: 32 * lu,
                  color: rankList == index ? '#ff9a49' : '#565656'
                }}>{item}</Text>
                <View
                  style={{
                    position: 'absolute',
                    right: 30 * lu,
                  }}
                >
                  <Check selected={rankList == index} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <TouchableWithoutFeedback onPress={this.switchType}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, .1)' }}></View>
        </TouchableWithoutFeedback>
      </View>


    // Header props rankList 

    switch (rankList) {
      case 0:
        rankList = '好人榜';
        break;
      case 1:
        rankList = '点击榜';
        break;
      default:
        rankList = '字数榜';
        break;
    }


    return (
      <View style={{ flex: 1, }}>

        <StatusBar
          backgroundColor={'#fff'}
          barStyle={'dark-content'}
          translucent />

        <Header
          style={{ marginTop: StatusBar.currentHeight, heihgt: 88 * lu }}
          title={'排行榜'}
          goBack={this.props.navigation.goBack}
          rankList={rankList}
          toggleType={this.toggleType} />


        <View style={{ flex: 1, }}>

          <View style={{ height: 88 * lu, flexDirection: 'row', borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2', zIndex: 1 }}>

            <TouchableWithoutFeedback onPress={this.toggleCate}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                  color: this.state.isCateShowed ? '#ff9a49' : '#565656',
                  fontSize: 32 * lu,
                  marginRight: 20 * lu,
                }}>分类</Text>
                <Triangle selected={this.state.isCateShowed} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.toggleTime}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{
                  fontSize: 32 * lu,
                  marginRight: 20 * lu,
                  color: this.state.isTimeShowed ? '#ff9a49' : '#565656'
                }}>时间</Text>
                <Triangle selected={this.state.isTimeShowed} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          {this.state.isTypeShowed && rankTypeOptions}

          {this.renderTimeOptions()}

          {this.state.isCateShowed && cateOptions}

          <FlatList
            ref={(flatList) => { this.flatList = flatList }}
            style={{ zIndex: 0 }}
            data={this.state.result}
            renderItem={({ item }) => (
              <BookItem book={item} navigation={this.navigate} />
            )}
            keyExtractor={this._keyExtractor}
            onEndReached={this.fetchMore}
            onEndReachedThreshold={100} />

        </View>

      </View>
    )
  }

}