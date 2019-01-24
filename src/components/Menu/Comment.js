import React, { Component } from 'react';
import {
  View, Text, ScrollView, StatusBar, Image, TouchableNativeFeedback, Animated,
} from 'react-native';

import { width, lu } from '../../modules/utils/unit';
import Svg from '../svgs/Svg';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: {},
    };
  }

  async fetchComment() {
    const resJson = await fetch(`https://ex.qcacg.com/Controller/comment/findCommentAndReply.shtml?bookId=${this.props.bookId}&pageNo=1&pageSize=10&status=0`, {
      type: 'get',
    });
    const commentData = JSON.parse(resJson._bodyText);
    this.setState(() => ({
      commentData,
    }));
  }

  componentDidMount() {
    this.fetchComment();
  }


  render() {
    console.log('comment rendered');

    const commentData = this.state.commentData;
    if (JSON.stringify(commentData) == '{}') {
      return null;
    }

    return (
      this.renderComment(commentData)
    );
  }

  // shouldComponentUpdate(nextState) {
  //   return !this.state.commentData == nextState.commentData;
  // }

  renderComment(commentData) {
    return (
      <View>
        <View style={{
          width, height: 88 * lu, flexDirection: 'row', alignItems: 'center', paddingLeft: 30 * lu,
        }}
        >

          <Svg icon="split" size={30 * lu} style={{ marginLeft: -5 * lu }} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 28 * lu, color: '#070707' }}>评论</Text>
            <Text style={{
        fontSize: 20 * lu, color: '#8e8e8e', paddingLeft: 10 * lu, textAlignVertical: 'bottom',
      }}
      >
        {commentData.commentAndReplyTotalCount ? `${commentData.commentAndReplyTotalCount}条` : '' + '条'}

      </Text>
          </View>
          <TouchableNativeFeedback>
            <View style={{
        height: 88 * lu, width: 14 * lu, justifyContent: 'center', position: 'absolute', right: 20 * lu,
      }}
      >
        <Svg icon="right" size={26 * lu} />
      </View>
          </TouchableNativeFeedback>
        </View>

        {this.renderCommentList()}


        <View style={{
          width, height: 88 * lu, borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2',
        }}
        >
          <Text style={{
            textAlign: 'center', textAlignVertical: 'center', color: '#ffab6c', fontSize: 26 * lu, height: 88 * lu,
          }}
          >
查看全部评论

          </Text>
        </View>
      </View>
    );
  }

  renderCommentList() {
    console.log('renderCommentList');
    const commentData = this.state.commentData;
    let { totalCount, comment } = commentData;

    if (comment.length > 3) {
      comment = comment.slice(0, 3);
    }

    const commentList = comment.map((item) => {
      const timeObj = new Date(item.commentDate);
      const time = `${timeObj.getFullYear()}年${timeObj.getMonth() + 1}月${timeObj.getDay()}日`;
      return (
        <View
          style={{
            height: 236 * lu, width, paddingTop: 20 * lu, borderTopWidth: 1 * lu, borderTopColor: '#f2f2f2',
          }}
          key={item.commentId}
        >
          <View style={{
            flexDirection: 'row', paddingLeft: 30 * lu, height: 48 * lu, alignItems: 'center',
          }}
          >
            <Image
              source={{ uri: `https://ex.qcacg.com/Controller${item.userHead}` }}
              style={{ width: 48 * lu, height: 48 * lu, marginRight: 20 * lu }}
            />
            <Text style={{ fontSize: 24 * lu, color: '#656565', marginRight: 16 * lu }}>{item.userName}</Text>
            <Svg icon="female" size={24 * lu} />
            <Text style={{
              fontSize: 20 * lu, color: '#989898', position: 'absolute', right: 20 * lu,
            }}
            >
              {time}

            </Text>
          </View>
          <Text style={{
            fontSize: 26 * lu, color: '#282828', height: 120 * lu, textAlignVertical: 'center', paddingHorizontal: 30 * lu,
          }}
          >
            哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈 哈哈哈哈哈哈哈哈哈哈哈哈哈
          </Text>
          <View style={{
            flexDirection: 'row', height: 48 * lu, alignItems: 'flex-start', paddingLeft: 30 * lu,
          }}
          >
            <Text style={{ fontSize: 20 * lu, color: '#989898' }}>评论</Text>
            <View style={{
              flexDirection: 'row', position: 'absolute', right: 30 * lu, paddingLeft: 30 * lu, alignItems: 'flex-start',
            }}
            >
              <Svg icon="Reply" size={18 * lu} style={{ marginRight: 8 * lu }} />
              <Text style={{
                fontSize: 20 * lu, color: '#989898', textAlignVertical: 'top', lineHeight: 22 * lu,
              }}
              >
                {item.totalCount}

              </Text>
            </View>
          </View>
        </View>
      );
    });
    if (!totalCount) {
      return (
        <View style={{ height: 88 * lu, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 28 * lu, textAlign: 'center', textAlignVertical: 'center' }}>暂无评论</Text>
        </View>
      );
    }
    return commentList;
  }
}
