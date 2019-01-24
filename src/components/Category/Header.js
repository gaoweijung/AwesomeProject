import React, { Component } from 'react'
import { Text, View, StyleSheet, StatusBar, TouchableWithoutFeedback, Image } from 'react-native'

import { lu, height, width } from '../../modules/utils/unit'
import Svg from '../svgs/Svg'
// import color from '../../modules/utils/Color'

// const { color_selected, color_unSelected } = color

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 88 * lu + StatusBar.currentHeight,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    width: width,
    height: 88 * lu,
    flexDirection: 'row',
  },
  svgContainer: {
    flex: 1,
    height: 88 * lu,
    justifyContent: 'center',
  },
  title: {
    flex: 2,
    height: 88 * lu,
    lineHeight: 88 * lu,
    textAlign: 'center',
    color: '#282828',
    fontSize: 32 * lu,
  },
  leftSvg: {
    position: 'absolute',
    left: 32 * lu,
  },
  rightSvg: {
    position: 'absolute',
    right: 30 * lu,
  },
})

export default class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>

          <TouchableWithoutFeedback>
            <View style={styles.svgContainer}>
              <Svg icon="back" size={30 * lu} style={styles.leftSvg} />
            </View>
          </TouchableWithoutFeedback>

          <Text style={styles.title}>{this.props.title}</Text>

          <TouchableWithoutFeedback onPress={this.props.toggle}>
            <View style={styles.svgContainer}>
              <Svg icon="toggle" size={ 32 * lu } color="#282828" style={styles.rightSvg} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}