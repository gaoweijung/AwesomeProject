import React, { Component } from 'react'
import {
  Button,View
} from 'react-native'

export default class NewIndex extends Component{
  render(){
    return (<View style={{marginTop:80}}>
      <Button onPress={()=>{
        this.props.navigation.navigate('Home')
      }} title={'首页'} />
      <Button onPress={()=>{
        this.props.navigation.navigate('Percenter')
      }} title={'个人中心'} />
      <Button onPress={()=>{
        this.props.navigation.navigate('Forum')
      }} title={'论坛'} />
      <Button onPress={()=>{
        this.props.navigation.navigate('ReadView',{bookId:10,contentId:10})
      }} title={'阅读'} />
    </View>)
  }
}