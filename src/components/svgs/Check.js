import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg'


const lu = Dimensions.get('window').width / 750;
const T_WIDTH = 28 * lu, T_HEIGHT = 20 * lu , COLOR_HIGH = '#ff9a49', COLOR_NORMAL = '#fff';


export default class Check extends Component {

  render() {
    let stroke = this.props.selected ? COLOR_HIGH : COLOR_NORMAL
    return (
      <Svg
        width={T_WIDTH}
        height={T_HEIGHT}
      >
        <Path
          d={`M0 ${10 * lu} L${10 * lu} ${20 * lu} L${28 * lu} 0`}
          fill='none'
          stroke={stroke}
          strokeWidth={4 * lu}
        />
      </Svg>
    )
  }
  
}