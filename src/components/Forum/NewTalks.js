import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import Refresh from './Refresh';
import { lu, width } from '../../modules/utils/unit';
import Svg from '../svgs/Svg';

import { getTopicComment } from '../../services/Forum/Topic';

export default class NewTalks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
    };
  }

  setTopicComment = async () => {
    const res = await getTopicComment();
    console.log(res.data.data.list[2].commentContent);
    this.setState(() => ({ comments: res.data.data.list }));
  }

  componentDidMount = () => {
    this.setTopicComment();
  }

  maleOrFemale = (sex) => {
    let svg = null;
    switch (sex) {
      case '男生':
        svg = 'male';
        break;
      case '女生':
        svg = 'female';
        break;
      default:
        svg = null;
    }
    return svg;
  }

  render() {
    const { comments } = this.state;
    return (
      <View>

        <View style={{
          height: 108 * lu,
          backgroundColor: '#f2f2f2',
          paddingTop: 20 * lu,
        }}
        >
          <View style={{
            height: 88 * lu,
            width,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 2 * lu,
            borderColor: '#f2f2f2',
            marginBottom: 20 * lu,
            backgroundColor: '#fff',
          }}
          >
            <Svg
              icon="newState"
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
              最新动态
            </Text>
            <Refresh update={this.getHotTitles} />
          </View>
        </View>
        {comments && comments.map(item => (
          <View
            style={{
              width,
              paddingTop: 30 * lu,
              borderTopWidth: 1 * lu,
              borderTopColor: '#f2f2f2',
            }}
            key={item.commentId}
          >
            <View style={{
              flexDirection: 'row',
              paddingLeft: 30 * lu,
              height: 56 * lu,
              alignItems: 'center',
              marginBottom: 20 * lu,
            }}
            >
              <Image
                source={{ uri: `https://ex.qcacg.com/Controller${item.userHead}` }}
                style={{
                  width: 48 * lu,
                  height: 48 * lu,
                  marginRight: 20 * lu,
                  borderRadius: 24 * lu,
                }}
              />
              <View style={{ height: 56 * lu }}>
                <Text style={{
                  fontSize: 24 * lu, color: '#565656', position: 'absolute', top: 0,
                }}
                >
                  {item.userName}
                </Text>
                <Text style={{
                  fontSize: 20 * lu, color: '#989898', position: 'absolute', bottom: 0,
                }}
                >
                  两天前
                </Text>
              </View>
              <Svg icon="seeMore2" size={28 * lu} style={{ position: 'absolute', right: 30 * lu }} />
            </View>

            <Text style={{
              fontSize: 26 * lu,
              color: '#73b8ff',
              paddingLeft: 30 * lu,
            }}
            >
              {`#${item.title}#`}
            </Text>

            <Text style={{
              fontSize: 26 * lu,
              color: '#282828',
              textAlignVertical: 'center',
              marginTop: 16 * lu,
              marginBottom: 16 * lu,
              marginHorizontal: 30 * lu,
            }}
            >
              {item.commentContent}
            </Text>
            <View style={{
              flexDirection: 'row',
              height: 48 * lu,
              alignItems: 'flex-start',
              paddingLeft: 30 * lu,
            }}
            >
              <Text style={{ fontSize: 20 * lu, color: '#989898' }}>评论</Text>
              <View style={{
                flexDirection: 'row',
                position: 'absolute',
                right: 30 * lu,
                paddingLeft: 30 * lu,
                alignItems: 'flex-start',
              }}
              >
                <Svg icon="Reply" size={18 * lu} style={{ marginRight: 8 * lu }} />
                <Text style={{
                  fontSize: 20 * lu,
                  color: '#989898',
                  textAlignVertical: 'top',
                  lineHeight: 22 * lu,
                }}
                >
                  {item.totalCount}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
}
