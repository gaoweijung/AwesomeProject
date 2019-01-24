import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { width, lu, height } from '../../modules/utils/unit';
import PathList from '../../services/services';
import Svg from '../svgs/Svg';

const { keyWord } = PathList;


export default class Keywords extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyWords: null,
    }
  }

  fetchKeyWords = async () => {
    let res = await fetch(keyWord, {
      method: 'get',
    });
    let keyWords = JSON.parse(res._bodyText).data;
    this.setState(() => ({ keyWords }))
  }

  componentDidMount() {
    this.fetchKeyWords();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      JSON.stringify(this.state) !== JSON.stringify(nextState) ||
      this.props.isKeywordsShowed !== nextProps.isKeywordsShowed
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return !this.props.isKeywordsShowed ? null :
      (<View style={{ flex: 1 }}>
        <View style={{
          height: 88 * lu,
          width: width,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{ marginLeft: 30 * lu, marginRight: 20 * lu, }}>热门标签</Text>
          <Svg icon="bookmark" size={24 * lu} color="#FF3E6E" />
        </View>

        <View style={{
          width: width,
          paddingVertical: 20 * lu,
          paddingHorizontal: 30 * lu,
          flexDirection: 'row',
        }}>
          {this.state.keyWords && this.state.keyWords.map((item, index) => (
            <View style={{
              height: 48 * lu,
              borderRadius: 24 * lu,
              flexDirection: 'row',
              marginRight: 20 * lu,
              paddingHorizontal: 30 * lu,
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
            }}
              key={index}
            >
              <Svg icon="book-tag" size={24 * lu} color="#989898" style={{ marginRight: 10 * lu, }} />
              <Text
                style={{ color: '#989898' }}>{item}</Text>
            </View>
          ))}
        </View>
      </View>)
  }
}