/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import {
  Text, View, StyleSheet, TouchableWithoutFeedback,
} from 'react-native';

import Svg from '../components/svgs/Svg';
import { width, lu } from '../modules/utils/unit';
import Header from '../components/Category/Header';
import color from '../modules/utils/Color';
import PathList from '../services/services';
import CateFilter from '../components/Category/CateFilter';
import WordAccFilter from '../components/Category/WordAccFilter';
import SignFilter from '../components/Category/SignFilter';
import Filter from '../components/Category/Filter';
import CateBooks from '../components/Category/CateBooks';


const { color_selected, color_unSelected } = color;
const { queryBookClass } = PathList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filter: {
    height: 148 * lu,
    width,
    backgroundColor: '#F2F2F2',
  },
  flFilter: {
    width,
    height: 74 * lu,
    flexDirection: 'row',
    borderTopWidth: 1 * lu,
    borderTopColor: '#c3c3c3',
    borderBottomWidth: 1 * lu,
    borderBottomColor: '#c3c3c3',
  },
  slFilter: {
    width,
    height: 74 * lu,
    flexDirection: 'row',
    borderBottomWidth: 1 * lu,
    borderBottomColor: '#c3c3c3',
  },
  filterItem: {
    flex: 1,
    height: 74 * lu,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 26 * lu,
  },
});

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestObj: {
        sort: 0, // 排序id
        bookTypeId: '', // 书类id
        wordMin: 0, // 最小字数
        wordMax: '', // 最大字数
        isSign: 0, // 是否签约
        Keyword: '', // 搜索关键词
        pageNo: 1, // 搜错页数
        pageSize: 12, // 每页书数
      },
      bookList: [],
      showMode: 'detail',
      showedFilterId: '', // 正在显示的过滤项

      totalPage: null,
      refreshing: false,
      loading: false,
      isMoreData: true,
    };
  }

  componentDidMount() {
    this.fetchContent();
  }

  switchWordAccId = (wordAccId) => {
    const { requestObj } = this.state;
    switch (wordAccId) {
      case 0:
        requestObj.wordMin = 0;
        requestObj.wordMax = '';
        break;
      case 1:
        requestObj.wordMin = 0;
        requestObj.wordMax = 100000;
        break;
      case 2:
        requestObj.wordMin = 100000;
        requestObj.wordMax = 300000;
        break;
      case 3:
        requestObj.wordMin = 500000;
        requestObj.wordMax = 1000000;
        break;
      default:
        requestObj.wordMin = 1000000;
        requestObj.wordMax = '';
        break;
    }
    this.setState({ showedFilterId: '' });
    this.fetchContent(requestObj);
  }

  switchSignStatus = (isSign) => {
    const { requestObj } = this.state;
    requestObj.isSign = isSign;
    this.setState({ showedFilterId: '' });
    this.fetchContent(requestObj);
  }


  getWordAccId = (wordMin, wordMax) => {
    if (wordMin === 0 && wordMax === '') {
      return 0;
    } if (wordMin === 0 && wordMax === 100000) {
      return 1;
    } if (wordMin === 100000 && wordMax === 300000) {
      return 2;
    } if (wordMin === 500000 && wordMax === 1000000) {
      return 3;
    }
    return 4;
  }

  // eslint-disable-next-line react/destructuring-assignment
  fetchContent = async (requestObj = this.state.requestObj) => {
    const {
      sort, bookTypeId, wordMin, wordMax, Keyword, isSign, pageNo, pageSize,
    } = requestObj;
    const res = await fetch(`${queryBookClass}?sort=${sort}&bookTypeId=${bookTypeId}&wordMin=${wordMin}&wordMax=${wordMax}&isSign=${isSign}&Keyword=${Keyword}&pageNo=${pageNo}&pageSize=${pageSize}`, {
      method: 'get',
    });
    // eslint-disable-next-line no-underscore-dangle
    const { totalPage, bookInfo } = JSON.parse(res._bodyText);
    this.setState(() => ({ bookList: bookInfo, requestObj, totalPage }));
  }

  switchRankRootId = (sort) => {
    const { requestObj } = this.state;
    requestObj.sort = sort;
    this.fetchContent(requestObj);
  }

  switchBookTypeId = (bookTypeId) => {
    const { requestObj } = this.state;
    requestObj.bookTypeId = bookTypeId;
    this.setState({ showedFilterId: '' });
    this.fetchContent(requestObj);
  }

  closeFilter = () => {
    this.setState(() => ({ showedFilterId: '' }));
  }

  toggleShowMode = () => {
    this.setState(state => ({ showMode: state.showMode === 'detail' ? 'simple' : 'detail' }));
  }

  filterSwitchType = (bookTypeId) => {
    const { requestObj } = this.state;
    requestObj.bookTypeId = bookTypeId;
    this.setState(() => ({ requestObj }));
  }

  filterSwitchCount = (wordAccId) => {
    const { requestObj } = this.state;
    switch (wordAccId) {
      case 0:
        requestObj.wordMin = 0;
        requestObj.wordMax = '';
        break;
      case 1:
        requestObj.wordMin = 0;
        requestObj.wordMax = 100000;
        break;
      case 2:
        requestObj.wordMin = 100000;
        requestObj.wordMax = 300000;
        break;
      case 3:
        requestObj.wordMin = 500000;
        requestObj.wordMax = 1000000;
        break;
      default:
        requestObj.wordMin = 1000000;
        requestObj.wordMax = '';
        break;
    }
    this.setState(() => ({ requestObj }));
  }

  filterSwitchSign = (isSign) => {
    const { requestObj } = this.state;
    requestObj.isSign = isSign;
    this.setState(() => ({ requestObj }));
  }

  clear = () => {
    const { requestObj } = this.state;
    requestObj.bookTypeId = '';
    requestObj.wordMin = 0;
    requestObj.wordMax = '';
    requestObj.isSign = 0;
    this.setState(() => ({ requestObj, showedFilterId: '' }));
    this.fetchContent(requestObj);
  }

  enter = () => {
    this.setState(() => ({ showedFilterId: '' }));
    this.fetchContent();
  }

  handleRefresh = () => {
    const { requestObj } = this.state;
    requestObj.pageNo = 1;
    this.setState(() => ({
      requestObj,
      refreshing: true,
    }), () => {
      this.fetchContent(requestObj);
      this.setState(() => ({ refreshing: false }));
    });
  }

  fetchMore = async (requestObj) => {
    const {
      sort, bookTypeId, wordMin, wordMax, Keyword, isSign, pageNo, pageSize,
    } = requestObj;
    const res = await fetch(`${queryBookClass}?sort=${sort}&bookTypeId=${bookTypeId}&wordMin=${wordMin}&wordMax=${wordMax}&isSign=${isSign}&Keyword=${Keyword}&pageNo=${pageNo}&pageSize=${pageSize}`, {
      method: 'get',
    });
    // eslint-disable-next-line no-underscore-dangle
    this.setState(
      state => ({
        bookList: [
          ...state.bookList,
          ...JSON.parse(res._bodyText).bookInfo],
        requestObj,
        loading: false,
      }),
    );
  }


  handleLoading = () => {
    const { requestObj } = this.state;
    let { pageNo } = requestObj;
    const { totalPage } = this.state;
    if (pageNo === totalPage) {
      this.setState(() => ({ isMoreData: false, loading: false, refreshing: false }));
    } else {
      this.setState(() => ({ loading: true }));
      pageNo += 1;
      this.fetchMore(requestObj);
    }
  }

  switchShowedFilter(FilterId) {
    const { showedFilterId } = ths.state;
    if (FilterId === showedFilterId) {
      this.setState(() => ({ showedFilterId: '' }));
    } else {
      this.setState(() => ({ showedFilterId }));
    }
  }


  render() {
    const {
      requestObj,
      showedFilterId,
      bookList,
      showMode,
      refreshing,
      loading,
      isMoreData,
    } = this.state;
    const { sort, wordMin, wordMax } = requestObj;
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    const { navigate } = navigation;
    const wordAccId = this.getWordAccId(wordMin, wordMax);


    return (
      <View style={styles.container}>
        <Filter
          isShowed={showedFilterId === 3}
          wordAccId={wordAccId}
          bookTypeId={requestObj.bookTypeId}
          isSign={requestObj.isSign}
          filterSwitchType={this.filterSwitchType}
          filterSwitchCount={this.filterSwitchCount}
          filterSwitchSign={this.filterSwitchSign}
          enter={this.enter}
          clear={this.clear}
          closeFilter={this.closeFilter}
        />

        <Header title="分类" toggle={this.toggleShowMode} />
        <View style={styles.container}>
          <View style={styles.filter}>

            <View style={styles.flFilter}>
              <TouchableWithoutFeedback onPress={() => { this.switchRankRootId(0); }}>
                <View style={styles.filterItem}>
                  <Text style={{
                    ...styles.filterText,
                    color: sort === 0 ? color_selected : color_unSelected,
                  }}
                  >
                    更新时间
                  </Text>
                  <Svg icon="downArrow" size={24 * lu} color={sort === 0 ? color_selected : '#f2f2f2'} />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => { this.switchRankRootId(1); }}>
                <View style={styles.filterItem}>
                  <Text style={{
                    ...styles.filterText,
                    color: sort === 1 ? color_selected : color_unSelected,
                  }}
                  >
                    点击数量

                  </Text>
                  <Svg icon="downArrow" size={24 * lu} color={sort === 1 ? color_selected : '#f2f2f2'} />

                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => { this.switchRankRootId(2); }}>
                <View style={styles.filterItem}>
                  <Text style={{
                    ...styles.filterText,
                    color: sort === 2 ? color_selected : color_unSelected,
                  }}
                  >
                    收藏数量

                  </Text>
                  <Svg icon="downArrow" size={24 * lu} color={sort === 2 ? color_selected : '#f2f2f2'} />

                </View>
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.slFilter}>
              <View style={styles.filterItem}>
                <Text
                  onPress={() => { this.switchShowedFilter(0); }}
                  style={{
                    ...styles.filterText,
                    color: showedFilterId === 0 ? color_selected : color_unSelected,
                  }}
                >
                  分类

                </Text>
                <Svg icon="down" size={24 * lu} color={showedFilterId === 0 ? color_selected : color_unSelected} />
              </View>

              <View style={styles.filterItem}>
                <Text
                  onPress={() => { this.switchShowedFilter(1); }}
                  style={{
                    ...styles.filterText,
                    color: showedFilterId === 1 ? color_selected : color_unSelected,
                  }}
                >
                  字数

                </Text>
                <Svg icon="down" size={24 * lu} color={showedFilterId === 1 ? color_selected : color_unSelected} />

              </View>
              <View style={styles.filterItem}>
                <Text
                  onPress={() => { this.switchShowedFilter(2); }}
                  style={{
                    ...styles.filterText,
                    color: showedFilterId === 2 ? color_selected : color_unSelected,
                  }}
                >
                  签约

                </Text>
                <Svg icon="down" size={24 * lu} color={showedFilterId === 2 ? color_selected : color_unSelected} />

              </View>
              <View style={styles.filterItem}>
                <Text
                  onPress={() => { this.switchShowedFilter(3); }}
                  style={{
                    ...styles.filterText,
                    color: showedFilterId === 3 ? color_selected : color_unSelected,
                  }}
                >
                  筛选

                </Text>
                <Svg icon="down" size={24 * lu} color={showedFilterId === 3 ? color_selected : color_unSelected} />

              </View>
            </View>
          </View>
          <CateFilter
            bookTypeId={requestObj.bookTypeId}
            isShowed={showedFilterId === 0}
            switchBookTypeId={this.switchBookTypeId}
            closeFilter={this.closeFilter}
          />
          <WordAccFilter
            switchWordAccId={this.switchWordAccId}
            wordCountId={wordAccId}
            isShowed={showedFilterId === 1}
            closeFilter={this.closeFilter}
          />
          <SignFilter
            isShowed={showedFilterId === 2}
            signTypeId={requestObj.isSign}
            switchSignStatus={this.switchSignStatus}
            closeFilter={this.closeFilter}
          />
          <CateBooks
            bookList={bookList}
            mode={showMode}
            navigate={navigate}
            refreshing={refreshing}
            handleRefresh={this.handleRefresh}
            isMoreData={isMoreData}
            loading={loading}
            handleLoading={this.handleLoading}
          />
        </View>
      </View>
    );
  }
}
