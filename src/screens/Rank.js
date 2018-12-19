import React, {Component} from 'react';
import {View, Dimensions,Text,StatusBar,TouchableWithoutFeedback, ScrollView, FlatList} from 'react-native';
import Svg from 'react-native-remote-svg'

import Header from '../components/Header'
import BookItem from '../components/common/BookItem'


const {width} = Dimensions.get('window');
const lu = width / 750;
const url = 'http://cdn.qcacg.com/Controller';

export default class Rank extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rankList: []
    }
  }

  // 字数周榜
  fetchAccWeekRank = async () => {
    let data = await fetch('http://www.qcacg.com/Controller/book/WeekBookByBookWordCount.shtml');
    let rankList = JSON.parse(data._bodyText);
    this.setState(() => ({rankList}));
    console.log(this.state.rankList);
  }

  componentDidMount() {
    this.fetchAccWeekRank();
  }

  render() {
    
    return (
      <View style={{flex: 1,}}>

        <StatusBar 
        backgroundColor={'#fff'}
        barStyle={'dark-content'}
        translucent />

        <Header style={{marginTop: StatusBar.currentHeight, heihgt: 88 * lu, backgroundColor: 'pink',}} title={'排行榜'} />

        <View style={{height: 88 * lu, flexDirection: 'row', }}>

          <TouchableWithoutFeedback>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#fedc6f', fontSize: 32 * lu, marginRight: 20 * lu,}}>分类</Text>
              <Svg source={require('../assets/svgs/pull-down.svg')} style={{width: 32 * lu, height: 32 * lu}} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 32 * lu, marginRight: 20 * lu,}}>时间</Text>
              <Svg source={require('../assets/svgs/pull-down.svg')} style={{width: 32 * lu, height: 32 * lu}} />
            </View>
          </TouchableWithoutFeedback>

        </View>
        
        <ScrollView style={{flex: 1}}>
          <BookItem book={{imgSrc: require('../assets/images/defaultBook.png'), bookName: 'jianlai', bookIntro: '启明星的指引很快就到换卡阿斯顿哈和圣诞节 啥都哈大股东', bookAuthor: 'fenghuoxizhuhou', bookTags: [{bookTypeName: '玄幻'}]}} />
        </ScrollView>

        {/* <FlatList
          data={this.state.rankList}
          renderItem={({item}) => (
            <BookItem book={item} />
          )} />
 */}
      </View>
    )
  }

}