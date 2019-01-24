import React,{Component} from 'react';
import Svg from './svgs/Svg';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,TouchableNativeFeedback,StatusBar} from 'react-native';
import TitleBar from './titleBar';

export default class ChoiceSpeaker extends Component{
    constructor(props){
        super(props);
        this.state={
            speaker:props.navigation.state.params.speaker
        }
        this.callback=props.navigation.state.params.callback;
    }
    setSpeaker(speaker){
        this.callback(speaker);
        this.setState({
            speaker:speaker
        })
    }
    render(){
        return (<View>
                <TitleBar title={'音源选择'}  _onPress={()=>{this.props.navigation.goBack();StatusBar.setHidden(true,'none');}}/>
                <View>
                    <TouchableNativeFeedback onPress={()=>{this.setSpeaker("1")}}>
                        <View style={styles.itemStyle}>
                            <Text style={{color:'#282828',marginLeft:30*lu,fontSize:28*lu}}>男声</Text>
                            {this.state.speaker=="1"?
                            (<Svg icon="readSelected" size={40*lu} style={{marginRight:30*lu}}/>):null}
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={()=>{this.setSpeaker("0")}}>
                        <View style={styles.itemStyle}>
                            <Text style={{color:'#282828',marginLeft:30*lu,fontSize:28*lu}}>女声</Text>
                            {this.state.speaker=="0"?
                            (<Svg icon="readSelected" size={40*lu} style={{marginRight:30*lu}}/>):null}
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>)
    }
}
const {width,height} =  Dimensions.get('window');
const lu=width/750;
var styles=StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    itemStyle:{
        flexDirection:'row',
        borderBottomColor:'#f2f2f2',
        borderBottomWidth:0.5,
        height:89*lu,
        justifyContent:'space-between',
        alignItems:'center'
    }
})