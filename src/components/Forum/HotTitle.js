import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { lu, width } from '../../modules/utils/unit';
import Svg from '../svgs/Svg';
import Refresh from './Refresh';
import HotTitleItem from './HorTitle/HotTitleItem';
import { getTopicList } from '../../services/Forum/Topic';

export default class HotTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: null,
    };
  }

  setHotTitles = async () => {
    const res = await getTopicList();
    this.setState(() => ({ titles: res.data.data.list }));
    console.log(res.data.data.list);
  }

  componentDidMount = () => {
    this.setHotTitles();
  }

  render() {
    const { titles } = this.state;
    return (
      <View>
        <View style={{
          height: 88 * lu,
          width,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2 * lu,
          borderColor: '#f2f2f2',
        }}
        >
          <Svg
            icon="hotTitle"
            size={32 * lu}
            style={{
              position: 'absolute',
              left: 30 * lu,
            }}
          />
          <Text style={{
            fontSize: 28 * lu,
            color: '#282828',
            position: 'absolute',
            left: 82 * lu,
          }}
          >
            热门主题
          </Text>
          <Refresh update={this.setHotTitles} />
        </View>
        {titles && titles.map(item => (
          <HotTitleItem itemName={`#${item.title}#`} />
        ))}
      </View>
    );
  }
}
