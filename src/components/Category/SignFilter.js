import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { width, height, lu } from '../../modules/utils/unit';
import color from '../../modules/utils/Color';

const { color_selected } = color;
const SIGN_TYPES = [
  {
    signTypeName: '精品作品',
    signTypeId: 0,
  },
  {
    signTypeName: '签约作品',
    signTypeId: 1,
  }
];
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    top: 148 * lu,
    zIndex: 9,
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  catesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  cateItemWrapper: {
    height: 88 * lu,
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cateItem: {
    paddingHorizontal: 32 * lu,
    height: 48 * lu,
    fontSize: 28 * lu,
    borderRadius: 24 * lu,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})

export default class SignFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    if (this.props.isShowed) {
      return (
        <View style={styles.container}>
          <View style={styles.catesWrapper}>
            {SIGN_TYPES.map((item) => (
              <View style={styles.cateItemWrapper} key={item.signTypeId}>
                <Text
                  onPress={() => { this.props.switchSignStatus(item.signTypeId) }}
                  style={{
                    ...styles.cateItem,
                    color: this.props.signTypeId == item.signTypeId ? '#fff' : '#565656',
                    backgroundColor: this.props.signTypeId == item.signTypeId ? color_selected : '#fff',
                  }}
                >{item.signTypeName}</Text>
              </View>
            ))}
          </View>
          <TouchableWithoutFeedback onPress={this.props.closeFilter}>
            <View style={{ flex: 1, }}></View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    else {
      return null;
    }
  }
}
