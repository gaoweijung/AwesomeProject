import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import Svg from '../components/svgs/Svg';
import PathList from '../services/services';
import { lu, width, height } from '../modules/utils/unit';
import BookItem from '../components/common/BookItem';
import Keywords from '../components/Search/Keywords';
import Filter from '../components/Search/Filter';


const { keyWord, queryBookClass } = PathList;
let defaultRequestObj = {
  sort: 0, // 排序id
  bookTypeId: '', // 分类id
  wordMin: 0,
  wordMax: '',
  isSign: 0,
  Keyword: '', // 搜索的书名
  pageNo: 1, //页码
  pageSize: 12, // 每页数量
}

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyboardHeight: 0,

      bookList: [],
      totalPage: 0,

      isBookListShowed: false,
      isKeywordsShowed: true,
      isFilterShowed: false,
      isSearchHisShowed: false,
      isFocused: false,

      searchHistories: [],
      searchInput: '',
      requestObj: {
        sort: 0, // 排序id
        bookTypeId: '', // 分类id
        wordMin: 0,
        wordMax: '',
        isSign: 0,
        Keyword: '', // 搜索的书名
        pageNo: 1, //页码
        pageSize: 12, // 每页数量
      },

      refreshing: false, // 是否刷新中
      loading: false, // 是否加载中
      isMoreData: true, // 是否有更过的数据

      error: null,
    };
  }

  fetchContent = async (requestObj = this.state.requestObj) => {
    let { sort, bookTypeId, wordMin, wordMax, Keyword, isSign, pageNo, pageSize } = requestObj;
    let res = await fetch(`${queryBookClass}?sort=${sort}&bookTypeId=${bookTypeId}&wordMin=${wordMin}&wordMax=${wordMax}&isSign=${isSign}&Keyword=${Keyword}&pageNo=${pageNo}&pageSize=${pageSize}`, {
      method: 'get',
    });
    let { bookInfo, totalPage } = JSON.parse(res._bodyText);
    this.setState(() => ({ bookList: bookInfo, totalPage }));
  }


  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentDidMount() {
    this.fetchKeyWords();
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
  }

  _keyboardDidShow = (e) => {
    this.setState(() => ({ keyboardHeight: e.endCoordinates.height }))
  }

  _keyboardDidHide = () => {
    this.setState(() => ({ keyboardHeight: 0 }))
  }

  fetchKeyWords = async () => {
    let res = await fetch(keyWord, {
      method: 'get',
    });
    let keyWords = JSON.parse(res._bodyText).data;
    this.setState(() => ({ keyWords }));
  }

  saveHistory = () => {
    let searchHistories = this.state.searchHistories;
    var id;
    searchHistories.length ? id = searchHistories[searchHistories.length - 1].id + 1 : id = 0;
    storage
      .save({
        key: 'searchHistory',
        id: id + 1,
        data: this.state.requestObj.Keyword,
      });
  }

  loadHistory = () => {
    let searchHistories = [];
    storage.getIdsForKey('searchHistory').then(async (ids) => {
      for (let item of ids) {
        await storage
          .load({
            key: 'searchHistory',
            id: item,
          })
          .then(data => { searchHistories.push({ id: item, data }) });
      }

      this.setState(() => ({ searchHistories }));
    });
  }

  removeHistory = (id) => {
    storage.remove({
      key: 'searchHistory',
      id: id,
    });
  }

  clearHistories = () => {
    storage.clearMapForKey('searchHistory');
  }

  _onSubmitEditing = () => {
    this.saveHistory();
    this.setState(() => ({ isSearchHisShowed: false, isBookListShowed: true, }))
    this.fetchContent(this.state.requestObj);
  }

  _onChangeText = (Keyword) => {
    let { requestObj } = this.state;
    requestObj.Keyword = Keyword;
    this.setState(() => ({ requestObj }));
  }

  _onFocus = () => {
    this.setState(() => ({ isKeywordsShowed: false, isSearchHisShowed: true, isBookListShowed: false, }))
    this.loadHistory();
  }

  changeRequestObj = () => {
    let requestObj = this.state.requestObj;
    requestObj.bookTypeId = this.refs.Filter.state.bookTypeId;
    requestObj.isSign = this.refs.Filter.state.isSign;
    switch (this.refs.Filter.state.wordCountId) {
      case 1:
        requestObj.wordMin = 100000;
        requestObj.wordMax = 300000;
        break;
      case 2:
        requestObj.wordMin = 500000;
        requestObj.wordMax = 1000000;
        break;
      case 3:
        requestObj.wordMin = 1000000;
        requestObj.wordMax = '';
        break;
      default:
        requestObj.wordMin = 0;
        requestObj.wordMax = '';
    }
    this.fetchContent(requestObj);
    this.setState(() => { requestObj });
  }

  getWordAccId = (wordMin, wordMax) => {
    if (wordMin === 0 && wordMax === '') {
      return 0;
    } else if (wordMin === 0 && wordMax === 100000) {
      return 1;
    } else if (wordMin === 100000 && wordMax === 300000) {
      return 2;
    } else if (wordMin === 500000 && wordMax === 1000000) {
      return 3;
    } else {
      return 4;
    }
  }

  closeFilter = () => {
    this.setState(() => ({ isFilterShowed: false }));
  }

  filterBooks = () => {
    this.closeFilter();
    this.changeRequestObj();
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  // flatList的props

  _renderItem = ({ item }) => (
    <BookItem
      book={item}
      navigate={this.props.navigation.navigate}
      key={item.bookId}
    />
  )

  _keyExtractor = (item) => item.bookName

  fetchBookInfo = async (requestObj = this.state.requestObj) => {
    let { sort, bookTypeId, wordMin, wordMax, Keyword, isSign, pageNo, pageSize } = requestObj;
    let res = await fetch(`${queryBookClass}?sort=${sort}&bookTypeId=${bookTypeId}&wordMin=${wordMin}&wordMax=${wordMax}&isSign=${isSign}&Keyword=${Keyword}&pageNo=${pageNo}&pageSize=${pageSize}`, {
      method: 'get',
    });
    let { bookInfo } = JSON.parse(res._bodyText);
    let { bookList } = this.state;
    bookList = [...bookList, ...bookInfo];
    this.setState(() => ({ bookList, pageNo, loading: false, })); // nice
  }


  _onEndReached = () => {
    let { requestObj } = this.state;
    let { pageNo } = requestObj;
    if (pageNo === this.state.totalPage) {
      this.setState(() => ({ isMoreData: false, loading: false, }));
    }
    if (pageNo < this.state.totalPage) {
      pageNo++;
      requestObj.pageNo = pageNo;
      this.setState(() => ({ loading: true, }), () => {
        this.fetchBookInfo(requestObj);
      })
    }
  }

  renderListFooter = () => {
    console.log(this.state.refreshing);
    // if(this.state.refreshing) {
    //   return null;
    // }
    if (this.state.isMoreData) {
      return (
        <View style={{
          width: width,
          height: 88 * lu,
          backgroundColor: '#f2f2f2',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator
            animating={true}
          />
        </View>
      )
    } else {
      return (
        <View style={{
          width: width,
          height: 88 * lu,
          backgroundColor: '#f2f2f2',
        }}>
          <Text style={{
            width: width,
            height: 88 * lu,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>没有更多数据了</Text>
        </View>
      )
    }
  }



  handleRefresh = () => {
    console.log('refresh');
    let { requestObj } = this.state;
    requestObj.pageNo = 1;
    this.setState(() => ({
      refreshing: true,
      loading: false,
      bookList: [],
      requestObj,
    }),
      () => {
        this.fetchContent();
        this.setState(() => ({ loading: false, refreshing: false }))
      })
  }

  render() {

    let searchHisHeight = height - StatusBar.currentHeight - 88 * lu - this.state.keyboardHeight;
    let { bookList } = this.state;
    return (
      <View style={{ flex: 1 }}>

        {this.state.isFilterShowed &&
          <Filter
            filterBooks={this.filterBooks}
            ref="Filter"
          />}

        <View style={{ paddingTop: StatusBar.currentHeight, }}>
          <View style={{
            height: 88 * lu,
            width: width,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{ paddingLeft: 30 * lu, width: width, }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 602 * lu,
                height: 54 * lu,
                borderRadius: 54 * lu,
                backgroundColor: '#f2f2f2',
              }}>
                <Svg
                  icon="search1"
                  size={28 * lu}
                  style={{ position: 'absolute', left: 44 * lu, transform: [{ rotate: '90deg' }], }}
                  color="#989898" />
                <TextInput
                  placeholder="请输入搜索内容"
                  placeholderTextColor="#989898"
                  onFocus={this._onFocus}
                  onSubmitEditing={this._onSubmitEditing}
                  onChangeText={this._onChangeText}
                  style={{
                    width: 514 * lu,
                    height: 88 * lu,
                    position: 'absolute',
                    left: 88 * lu,
                  }}
                />
              </View>
              <Text
                onPress={this.goBack}
                style={{ position: 'absolute', right: 30 * lu, }}>取消</Text>
            </View>
          </View>
        </View>

        {this.state.isSearchHisShowed &&
          <ScrollView style={{ width: width, height: searchHisHeight }}>
            {this.state.searchHistories.map(
              (item) => (
                <View style={{
                  height: 88 * lu,
                  width: width,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 30 * lu,
                  backgroundColor: '#fff'
                }}
                  key={item.id}
                >
                  <Svg
                    icon="book-history"
                    size={24 * lu}
                  />
                  <Text
                    onPress={() => {
                      defaultRequestObj.Keyword = item.data;
                      this.setState(() => ({
                        requestObj: defaultRequestObj,
                        isSearchHisShowed: false,
                        isBookListShowed: true,
                      }), () => { this.fetchContent() });
                    }}
                    style={{
                      width: width - 150 * lu,
                      position: 'absolute',
                      left: 72 * lu,
                      fontSize: 28 * lu,
                      color: '#656565',
                    }}>{item.data}</Text>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.removeHistory(item.id);
                      this.loadHistory();
                    }}>
                    <View style={{
                      height: 88 * lu,
                      width: 78 * lu,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      right: 0,
                    }}>
                      <Svg
                        icon="cross"
                        size={18 * lu}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )
            )}
            <Text
              style={{
                height: 88 * lu,
                width: width,
                textAlign: 'center',
                color: '#282828',
              }}
              onPress={this.clearHistories}
            >清除历史记录</Text>
          </ScrollView>
        }

        <Keywords isKeywordsShowed={this.state.isKeywordsShowed} />

        {
          this.state.isBookListShowed &&
          <View>
            <View
              style={{
                width: width,
                height: 60 * lu,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f2f2f2',
                paddingLeft: 30 * lu,
              }}
            >
              <TouchableWithoutFeedback>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 60 * lu,
                }}>
                  <Text style={{
                    fontSize: 26 * lu,
                    color: '#FF4975',
                    marginRight: 20 * lu,
                  }}>按更新</Text>
                  <Svg icon="pull-down" size={20 * lu} color="#FF4975" />
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => { this.setState(() => ({ isFilterShowed: true })) }}>
                <View style={{
                  height: 60 * lu,
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 30 * lu,
                }}>
                  <Svg icon="filter" size={24 * lu} color="#989898" />
                  <Text style={{
                    fontSize: 26 * lu,
                    color: '#989898',
                    marginLeft: 20 * lu
                  }}>筛选</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            {
              bookList &&
              <FlatList
                style={{
                  height: height - StatusBar.currentHeight - 148 * lu,
                  width: width,
                }}
                data={bookList}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                    colors={["#FF4975",]}
                  />
                }
                onEndReached={this._onEndReached}
                onEndReachedThreshold={.1}
                ListFooterComponent={this.renderListFooter}
              />
            }
          </View>
        }
      </View>
    );
  }
}
