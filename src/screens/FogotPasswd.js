import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../components/common/HeaderN';
import Telephone from '../components/ForgotPasswd/Telephone';
import { lu } from '../modules/utils/unit';

export default class FogotPasswd extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  navigateToPasswd = () => {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    console.log(this.Telephone.state.telephone);
    navigation.navigate('Passwd', {
      telephone: this.Telephone.state.telephone,
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="忘记密码"
          navigation={navigation}
        />
        <Telephone ref={(c) => { this.Telephone = c; }} />
        <View style={{ alignItems: 'center', marginTop: 68 * lu }}>
          <Text
            style={{
              fontSize: 28 * lu,
              color: '#fff',
              width: 594 * lu,
              height: 68 * lu,
              borderRadius: 34 * lu,
              backgroundColor: '#ffd7b6',
              lineHeight: 68 * lu,
              textAlign: 'center',
            }}
            onPress={this.navigateToPasswd}
          >
            下一步
          </Text>
        </View>
      </View>
    );
  }
}
