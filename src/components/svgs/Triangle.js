import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import Svg, { Polygon } from 'react-native-svg'


const lu = Dimensions.get('window').width / 750;
const T_WIDTH = 24 * lu, T_HEIGHT = 12 * lu , COLOR_HIGH = '#ff9a49', COLOR_NORMAL = '#282828';


export default class Triangle extends Component {

  render() {
    var fill, points;
    if (this.props.selected) {
      fill = COLOR_HIGH;
      points = `${T_WIDTH / 2},0 0,${T_HEIGHT} ${T_WIDTH},${T_HEIGHT}`
    } else {
      fill = COLOR_NORMAL;
      points = `0,0 ${T_WIDTH}, 0 ${T_WIDTH / 2},${T_HEIGHT}`;
    }
    return (
      <Svg
        width={T_WIDTH}
        height={T_HEIGHT}
      >
        <Polygon
          points={points}
          fill={fill}
          strokeOpacity={1}
        />
      </Svg>
    )
  }
}