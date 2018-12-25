import React, {Component} from 'react';
import { View, Text, Dimensions, ScrollView, StatusBar, Image, TouchableNativeFeedback } from 'react-native';
import Svg from 'react-native-remote-svg';

import Header from '../components/Header'

const {width} = Dimensions.get('window');
const lu = width / 750;
const url = 'http://cdn.qcacg.com/Controller';

class AwayPart extends Component {
  render() {
    return (
      <View style={{width: width, height: 18 * lu, backgroundColor: '#f2f2f2'}}></View>
    )
  }
}

export default class Menu extends Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state = {
      bookId: this.props.navigation.getParam('bookId', 1),
      book: {
        bookCoverImage: require('../assets/images/defaultBook.png'),
        bookName: '魔王的勇者式日常',
        bookTypeEntityList: [
          {
            bookTypeId: 0,
            bookTypeName: '科幻',
          },
          {
            bookTypeId: 1,
            bookTypeName: '恋爱',
          },
          {
            bookTypeId: 2,
            bookTypeName: '幻想',
          },
        ],
        userEntity: {
          userName: '吾问无为谓呜呜呜',
          userHead:  {uri: `${url}upload/image/default/head.jpg`},
          information: '顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶hdsadd 逛逛街俄方的访问服务分为非而我认为撒 ',
        },
        updateCycle: '日更',
        isEnded: '连载中',
        bookHit: 888888,
        bookWordCount: 888888888,  
        lastChapterTitle: '第200章 哈哈哈',
        bookUpdate: 0,
        bookIntroduction: '胡搜后胆红素电话费都舒服回复恢复到师傅好速度防护是符后哈 合度舒服死或反对回复舒服哈说都合度舒服死或反对回复或顶顶 舒服哈说都',
      },
      commentData: {},
      backgroundOpacity: 'rgba(255,255,255,0)',
    }
  }

  updateTime = (updateTime) => {
    var currentTime = new Date();
    let time = currentTime.getTime() - updateTime;
    if(Math.floor(time / 31536000000) > 0) {
      return Math.floor(time / 31536000000) + "年前";
    }
    if(Math.floor(time / 2592000000) > 0) {
      return Math.floor(time / 2592000000) + "月前";
    }
    if(Math.floor(time / 604800000) > 0) {
      return Math.floor(time / 604800000) + "周前";
    }
    if(Math.floor(time / 86400000) > 0) {
      return Math.floor(time / 86400000) + "天前";
    }
    if(Math.floor(time / 3600000) > 0) {
      return Math.floor(time / 3600000) + "小时前";
    }
    if(Math.floor(time / 60000) > 0) {
      return Math.floor(time / 60000) + "分钟前";
    }
    if(Math.floor(time / 1000) > 0) {
      return Math.floor(time / 1000) + "秒前";
    } else {
      return "0秒前";
    }
  }

  async fetchBook() {
    try {
      let resJson = await fetch(`https://ex.qcacg.com/Controller/catalog/queryBookDirectory.shtml?bookId=${this.state.bookId}`, {
        type: 'get',
      });
      let {bookCustom} = JSON.parse(resJson._bodyText);
      this.setState({
        book: {
          bookCoverImage: {uri: url + bookCustom.bookCoverImage},
          bookName: bookCustom.bookName,
          bookTypeEntityList: bookCustom.bookTypeEntityList,
          userEntity: {
            userName: bookCustom.userEntity.userName,
            userHead: {uri: url + bookCustom.userEntity.userHead},
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
    } catch(error) {
      console.error(error);
    }
  }

  async fetchComment() {
    let resJson= await fetch(`https://ex.qcacg.com/Controller/comment/findCommentAndReply.shtml?bookId=${this.state.bookId}&pageNo=1&pageSize=10&status=0`, {
      type: 'get',
    });
    let commentData = JSON.parse(resJson._bodyText);
    this.setState(() => ({
      commentData,
    }))
  }

  // 监听Scroll
  scroll(y) {
    this.setState(() => ({backgroundOpacity: `rgba(255,255,255,${y/(360*lu)})`}));
  }

  render() {
    let book = this.state.book;
    // 标签列表
    let bookTags = book.bookTypeEntityList.map((item) => (<Text 
      key={item.bookTypeId} 
      style={{width: 68 * lu, height: 36 * lu, backgroundColor: '#f88e26', textAlign: 'center', color: '#ffffff', fontSize: 24 * lu, marginRight: 8 * lu, borderWidth: 2 * lu, borderColor: '#fff', borderRadius: 8 * lu, lineHeight: 32 * lu}}>
        {item.bookTypeName}
      </Text>));
    
    // 评论列表生成
    console.log(this.state.commentData)
    let {comment} = this.state.commentData;
    console.log(comment);
    var commentList;
    if(!comment) {
      commentList =
      <View style={{height: 236 * lu, width: width, paddingTop: 20 * lu, borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2'}}>
      <View style={{flexDirection: 'row', paddingLeft: 30 * lu, height: 48 *lu, alignItems: 'center', }}>
        <Image
          source={require('../assets/images/author.png')}
          style={{width: 48 * lu, height: 48 * lu, marginRight: 20 * lu, }} /> 
        <Text style={{fontSize: 24 * lu, color: '#656565', marginRight: 16 * lu}}>后哈哈哈哈哈哈哈哈哈</Text>
        <Svg 
          source={require('../assets/svgs/female.svg')}
          style={{width: 24 * lu, height: 24 * lu}}
          />
        <Text style={{fontSize: 20 * lu, color: '#989898', position: 'absolute', right: 20 * lu,}}>2016年1月20日</Text>
      </View>
      <Text style={{fontSize: 26 * lu, color: '#282828', height: 120 * lu, textAlignVertical: 'center', paddingLeft: 30 * lu}}>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 哈哈哈哈哈哈哈哈哈哈哈哈哈</Text>
      <View style={{flexDirection: 'row', height: 48 * lu, alignItems:'flex-start', paddingLeft: 30 * lu}}>
        <Text style={{fontSize: 20 * lu, color: '#989898'}}>评论</Text>
         <View style={{flexDirection: 'row', position: 'absolute', right: 30 * lu, paddingLeft: 30 * lu, alignItems: 'flex-start', }}>
          <Svg 
            source={require('../assets/svgs/Reply.svg')}
            style={{width: 18 * lu, height: 18 * lu, marginRight: 8 * lu}} />
          <Text style={{fontSize: 20 * lu, color: '#989898', textAlignVertical: 'top', lineHeight: 22 * lu}}>42</Text>
        </View>
      </View>
    </View>
    } else {
      comment = comment.slice(0, 3);
      commentList = comment.map((item) => {
        // let imgSoure = item.sex == '女生' ? '../assets/svgs/female.svg' : '../assets/svgs/male.svg';
        let timeObj = new Date(item.commentDate);
        let time = `${timeObj.getFullYear()}年${timeObj.getMonth() + 1}月${timeObj.getDay()}日`;
        return (
          <View style={{height: 236 * lu, width: width, paddingTop: 20 * lu, borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2'}} key={item.commentId}>
          <View style={{flexDirection: 'row', paddingLeft: 30 * lu, height: 48 *lu, alignItems: 'center', }}>
            <Image
              source={{uri: `https://ex.qcacg.com/Controller${item.userHead}`}}
              style={{width: 48 * lu, height: 48 * lu, marginRight: 20 * lu, }} /> 
            <Text style={{fontSize: 24 * lu, color: '#656565', marginRight: 16 * lu}}>{item.userName}</Text>
            <Svg 
              source={require('../assets/svgs/female.svg')}
              style={{width: 24 * lu, height: 24 * lu}}
              />
            <Text style={{fontSize: 20 * lu, color: '#989898', position: 'absolute', right: 20 * lu,}}>{time}</Text>
          </View>
          <Text style={{fontSize: 26 * lu, color: '#282828', height: 120 * lu, textAlignVertical: 'center', paddingHorizontal: 30 * lu}}>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 哈哈哈哈哈哈哈哈哈哈哈哈哈</Text>
          <View style={{flexDirection: 'row', height: 48 * lu, alignItems:'flex-start', paddingLeft: 30 * lu}}>
            <Text style={{fontSize: 20 * lu, color: '#989898'}}>评论</Text>
             <View style={{flexDirection: 'row', position: 'absolute', right: 30 * lu, paddingLeft: 30 * lu, alignItems: 'flex-start', }}>
              <Svg 
                source={require('../assets/svgs/Reply.svg')}
                style={{width: 18 * lu, height: 18 * lu, marginRight: 8 * lu}} />
              <Text style={{fontSize: 20 * lu, color: '#989898', textAlignVertical: 'top', lineHeight: 22 * lu}}>{item.totalCount}</Text>
            </View>
          </View>
        </View>
        )
      })  
    }

    // click times data process
    let clickTimes = book.bookHit / 10000 >= 1 ? `${Math.round(book.bookHit / 10000)}万` : book.bookHit;
    let wordCount = book.bookWordCount / 10000 >= 1 ? `${Math.round(book.bookWordCount / 10000)}万` : book.bookWordCount;

    return(

      <View style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor={this.state.backgroundOpacity} />
        <Header ref={'header'} goBack={this.props.navigation.goBack} title={'目录页'} style={{backgroundColor: this.state.backgroundOpacity, marginTop: StatusBar.currentHeight, position: 'absolute', top: 0, zIndex: 1}} />
        <ScrollView onScroll={(e)=>{this.scroll(e.nativeEvent.contentOffset.y)} }>

          <View style={{height: 88 * lu + StatusBar.currentHeight, backgroundColor: '#fff'}}></View>

        {/* 打赏、分享 */}
          <View style={{backgroundColor: '#fff', width: width, height: 440 * lu, paddingVertical: 20 * lu, paddingHorizontal: 30 * lu,}}>
            <View>

              <View style={{flexDirection: 'row', height: 280 * lu}}>
                <Image source={book.bookCoverImage} style={{width: 202 * lu, height: 280 * lu, marginRight: 20 * lu, }} />
                <View style={{width: 474 * lu}}>
                  <Text style={{fontSize: 28 * lu, color: '#282828',}}>{book.bookName}</Text>
                  <View style={{flexDirection: 'row', height: 72 * lu, paddingVertical: 20 * lu}}>{bookTags}</View>
                  <Text style={{fontSize: 24 * lu, color: '#656565', marginBottom: 20 * lu}}>{book.userEntity.userName}</Text>
                  <View style={{flexDirection: 'row',}}>
                    <Text style={{fontSize: 24 * lu, color: '#656565', }}>{book.updateCycle}</Text>
                    <Text style={{paddingHorizontal: 20 * lu, fontSize: 24 * lu}}>|</Text>
                    <Text style={{fontSize: 24 * lu, color: '#656565', }}>{book.isEnded}</Text>
                  </View>
                  <View style={{flexDirection: 'row', position: 'absolute', bottom: 0}}>
                    <Text style={{fontSize: 24 * lu, color: '#ff4273', flex: 1}}>点击 ：{clickTimes}</Text>
                    <Text style={{fontSize: 24 * lu, color: '#ff4273', flex: 1}}>字数 ：{wordCount}</Text>
                  </View>
                </View>
              </View>

              <View style={{flexDirection: 'row', height: 88 * lu, marginTop: 52 * lu}}>
                <TouchableNativeFeedback>
                  <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2'}}>
                    <Svg 
                      source={require('../assets/svgs/Reward.svg')}
                      style={{width: 38 * lu, height: 38 * lu, marginRight: 15 * lu}} />
                    <Text style={{fontSize: 24 * lu, color: '#ff9c4a'}}>打赏</Text>
                  </View>
                </TouchableNativeFeedback>
                <Text style={{fontSize: 24 * lu, height: 88 * lu, textAlignVertical: 'center'}}>|</Text>
                <TouchableNativeFeedback>
                  <View style={{flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center', borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2'}}>
                    <Svg 
                      source={require('../assets/svgs/share.svg')}
                      style={{width: 38 * lu, height: 38 * lu, marginRight: 15 * lu}} />
                    <Text style={{fontSize: 24 * lu, color: '#ff9c4a'}}>分享</Text>
                  </View>
                </TouchableNativeFeedback>
              </View>

            </View>
          </View>

          <AwayPart />

          {/* 最新章节 */}
          <View style={{height: 310 * lu, width: width}}>
            <View style={{height: 88 * lu, width: width, paddingHorizontal: 30 * lu, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{fontSize: 34 * lu, color: '#ff7497', }}>|</Text>
              <Text style={{fontSize: 28  * lu, color: '#282828', marginHorizontal: 20 * lu}}>最新</Text>
              <Text style={{fontSize: 24 * lu, color: '#656565'}}>{book.lastChapterTitle}</Text>
              <View style={{width: 190 * lu, flexDirection: 'row', position: 'absolute', right: 30 * lu, alignItems: 'center', height: 88 * lu,}}>
                <Svg 
                  style={{width: 40 * lu, height: 20 * lu,}}
                  source={require('../assets/svgs/Newest.svg')} />
                <Text style={{fontSize: 20 * lu, color: '#ff7497', marginHorizontal: 10 * lu}}>更新于{this.updateTime(book.bookUpdate)}</Text>
                <TouchableNativeFeedback>
                  <View style={{height: 88 * lu, width: 14 * lu, justifyContent: 'center'}}>
                    <Svg 
                      source={require('../assets/svgs/right.svg')}
                      style={{width: 14 * lu, height: 26 * lu}} />
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>

            <View style={{height: 222 * lu, width: width, borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2', paddingHorizontal: 30 * lu}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text numberOfLines={3}>{book.bookIntroduction}</Text>
              </View>
              <View style={{height: 48 * lu}}>
              <TouchableNativeFeedback>
                <View style={{width: 26 * lu, height: 26 * lu, position: 'absolute', right: 0}}>
                  <Svg 
                  source={require('../assets/svgs/right.svg')}
                  style={{width: 14 * lu, height: 26 * lu, transform: [{rotateZ: '45deg'}],}} />              
                </View>
              </TouchableNativeFeedback>
              </View>
            </View>

          </View>

          <AwayPart />

          <View style={{height: 174 * lu, width: width, flexDirection: 'row', alignItems: 'center', paddingLeft: 30 * lu, paddingRight: 20 * lu,}}>
            <Image 
              source={book.userEntity.userHead}
              style={{height: 116 * lu, width: 116 * lu, borderRadius: 58 * lu, marginRight: 20 * lu}} />
            <View style={{flex: 1, height: 116 * lu, flexDirection: 'row'}}>
              <View>
                <View style={{flexDirection: 'row', flex: 1,}}>
                  <Svg 
                    source={require('../assets/svgs/author1.svg')}
                    style={{width: 24 * lu, height: 24 * lu}} />
                  <Text style={{fontSize: 24 * lu, color: '#282828', marginLeft: 18 * lu}}>{book.userEntity.userName}</Text>
                </View>
                <Text style={{fontSize: 20 * lu, color: '#989898', flex: 1}}>{book.userEntity.information}</Text>
              </View>
            </View>
            <Text style={{fontSize: 24 * lu, color: '#fff', width: 88 * lu, height: 48 * lu, lineHeight: 48 * lu, textAlign: 'center', backgroundColor: '#ffd593', marginLeft: 30 * lu}}>已关注</Text>
          </View>
          
          <AwayPart />

          {/* 评论 */}

          <View style={{width: width, height: 88 * lu, flexDirection: 'row', alignItems: 'center', paddingLeft: 30 * lu,}}>
            <Svg 
              source={require('../assets/svgs/split.svg')}
              style={{width: 30 * lu, height: 30 * lu, marginLeft: -5 * lu}} />
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 28 * lu, color: '#070707'}}>评论</Text>
              <Text style={{fontSize: 20 * lu, color: '#8e8e8e', paddingLeft: 10 * lu, textAlignVertical: 'bottom'}}>{this.state.commentData.commentAndReplyTotalCount + '条'}</Text>
            </View>
            <TouchableNativeFeedback>
                  <View style={{height: 88 * lu, width: 14 * lu, justifyContent: 'center', position: 'absolute', right: 20 * lu}}>
                    <Svg 
                      source={require('../assets/svgs/right.svg')}
                      style={{width: 14 * lu, height: 26 * lu}} />
                  </View>
            </TouchableNativeFeedback>
          </View>

          <View>{commentList}</View>

          <View style={{width: width, height: 88 * lu, borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2'}}> 
            <Text style={{textAlign: 'center', textAlignVertical: 'center', color: '#ffab6c', fontSize: 26 * lu, height: 88 * lu}}>查看全部评论</Text>
          </View>

        </ScrollView>
      </View>
    )
  }

  componentDidMount = () => {
    this.fetchBook();
    this.fetchComment();
  }
}