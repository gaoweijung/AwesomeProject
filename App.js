/* eslint-disable import/no-named-as-default */
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Easing, Animated } from 'react-native';
import Home from './src/screens/Home';
import Menu from './src/screens/Menu';
import Rank from './src/screens/Rank';
import Cate from './src/screens/Cate';
import Login from './src/screens/Login';
import Search from './src/screens/Search';
import Category from './src/screens/Category';
import Register from './src/screens/Register';
import Percenter from './src/screens/Percenter';
import UserInfo from './src/screens/UserInfo';
import ForgotPasswd from './src/screens/FogotPasswd';
import Passwd from './src/screens/Passwd';
import Forum from './src/screens/Forum';
import ImportView from './src/screens/import';
import Bookcase from './src/screens/bookcase';
import ReadView from './src/screens/read';
import FontFamilySet from './src/components/fontFamilySet';
import MoreSetting from './src/components/moreSetting';
import Setting from './src/components/setting';
import BookMenu from './src/screens/bookMenu';
import NewIndex from './src/screens/newIndex';
import ChoiceSpeaker from './src/components/choiceSpeaker';


const AppNavigator = createStackNavigator(
  {
    NewIndex,
    Forum,
    Home,
    Register,
    Percenter,
    ForgotPasswd,
    Passwd,
    Login,
    UserInfo,
    Category,
    Search,
    Menu,
    Rank,
    Cate,
    ImportView,
    Bookcase,
    ReadView,
    FontFamilySet,
    MoreSetting,
    Setting,
    BookMenu,
    ChoiceSpeaker,
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
      screenInterpolator: (sceneProps) => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const Width = layout.initWidth;
        // 沿X轴平移
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [Width, 0, -(Width - 10)],
        });
        // 透明度
        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });
        return { opacity, transform: [{ translateX }] };
      },
    }),
  },
);


export default createAppContainer(AppNavigator);
