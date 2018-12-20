import React, {Component} from 'react';
import {View, Dimensions,Text,StatusBar,TouchableWithoutFeedback, FlatList, Modal} from 'react-native';
import Svg from 'react-native-remote-svg'

import Header from '../components/Header'
import BookItem from '../components/common/BookItem'


const {width} = Dimensions.get('window');
const lu = width / 750;


export default class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: [],
      requestObj: {     // 请求参数
        rankList: 0,    // 好人、字数、点击
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
      // isCate

    };
  }

  //methods

  // keyExtractor
  _keyExtractor = (item) => item.bookId.toString();

  // 字数周榜
  fetchRank = async () => {
    let {rankList, timeRank, bookTypeId, pageNo, pageSize} = this.state.requestObj,
        data = await fetch(`http://www.qcacg.com/Controller/rank/getRankingList.shtml?rankList=${rankList}&timeRank=${timeRank}&bookTypeId=${bookTypeId}&pageNo=${pageNo}&pageSize=${[pageSize]}`);
    console.log(data);
    let {result} = JSON.parse(data._bodyText);
    this.setState(() => ({result}));
  }

  // 加载更多
  fetchMore = async () => { // 没有设置全部加载完毕之后，不再触发
    let {rankList, timeRank, bookTypeId, pageSize} = this.state.requestObj,
        { pageNo } = this.state;
    this.setState(() => ({pageNo: pageNo + 1})); // 更新state的当前页数
    let data = await fetch(`http://www.qcacg.com/Controller/rank/getRankingList.shtml?rankList=${rankList}&timeRank=${timeRank}&bookTypeId=${bookTypeId}&pageNo=${pageNo + 1}&pageSize=${[pageSize]}`);
    let {result} = JSON.parse(data._bodyText);
    this.setState(() => ({result: [...this.state.result, ...result]})); // 更新FlatList数据
  }
  
  // 切换时间
  switchTime(timeRank) {
    if(this.state.requestObj.timeRank !== timeRank) { // 只有当前时间选项与点击选项不一致，才进行
      this.setState((state) => {// 更改state
        let requestObj = state.requestObj;
        requestObj.timeRank = timeRank;
        return {requestObj};
      }, this.fetchRank); // 当timeRank更新成功后，重新进行网络请求
    }
  }

  // 是否显示时间列表
  toggleTime = () => {
    this.setState((state) => ({isTimeShowed: !state.isTimeShowed}));
    console.log(this.state.isTimeShowed);
  }

  componentDidMount() {
    this.fetchRank();
  }

  // 导航方法

  navigate = (bookId) => {
    console.log(bookId);
    this.props.navigation.navigate('menu', {bookId: bookId});
    console.log('rank\'s method triggled')
  }


  // computed

  FlatListBg = () => {
    let backgroundColor = '';
    if(!this.state.isTimeShowed) {
      backgroundColor = '#fff';
    } else{
      backgroundColor = 'rgba(152, 152, 152, .5)';
    }
    return backgroundColor;
  }



  render() {
    let {
      rankList,
      bookTypeId,
      timeRank,
    } = this.state.requestObj;

    // 时间列表
    let timeOptions = 
      <View style={{position: 'absolute', top: 88 * lu, left: 0, width: width, backgroundColor: '#fff', zIndex: 2}}>
        <TouchableWithoutFeedback onPress={() => {this.switchTime(0)}}>
          <View style={{height: 88 * lu, borderBottomWidth: 1, borderBottomColor: '#282828', alignItems: 'center', paddingLeft: 30 * lu, flexDirection: 'row'}}>
            <Text style={{marginRight: 600 * lu, fontSize: 32 * lu, color: timeRank == 0 ? '#fedc6f' : '#565656'}}>周榜</Text>
            {timeRank == 0 ? <Svg source={require('../assets/svgs/_selected.svg')} style={{width: 32 * lu, height: 32 * lu,}} /> : null}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {this.switchTime(1)}}>
          <View style={{height: 88 * lu, borderBottomWidth: 1, borderBottomColor: '#282828', alignItems: 'center', paddingLeft: 30 * lu, flexDirection: 'row'}}>
            <Text style={{marginRight: 600 * lu, fontSize: 32 * lu, color: timeRank == 1 ? '#fedc6f' : '#565656'}}>月榜</Text>
            {timeRank == 1 ? <Svg source={require('../assets/svgs/_selected.svg')} style={{width: 32 * lu, height: 32 * lu,}} /> : null}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {this.switchTime(2)}}>
          <View style={{height: 88 * lu, borderBottomWidth: 1, borderBottomColor: '#282828', alignItems: 'center', paddingLeft: 30 * lu, flexDirection: 'row'}}>
            <Text style={{marginRight: 600 * lu, fontSize: 32 * lu, color: timeRank == 2 ? '#fedc6f' : '#565656', }}>总榜</Text>
            {timeRank == 2 ? <Svg source={require('../assets/svgs/_selected.svg')} style={{width: 32 * lu, height: 32 * lu,}} /> : null}
          </View>
        </TouchableWithoutFeedback>
      </View>

      // 分类列表
      let cateArr = [
        {bookTypeName: '全部', bookTypeId: ''}, 
        {bookTypeName: '战斗', bookTypeId: 1}, 
        {bookTypeName: '幻想', bookTypeId: 2}, 
        {bookTypeName: '恋爱', bookTypeId: 3}, 
        {bookTypeName: '异界', bookTypeId: 4}, 
        {bookTypeName: '搞笑', bookTypeId: 5}, 
        {bookTypeName: '日常', bookTypeId: 6}, 
        {bookTypeName: '校园', bookTypeId: 7}, 
        {bookTypeName: '后宫', bookTypeId: 8}, 
        {bookTypeName: '推理', bookTypeId: 9}, 
        {bookTypeName: '科幻', bookTypeId: 10}, 
        {bookTypeName: '治愈', bookTypeId: 11}, 
        {bookTypeName: '超能力', bookTypeId: 12}, 
        {bookTypeName: '恐怖', bookTypeId: 13}, 
        {bookTypeName: '伪娘', bookTypeId: 14}, 
        {bookTypeName: '乙女', bookTypeId: 15}, 
        {bookTypeName: '同人', bookTypeId: 16}, 
        {bookTypeName: '悬疑', bookTypeId: 17},
        {bookTypeName: '网游', bookTypeId: 18}
      ];
      let cateOption =
        <View style={{width: width, height: 440 * lu, position:'absolute', zIndex: 2, top: 86 * lu, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#fff'}}>
          {cateArr.map((item) => (
          <TouchableWithoutFeedback key={item.bookTypeId} onPress={() => {this.setState(() => ({bookTypeId: item.bookTypeId}), this.fetchRank)}}>
            <View style={{width: width / 4, height: 88 * lu, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{
                textAlign: 'center', 
                textAlignVertical: 'center', 
                width: 3/16 * width, 
                height: 44 * lu, 
                borderRadius: 22 * lu, 
                color: this.state.requestObj.bookTypeId == item.bookTypeId ? '#fff' : '#565656', 
                backgroundColor: this.state.requestObj.bookTypeId == item.bookTypeId ? '#fedc6f' : '#fff'
                }}>
                  {item.bookTypeName}
                </Text>
            </View>
          </TouchableWithoutFeedback>
          ))
          }
        </View>
      
    
    return (
      <View style={{flex: 1,}}>

        <StatusBar 
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
        translucent />

        <Header style={{marginTop: StatusBar.currentHeight, heihgt: 88 * lu}} title={'排行榜'} />

        <View style={{height: 88 * lu, flexDirection: 'row', borderTopWidth: 1 *lu, borderTopColor: '#f2f2f2', zIndex: 1}}>

          <TouchableWithoutFeedback>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#fedc6f', fontSize: 32 * lu, marginRight: 20 * lu,}}>分类</Text>
              <Svg source={require('../assets/svgs/pull-down.svg')} style={{width: 32 * lu, height: 32 * lu}} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.toggleTime}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 32 * lu, marginRight: 20 * lu, color: this.state.isTimeShowed ? '#fedc6f' : '#565656'}}>时间</Text>
              <Svg source={this.state.isTimeShowed ? require('../assets/svgs/pull-down-yellow.svg') : require('../assets/svgs/pull-down.svg')} style={{width: 32 * lu, height: 32 * lu}} />
            </View>
          </TouchableWithoutFeedback>
          {this.state.isTimeShowed ? timeOptions : null}
          {/* {cateOption} */}
        </View>

        <View style={{width: width, height: 108 * lu}}>
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={true}
            onRequestClose={() => {console.log('Modal has been closed.')}}
          >
            <View style={{width: width, height: 88 * lu, backgroundColor: 'pink'}}>
              <Text>Hello world</Text>
            </View>
          </Modal>
        </View>
        

        <FlatList
          style={{backgroundColor: this.FlatListBg(), zIndex: 0}}
          data={this.state.result}
          renderItem={({item}) => (
            <BookItem book={item} navigation={this.navigate} />
          )}
          keyExtractor={this._keyExtractor} 
          onEndReached={this.fetchMore}
          onEndReachedThreshold={100} />

      </View>
    )
  }

}