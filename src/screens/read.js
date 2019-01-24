import React,{Component} from 'react';
import Svg from '../components/svgs/Svg';
import appPathList from '../components/conf-app';
import rnTextSize, { TSFontSpecs } from 'react-native-text-size';
import ReadPages from '../components/readPages';
import demo from '../components/test';

import PicturePreview from '../components/picturePreview';
import VoiceView from '../components/voiceView'
import {
    View,
    Text,
    Animated,
    Slider,
    StatusBar,
    AsyncStorage,
    Dimensions,
    StyleSheet,
    Modal,
    ActivityIndicator,
    ToastAndroid,
    Image,
    DeviceEventEmitter ,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback
   } from 'react-native';
//头部菜单栏
class ReadTitleMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            borderColor:'#f2f2f2',
            backgroundColor:'#fff'
        }
    }
    changeBordercolor(backgroundColor,borderColor){
        this.setState({
            borderColor:borderColor,
            backgroundColor:backgroundColor
        })
    }
    render(){
        return (
            <Modal transparent={true} visible={this.props.titleMenuFlag} onRequestClose={() => {}}>
                <TouchableWithoutFeedback onPress={this.props.onPress}>
                    <View style={{position:'absolute',height:height,width:width,left:0,top:0}}>
                        <View style={{backgroundColor:this.state.backgroundColor,position:'absolute',right:10*lu,top:88*lu,borderRadius:12*lu,elevation:10}} >
                            <View style={[styles.titleMenu,{borderBottomColor:this.state.borderColor}]} >
                                <Svg icon="readCollection" size={32*lu} style={{marginRight:18*lu}}/>
                                <Text style={{color:'#ff9c49',fontSize:28*lu}}>收藏</Text>
                            </View>
                            <View style={[styles.titleMenu,{borderBottomColor:this.state.borderColor}]}>
                                <Svg icon="readComment" size={32*lu} style={{marginRight:18*lu}}/>
                                <Text style={{color:'#ff9c49',fontSize:28*lu}}>评论</Text>
                            </View>
                            <View style={[styles.titleMenu,{borderBottomColor:this.state.borderColor}]}>
                                <Svg icon="readDetails" size={32*lu} style={{marginRight:18*lu}}/>
                                <Text style={{color:'#ff9c49',fontSize:28*lu}}>详情</Text>
                            </View>
                            <View style={[styles.titleMenu,{borderBottomWidth:0}]}>
                                <Svg icon="readBookmark" size={32*lu} style={{marginRight:18*lu}}/>
                                <Text style={{color:'#ff9c49',fontSize:28*lu}}>书签</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback >
            </Modal>
        )
    }
}
//头部组件
class TitleView extends Component{
    constructor(props){
        super(props);
        this.state={
            titleMenuFlag:false
        }
    }
    componentDidMount(){
        let that=this;
        this.listener = DeviceEventEmitter.addListener('changeTitleBackground', (e) => {
            that.changeColors(e.backgroundColor,e.borderColor);
        })
    }
    componentWillUnmount() {
        if (this.listener) {
          this.listener.remove();
        }
    }
    changeColors(backgroundColor,borderColor){
        this.background.setNativeProps({
            style:{
                backgroundColor:backgroundColor
            }
        })
        this.title.setNativeProps({
            style:{
                borderBottomColor:borderColor
            }
        })
        this.titleMenu.changeBordercolor(backgroundColor,borderColor)
    }
    render(){
        return (
            <View style={{backgroundColor:'#fff'}} ref={refs=>this.background=refs}>
                <View style={{height:40*lu,position:'relative'}}></View>
                <View style={{height:89*lu,borderBottomWidth:0.5,borderBottomColor:'#f2f2f2',flexDirection:'row'}} ref={refs=>this.title=refs}>
                    <TouchableOpacity style={[styles.center,{width:80*lu,height:88*lu}]} onPress={()=>{this.props.navigation.goBack()}}>
                        <Svg icon="readBack" size={34*lu}/>
                    </TouchableOpacity>
                    <View style={{flex:1}}>
                        <Text style={{textAlign:'center',lineHeight:88*lu,color:'#ff9c49',fontSize:28*lu}}>{this.props.bookName}</Text>
                    </View>
                    <TouchableOpacity style={[styles.center,{width:96*lu,height:88*lu}]} onPress={()=>{this.setState({titleMenuFlag:true})}}>
                        <View style={{transform: [{rotate:'90deg'}]}}>
                            <Svg icon="readTitleMenu" size={38*lu}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <ReadTitleMenu ref={refs=>this.titleMenu=refs}
                    titleMenuFlag={this.state.titleMenuFlag}
                    onPress={()=>{this.setState({titleMenuFlag:false})}}
                    />
            </View>
        )
    }
}
//当前章进度
class ContnentProcess extends Component{
    constructor(props){
        super(props);
        this.state={
            process:0,
            showProcess:false,
            left:new Animated.Value(0)
        }
    }
    componentDidMount(){
        var that=this;
        this.listener=DeviceEventEmitter.addListener('changeProcess',function(e){
            that.changeProcessCallBack(e)
        })
    }
    changeProcessCallBack(e){
        this.state.left.setValue(e*(width-200*lu));
        this.setState({
            process:(e*100).toFixed(2)
        })
        if( this.pageProcess){
            this.pageProcess.setNativeProps({
                value:e
            })
        }
        
    }
    render(){
        return (<View style={{flex:1,justifyContent:'center',position:'relative'}}>
           { this.state.showProcess?
            (<Animated.View style={{position:'absolute',height:66*lu,width:128*lu,backgroundColor:'rgba(255,255,255,0.9)',top:-60*lu,left:-30*lu,transform:[{translateX:this.state.left}],justifyContent:'center',alignItems:'center',borderColor:'#c3c3c3',borderWidth:1,borderRadius:10*lu}}>
                <Text style={{color:'#282828'}}>{this.state.process}</Text>
            </Animated.View>):null}
            <Slider minimumTrackTintColor="#ff4975" thumbTintColor="#ff4975" value={0} ref={refs=>this.pageProcess=refs}
                    onValueChange={(e)=>{
                        if(!this.state.showProcess){
                            this.setState({
                                showProcess:true
                            })
                        }
                        this.state.left.setValue(e*(width-200*lu));
                        this.setState({
                            process:(e*100).toFixed(2)
                        })
                    }}
                    onSlidingComplete={(e)=>{
                        setTimeout(() => {
                            this.setState({
                                showProcess:false
                            })
                        }, 1000);
                        DeviceEventEmitter.emit('changePageIndex',{process:e,callback:this.changeProcessCallBack.bind(this)});
                    }}/>
        </View>)
    }
}
//底部菜单栏
class BottomMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            backgroundColor:'#fff',
            borderColor:'#f2f2f2',
            fontColor:'#282828'
        }
    }
    componentDidMount(){
        let that=this;
        AsyncStorage.getItem('setting',(e,res)=>{
            if(res!=null){
                let result=JSON.parse(res);
                if(result.dayAndNight){
                    if(result.dayAndNight=='day'){
                        that.changeColors({backgroundColor:'#fff',fontColor:'#282828',borderColor:'#f2f2f2'});
                    }else{
                        that.changeColors({backgroundColor:'#000',fontColor:'#fff',borderColor:'#282828'});
                    }
                }
            }
        })
    }
    changeColors(e){
        if(e.backgroundColor=='#fff'){
            AsyncStorage.mergeItem('setting',JSON.stringify({'dayAndNight':'day'}),(e)=>{})
        }else{
            AsyncStorage.mergeItem('setting',JSON.stringify({'dayAndNight':'night'}),(e)=>{})
        }
        this.setState({
            backgroundColor:e.backgroundColor,
            borderColor:e.borderColor,
            fontColor:e.fontColor
        })
        DeviceEventEmitter.emit('changeTitleBackground',e);
    }
    setBookId(bookId,contentId){
        this.bookId=bookId;
        this.contentId=contentId;
        if(typeof bookId==='number'){
            this.bookType='online'
        }else{
            this.bookType='local'
        }
    }
    setBookName(bookName){
        this.bookName=bookName;
    }
    goToBookMenu(){
        this.props.navigation.navigate('BookMenu',{
            bookId:this.bookId,
            bookName:this.bookName,
            contentId:this.contentId,
            from:'read',
            bookType:this.bookType
        });
    }
    render (){
        return (
        
        <View>
            <View style={{borderTopColor:this.state.borderColor,backgroundColor:this.state.backgroundColor,height:89*lu,borderTopWidth:0.5,flexDirection:'row'}}>
                <View style={[styles.center,{width:70*lu}]}>
                    <Svg icon="readLeft" size={30*lu}/>
                </View>
                <ContnentProcess />
                <View  style={[styles.center,{width:70*lu}]}>
                    <Svg icon="readRight" size={30*lu}/>
                </View>
            </View>
            <View style={{height:99*lu,flexDirection:'row',borderTopWidth:0.5,borderTopColor:this.state.borderColor,backgroundColor:this.state.backgroundColor}}>
                <TouchableOpacity onPress={()=>{this.goToBookMenu()}} style={{flex:1}}>
                    <View style={{marginTop:3*lu}}>
                        <View style={[styles.center,{height:58*lu}]}>
                            <Svg icon={this.state.backgroundColor=="#fff"?"readMenuDay":"readMenuNight"} size={38*lu}/>
                        </View>
                        <Text style={{color:this.state.fontColor,fontSize:20*lu,lineHeight:20*lu,textAlign:'center'}}>目录</Text>
                    </View>
                </TouchableOpacity>
               <TouchableOpacity onPress={()=>{this.props.openSetting()}} style={{flex:1}}>
                    <View style={{marginTop:3*lu}}>
                        <View style={[styles.center,{height:58*lu}]}>
                            <Svg icon={this.state.backgroundColor=="#fff"?"readSettingDay":"readSettingNight"} size={38*lu}/>
                        </View>
                        <Text style={{color:this.state.fontColor,fontSize:20*lu,lineHeight:20*lu,textAlign:'center'}}>设置</Text>
                    </View>
                </TouchableOpacity>
                {this.state.backgroundColor=="#fff"?
                    (<TouchableOpacity onPress={()=>{
                            this.changeColors({backgroundColor:'#000',fontColor:'#fff',borderColor:'#282828'});
                            DeviceEventEmitter.emit('changeBackground',{flag:'dn',backgroundColor:'#282828',fontColor:'#fff'});
                        }} style={{flex:1}}>
                        <View style={{marginTop:3*lu}}>
                            <View style={[styles.center,{height:58*lu}]}>
                                <Svg icon="readNight" size={38*lu}/>
                            </View>
                            <Text style={{color:'#282828',fontSize:20*lu,lineHeight:20*lu,textAlign:'center'}}>夜间</Text>
                        </View>
                    </TouchableOpacity>):
                    (<TouchableOpacity onPress={()=>{
                            this.changeColors({backgroundColor:'#fff',fontColor:'#282828',borderColor:'#f2f2f2'});
                            DeviceEventEmitter.emit('changeBackground',{flag:'dn',backgroundColor:'#fff',fontColor:'#282828'});
                        }} style={{flex:1}}>
                        <View style={{marginTop:3*lu}}>
                            <View style={[styles.center,{height:58*lu}]}>
                                <Svg icon="readDay" size={38*lu}/>
                            </View>
                            <Text style={{color:'#fff',fontSize:20*lu,lineHeight:20*lu,textAlign:'center'}}>日间</Text>
                        </View>
                    </TouchableOpacity>)}
                <View style={{flex:1,marginTop:3*lu}}>
                    <View style={[styles.center,{height:58*lu}]}>
                        <Svg icon={this.state.backgroundColor=="#fff"?"readCommentDay":"readCommentNight"} size={38*lu}/>
                    </View>
                    <Text style={{color:this.state.fontColor,fontSize:20*lu,lineHeight:20*lu,textAlign:'center'}}>评论</Text>
                </View>
            </View>
        </View>)
    }
    
}
//背景颜色
class BGColor extends Component{
    constructor(props){
        super(props);
        this.state={
            bgSetting:[
                {bgColor:'#d5bc83',fontColor:'rgba(0,0,0,0.85)',selectFlag:true},
                {bgColor:'#9acfa1',fontColor:'rgba(0,0,0,0.85)',selectFlag:false},
                {bgColor:'#e1d6c4',fontColor:'rgba(0,0,0,0.65)',selectFlag:false},
                {bgColor:'#e8e8e8',fontColor:'rgba(0,0,0,0.65)',selectFlag:false},
                {bgColor:'#c7edcc',fontColor:'rgba(0,0,0,0.65)',selectFlag:false},
                {bgColor:'#e0c1c1',fontColor:'rgba(0,0,0,0.65)',selectFlag:false},
                {bgColor:'#644f47',fontColor:'rgba(255,255,255,0.5)',selectFlag:false}
            ]
        }
    }
    componentDidMount(){
        let that=this;
        AsyncStorage.getItem('setting',(e,res)=>{
            if(res!=null){
                let result=JSON.parse(res);
                if(result.background){
                    var bgSetting=that.state.bgSetting;
                    bgSetting=bgSetting.map((subItem)=>{
                        if(subItem.bgColor==result.background.backgroundColor){
                            subItem.selectFlag=true;
                        }else{
                            subItem.selectFlag=false
                        }
                        return subItem
                    });
                    that.setState({
                        bgSetting:bgSetting
                    })
                }else{
                    AsyncStorage.mergeItem('setting',JSON.stringify({'background':{backgroundColor:'#d5bc83',fontColor:'rgba(0,0,0,0.85)'}}));
                }
            }
        })
        this.listener = DeviceEventEmitter.addListener('changeTitleBackground', (e) => {
            that.backgroundColor=e.backgroundColor;
        });
        
    }
    componentWillUnmount() {
        if (this.listener) {
          this.listener.remove();
        }
    }
    render(){
        let bgView=[];
        this.state.bgSetting.forEach((item,i)=>{
            bgView.push(<TouchableWithoutFeedback  key={i}  onPress={()=>{
                    DeviceEventEmitter.emit('changeBackground',{flag:'bg',backgroundColor:item.bgColor,fontColor:item.fontColor});
                    AsyncStorage.mergeItem('setting',JSON.stringify({'background':{backgroundColor:item.bgColor,fontColor:item.fontColor}}));
                    if(this.backgroundColor=='#000'){
                        this.props.changeColors({backgroundColor:'#fff',borderColor:'#f2f2f2',fontColor:'#282828'})
                    }
                    var bgSetting=this.state.bgSetting;
                    bgSetting.forEach((subItem,subI)=>{
                        if(subI==i){
                            subItem.selectFlag=true;
                        }else{
                            subItem.selectFlag=false
                        }
                    });
                    this.setState({
                        bgSetting:bgSetting
                    })
                }}>
                <View style={[styles.bgColor,{backgroundColor:item.bgColor,borderColor:item.selectFlag?'#ff4975':'#fff'}]}></View>
            </TouchableWithoutFeedback>)
        })
        return(
            <View style={{width:600*lu,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                {bgView}
            </View>
        )
    }
}
//字体大小
class FontSizeSetting extends Component{
    constructor(props){
        super(props);
        this.state={
            fontSize:16
        }
    }
    componentDidMount(){
        let that=this;
        this.listener=DeviceEventEmitter.addListener('changeFontSize',(size)=>{
            that.setState({
                fontSize:size
            })
        })
    }
    componentWillUnmount(){
        if(this.listener){
            this.listener.remove();
        }
    }
    fontReduce(){
        let size=this.state.fontSize;
        size-=2;
        if(size>=16){
            AsyncStorage.mergeItem('setting',JSON.stringify({'fontSize':size}),(e)=>{})
            this.setState({
                fontSize:size
            })
            this.props.getLineList(size);
        }
    }
    fontAdd(){
        let size=this.state.fontSize;
        size+=2;
        if(size<=30){
            AsyncStorage.mergeItem('setting',JSON.stringify({'fontSize':size}),(e)=>{})
            this.setState({
                fontSize:size
            })
            this.props.getLineList(size);
        }
    }
    render (){
        return(
            <View style={{flexDirection:'row',width:205*lu}}>
                <TouchableOpacity onPress={()=>{this.fontReduce()}}>
                    <View style={{width:88*lu,height:88*lu,marginLeft:66*lu,justifyContent:'center'}}>
                        <Svg icon="readReduce" size={40*lu} />
                    </View>
                </TouchableOpacity>
                <Text style={{color:'#ff4975',fontSize:28*lu,textAlignVertical:'center'}} includeFontPadding={false}>{this.state.fontSize}</Text>
                <TouchableOpacity onPress={()=>{this.fontAdd()}}>
                    <View style={{width:88*lu,height:88*lu,justifyContent:'center',alignItems:'flex-end'}}>
                        <Svg icon="readAdd" size={40*lu} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
//设置
class Setting extends Component{
    constructor(props){
        super(props);
        this.state={
            readModel:props.touchType,
            isBySystem:false,
        }
        this.light=0
    }
    lightInit(e){
        this.light=e.light;
        this.lightSlider.setNativeProps({
            value:1-e.light/0.7
        })
        console.log(e)
        this.setState({
            isBySystem:e.isBySystem
        })
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            readModel:nextProps.touchType
        })
    }
    componentDidMount(){
        let that=this;
        this.listener = DeviceEventEmitter.addListener('changeTitleBackground', (e) => {
            that.changeColors(e.backgroundColor,e.borderColor);
        })
    }
    changeColors(backgroundColor,borderColor){
        this.background.setNativeProps({
            style:{
                backgroundColor:backgroundColor,
                borderTopColor:borderColor
            }
        });
        this.lightView.setNativeProps({
            style:{
                borderBottomColor:borderColor
            }
        });
        this.bgView.setNativeProps({
            style:{
                borderBottomColor:borderColor
            }
        });
        this.readType.setNativeProps({
            style:{
                borderBottomColor:borderColor
            }
        });
    }
    componentWillUnmount() {
        if (this.listener) {
          this.listener.remove();
        }
    }
    render(){
        return(
                <View style={{borderTopColor:'#f2f2f2',backgroundColor:'#fff',borderTopWidth:0.5}} ref={refs=>this.background=refs}>
                    {/* 亮度 */}
                    <View style={[styles.settingItem,{borderBottomColor:'#f2f2f2'}]} ref={refs=>this.lightView=refs}>
                        <View style={{justifyContent:'center',marginLeft:30*lu}}>
                            <Svg icon="readLight" size={28*lu}/>
                        </View>
                        <View style={{width:440*lu,justifyContent:'center'}}>
                            <Slider minimumTrackTintColor="#ff4975" thumbTintColor="#ff4975" value={1} ref={refs=>this.lightSlider=refs} onValueChange={(e)=>{
                                this.light=(1-e)*0.7;
                                
                                if(this.state.isBySystem){
                                    this.props.changeLight(this.light,true,false);
                                    this.setState({
                                        isBySystem:false
                                    })
                                }else{
                                    this.props.changeLight(this.light,false,false);
                                }
                            }}/>
                        </View>
                        <View style={{justifyContent:'center'}}>
                            <Svg icon="readLight" size={38*lu}/>
                        </View>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>{
                            if(!this.state.isBySystem){
                                this.props.changeLight(this.light,true,true);
                                this.setState({
                                    isBySystem:true
                                })
                            }else{
                                this.props.changeLight(this.light,true,false);
                                this.setState({
                                    isBySystem:false
                                })
                            }
                            
                        }}>
                            <Text style={{textAlignVertical:'center',width:100*lu,fontSize:20*lu,color:'#ff9d49',textAlign:'center',marginLeft:20*lu}}>系统</Text>
                            {!this.state.isBySystem?(<Svg icon="readBySystem1" size={38*lu} />):(<Svg icon="readBySystem2" size={38*lu}/>)}
                            
                        </TouchableOpacity>
                    </View>
                    {/* 背景 */}
                    <View style={[styles.settingItem,{borderBottomColor:'#f2f2f2'}]} ref={refs=>this.bgView=refs}>
                        <Text style={{color:'#ff9d49',fontSize:20*lu,width:70*lu,textAlignVertical:'center',marginLeft:30*lu}}>
                            背景
                        </Text>
                       
                        <BGColor changeColors={this.props.changeColors}/>
                        
                    </View>
                    {/* 阅读模式和字体大小 */}
                    <View style={[styles.settingItem,{borderBottomColor:'#f2f2f2'}]} ref={refs=>this.readType=refs} >
                        <Text style={{color:'#ff9d49',fontSize:20*lu,width:94*lu,textAlignVertical:'center',marginLeft:30*lu}}>阅读模式</Text>
                        <TouchableWithoutFeedback onPress={()=>{this.props.changeReadModal('zuoyou')}}>
                            <Text style={[styles.readModel,{color:this.state.readModel=='zuoyou'?'#ff4975':'#ffc2d1',borderColor:this.state.readModel=='zuoyou'?'#ff4975':'#ffc2d1'}]}>
                                左右翻页
                            </Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{this.props.changeReadModal('shangxia')}}>
                            <Text style={[styles.readModel,{color:this.state.readModel=='shangxia'?'#ff4975':'#ffc2d1',borderColor:this.state.readModel=='shangxia'?'#ff4975':'#ffc2d1',marginLeft:38*lu}]}>
                                上下翻页
                            </Text>
                        </TouchableWithoutFeedback>
                        <FontSizeSetting getLineList={this.props.getLineList}/>
                    </View>
                    {/* 其他设置 */}
                    <View style={{height:98*lu,flexDirection:'row'}}>
                        <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>{this.props.showFontSetting()}}>
                            <Svg icon="readFontFamily" size={36*lu} style={{marginTop:19*lu}}/>
                            <Text style={styles.anotherSettingFont}>字体</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>{this.props.showVoice()}}>
                            <Svg icon="readVoice" size={36*lu} style={{marginTop:19*lu}}/>
                            <Text style={styles.anotherSettingFont}>语音</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex:1,alignItems:'center'}} onPress={()=>{this.props.showMoreSetting()}}>
                            <Svg icon="readMore" size={36*lu} style={{marginTop:19*lu}}/>
                            <Text style={styles.anotherSettingFont}>更多</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}


//加载窗口
class LoadingView extends Component{
    constructor(props){
        super(props);
        this.state={
            showFlag:true
        }
    }
    closeShadow(){
        this.setState({
            showFlag:false
        })
    }
    componentDidMount(){
        let that=this;
        AsyncStorage.getItem('setting',(e,res)=>{
            if(res!=null){
                let result=JSON.parse(res);
                if(result.background){
                    if(result.dayAndNight=='night'){
                        if(that.loading){
                            that.loading.setNativeProps({
                                style:{
                                    backgroundColor:'#000'
                                }
                            })
                        }
                    }else{
                        if(that.loading){
                            that.loading.setNativeProps({
                                style:{
                                    backgroundColor:result.background.backgroundColor
                                }
                            })
                        }
                    }
                }
            }
        })
    }
    render(){
        // return(<WebView  source={require('../html/shadow.html')} style={{position:'absolute',height:height,width:width,zIndex:999}}/ > )
        return this.state.showFlag?(<View style={{position:'absolute',left:0,bottom:0,top:0,right:0,justifyContent:'center',alignItems:'center',backgroundColor:'#d5bc83',zIndex:999,elevation:2}} ref={refs=>this.loading=refs}><ActivityIndicator  size="large" color="#ff9b49" /></View>):null
    }
}

//主视图
export default class ReadView extends Component{
    constructor(props){
        super(props);
        // let bookTitleArr=props.navigation.state.params.bookTitle.split('.');
        // bookTitleArr.splice(bookTitleArr.length-1);
        this.state={
            // bookName:bookTitleArr.join('.'),
            // filePath:props.navigation.state.params.filePath,
            borderColor:'#f2f2f2',
            backgroundColor:'#fff',
            fontColor:'#282828',
            fontSize:16,
            lineNum:0,
            touchType:'zuoyou',
            fontFamily:'monospace',
            titleTop:new Animated.Value(-130*lu),
            menuBottom:new Animated.Value(188*lu),
            settingBottom:new Animated.Value(364*lu),
            light:new Animated.Value(0),
            contentTitle:'第一章',
        }
        this.settingBtn=false;  
        this.isMenuOpen=false;
        this.showFlag=false;
        this.dataList=[];
        this.contentTitle='';
        this.fontSize=16;
        this.lineHeightLu=1.4
    }
    
    componentDidMount(){
        var that=this;
        StatusBar.setHidden(true,'none');
        setTimeout(() => {
            AsyncStorage.getItem('setting',(e,res)=>{
                if(res!==null){
                    var result=JSON.parse(res),isBySystem;
                    console.log(result)
                    if(result.light){
                        if(result.isLightBySystem){
                            isBySystem=true
                        }else{
                            that.changeLight(result.light,true,false)
                            isBySystem=false;
                        }
                        that.settingView.lightInit({light:result.light,isBySystem:isBySystem})
                    }
                    if(result.fontSize){
                        that.fontSize=result.fontSize;
                        DeviceEventEmitter.emit('changeFontSize',result.fontSize);
                    }
                    if(result.lineHeight){
                        that.lineHeightLu=result.lineHeight;
                    }
                }
                that.getContent(2377,227)
            })
            
        }, 1000);
        
    }
    componentWillUnmount(){
        StatusBar.setHidden(false,'none');
    }

    //下一页
    nextPage(){
        if(this.state.touchType=="shangxia"){

        }else{
            this.contentView.nextPage();
        }
    }
    //上一页
    prePage(){
        if(this.state.touchType=="shangxia"){

        }else{
            this.contentView.prePage();
        }
    }
    //改变阅读模式
    changeReadModal(type){
        this.setState({
            touchType:type
        })
    }
    //获取线上小说数据
    getContent(contentId,bookId){
        let url=appPathList.findContent+'?contentId='+contentId+'&bookId='+bookId;
        var that=this;
        this.BottomMenu.setBookId(bookId,contentId);
        this.voiceView.setBookId(bookId,contentId);
        fetch(url)
        .then((response) => response.json())
        .then((responseData) => {       // 处理获取到的数据
            that.BottomMenu.setBookName(responseData.content.bookName);
            that.voiceView.setBookName(responseData.content.bookName);
            that.getData(responseData)
         })
        .catch((error) => { // 错误处理
            console.log(error)
            ToastAndroid.show('获取章节失败', ToastAndroid.SHORT);
        })
    }
    //原始数据处理
    getData(responseData){
        // let data=responseData.content.content,imgUrl='',i=0;
        let data=demo,imgUrl='',i=0;
        // console.log(demo)
        let result,regex=/<p\ *(.*?)>(.*?)<\/p>/ig,c;
        this.dataList=[];
        this.contentTitle=responseData.content.contentTitle;
        while((result=regex.exec(data))!=null){
            i++;
            c=result[2].replace(/\&emsp\;/g,'').replace(/\&ensp\;/g,'').replace(/\&nbsp\;/g,'').replace(/<br>/g,'');
            this.dataList.push(c);
        }
        this.getLineList();
    }
    //分行
    getLineList(fontSize,lineHeightLs){
        let size,lineHeightLu,srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        if(fontSize){
            size=fontSize;
            this.fontSize=fontSize;
        }else{
            size=this.fontSize
        }
        if(lineHeightLs){
            lineHeightLu=lineHeightLs;
            this.lineHeightLu=lineHeightLs;
        }else{
            lineHeightLu= this.lineHeightLu
        }
        
        var lineNum=parseInt((width-60*lu)/size);
        var newContentList=[],that=this,pagesList=[],subpageList=[],benHeight=height-150*lu,currentHeight=0,lineHeight=size*lineHeightLu;;
        this.dataList.forEach(item=>{
            if(/<img[^>]*>/.test(item)||/<image[^>]*>/.test(item)) {
                // imgUrl=appPathList.imagePath+item.match(srcReg)[1];  
                imgUrl=item.match(srcReg)[1];  
                newContentList.push({imgUrl:imgUrl})
            }else{
                var linelist=that.preParagraph(item,lineNum);
                newContentList=newContentList.concat(linelist);
            }
        })
        this.shadow.closeShadow();
        newContentList.forEach((item,i)=>{
            if(!item.imgUrl){
                if(currentHeight<benHeight){
                    currentHeight+=lineHeight;
                    subpageList.push(item);
                }else{
                    pagesList.push(subpageList);
                    subpageList=[];
                    subpageList.push(item);
                    currentHeight=lineHeight
                }
            }else{
                pagesList.push(subpageList);
                subpageList=[];
                subpageList.push(item);
                currentHeight=benHeight
            }
            
        })
        
        pagesList.push(subpageList);
        this.contentView.changeFontSize({pagesList:pagesList,fontSize:size,lineHeight:lineHeight,contentTitle:this.contentTitle});
    }
    
    //段落分行预处理
    preParagraph(str,lineNum){
        var lineList=[],strLen=str.length;
        var lineObj=this.getLine(0,lineNum-2,str);
        lineList.push({str:'田田'+lineObj.LineStr,isFirst:true,isLast:lineObj.lineLen>=strLen?true:false})
        for(var i=lineObj.lineLen;i<strLen;){
            lineObj=this.getLine(i,lineNum,str);
            i+=lineObj.lineLen;
            lineList.push({str:lineObj.LineStr,isFirst:false,isLast:i>=strLen?true:false})
        }
        return lineList;
    };
    //获取一行文字的宽度
    async getLineWidth(text,size) {
        var that=this;
        return await rnTextSize.measure({
            text,             // text to measure, can include symbols
            width,            // max-width of the "virtual" container
            fontSize:size,
            fontFamily:that.state.fontFamily
        })
      }
    getZiJie(str){
        return str.replace(/[^\u0000-\u00ff]/g,"xx").length
    };
    getLine(stratIndex,preLineLen,str){    //获取每一行，参数（起始位置，未计算之前的最佳字符长度，段落字符串）
        var Line=str.substr(stratIndex,preLineLen),needNum,needZifu=0;
        var LineZijie=this.getZiJie(Line);
        var bestZijie=preLineLen*2;
        if(LineZijie<bestZijie){
          needNum=Math.floor(bestZijie-LineZijie)/2;
          needZifu=preLineLen+needNum;
          Line=str.substr(stratIndex,needZifu);
        }else{
          needZifu=preLineLen;
        }
        var firstString=str.substr(stratIndex+needZifu,1);			//判断下一行首字符是否是标点
        var secondString=str.substr(stratIndex+needZifu+1,1);
        
        if(regBiaodian.test(firstString)) {
          regBiaodian.lastIndex=0;
          if(regBiaodian.test(secondString)) {
            needZifu+=2;
          } else {
            needZifu++;
          }
          Line=str.substr(stratIndex,needZifu);
          Line = this.toSBC(Line);
        }
        return {
          lineLen:needZifu,
          LineStr:Line
        }
    }
    toSBC(str) { //全角转半角
        var result = "";
        var len = str.length;
        result += str.substring(0, len - 2);
        for(var i = len - 2; i < len; i++) {
            var cCode = str.charCodeAt(i);
            //全角与半角相差（除空格外）：65248（十进制）
            cCode = (cCode >= 0xFF01 && cCode <= 0xFF5E) ? (cCode - 65248) : cCode;
            //处理空格
            cCode = (cCode == 0x03000) ? 0x0020 : cCode;
            result += String.fromCharCode(cCode);
        }
        return result;
    }
    //点击设置字体
    showFontSetting(){
        StatusBar.setHidden(false,'none');
        this.props.navigation.navigate('FontFamilySet')
    }
    
    //点击查看更多设置
    showMoreSetting(){
        StatusBar.setHidden(false,'none');
        this.props.navigation.navigate('MoreSetting',{setMoreSetting:this.setMoreSetting.bind(this)})
    }
    setMoreSetting(e){
       if(e.lineSpace){
            this.getLineList(null,e.lineSpace);
            AsyncStorage.mergeItem('setting',JSON.stringify({'lineHeight':e.lineSpace}),(e)=>{})
       }
       if(e.touchFlash){

       }
    }
    //打开语音朗读
    showVoice(){
        this.voiceView.openVoice();
        this.contentView.changeState();
        this.contentView.startVoice();
        this.state.settingBottom.setValue(364*lu);
        this.isMenuOpen=false;
        this.settingBtn=false;
    }
    //调节亮度
    changeLight(opacity,isAnimated,isLightBySystem){
        let light;
        light=isLightBySystem?0:opacity;
        if(isAnimated){
            Animated.timing(
                this.state.light,
                {
                    toValue:light,
                    duration:1000,
                    useNativeDriver: true
                }
            ).start();
        }else{
            this.state.light.setValue(light)
        }
        AsyncStorage.mergeItem('setting',JSON.stringify({'light':opacity,'isLightBySystem':isLightBySystem}),(e)=>{})
    }
    //改变颜色
    changeColors(e){
        this.BottomMenu.changeColors(e)
    }
    //打开设置
    openSetting(){
        Animated.parallel([
            Animated.timing(                       
                this.state.titleTop,            
                {
                    toValue: -130*lu,                        
                    duration: 400,  
                    useNativeDriver: true                 
                }
            ),
            Animated.timing(                       
                this.state.menuBottom,            
                {
                    toValue:188*lu,                        
                    duration: 400,   
                    useNativeDriver: true                
                }
            ),
            Animated.timing(                       
                this.state.settingBottom,            
                {
                    toValue: 0,                        
                    duration: 400,       
                    useNativeDriver: true            
                }
            )
        ]).start(()=>{
            StatusBar.setHidden(true,'none');
            this.isMenuOpen=false;
            this.settingBtn=true;
        })
    }
    //打开底部菜单
    showBottomBar(){
        if(this.isMenuOpen){
            Animated.parallel([
                Animated.timing(                       
                    this.state.titleTop,            
                    {
                        toValue: -130*lu,                        
                        duration: 400,   
                        useNativeDriver: true               
                    }
                ),
                Animated.timing(                       
                    this.state.menuBottom,            
                    {
                        toValue: 188*lu,                        
                        duration: 400,   
                        useNativeDriver: true            
                    }
                )
            ]).start(()=>{
                StatusBar.setHidden(true,'none');
                this.isMenuOpen=false;
            })
        }else if(!this.isMenuOpen&&!this.settingBtn&&this.showFlag){
             Animated.parallel([
                Animated.timing(                       
                    this.state.titleTop,            
                    {
                        toValue: 0,                        
                        duration: 400, 
                        useNativeDriver: true              
                    }
                ),
                Animated.timing(                       
                    this.state.menuBottom,            
                    {
                        toValue: 0,                        
                        duration: 400,   
                        useNativeDriver: true              
                    }
                )
            ]).start(()=>{
                StatusBar.setHidden(false,'none')
                this.isMenuOpen=true;
            })
        }else if(!this.isMenuOpen&&this.settingBtn){
            Animated.timing(                       
                this.state.settingBottom,            
                {
                    toValue: 364*lu,                        
                    duration: 400,   
                    useNativeDriver: true                
                }
            ).start(()=>{
                this.isMenuOpen=false;
                this.settingBtn=false;
            })
        }
    }
    render(){

        let setting={
            borderColor:this.state.borderColor,
            backgroundColor:this.state.backgroundColor,
            fontColor:this.state.fontColor
        }
        this.pointerEvents="auto";
        return (<View style={{height:height,backgroundColor:this.state.backgroundColor}} >
                    <StatusBar barStyle={this.state.backgroundColor=='#fff'?'dark-content':'light-content'} />
                    <Animated.View style={{position:'absolute',left:0,right:0,top:0,bottom:0,backgroundColor:'rgb(0,0,0)',opacity:this.state.light,zIndex:999,elevation:2}} pointerEvents={'none'} ref={(refs)=>this.light=refs}></Animated.View>
                    <LoadingView backgroundColor={this.state.backgroundColor} ref={(refs)=>this.shadow=refs}/>
                    <Animated.View style={{position:'absolute',left:0,right:0,transform:[{translateY:this.state.titleTop}],zIndex:88,elevation:2}}>
                        <TitleView bookName={this.state.bookName} navigation={this.props.navigation}/>
                    </Animated.View>
                    <PicturePreview />
                    {this.state.touchType=="shangxia"?(<Text style={{fontSize:20*lu,marginLeft:30*lu,lineHeight:60*lu}}>{this.state.contentTitle}</Text>):null}
                    <View style={{flex:1}}>
                        {this.state.touchType=="shangxia"?(<ScrollView 
                            onTouchStart={(e)=>{
                                if(e.nativeEvent.pageX>width/3&&e.nativeEvent.pageX<width*2/3&&e.nativeEvent.pageY>height/3&&e.nativeEvent.pageY<height*2/3){
                                    this.showFlag=true;
                                }else{
                                    this.showFlag=false;
                                }
                            }}
                            onTouchMove={(e)=>{
                                this.showFlag=false;
                            }}
                            onTouchEnd={()=>{
                                this.showBottomBar();
                            }}
                        >
                            {/* {this.state.contentList} */}
                        </ScrollView>):(<ReadPages ref={(refs=>this.contentView=refs)} 
                                                    onPress={()=>{this.showFlag=true;this.showBottomBar()}} 
                                                    closeSetting={()=>{
                                                        if(this.isMenuOpen||this.settingBtn){
                                                            this.showFlag=false;
                                                            this.showBottomBar()
                                                        }
                                                    }}/>)}
                    </View>
                    <Animated.View  style={[styles.bottomMenu,{bottom:0,transform:[{translateY:this.state.menuBottom}]}]}>
                        <BottomMenu {...setting} openSetting={this.openSetting.bind(this)} navigation={this.props.navigation} ref={refs=>this.BottomMenu=refs}/>
                    </Animated.View>
                    <Animated.View style={[styles.setting,{bottom:0,transform:[{translateY:this.state.settingBottom}]}]}>
                        <Setting {...setting} 
                                    ref={refs=>this.settingView=refs}
                                    showFontSetting={this.showFontSetting.bind(this)} 
                                    showMoreSetting={this.showMoreSetting.bind(this)} 
                                    showVoice={this.showVoice.bind(this)}
                                    touchType={this.state.touchType} 
                                    getLineList={this.getLineList.bind(this)}
                                    changeReadModal={this.changeReadModal.bind(this)} 
                                    changeLight={this.changeLight.bind(this)} 
                                    changeColors={this.changeColors.bind(this)}/>
                    </Animated.View>
                    <VoiceView navigation={this.props.navigation}  ref={refs=>this.voiceView=refs} prePage={this.prePage.bind(this)} nextPage={this.nextPage.bind(this)}/>   
                </View> 
        )
    }
}
const {width,height} =  Dimensions.get('window');
const lu=width/750;
console.log(width)
const regBiaodian = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201d|\uff09|\u3009|\u300b|\u300d|\u300f|\ufe43|\ufe44|\u3015|\uff5e|\ufe4f|\u3011|\u2019|\"|\”]/g
var styles=StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    titleMenu:{
        height:88*lu,
        width:249*lu,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:0.5
    },
    bottomMenu:{
        position:'absolute',
        left:0,
        right:0,
        elevation:2,
        zIndex:66
    },
    setting:{
        position:'absolute',
        left:0,
        right:0,
        elevation:2,
        zIndex:99
    },
    settingItem:{
        flexDirection:'row',
        height:88*lu,
        borderBottomWidth:1
    },
    anotherSettingFont:{
        marginTop:15*lu,
        color:"#ff9b49",
        fontSize:20*lu,
        textAlign:'center',
        lineHeight:20*lu
    },
    bgColor:{
        width:68*lu,
        height:40*lu,
        borderWidth:1,
        borderRadius:12*lu
    },
    readModel:{
        fontSize:20*lu,
        width:130*lu,
        height:50*lu,
        borderWidth:1,
        borderRadius:4*lu,
        textAlign:'center',
        textAlignVertical:'center',
        alignSelf:'center'
    }
})
