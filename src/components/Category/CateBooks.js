/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import BookItem from '../common/BookItem';
import { lu, width } from '../../modules/utils/unit';

const ImageBookPath = 'http://cdn.qcacg.com/Controller';

const styles = StyleSheet.create({
  simpleContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 30 * lu,
    backgroundColor: '#fff',
  },
  container: {
    height: 353 * lu,
    width: 210 * lu,
    marginTop: 24 * lu,
    marginRight: 30 * lu,
  },
  image: {
    width: 210 * lu,
    height: 295 * lu,
    borderWidth: 1 * lu,
    borderRadius: 8 * lu,
    borderColor: '#f2f2f2',
  },
  text: {
    flex: 1,
    color: '#565656',
    fontSize: 26 * lu,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

});

export default class CateBooks extends Component {
  static propTypes = {
    navigate: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    bookList: PropTypes.any.isRequired,
    mode: PropTypes.string.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    handleLoading: PropTypes.func.isRequired,
    isMoreData: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  navigate = (bookId) => {
    const { navigate } = this.props;
    navigate('Menu', { bookId });
  }

  // shouldComponentUpdate = (nextProps) => {
  //   return this.props.bookList == nextProps.bookList && this.props.mode
  // == nextProps.mode ?  false : true;
  // }

  _keyExtractor = item => item.bookName

  _renderItem = ({ item }) => {
    const { navigate } = this.props;
    return (
      <BookItem
        book={item}
        navigate={navigate}
      />
    );
  }

  _renderListFooter = () => {
    const { isMoreData } = this.props;
    if (isMoreData) {
      return (
        <View style={{
          width,
          height: 88 * lu,
          backgroundColor: '#f2f2f2',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <ActivityIndicator
            animating
          />
        </View>
      );
    }
    return (
      <View style={{
        width,
        height: 88 * lu,
        backgroundColor: '#f2f2f2',
      }}
      >
        <Text style={{
          width,
          height: 88 * lu,
          textAlign: 'center',
          textAlignVertical: 'center',
        }}
        >
          没有更多数据了
        </Text>
      </View>
    );
  }


  // renderListFooter = () => {
  //   return
  // }

  render() {
    const {
      bookList,
      mode,
      handleRefresh,
      refreshing,
      handleLoading,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {
          mode === 'detail'
            ? (
              <FlatList
                data={bookList}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                onRefresh={handleRefresh}
                refreshing={refreshing}
                onEndReached={handleLoading}
                onEndReachedThreshold={0.5}
                ListFooterComponent={this._renderListFooter}
              />
            )
            : (
              <ScrollView>
                <View style={styles.simpleContainer}>
                  {bookList && bookList.map(item => (
                    <TouchableWithoutFeedback
                      onPress={() => { this.navigate(item.bookId); }}
                      key={item.bookId}
                    >
                      <View style={styles.container}>
                        <Image
                          source={{ uri: ImageBookPath + item.bookCoverImage }}
                          style={styles.image}
                        />
                        <Text style={styles.text} numberOfLines={1}>{item.bookName}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              </ScrollView>
            )
        }
      </View>
    );
  }
}
