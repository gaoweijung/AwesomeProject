import React,{Component} from 'react';
import Svg from './svgs/Svg';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,TouchableNativeFeedback,StatusBar,AsyncStorage} from 'react-native';
import TitleBar from './titleBar'
export default class MoreSetting extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'更多设置',
            lineSpace:1.4,
            touchFlash:'default'
        }
        // this.setFontFamily=this.props.navigation.state.params.setFontFamily;
        this.setMoreSetting=this.props.navigation.state.params.setMoreSetting;
    }
    componentDidMount(){
        let that=this;
        AsyncStorage.getItem('setting',(e,res)=>{
            if(res!=null){
                let result=JSON.parse(res);
                if(result.lineHeight){
                    that.setState({
                        lineSpace:result.lineHeight
                    })
                }
            }
        })
    }
    setUp(type){
        this.props.navigation.navigate('Setting',{getBackData:this.getBackData.bind(this),type:type,lineSpace:this.state.lineSpace,touchFlash:this.state.touchFlash})
    }
    getBackData(e){
        this.setState(e);
        this.setMoreSetting(e);
    }

    render(){
        
        return (<View style={{flex:1,backgroundColor:"#ffffff"}}>
            <TitleBar title={this.state.title}  _onPress={()=>{this.props.navigation.goBack();StatusBar.setHidden(true,'none');}}/>
            <View style={{height:20*lu,backgroundColor:'#f2f2f2'}}></View>
            <TouchableNativeFeedback onPress={()=>{this.setUp('lineSpace')}}>
                <View style={{height:88*lu,flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between'}}>
                    <Text style={{marginLeft:30*lu,lineHeight:88*lu}}>字体间距</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#989898',fontSize:28*lu,textAlignVertical:'center',marginRight:10*lu}}>
                            {this.state.lineSpace}倍
                        </Text>
                        <Svg icon="readRight989898" size={30*lu} style={{marginRight:30*lu}}/>
                    </View>
                </View>
            </TouchableNativeFeedback>
            <View style={{height:20*lu,backgroundColor:'#f2f2f2'}}></View>
            <TouchableNativeFeedback onPress={()=>{this.setUp('touchFlash')}}>
                <View style={{height:88*lu,flexDirection:'row',backgroundColor:'#fff',justifyContent:'space-between'}}>
                    <Text style={{marginLeft:30*lu,lineHeight:88*lu}}>翻页动画</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'#989898',fontSize:28*lu,textAlignVertical:'center',marginRight:10*lu}}>
                            {this.state.touchFlash=='default'?'左右平移':"无"}
                        </Text>
                        <Svg icon="readRight989898" size={30*lu} style={{marginRight:30*lu}}/>
                    </View>
                </View>
            </TouchableNativeFeedback>
            <View style={{height:20*lu,backgroundColor:'#f2f2f2'}}></View>
            <View></View>
            <View></View>
        </View>)
    }
    
}
const {width,height} =  Dimensions.get('window');
const lu=width/750;
var styles=StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    }
})