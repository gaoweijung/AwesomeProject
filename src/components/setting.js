import React,{Component} from 'react';
import Svg from './svgs/Svg';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,TouchableNativeFeedback} from 'react-native';
import TitleBar from './titleBar';
export default class Setting extends Component{
    constructor(props){
        super(props);
        let data=this.props.navigation.state.params;
        if(data.type=="lineSpace"){
            this.state={
                title:'字体间距',
                lineSpace:data.lineSpace
            }
        }else{
            this.state={
                title:'翻页动画',
                touchFlash:data.touchFlash
            }
        }
        this.setBackData=this.props.navigation.state.params.getBackData;
    }
    
    render(){
        
        return (<View style={{flex:1,backgroundColor:"#ffffff"}}>
            <TitleBar title={this.state.title}  _onPress={()=>{this.props.navigation.goBack();}}/>
            {this.state.title=="字体间距"?
            (<View>
                <TouchableNativeFeedback onPress={()=>{this.setState({lineSpace:'1.4'});this.setBackData({lineSpace:'1.4'})}}>
                    <View style={styles.itemStyle}>
                        <Text style={{color:'#282828',marginLeft:30*lu,fontSize:28*lu}}>默认(1.4倍)</Text>
                        {this.state.lineSpace=="1.4"?
                        (<Svg icon="readSelected" size={40*lu} style={{marginRight:30*lu}}/>):null}
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>{this.setState({lineSpace:'1.2'});this.setBackData({lineSpace:'1.2'})}}>
                    <View style={styles.itemStyle}>
                        <Text style={{color:'#282828',marginLeft:30*lu,fontSize:28*lu}}>默认(1.2倍)</Text>
                        {this.state.lineSpace=="1.2"?
                        (<Svg icon="readSelected" size={40*lu} style={{marginRight:30*lu}}/>):null}
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>{this.setState({lineSpace:'1.6'});this.setBackData({lineSpace:'1.6'})}}>
                    <View style={styles.itemStyle}>
                        <Text style={{color:'#282828',marginLeft:30*lu,fontSize:28*lu}}>默认(1.6倍)</Text>
                        {this.state.lineSpace=="1.6"?
                        (<Svg icon="readSelected" size={40*lu} style={{marginRight:30*lu}}/>):null}
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={()=>{this.setState({lineSpace:'1.8'});this.setBackData({lineSpace:'1.8'})}}>
                    <View style={styles.itemStyle}>
                        <Text style={{color:'#282828',marginLeft:30*lu,fontSize:28*lu}}>默认(1.8倍)</Text>
                        {this.state.lineSpace=="1.8"?
                        (<Svg icon="readSelected" size={40*lu} style={{marginRight:30*lu}}/>):null}
                    </View>
                </TouchableNativeFeedback>
            </View>)
            :(<View>
            <TouchableNativeFeedback onPress={()=>{this.setState({touchFlash:'default'});this.setBackData({touchFlash:'default'})}}>
                <View style={styles.itemStyle}>
                    <Text style={{color:'#282828',marginLeft:30*lu,fontSize:28*lu}}>默认(左右平移)</Text>
                    {this.state.touchFlash=="default"?
                    (<Svg icon="readSelected" size={40*lu} style={{marginRight:30*lu}}/>):null}
                </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={()=>{this.setState({touchFlash:'none'});this.setBackData({touchFlash:'none'})}}>
                <View style={styles.itemStyle}>
                    <Text style={{color:'#282828',marginLeft:30*lu,fontSize:28*lu}}>无</Text>
                    {this.state.touchFlash=="none"?
                    (<Svg icon="readSelected" size={40*lu} style={{marginRight:30*lu}}/>):null}
                </View>
            </TouchableNativeFeedback>
            </View>)}
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