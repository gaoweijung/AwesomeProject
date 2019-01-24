import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';

import BookTags from './BookTags';


const { width } = Dimensions.get('window');
const lu = width / 750;
const ImageBookPath = 'http://cdn.qcacg.com/Controller';




export default class RecommendItem extends Component {

  constructor(props) {
    super(props);
  }

  navigate = () => {
    this.props.navigate('Menu', { bookId: this.props.book.bookId});
  }

  render() {
    let {
      bookId,
      bookCoverImage,
      bookName,
      bookIntroduction,
      author,
      bookTypeEntitys
    } = this.props.book

    return (

      <TouchableWithoutFeedback onPress={() => { this.navigate(bookId) }} >
        <View style={{ paddingHorizontal: 30 * lu, flexDirection: 'row', height: 264 * lu, paddingTop: 30 * lu, borderTopWidth: 1 * lu, borderTopColor: 'rgb(242, 242, 242)' }}>
          <Image source={{ uri: ImageBookPath + bookCoverImage }} style={{ width: 140 * lu, height: 202 * lu, marginRight: 30 * lu, borderRadius: 8 * lu }} />
          <View style={{ width: 520 * lu, height: 202 * lu }}>
            <Text numberOfLines={2} style={{ fontSize: 30 * lu, color: '#232323', marginBottom: 20 * lu, lineHeight: 32 * lu, }}>{bookName}</Text>
            <Text numberOfLines={2} style={{ fontSize: 26 * lu, color: '#989898', lineHeight: 45 * lu }}>{bookIntroduction}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 * lu, position: 'absolute', bottom: 0, width: 520 * lu }}>
              <Image source={require('../../assets/images/author.png')} style={{ width: 24 * lu, height: 24 * lu, marginRight: 16 * lu }} />
              <Text style={{ fontSize: 24 * lu, textAlign: 'center', lineHeight: 26 * lu, color: '#989898', height: 28 * lu }}>{author}</Text>
              <BookTags bookTags={bookTypeEntitys} style={{ position: 'absolute', right: 0 }} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
