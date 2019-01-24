import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, Image, FlatList } from 'react-native';

const { width } = Dimensions.get('window');
const lu = width / 750;

export default class ClickRank extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickRank: []
    };
  }

  async getClickRank() {
    try {
      let resJson = await fetch('https://ex.qcacg.com/Controller/rank/getRankingList.shtml?pageNo=1&pageSize=10&rankList=2');
      let res = JSON.parse(resJson._bodyText);
      let clickRank = res.result.reduce((pre, current) => {
        let book = {
          key: `${current.bookId}`,
          imgSrc: { uri: `http://cdn.qcacg.com/Controller/${current.bookCoverImage}` },
          bookName: current.bookName,
        };
        pre.push(book);
        return pre;
      }, [])
      this.setState(() => ({ clickRank }))
    } catch (error) {
      console.error(error);
    }
  }

  _keyExtractor =(item, index) => item.key.toString()

  render() {
    return (
      <View>
        <FlatList
          data={this.state.clickRank.length ? this.state.clickRank : [{ imgSrc: require('../../assets/images/defaultBook.png'), bookName: '加载中', key: 1 }]}
          renderItem={({ item }) => {
            return (
              <TouchableWithoutFeedback onPress={() => { this.props.navigate(item.key)}}>
                <View>
                  <View style={{ marginLeft: 30 * lu, alignItems: 'center', width: 136 * lu }}>
                    <Image source={item.imgSrc} style={{
                      height: 195 * lu,
                      width: 136 * lu,
                      borderRadius: 8 * lu,
                      marginBottom: 20 * lu
                    }} />
                    <Text numberOfLines={1} >{item.bookName}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          }}
          horizontal
          style={{ height: 310 * lu, borderTopWidth: 1 * lu, borderTopColor: 'rgb(242, 242, 242)', paddingTop: 20 * lu, overflow: 'hidden' }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={this._keyExtractor}
        />

      </View>
    );
  }

  componentDidMount = () => {
    this.getClickRank();
  }
}
