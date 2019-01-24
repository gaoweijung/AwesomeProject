import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../Register/style/Style';

import { width, lu } from '../../modules/utils/unit';

const styles = StyleSheet.create({
  container: {
    height: 88 * lu + StatusBar.currentHeight,
    width: width,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  exit: {
    flex: 1,
    justifyContent: 'center',
  },
  exitSvg: {
    position: 'absolute',
    left: 30 * lu,
  },
  title: {
    flex: 2,
    textAlign: 'center',
    lineHeight: 88 * lu,
    fontSize: 32 * lu,
    color: '#282828',
  },
  more: {
    flex: 1,
    justifyContent: 'center',
  },
  moreSvg: {
    position: 'absolute',
    right: 30 * lu,
  }
})

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback>
            <View>
              <Svg icon="back" size={30 * lu} style={styles.exitSvg} />
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.title}></Text>
          <TouchableWithoutFeedback>
            <View style={styles.more}>
              <Svg style={styles.moreSvg} icon="more" size={30 * lu} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
