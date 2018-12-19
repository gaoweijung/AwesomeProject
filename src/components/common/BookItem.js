import React, {Component} from 'react';
import { View, Text, Dimensions, Image } from 'react-native';

const {width} = Dimensions.get('window');
const lu = width / 750;

class BookTags extends Component {

  render() {
    if(!this.props.bookTags) {
      return ;
    } else {
      const tags = this.props.bookTags.map((item, index) => (
        <Text key= {index} style={{marginRight: 9 * lu, paddingHorizontal: 4 * lu, height: 40 * lu, color: '#989898', fontSize: 26 * lu, borderWidth: .5 * lu, borderColor: '#989898', borderRadius: 4 * lu, textAlign: 'center', textAlignVertical: 'center'}}>{item.bookTypeName}</Text>
      ))
      return(
        <View style={{flexDirection: 'row', ...this.props.style}}>{tags}</View>
      )
    }
  }
  
}

export default class RecommendItem extends Component {
  render() {
    return (
      <View style={{paddingHorizontal: 30 * lu, flexDirection: 'row', height: 264 * lu, paddingTop: 30 * lu, borderTopWidth: 1 * lu, borderTopColor: 'rgb(242, 242, 242)'}}>
        <Image source={this.props.book.imgSrc} style={{width: 140 * lu, height: 202 * lu, marginRight: 30 * lu, borderRadius: 8 * lu}} />
        <View style={{width: 520 * lu, height: 202 * lu}}>
          <Text numberOfLines={2} style={{ fontSize: 30 * lu, marginBottom: 20 * lu, lineHeight: 32 * lu,}}>{this.props.book.bookName}</Text>
          <Text numberOfLines={2} style={{fontSize: 26 * lu, color: '#989898', lineHeight: 45 * lu}}>{this.props.book.bookIntro}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20 * lu, position: 'absolute', bottom: 0, width: 520 * lu}}>
            <Image source={require('../../assets/images/author.png')} style={{width: 24 * lu, height: 24 * lu, marginRight: 16 * lu}} />
            <Text style={{fontSize: 24 * lu, textAlign: 'center', lineHeight: 26 * lu, color: '#989898', height: 28 * lu}}>{this.props.book.bookAuthor}</Text>
            <BookTags bookTags={this.props.book.bookTags} style={{position: 'absolute', right: 0}} />
          </View>
        </View>
      </View>    
      )
  }
}
