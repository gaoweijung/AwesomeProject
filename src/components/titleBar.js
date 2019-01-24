import React, { Component } from 'react';
import Svg from './svgs/Svg';
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
export default class TitleBar extends Component{
    render(){
        return (
            <View>
                <View style={{height:40*lu}}></View>
                <View style={{position:'relative',height:89*lu,borderBottomColor:'#f2f2f2',borderBottomWidth:0.5,flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>{this.props._onPress()}}>
                        <View style={[styles.center,{width:80*lu,height:88*lu}]}>
                            <Svg icon="readBack282828" size={34*lu}/>
                        </View>
                    </TouchableOpacity>
                     <Text style={{color:'#282828',fontSize:28*lu,flex:1,textAlign:'center'}}>{this.props.title}</Text>
                    <View style={{width:80*lu,height:88*lu}}></View>
                </View>
            </View>
        )
    }
}
const {width} =  Dimensions.get('window');
const lu=width/750;
var styles=StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    }
})