import React, {Component} from 'react';
import { View, Text, Dimensions, TouchableNativeFeedback} from 'react-native';
import Svg from 'react-native-remote-svg';

const {width} = Dimensions.get('window');
const lu = width / 750;


export default class Header extends Component {

  constructor(props) {
    super(props);
  }

  fatherMethod =() => {
    console.log('子组件方法已经触发', this.props.title)
    this.props.goBack();
  }

  render() {
    return(
      <View style={{height: 88 * lu, width: width, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30 * lu, ...this.props.style}}>
        <TouchableNativeFeedback onPress={this.fatherMethod}>
          <View style={{width: 30 * lu, height: 88 * lu, justifyContent: 'center'}}>
          <Svg source={require('../assets/svgs/back.svg')} style={{width: 30 * lu, height: 30 * lu}} />
          </View>
        </TouchableNativeFeedback>
        <Text style={{width: 632 * lu, textAlign: 'center', fontSize: 32 * lu}} onPress={this.fatherMethod}>{this.props.title}</Text>
        <TouchableNativeFeedback>
          <View>
            <Svg source={require('../assets/svgs/more.svg')} style={{width: 35 * lu, height: 35 * lu}} />
          </View>
        </TouchableNativeFeedback>
    </View>
    )
  }
}