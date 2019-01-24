import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { width, lu } from '../../modules/utils/unit';
import Svg from '../svgs/Svg';

const url = 'http://cdn.qcacg.com/Controller';

export default class BookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      isMoreIntro: false,
    };
  }

  toggleIntroShow = () => {
    this.setState((state) => ({ isMoreIntro: !state.isMoreIntro }));
  }

  updateTime = (updateTime) => {
    var currentTime = new Date();
    let time = currentTime.getTime() - updateTime;
    if (Math.floor(time / 31536000000) > 0) {
      return Math.floor(time / 31536000000) + "年前";
    }
    if (Math.floor(time / 2592000000) > 0) {
      return Math.floor(time / 2592000000) + "月前";
    }
    if (Math.floor(time / 604800000) > 0) {
      return Math.floor(time / 604800000) + "周前";
    }
    if (Math.floor(time / 86400000) > 0) {
      return Math.floor(time / 86400000) + "天前";
    }
    if (Math.floor(time / 3600000) > 0) {
      return Math.floor(time / 3600000) + "小时前";
    }
    if (Math.floor(time / 60000) > 0) {
      return Math.floor(time / 60000) + "分钟前";
    }
    if (Math.floor(time / 1000) > 0) {
      return Math.floor(time / 1000) + "秒前";
    } else {
      return "0秒前";
    }
  }


  async fetchBook() {
    try {
      console.log(`bookId in BookInfo: ${this.props.bookId}`);
      let resJson = await fetch(`https://ex.qcacg.com/Controller/catalog/queryBookDirectory.shtml?bookId=${this.props.bookId}`, {
        type: 'get',
      });
      let { bookCustom } = JSON.parse(resJson._bodyText);
      this.setState({
        book: {
          bookCoverImage: { uri: url + bookCustom.bookCoverImage },
          bookName: bookCustom.bookName,
          bookTypeEntityList: bookCustom.bookTypeEntityList,
          userEntity: {
            userName: bookCustom.userEntity.userName,
            userHead: { uri: url + bookCustom.userEntity.userHead },
            information: bookCustom.userEntity.information,
          },
          bookHit: bookCustom.bookHit,
          bookWordCount: bookCustom.bookWordCount,
          updateCycle: bookCustom.updateCycle == 1 ? '日更' : '月更',
          isEnded: '连载中',
          lastChapterTitle: bookCustom.lastContent.contentTitle,
          bookUpdate: bookCustom.bookUpdate,
          bookIntroduction: bookCustom.bookIntroduction,
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  componentDidMount() {
    this.fetchBook();
  }

  shouldComponentUpdate(nextState) {
    if(this.state.book == nextState.book && this.state.isMoreIntro == nextState.isMoreIntro ) {
      return false;
    } else {
      return true;
    }
  }

  render() {



    let book = this.state.book;
    if (!book.bookTypeEntityList) {
      return null;
    }
    let bookTags = book.bookTypeEntityList.map((item) => (<Text
      key={item.bookTypeId}
      style={{ width: 68 * lu, height: 36 * lu, backgroundColor: '#f88e26', textAlign: 'center', color: '#ffffff', fontSize: 24 * lu, marginRight: 8 * lu, borderWidth: 2 * lu, borderColor: '#fff', borderRadius: 8 * lu, lineHeight: 32 * lu }}>
      {item.bookTypeName}
    </Text>));
    let clickTimes = book.bookHit / 10000 >= 1 ? `${Math.round(book.bookHit / 10000)}万` : book.bookHit;
    let wordCount = book.bookWordCount / 10000 >= 1 ? `${Math.round(book.bookWordCount / 10000)}万` : book.bookWordCount;


    console.log('BookInfo 重新绘制啦');

    return (
      <View style={{ backgroundColor: '#f2f2f2', }}>
        <View style={{ ...this.props.style, backgroundColor: '#fff' }}></View>
        <View style={{ backgroundColor: '#fff', width: width, height: 440 * lu, paddingVertical: 20 * lu, paddingHorizontal: 30 * lu, }}>
          <View>

            <View style={{ flexDirection: 'row', height: 280 * lu }}>
              <Image source={book.bookCoverImage} style={{ width: 202 * lu, height: 280 * lu, marginRight: 20 * lu, }} />
              <View style={{ width: 474 * lu }}>
                <Text style={{ fontSize: 28 * lu, color: '#282828', }}>{book.bookName}</Text>
                <View style={{ flexDirection: 'row', height: 72 * lu, paddingVertical: 20 * lu }}>{bookTags}</View>
                <Text style={{ fontSize: 24 * lu, color: '#656565', marginBottom: 20 * lu }}>{book.userEntity.userName}</Text>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ fontSize: 24 * lu, color: '#656565', }}>{book.updateCycle}</Text>
                  <Text style={{ paddingHorizontal: 20 * lu, fontSize: 24 * lu }}>|</Text>
                  <Text style={{ fontSize: 24 * lu, color: '#656565', }}>{book.isEnded}</Text>
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', bottom: 0 }}>
                  <Text style={{ fontSize: 24 * lu, color: '#ff4273', flex: 1 }}>点击 ：{clickTimes}</Text>
                  <Text style={{ fontSize: 24 * lu, color: '#ff4273', flex: 1 }}>字数 ：{wordCount}</Text>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', height: 88 * lu, marginTop: 52 * lu }}>
              <TouchableWithoutFeedback onPress={this.props.openReward}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2' }}>
                  <Svg icon="Reward" size={38 * lu} style={{ marginRight: 15 * lu }} />
                  <Text style={{ fontSize: 24 * lu, color: '#ff9c4a' }}>打赏</Text>
                </View>
              </TouchableWithoutFeedback>
              <Text style={{ fontSize: 24 * lu, height: 88 * lu, textAlignVertical: 'center' }}>|</Text>
              <TouchableWithoutFeedback onPress={this.props.toggleShare}>
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2' }}>
                  <Svg icon="share" size={38 * lu} style={{ marginRight: 15 * lu, }} />
                  <Text style={{ fontSize: 24 * lu, color: '#ff9c4a' }}>分享</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>


        {/* 最新章节 */}


        <View style={{ width: width, backgroundColor: '#FFF', marginTop: 20 * lu, }}>
          <View style={{ height: 88 * lu, width: width, paddingHorizontal: 30 * lu, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 34 * lu, color: '#ff7497', }}>|</Text>
            <Text style={{ fontSize: 28 * lu, color: '#282828', marginHorizontal: 20 * lu }}>最新</Text>
            <Text style={{ fontSize: 24 * lu, color: '#656565' }}>{book.lastChapterTitle}</Text>
            <View style={{ width: 190 * lu, flexDirection: 'row', position: 'absolute', right: 30 * lu, alignItems: 'center', height: 88 * lu, }}>
              <Svg icon="Newest" size={40 * lu} />
              <Text style={{ fontSize: 20 * lu, color: '#ff7497', marginHorizontal: 10 * lu }}>更新于{this.updateTime(book.bookUpdate)}</Text>
              <TouchableWithoutFeedback>
                <View style={{ height: 88 * lu, width: 14 * lu, justifyContent: 'center' }}>
                  <Svg icon="right" size={26 * lu} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View style={{ borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2', paddingHorizontal: 30 * lu, paddingTop: 30 * lu, }}>
            <View style={{ flex: 1, justifyContent: 'center', }}>
              <Text numberOfLines={this.state.isMoreIntro ? 100 : 3}>{book.bookIntroduction}</Text>
            </View>
            <View style={{ height: 88 * lu, }}>
              <TouchableWithoutFeedback onPress={this.toggleIntroShow}>
                <View style={{ width: 34 * lu, height: 88 * lu, position: 'absolute', right: 0, justifyContent: 'center', }}>
                  <Svg icon={this.state.isMoreIntro ? 'up' : 'down'} size={26 * lu} fill="#f2f2f2" />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

        </View>

        {/* 作者 */}
        <View style={{
          height: 174 * lu,
          width: width,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 30 * lu,
          paddingRight: 20 * lu,
          backgroundColor: '#fff',
          marginTop: 20 * lu,
        }}>
          <Image
            source={book.userEntity.userHead}
            style={{ height: 116 * lu, width: 116 * lu, borderRadius: 58 * lu, marginRight: 20 * lu }} />
          <View style={{ flex: 1, height: 116 * lu, flexDirection: 'row' }}>
            <View>
              <View style={{ flexDirection: 'row', flex: 1, }}>
                <Svg icon="author1" size={24 * lu} />
                <Text style={{ fontSize: 24 * lu, color: '#282828', marginLeft: 18 * lu }}>{book.userEntity.userName}</Text>
              </View>
              <Text style={{ fontSize: 20 * lu, color: '#989898', flex: 1 }}>{book.userEntity.information}</Text>
            </View>
          </View>
          <Text style={{ fontSize: 24 * lu, color: '#fff', width: 88 * lu, height: 48 * lu, lineHeight: 48 * lu, textAlign: 'center', backgroundColor: '#ffd593', marginLeft: 30 * lu }}>已关注</Text>
        </View>

      </View>
    );
  }
}
