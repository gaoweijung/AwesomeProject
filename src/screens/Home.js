import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import Swiper from 'react-native-swiper'
import Svg from 'react-native-remote-svg'
import RotateView from '../components/common/refresh'

const { width, height } = Dimensions.get('window')
const lu = width / 750 // the unit of length


class BookTags extends Component {


  render() {
    const tags = this.props.bookTags.map((item, index) => (
      <Text key= {index} style={{marginRight: 9 * lu, paddingHorizontal: 4 * lu, height: 40 * lu, color: '#989898', fontSize: 26 * lu, borderWidth: .5 * lu, borderColor: '#989898', borderRadius: 4 * lu, textAlign: 'center', textAlignVertical: 'center'}}>{item.bookTypeName}</Text>
    ))
    return(
      <View style={{flexDirection: 'row', ...this.props.style}}>{tags}</View>
    )
  }
}

class RankItem extends Component {
  render() {
    return (
      <View style={{marginLeft: 30 * lu, alignItems: 'center', width: 136 * lu}}>
        <Image source={this.props.imgSrc} style={{...styles.bookImageSize, borderRadius: 8 * lu, marginBottom: 20 * lu}} />
      <Text numberOfLines={1} style={{...styles.baseText}}>{this.props.bookName}</Text>
      </View>
    )
  }
}

class EditorRecomItem extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    if(!this.props.content) {
      return (
        <View style={{height: 235 * lu, width: width * .5,flexDirection: 'row', alignItems: 'center', borderTopColor: 'rgb(242, 242, 242)', borderTopWidth: 1 * lu,}}>
        <Image source={require('../assets/images/defaultBook.png')} style={{height: 195 * lu, width: 136 * lu, marginLeft: 30 * lu, borderRadius: 8 * lu}}/>
        <View style={{height: 195 * lu, width: 168 * lu, marginLeft: 22 * lu}}>
          <Text numberOfLines={2} style={{...styles.baseText, fontSize: 28 * lu, color: '#282828', lineHeight: 30 * lu, height: 60 * lu}}>加载中</Text>
          <Text numberOfLines={2} style={{...styles.baseText, fontSize: 24 * lu, color: '#989898', lineHeight: 30 * lu, height: 60 * lu, marginTop: 15 * lu}}>加载中</Text>
        </View>
      </View>
      )
    }
    return (
      <View style={{height: 235 * lu, width: width * .5,flexDirection: 'row', alignItems: 'center', borderTopColor: 'rgb(242, 242, 242)', borderTopWidth: 1 * lu,}}>
        <Image source={this.props.content.imgSrc} style={{height: 195 * lu, width: 136 * lu, marginLeft: 30 * lu, borderRadius: 8 * lu}}/>
        <View style={{height: 195 * lu, width: 168 * lu, marginLeft: 22 * lu}}>
          <Text numberOfLines={2} style={{...styles.baseText, fontSize: 28 * lu, color: '#282828', lineHeight: 30 * lu, height: 60 * lu}}>{this.props.content.bookName}</Text>
          <Text numberOfLines={2} style={{...styles.baseText, fontSize: 24 * lu, color: '#989898', lineHeight: 30 * lu, height: 60 * lu, marginTop: 15 * lu}}>{this.props.content.bookIntro}</Text>
          <BookTags bookTags={this.props.content.bookTags} style={{position: 'absolute', bottom: 2 * lu}} />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Black',
  },  

  view1Image:{
    width: 58 * lu, 
    height: 58 * lu,
    borderRadius: 29 * lu,
    marginLeft: 30 * lu,
    marginRight: 30 * lu,
  },

  view1View: {
    width: 602 * lu,
    height: 68 * lu,
    backgroundColor: 'rgb(255, 182, 67)',
    borderRadius: 15 * lu,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 48 * lu,
  },


  searchIcon: {
    width: 28 * lu,
    height: 28 * lu,
    marginRight: 20 * lu,
  },

  searchText: {
    fontSize: 28 * lu ,
    color: '#989898',
  },

  wrapper: {
  },

  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width,
    height: width * (34 / 75)
  },

  // 分类，排行榜，活动容器样式
  view2: {
    width: width,
    height: 166 * lu,
    flexDirection: 'row',
  },

  // 分类 
  category: {
    flex: 1,
    alignItems: 'center',
    height: 166 * lu,
    paddingTop: 30 * lu,
  },

  categoryIcon: {
    width: 58 * lu,
    height: 58 * lu,
  },

  categoryText: {
    fontSize: 28 * lu,
    color: '#656565',
    marginTop: 20 * lu,
  },

  // 空断部分

  awayPart: {
    width: width,
    height: 20 * lu,
    backgroundColor: 'rgb(242, 242, 242)',
  },

  // 小编推荐
  recommend: {
    height: 98 * lu,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30 * lu,
  },

  recommendIcon: {
    width: 48 * lu,
    height: 48 * lu,
  },

  refreshIcon: {
    width: 32 * lu,
    height: 28 * lu,
  },

  recommendText: {
    marginLeft: 20 * lu,
    marginRight: 470 * lu,
    fontSize: 30 * lu,
    color: '#282828',
  },

  viewLeft: {
    height: height - 631 * lu,
  },

  bookImageSize: {
    height: 195 * lu, 
    width: 136 * lu, 
  }
})

class RecommendItem extends Component {
  render() {
    return (
      <View style={{paddingHorizontal: 30 * lu, flexDirection: 'row', height: 264 * lu, paddingTop: 30 * lu, borderTopWidth: 1 * lu, borderTopColor: 'rgb(242, 242, 242)'}}>
        <Image source={this.props.book.imgSrc} style={{width: 140 * lu, height: 202 * lu, marginRight: 30 * lu, borderRadius: 8 * lu}} />
        <View style={{width: 520 * lu, height: 202 * lu}}>
          <Text numberOfLines={2} style={{...styles.baseText, fontSize: 30 * lu, marginBottom: 20 * lu, lineHeight: 32 * lu,}}>{this.props.book.bookName}</Text>
          <Text numberOfLines={2} style={{...styles.baseText, fontSize: 26 * lu, color: '#989898', lineHeight: 45 * lu}}>{this.props.book.bookIntro}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20 * lu, position: 'absolute', bottom: 0, width: 520 * lu}}>
            <Image source={require('../assets/images/author.png')} style={{width: 24 * lu, height: 24 * lu, marginRight: 16 * lu}} />
            <Text style={{...styles.baseText, fontSize: 24 * lu, textAlign: 'center', lineHeight: 26 * lu, color: '#989898', height: 28 * lu}}>{this.props.book.bookAuthor}</Text>
            <BookTags bookTags={this.props.book.bookTags} style={{position: 'absolute', right: 0}} />
          </View>
        </View>
      </View>    
      )
  }
}



export default class extends Component {

  // 不需要navigation 的头部
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);
    this.state= {
      editorRecom: [],
      goodPeoRank: [],
      clickRank:[],
      webRecom: [
        {
          key: '1',
          imgSrc: require('../assets/images/defaultBook.png'),
          bookName: '我要启明星',
          bookIntro: '启明星的指引很快就到换卡阿斯顿哈和圣诞节 啥都哈大股东',
          bookAuthor: '启明星的指引',
          bookTags: [{bookTypeName: '玄幻'}, {bookTypeName: '玄幻'}, {bookTypeName: '玄幻'}]
        },
        {
          key: '2',
          imgSrc: require('../assets/images/defaultBook.png'),
          bookName: '我要启明星',
          bookIntro: '启明星的指引很快就到换卡阿斯顿哈和圣诞节 啥都哈大股东',
          bookAuthor: '启明星的指引',
          bookTags: [{bookTypeName: '玄幻'}, {bookTypeName: '玄幻'}, {bookTypeName: '玄幻'}]
        },
        {
          key: '3',
          imgSrc: require('../assets/images/defaultBook.png'),
          bookName: '我要启明星',
          bookIntro: '启明星的指引很快就到换卡阿斯顿哈和圣诞节 啥都哈大股东',
          bookAuthor: '启明星的指引',
          bookTags: [{bookTypeName: '玄幻'}, {bookTypeName: '玄幻'}, {bookTypeName: '玄幻'}]
        }],
      wordAccRank: [],
      newRecom: [],
      newRank: []
    }
  }

  // 获取小编推荐书单
  updateEditorRecom = async () => {
    try {
      let resJson = await fetch('https://ex.qcacg.com/Controller/index/mobileEditorRecommendedData.shtml', {
        type: 'get',
      });
      let res = JSON.parse(resJson._bodyText);
      let editorRecom = res.data.reduce((pre, current) => {
        let book = {
          key: current.bookId,
          imgSrc: {uri: `http://cdn.qcacg.com/Controller/${current.bookCoverImage}`},
          bookName: current.bookName,
          bookIntro: current.bookIntroduction,
          bookTags: current.bookTypeList.slice(0, 2),
        };
        pre.push(book);
        return pre;
      }, []);
      this.setState(() => ({editorRecom: editorRecom}));
    } catch(error) {
      console.error(error);
    }
  }

  // 获取全站推荐书单
  async updateWebRecom() {
    try {
      let resJson = await fetch('https://ex.qcacg.com/Controller/index/mobileAllRecommendedData.shtml', {
        method: 'get',
      });
      let res = JSON.parse(resJson._bodyText);
      let webRecom = res.data.reduce((pre, current) => {
        let book = {
          key: current.bookId,
          imgSrc: {uri: `http://cdn.qcacg.com/Controller/${current.bookCoverImage}`},
          bookIntro: current.bookIntroduction,
          bookName: current.bookName,
          bookTags: current.bookTypeList.slice(0, 3),
          bookAuthor: current.author,
        }
        pre.push(book);
        return pre;
      }, [])

      this.setState(() => ({webRecom}))
    } catch(error) {
      console.error(error);
    }
  }

  // 获取最新更新推荐

  // 获取好人榜
  async getGoodPeoRank() {
    try {
      let resJson = await fetch('https://ex.qcacg.com/Controller/rank/getRankingList.shtml?pageNo=1&pageSize=10&rankList=0');
      let res = JSON.parse(resJson._bodyText);
      let goodPeoRank = res.result.reduce((pre, current) => {
        let book = {
          key: `${current.bookId}`,
          imgSrc: {uri: `http://cdn.qcacg.com/Controller/${current.bookCoverImage}`},
          bookName: current.bookName,
        };
        pre.push(book);
        return pre;
      }, [])
      this.setState(() => ({goodPeoRank}))
    } catch(error) {
      console.error(error);
    }
  }

  // 获取点击榜
  async getClickRank() {
    try {
      let resJson = await fetch('https://ex.qcacg.com/Controller/rank/getRankingList.shtml?pageNo=1&pageSize=10&rankList=2');
      let res = JSON.parse(resJson._bodyText);
      let clickRank = res.result.reduce((pre, current) => {
        let book = {
          key: `${current.bookId}`,
          imgSrc: {uri: `http://cdn.qcacg.com/Controller/${current.bookCoverImage}`},
          bookName: current.bookName,
        };
        pre.push(book);
        return pre;
      }, [])
      this.setState(() => ({clickRank}))
    } catch(error) {
      console.error(error);
    }
  }

  // 获取字数榜
  async getWordAccRank() {
    try {
      let resJson = await fetch('https://ex.qcacg.com/Controller/rank/getRankingList.shtml?rankList=1');
      let res = JSON.parse(resJson._bodyText);
      let wordAccRank = res.result.reduce((pre, current) => {
        let book = {
          key: `${current.bookId}`,
          imgSrc: {uri: `http://cdn.qcacg.com/Controller/${current.bookCoverImage}`},
          bookName: current.bookName,
        };
        pre.push(book);
        return pre;
      }, [])
      this.setState(() => ({wordAccRank}))
    } catch(error) {
      console.error(error);
    }
  }

  // 获取最新更新

  async getNewRank() {
    try {
      let resJson = await fetch('https://ex.qcacg.com/Controller/index/lastUpdate.shtml?pageNo=1&pageSize=10');
      let res = JSON.parse(resJson._bodyText);
      let newRank = res.data.reduce((pre, current) => {
        let book = {
          key: `${current.bookId}`,
          imgSrc: {uri: `http://cdn.qcacg.com/Controller/${current.bookCoverImage}`},
          bookName: current.bookName,
        };
        pre.push(book);
        return pre;
      }, [])
      this.setState(() => ({newRank}))
    } catch(error) {
      console.error(error);
    }
  }


  componentDidMount() {
    this.updateEditorRecom();
    this.getGoodPeoRank();
    this.getClickRank();
    this.updateWebRecom();
    this.getWordAccRank();
    this.getNewRank();
  }

  render () {


    const webRecom = this.state.webRecom.map((item) => {
      console.log(item.key)
      return (
      <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: item.key})}}>
        <View>
          <RecommendItem book={item} key={item.bookId} />
        </View>
      </TouchableWithoutFeedback>

    )})

    const newRecom = this.state.newRecom.map((item) => (<RecommendItem book={item} key={item.bookId} />))

    return (
      <View style={{flex: 1}}>

        <StatusBar translucent={true} backgroundColor={'white'} />

        <View style={{height: 108 * lu, marginTop: StatusBar.currentHeight}}>
          
          <View style={{ 
            flexDirection: 'row', 
            width: width,
            height: lu * 108,
            alignItems: 'center',
            overflow: 'hidden', 
            }}>
            <Image source={require('../assets/images/profile_icon.jpg')}
                  style={styles.view1Image}/>
            <View style={styles.view1View}>
              <Image source={require('../assets/images/search.png')}
                    style={styles.searchIcon} />
              <Text style={{...styles.baseText,...styles.searchText, color: '#fff', }}>点击此处进行搜索</Text>
            </View>
          </View>

        </View>

        <ScrollView style={{flex: 1, backgroundColor: '#fff'}} showsVerticalScrollIndicator={false}>

          {/* 轮播图 */}
          <Swiper style={{...styles.wrapper, overflow: 'hidden'}}
                  autoplay
                  showsPagination
                  height={lu * 316}
          >
            <View style={styles.slide}>
              <Image source={{uri: 'http://cdn.qcacg.com//img/Illustration/11_01.jpg', width: width, height: 340 * lu, cache: 'force-cache'}}
                    resizeMode={'stretch'}></Image>
            </View>
            <View style={styles.slide}>
              <Image source={{uri: 'http://cdn.qcacg.com//img/Illustration/11_02.jpg', width: width, height: 340 * lu, cache: 'force-cache'}}
                    resizeMode={'stretch'}></Image>
            </View>
            <View style={styles.slide}>
              <Image source={{uri: 'http://cdn.qcacg.com//img/Illustration/11_03.jpg', width: width, height: 340 * lu, cache: 'force-cache'}}
                    resizeMode={'stretch'}></Image>
            </View>
          </Swiper>


          {/* 分类，排行榜，活动 */}

          <View style={{...styles.view2, overflow: 'hidden'}}>
            <View style={styles.category}>
              <Svg source={require('../assets/svgs/clses.svg')}
                  style={styles.categoryIcon} />
              <Text style={{...styles.baseText, ...styles.categoryText}}>分类</Text>
            </View>
            <View style={styles.category}>
              <Svg source={require('../assets/svgs/ranks.svg')} 
                  style={styles.categoryIcon} />
              <Text style={{...styles.baseText, ...styles.categoryText}}>排行榜</Text>
            </View>
            <View style={styles.category}>
              <Svg source={require('../assets/svgs/activity.svg')} 
                  style={styles.categoryIcon} />
              <Text style={{...styles.baseText, ...styles.categoryText}}>活动</Text>
            </View>
          </View>

          <View style={{...styles.awayPart, overflow: 'hidden'}}></View>

          {/* // 小编推荐 */}

          <View style={{...styles.recommend, overflow: 'hidden'}}>
            <Svg source={require('../assets/svgs/Stars.svg')} style={styles.recommendIcon} />
            <Text style={{...styles.baseText, ...styles.recommendText,}}>小编推荐</Text>

          <RotateView ref='updateEditorRecom' update={this.updateEditorRecom} viewStyle={{marginRight: 30 * lu}} svgStyle={{height: 32 * lu, width: 32 * lu,}} />
          </View>

          <View
            style={{width: width, height: 705 * lu, overflow: 'hidden'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: this.state.editorRecom[0].key})}}>
                <View>
                  <EditorRecomItem content={this.state.editorRecom[0] || null } />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: this.state.editorRecom[1].key})}}>
                <View>
                  <EditorRecomItem content={this.state.editorRecom[1] || null } />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: this.state.editorRecom[2].key})}}>
                <View>
                  <EditorRecomItem content={this.state.editorRecom[2] || null } />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: this.state.editorRecom[3].key})}}>
                <View>
                  <EditorRecomItem content={this.state.editorRecom[3] || null } />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: this.state.editorRecom[4].key})}}>
                <View>
                  <EditorRecomItem content={this.state.editorRecom[4] || null } />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: this.state.editorRecom[5].key})}}>
                <View>
                  <EditorRecomItem content={this.state.editorRecom[5] || null } />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          
          <View style={{...styles.awayPart, overflow: 'hidden'}}></View>

          {/* 好人榜 */}

          <View style={{...styles.recommend, overflow: 'hidden'}}>
            <Text style={{...styles.baseText, ...styles.recommendText,}}>好人榜</Text>
            <TouchableWithoutFeedback>
              <View style={{height: 88 * lu, width: 96 * lu, position: 'absolute', right: 30 * lu, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...styles.baseText, marginRight: 26 * lu}}>更多</Text>
                <Svg 
                  source={require('../assets/svgs/right.svg')}
                  style={{width: 14 * lu, height: 26 * lu, marginTop: -4 * lu}} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <FlatList 
            data={this.state.goodPeoRank.length ? this.state.goodPeoRank : [{imgSrc: require('../assets/images/defaultBook.png'), bookName: '加载中', key: 1}] }
            renderItem={({item}) => {
              return (
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: item.key})}} key={item.key}>
                  <View>
                    <RankItem
                      imgSrc={item.imgSrc} 
                      bookName={item.bookName}
                      />
                  </View>
                </TouchableWithoutFeedback>
              )
            }}
            horizontal
            style={{height: 310 * lu, borderTopWidth: 1 * lu, borderTopColor: 'rgb(242, 242, 242)', paddingTop: 20 * lu, overflow: 'hidden'}}
            showsHorizontalScrollIndicator={false}
          />

          <View style={{...styles.awayPart, overflow: 'hidden'}}></View>

          {/* 点击榜 */}
          <View style={{...styles.recommend, overflow: 'hidden'}}>
            <Text style={{...styles.baseText, ...styles.recommendText,}}>点击榜</Text>
            <TouchableWithoutFeedback>
              <View style={{height: 88 * lu, width: 96 * lu, position: 'absolute', right: 30 * lu, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...styles.baseText, marginRight: 26 * lu}}>更多</Text>
                <Svg 
                  source={require('../assets/svgs/right.svg')}
                  style={{width: 14 * lu, height: 26 * lu, marginTop: -4 * lu}} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <FlatList 
            data={this.state.clickRank.length ? this.state.clickRank : [{imgSrc: require('../assets/images/defaultBook.png'), bookName: '加载中', key: 1}] }
            renderItem={({item}) => {
              return (
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: item.key})}} key={item.key}>
                  <View key={item.key}>
                    <RankItem
                      imgSrc={item.imgSrc} 
                      bookName={item.bookName}
                      />
                  </View>
                </TouchableWithoutFeedback>
              )
            }}
            horizontal
            style={{height: 310 * lu, borderTopWidth: 1 * lu, borderTopColor: 'rgb(242, 242, 242)', paddingTop: 20 * lu, overflow: 'hidden'}}
            showsHorizontalScrollIndicator={false}
          />

          <View style={{...styles.awayPart, overflow: 'hidden'}}></View>


          {/* 全站推荐 */}

          <View style={{...styles.recommend, overflow: 'hidden'}}>
            <Svg source={require('../assets/svgs/crown.svg')} style={styles.recommendIcon} />
            <Text style={{...styles.baseText, ...styles.recommendText}}>全站推荐</Text>
            <Svg source={require('../assets/svgs/Refresh.svg')} style={styles.refreshIcon} />
          </View>

          
          <View>{webRecom}</View>



          <View style={{...styles.awayPart, overflow: 'hidden'}}></View>

          {/* 字数榜 */}

          <View style={{...styles.recommend, overflow: 'hidden'}}>
            <Text style={{...styles.baseText, ...styles.recommendText}}>字数榜</Text>
            <TouchableWithoutFeedback>
              <View style={{height: 88 * lu, width: 96 * lu, position: 'absolute', right: 30 * lu, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...styles.baseText, marginRight: 26 * lu}}>更多</Text>
                <Svg 
                  source={require('../assets/svgs/right.svg')}
                  style={{width: 14 * lu, height: 26 * lu, marginTop: -4 * lu}} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <FlatList 
            data={this.state.wordAccRank.length ? this.state.wordAccRank : [{imgSrc: require('../assets/images/defaultBook.png'), bookName: '加载中', key: 1}]}
            renderItem={({item}) => {
              return (
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: item.key})}} key={item.key}>
                  <View key={item.key}>
                    <RankItem
                      imgSrc={item.imgSrc} 
                      bookName={item.bookName}
                      />
                  </View>
                </TouchableWithoutFeedback>
              )
            }}
            horizontal
            style={{height: 310 * lu, borderTopWidth: 1, borderTopColor: 'rgb(195, 195, 195)', paddingTop: 20 * lu, overflow: 'hidden'}}
            showsHorizontalScrollIndicator={false}
          />

          <View style={{...styles.awayPart, overflow: 'hidden'}}></View>

          {/* 新书推荐 */}

          <View style={{...styles.recommend, overflow: 'hidden'}}>
            <Svg source={require('../assets/svgs/crown.svg')} style={styles.recommendIcon} />
            <Text style={{...styles.baseText, ...styles.recommendText}}>新书推荐</Text>
            <Svg source={require('../assets/svgs/Refresh.svg')} style={styles.refreshIcon} />
          </View>

          <View>{newRecom}</View>

          <View style={{...styles.awayPart, overflow: 'hidden'}}></View>

          {/* 最新更新 */}

          <View style={{...styles.recommend, overflow: 'hidden'}}>
            <Text style={{...styles.baseText, ...styles.recommendText}}>最新更新</Text>
            <TouchableWithoutFeedback>
              <View style={{height: 88 * lu, width: 96 * lu, position: 'absolute', right: 30 * lu, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{...styles.baseText, marginRight: 26 * lu}}>更多</Text>
                <Svg 
                  source={require('../assets/svgs/right.svg')}
                  style={{width: 14 * lu, height: 26 * lu, marginTop: -4 * lu}} />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <FlatList 
            data={this.state.newRank.length ? this.state.newRank : [{imgSrc: require('../assets/images/defaultBook.png'), bookName: '加载中', key: 1}]}
            renderItem={({item}) => {
              return (
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Menu', { bookId: item.key})}} key={item.key}>
                  <View key={item.key}>
                    <RankItem
                      imgSrc={item.imgSrc} 
                      bookName={item.bookName}
                      />
                  </View>
                </TouchableWithoutFeedback>
              )
            }}
            horizontal
            style={{height: 310 * lu, borderTopWidth: 1, borderTopColor: 'rgb(242, 242, 242)', paddingTop: 20 * lu, overflow: 'hidden'}}
            showsHorizontalScrollIndicator={false}
          />

          
        </ScrollView>
      </View>
    )
  }
}