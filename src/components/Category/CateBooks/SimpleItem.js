import React, { Component } from 'react';
import { View, Text, Dimensions, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { lu, width, height } from '../../../modules/utils/unit'
const ImageBookPath = 'http://cdn.qcacg.com/Controller';

const styles = StyleSheet.create({
  container: {
    height: 382 * lu,
    width: 210 * lu,
    marginTop: 30 * lu,
    marginRight: 30 * lu,
    backgroundColor: 'pink',
  },
  image: {
    width: 210 * lu,
    height: 295 * lu,
    borderWidth: .5 * lu,
    borderColor: '#f2f2f2',
  },
  text: {
    color: '#565656',
    height: 87 * lu,
    fontSize: 26 * lu,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})


export default class RecommendItem extends Component {

  constructor(props) {
    super(props);
  }

  navigate = () => {
    this.props.navigate('Menu', { bookId: this.props.book.bookId });
  }

  render() {
    let {
      bookId,
      bookCoverImage,
      bookName,
    } = this.props.book

    return (
      <TouchableWithoutFeedback onPress={() => { this.navigate(bookId) }} >
        <View style={styles.container}>
          <Image source={{ uri: ImageBookPath + bookCoverImage }} style={styles.image} />
          <Text style={styles.text} numberOfLines={1}>{bookName}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
