import React, { Component } from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
} from 'react-native';

import { lu } from '../../modules/utils/unit';

export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  render() {
    const { name } = this.state;
    // eslint-disable-next-line react/prop-types
    const { visible, close, updateName } = this.props;
    return (

      <Modal
        visible={visible}
        transparent
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          <View style={{
            backgroundColor: '#fff',
            width: 648 * lu,
            height: 410 * lu,
            borderRadius: 8 * lu,
          }}
          >
            <View>
              <Text style={{
                position: 'absolute',
                top: 48 * lu,
                left: 54 * lu,
                fontSize: 32 * lu,
                color: '#282828',
              }}
              >
                修改昵称
              </Text>
              <Text style={{
                position: 'absolute',
                left: 54 * lu,
                top: 96 * lu,
                fontSize: 28 * lu,
                color: '#282828',
              }}
              >
                注: 修改昵称需消耗600好人卡
              </Text>
            </View>
            <View style={{
              position: 'absolute',
              top: 200 * lu,
              height: 88 * lu,
              width: 628 * lu,
              marginLeft: 10 * lu,
              borderBottomColor: '#008777',
              borderBottomWidth: 4 * lu,
            }}
            >
              <TextInput
                onChangeText={(text) => { this.setState({ name: text }); }}
                value={name}
                autoFocus
                placeholder="请输入昵称"
                placeholderTextColor="#989898"
                style={{
                  fontSize: 28 * lu,
                }}
              />
            </View>
            <Text
              style={{
                position: 'absolute',
                left: 64 * lu,
                bottom: 45 * lu,
                color: '#008777',
                fontSize: 28 * lu,
              }}
              onPress={updateName}
            >
              确定
            </Text>
            <Text
              style={{
                position: 'absolute',
                right: 64 * lu,
                bottom: 45 * lu,
                color: '#008777',
                fontSize: 28 * lu,
              }}
              onPress={close}
            >
              取消
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}
