import { createStackNavigator, createAppContainer } from "react-navigation";
import {Easing, Animated} from 'react-native'

import Home from './src/screens/Home';
import Menu from './src/screens/Menu';
import Rank from './src/screens/Rank';
import Cate from './src/screens/Cate';
import Percenter from './src/screens/Percenter';


const AppNavigator = createStackNavigator({

  Home,
  Percenter,
  Cate,
  Rank,
  Menu,
},
{
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
        const {layout, position, scene} = sceneProps;
        const {index} = scene;
        const Width = layout.initWidth;
        //沿X轴平移
        const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [Width, 0, -(Width - 10)],
        });
        //透明度
        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
        });
        return {opacity, transform: [{translateX}]};
      }
    })
}
);



export default createAppContainer(AppNavigator);
