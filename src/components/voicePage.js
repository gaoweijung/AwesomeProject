import React,{Component} from 'react';
import {Text,View,StyleSheet,Dimensions,Image,DeviceEventEmitter,Animated} from 'react-native';
import Svg from './svgs/Svg';
// import DeviceBattery from 'react-native-device-battery';
import cntts from 'react-native-cn-tts';

class ShowTime extends Component{
    constructor(props){
        super(props);
        let date=new Date();
        this.state={
            hour:date.getHours().toString(),
            minute:date.getMinutes().toString()
        }
    }
    componentDidMount(){
        setInterval(()=>{
            let date=new Date();
            this.setState({
                hour:date.getHours().toString(),
                minute:date.getMinutes().toString()
            })
        },1000)
    }
    render(){
        return(
            <Text style={{includeFontPadding:false,color:"#989898",fontSize:22*lu,marginLeft:20*lu}} includeFontPadding={false}>
                {this.state.hour<10?'0'+this.state.hour:this.state.hour}:{this.state.minute<10?'0'+this.state.minute:this.state.minute}
            </Text>
        )
    }
}

class Battery extends Component{
    constructor(props){
        super(props);
        this.state={
            battery:1,
        }
    }
    componentDidMount(){
        // DeviceBattery.addListener((state)=>{
        //     this.setState({
        //         battery:state.level
        //     })
        // });
    }
    render(){
        return( <View style={{position:'absolute',left:2,width:this.state.battery*29*lu,height:15*lu,backgroundColor:"#989898"}}></View>)
    }
}
//文字视图
class Line extends Component{
    
    render(){
        return(
                <Text ref={(c) => this._line = c} style={{
                    color:this.props.fontBg,
                    height:this.props.height,
                    lineHeight:this.props.height,
                    marginLeft:this.props.isFirst?30*lu+this.props.letterSpacing*1.5+this.props.fontSize*2 :30*lu-this.props.letterSpacing*0.5,
                    fontSize:this.props.fontSize,
                    letterSpacing:this.props.letterSpacing,
                    fontFamily:this.props.fontFamily,
                    textAlignVertical:'center',
                    includeFontPadding:false}} >{this.props.lineContent}</Text>
        )
    }
}
//图片视图
class ContentImage extends Component{
    constructor(props){
        super(props);
        this.state={
            imgWidth:width-60*lu,
            imgHeight:height-60*lu
        }
    }
    componentDidMount(){
        let imgWidth,imgHeight,that=this;
        Image.getSize(this.props.url,(w,h) => {
            if(w*lu>width-60*lu){
                imgWidth=width-60*lu;
                imgHeight=imgWidth/w*h;
            }else{
                imgWidth=w*lu;
                imgHeight=h*lu;
            }
            if(imgHeight>height-180*lu){
                imgHeight=height-180*lu;
                imgWidth=imgHeight/h*w
            }
            
            that.setState({
                imgWidth:imgWidth,
                imgHeight:imgHeight
            })
        })
    }
    render (){
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image source={{uri:this.props.url}} style={{width:this.state.imgWidth,height:this.state.imgHeight}} />
            </View>
        )
    }
}
class Paragraph extends Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        return this.props.fontBg!=nextProps.fontBg||this.props.content!=nextProps.content;
    }
    render(){
        let lines=[];
        if(this.props.content){
            this.props.content.forEach((item,i)=>{
                lines.push(<Line    key={i}
                                    {...this.props.setting} 
                                    letterSpacing={item.letterSpacing} 
                                    isFirst={item.isFirst}
                                    lineContent={item.str}
                                    fontBg={this.props.fontBg}/>)
            })
        }
        return(<View>
            {lines}
        </View>)
    }
}

export default class Page extends Component{
    constructor(props){
        super(props);
        
        this.setting={
            height:props.lineHeight,
            fontSize:props.fontSize,
            fontFamily:props.fontFamily
        }
        this.state={
            pIndex:0
        }
    }
    setParagraphIndex(index){
        this.setState({
            pIndex:index
        })
    }
    getFloorIndex(){
        return this.state.pIndex;
    }
    constParagraph(arr){
        let str='';
        arr.forEach((item)=>{
            str+=item.str;
        })
        return str;
    }
    render(){
        var content=[];
        if(this.props.paragraphList&&this.props.paragraphList.length>0){
            if(!this.props.paragraphList[0].imgUrl){
                this.props.paragraphList.forEach((item,i) => {
                    content.push(<Paragraph content={item.paragraph} fontBg={i==this.state.pIndex?'#ff4776':this.props.fontColor} setting={this.setting} key={i}/>)
                });
            }else{
                content.push(<ContentImage url={this.props.paragraphList[0].imgUrl} key={0}/>)
            }
        }
        return(
            <View style={{width:width,height:height,backgroundColor:this.props.backgroundColor,position:'relative'}}>
                
                <Text style={{fontSize:20*lu,marginLeft:30*lu,lineHeight:60*lu,height:60*lu,color:this.props.fontColor}}>{this.props.contentTitle}</Text>
                <View style={{flex:1}}>
                    {content}
                </View>
                <View style={{height:60*lu,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{flexDirection:'row',alignItems:'center',marginLeft:30*lu,position:'relative'}}>
                        <Svg icon={'readBattery989898'} size={40*lu}/>
                        <Battery />
                        <ShowTime />
                    </View>
                    <Text style={{color:"#989898",marginRight:30*lu,includeFontPadding:false,fontSize:22*lu}} includeFontPadding={false}>
                        {this.props.pageProcess}%
                    </Text>
                </View>
            </View> 
            )
    }
}
const {width,height} =  Dimensions.get('window');
const lu=width/750;