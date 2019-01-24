import React,{Component} from 'react';
import Svg from './svgs/Svg';
import RNFS from 'react-native-fs';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,TouchableNativeFeedback,StatusBar,NativeModules} from 'react-native';

class FontItem extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    setFontFamily(type){
        console.log(type);
    }
    download(type){
        const downloadDest = `${RNFS.ExternalDirectoryPath}/${type}.ttf`;
        const formUrl =`https://www.qcacg.com/update/${type}.ttf`;
        const options = {
            fromUrl: formUrl,
            toFile: downloadDest,
            begin: (res) => {
                console.log('begin', res);
                console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
            },
            progress: (res) => {
                let pro = res.bytesWritten / res.contentLength;
                console.log(pro)
            }
        };
        try {
            const ret = RNFS.downloadFile(options);
            ret.promise.then(res => {
                console.log('success', res);
                console.log('file://' + downloadDest)
            }).catch(err => {
                console.log('err', err);
            });
        }catch (e) {
            console.log(e);
        }
    }
    render(){
        return (<TouchableNativeFeedback onPress={()=>{this.setFontFamily(this.props.type)}}>
        <View style={{height:89*lu,borderBottomColor:'#f2f2f2',borderBottomWidth:0.5,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
            <Text  style={{marginLeft:30*lu,fontSize:28*lu,color:"#282828"}}>{this.props.title}</Text>
            {
                this.props.loadedFlag==false?(<TouchableOpacity style={{height:89*lu,width:100*lu,justifyContent:'center',alignItems:'center'}} onPress={()=>{this.download(this.props.type)}}>
                    <Svg icon="readDownload" size={40*lu}/>
                </TouchableOpacity>):null
            }
            {
                this.props.choicedFlag?(<Svg icon="readSelected" size={40*lu} style={{marginRight:30*lu}}/>):null
            }
        </View>
        </TouchableNativeFeedback>)
    }
}
export default class FontFamilySet extends Component{
    constructor(props){
        super(props);
        this.state={
            fontSet:[
                {type:'normal',title:'默认字体',choicedFlag:true,loadedFlag:true},
                {type:'heiti',title:'黑体',choicedFlag:false,loadedFlag:false,size:9038704},
                {type:'kaiti',title:'楷体',choicedFlag:false,loadedFlag:false,size:22334808},
                {type:'songti',title:'宋体',choicedFlag:false,loadedFlag:false,size:14215408}
            ]
        }
    }
    componentDidMount(){
        
        let that=this;
        let fontSet=this.state.fontSet;
        let path1=RNFS.ExternalDirectoryPath+'/heiti.ttf';
        let path2=RNFS.ExternalDirectoryPath+'/kaiti.ttf';
        let path3=RNFS.ExternalDirectoryPath+'/songti.ttf';
        NativeModules.GetMedia.getFontFile(path1,path2,path3,(size1,size2,size3)=>{
            if(size1==fontSet[1].size){
                fontSet[1].loadedFlag=true;
            }
            if(size2==fontSet[2].size){
                fontSet[2].loadedFlag=true;
            }
            if(size3==fontSet[3].size){
                fontSet[3].loadedFlag=true;
            }
            that.setState({
                fontSet:fontSet
            })
            
        })
    }
    
    render(){
        let setList=[];
        this.state.fontSet.forEach((item,i)=>{
            setList.push(<FontItem {...item} key={i}/>)
        })
        return (<View style={{flex:1,backgroundColor:"#ffffff"}}>
            <View style={{height:40*lu}}></View>
            <View style={{position:'relative',height:89*lu,borderBottomColor:'#f2f2f2',borderBottomWidth:0.5,flexDirection:'row',alignItems:'center'}}>
                
                <TouchableOpacity onPress={()=>{this.props.navigation.goBack();StatusBar.setHidden(true,'none');}}>
                    <View style={[styles.center,{width:80*lu,height:88*lu}]}>
                        <Svg icon="readBack282828" size={34*lu}/>
                    </View>
                </TouchableOpacity>
               
                <Text style={{color:'#282828',fontSize:28*lu,flex:1,textAlign:'center'}}>字体设置</Text>
                <View style={{width:80*lu,height:88*lu}}></View>
            </View>
            <View>
                {setList}
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
    }
})