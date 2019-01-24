import React, { Component } from 'react';
import {
  View,
  ScrollView,
} from 'react-native';

import Header from '../components/Forum/Header';
import Navigator from '../components/Forum/Navigator';
import HotTitle from '../components/Forum/HotTitle';
import NewTalks from '../components/Forum/NewTalks';
import { height, width } from '../modules/utils/unit';


export default class Forum extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {
    return (
      <View>
        <Header />
        {/* <FlatList
          data={}
          renderItem={}
        /> */}
        <ScrollView style={{ height, width }}>
          <Navigator />
          <HotTitle />
          <NewTalks />
        </ScrollView>
      </View>
    );
  }
}
