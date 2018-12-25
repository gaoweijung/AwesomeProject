import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import SvgRemote from 'react-native-remote-svg';

import RotateView from '../Home/refresh';
import BookTags from '../common/BookTags';

const { width } = Dimensions.get('window');
const lu = width / 750;

export default class EitorRecom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };
  }

  updateWebRecom = async () => {
    try {
      let resJson = await fetch('https://ex.qcacg.com/Controller/index/mobileAllRecommendedData.shtml', {
        method: 'get',
      });
      let res = JSON.parse(resJson._bodyText);
      let response = res.data.reduce((pre, current) => {
        let book = {
          key: current.bookId,
          imgSrc: { uri: `http://cdn.qcacg.com/Controller/${current.bookCoverImage}` },
          bookIntro: current.bookIntroduction,
          bookName: current.bookName,
          bookTags: current.bookTypeList.slice(0, 3),
          bookAuthor: current.author,
        }
        pre.push(book);
        return pre;
      }, [])

      this.setState(() => ({ response }));
      console.log(this.state.response);
    } catch (error) {
      console.error(error);
    }
  }

  navigate = (bookId) => {
    console.log(bookId);
    this.props.navigate(bookId);
  }

  render() {

    let books = this.state.response;


    return (
      <View>

        <View style={{
          height: 98 * lu,
          paddingLeft: 30 * lu,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <SvgRemote source={require('../../assets/svgs/crown.svg')} style={{ width: 48 * lu, height: 48 * lu, }} />
          <Text style={{
            marginLeft: 20 * lu,
            marginRight: 470 * lu,
            fontSize: 30 * lu,
            color: '#282828',
          }}>全站推荐</Text>
          <RotateView  update={this.updateWebRecom} viewStyle={{ marginRight: 30 * lu }} svgStyle={{ height: 32 * lu, width: 32 * lu, }} />
        </View>

        <View>

          { !books.length ? null :
            books.map((item) => (
              <TouchableWithoutFeedback key={item.key} onPress={() => { this.navigate(item.key) }} >

                <View style={{ paddingHorizontal: 30 * lu, flexDirection: 'row', height: 264 * lu, paddingTop: 30 * lu, borderTopWidth: 1 * lu, borderTopColor: '#F2F2F2' }}>
                  <Image source={item.imgSrc} style={{ width: 140 * lu, height: 202 * lu, marginRight: 30 * lu, borderRadius: 8 * lu }} />
                  <View style={{ width: 520 * lu, height: 202 * lu }}>
                    <Text numberOfLines={2} style={{ fontSize: 30 * lu, marginBottom: 20 * lu, lineHeight: 32 * lu, }}>{item.bookName}</Text>
                    <Text numberOfLines={2} style={{ fontSize: 26 * lu, color: '#989898', lineHeight: 45 * lu }}>{item.bookIntro}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 * lu, position: 'absolute', bottom: 0, width: 520 * lu }}>
                      <Image source={require('../../assets/images/author.png')} style={{ width: 24 * lu, height: 24 * lu, marginRight: 16 * lu }} />
                      <Text style={{ fontSize: 24 * lu, textAlign: 'center', lineHeight: 26 * lu, color: '#989898', height: 28 * lu }}>{item.bookAuthor}</Text>
                      <BookTags bookTags={item.bookTags} style={{ position: 'absolute', right: 0 }} />
                    </View>
                  </View>
                </View>

              </TouchableWithoutFeedback>
            ))
          } 
        </View>

      </View>
    );
  }

  componentDidMount = () => {
    this.updateWebRecom();
  }
}
