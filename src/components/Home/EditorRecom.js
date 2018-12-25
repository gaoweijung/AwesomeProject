import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import SvgRemote from 'react-native-remote-svg';

import RotateView from '../Home/refresh';
import BookTags from '../common/BookTags';

const { width, height } = Dimensions.get('window');
const lu = width / 750;

export default class EitorRecom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };
  }

  updateEditorRecom = async () => {
    try {
      let resJson = await fetch('https://ex.qcacg.com/Controller/index/mobileEditorRecommendedData.shtml', {
        type: 'get',
      });
      let res = JSON.parse(resJson._bodyText);
      let response = res.data.reduce((pre, current) => {
        let book = {
          key: current.bookId,
          imgSrc: { uri: `http://cdn.qcacg.com/Controller/${current.bookCoverImage}` },
          bookName: current.bookName,
          bookIntro: current.bookIntroduction,
          bookTags: current.bookTypeList.slice(0, 2),
        };
        pre.push(book);
        return pre;
      }, []);
      this.setState(() => ({ response }));
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
      <View style={{height: 806 * lu,}}>

        <View style={{
          height: 98 * lu,
          paddingLeft: 30 * lu,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <SvgRemote source={require('../../assets/svgs/Stars.svg')} style={{width: 48 * lu, height: 48 * lu,}} />
          <Text style={{
            marginLeft: 20 * lu,
            marginRight: 470 * lu,
            fontSize: 30 * lu,
            color: '#282828',
          }}>小编推荐</Text>
          <RotateView ref='updateEditorRecom' update={this.updateEditorRecom} viewStyle={{ marginRight: 30 * lu }} svgStyle={{ height: 32 * lu, width: 32 * lu, }} />
        </View>

        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {
            !books.length ? null :
            books.map((item) => (
              <TouchableWithoutFeedback key={item.key} onPress={() => {this.navigate(item.key)}} >

                <View style={{ height: 236 * lu, width: width * .5, flexDirection: 'row', alignItems: 'center', borderTopColor: 'rgb(242, 242, 242)', borderTopWidth: 1 * lu, }}>
                  <Image source={item.imgSrc} style={{ height: 195 * lu, width: 136 * lu, marginLeft: 30 * lu, borderRadius: 8 * lu }} />
                  <View style={{ height: 195 * lu, width: 168 * lu, marginLeft: 22 * lu }}>
                    <Text numberOfLines={2} style={{fontSize: 28 * lu, color: '#282828', lineHeight: 30 * lu, height: 60 * lu }}>{item.bookName}</Text>
                    <Text numberOfLines={2} style={{fontSize: 24 * lu, color: '#989898', lineHeight: 30 * lu, height: 60 * lu, marginTop: 15 * lu }}>{item.bookIntro}</Text>
                    <BookTags bookTags={item.bookTags} style={{ position: 'absolute', bottom: 2 * lu }} />
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
    this.updateEditorRecom();
  }
}
