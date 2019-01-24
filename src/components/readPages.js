import React,{Component} from 'react';
import {View,Animated,StyleSheet,Dimensions,PanResponder,ToastAndroid,DeviceEventEmitter,AsyncStorage,WebView} from 'react-native';
import rnTextSize, { TSFontSpecs } from 'react-native-text-size';
import Page from './dragPage';
import {BoxShadow} from 'react-native-shadow';

export default class ReadPages extends Component{
    constructor(props){
        super(props);
        this.state={
            pageOneZIndex:3,
            pageTwoZIndex:2,
            pageThreeZIndex:1,
            touchTarget:0,
            touchIndex:0,
            firstPageLeft:new Animated.Value(0),
            secondPageLeft:new Animated.Value(0),
            thirdPageLeft:new Animated.Value(-width-10),
            pageOneContent:[],
            pageTwoContent:[],
            pageThreeContent:[],
            pageOneIndex:1,
            pageTwoIndex:2,
            pageThreeIndex:3,
            pagesList:[],
            pagesLen:0,
            backgroundColor:'#d5bc83',
            fontColor:'rgba(0,0,0,0.85)',
            contentTitle:'',
            fontFamily:'monospace',
            fontSize:16,
            lineHeight:1.4,
        }
        this.dragging = false;
        this.toLeft=true;       //是否往左
        this.dFlag=false;    //是否决定方向
        this.touchEnabled=true;
        this.moveDirection=0
        this.count=0,
        this.timer={},
        this.showMenu=false,
        this.touchLeftView={},
        this.touchRightView={},
        this.rightDirection=0,
        this.targetLeft={},
        this.targetRight={},
        this.bg='',
        this.fontColor=''
    }
    
    componentDidMount(){
        let that=this;
        AsyncStorage.getItem('setting',(e,res)=>{
            if(res!==null){
                var result=JSON.parse(res),isBySystem;
                if(result.background){
                    that.bg=result.background.backgroundColor;
                    that.fontColor=result.background.fontColor;
                    if(result.dayAndNight&&result.dayAndNight=='day'){
                        that.setState({
                            backgroundColor:that.bg,
                            fontColor:that.fontColor
                        })
                    }else{
                        that.setState({
                            backgroundColor:'#282828',
                            fontColor:'#fff'
                        })
                    }
                }
            }
        })
        this.listener = DeviceEventEmitter.addListener('changeBackground', (e) => {
            let fontColor,background;
            if(e.flag=='bg'){
                this.bg=e.backgroundColor;
                this.fontColor=e.fontColor;
                fontColor=e.fontColor;
                background=e.backgroundColor;
            }else{
                if(e.backgroundColor=='#fff'){
                    background=this.bg;
                    fontColor=this.fontColor;
                }else{
                    background=e.backgroundColor;
                    fontColor=e.fontColor;
                }
            }
            this.setState({
                backgroundColor:background,
                fontColor:fontColor
            })
           
        });
        this.pageIndexListener=DeviceEventEmitter.addListener('changePageIndex',(e)=>{
            let len=this.state.pagesList.length;
            let pageIndex=Math.floor(e.process*(len-1));
            that.changePage(pageIndex);
            e.callback((pageIndex+1)/len)
        })
        this.exitVoiceListener=DeviceEventEmitter.addListener('exitVoice',(e)=>{
            that.changeContent(e.pagesList,e.touchIndex,that.state.fontSize,that.state.contentTitle,that.state.lineHeight);
        })
    }
    componentWillUnmount() {
        if (this.listener) {
          this.listener.remove();
        }
        if (this.pageIndexListener) {
            this.pageIndexListener.remove();
        }
        if (this.exitVoiceListener) {
            this.exitVoiceListener.remove();
        }
    }
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
    //改变页码
    changePage(pageIndex){
        this.changeContent(this.state.pagesList,pageIndex,this.state.fontSize,this.state.contentTitle,this.state.lineHeight)
    }
    

    //改变字体后的内容变化
    changeFontSize(res){
        let pageIndex=this.state.touchIndex;
        if(pageIndex>res.pagesList.length){
            pageIndex=res.pagesList.length
        }
        this.changeContent(res.pagesList,pageIndex,res.fontSize,res.contentTitle,res.lineHeight);
    }
    
    changeContent(pagesList,pageIndex,fontSize,contentTitle,lineHeight){
        let that=this,k=0;
        for(let i=pageIndex-3;i<pageIndex+3;i++){
            // if(pagesList[i]){
            //     console.log(pagesList[i][0])
            // }
            if(pagesList[i]){
                if(pagesList[i][0].letterSpacing===undefined&&pagesList[i][0].imgUrl==undefined){
                    let len=pagesList[i].length;
                    pagesList[i].forEach((item,j) => {
                        that.getLineWidth(item.str,fontSize).then(e=>{
                            if((item.isFirst&&!item.isLast)||(item.isFirst&&item.isLast&&e.width-lineWidth>1)){
                                lineWidth=width-60*lu;
                                letterSpacing=(lineWidth-e.width)/(item.str.length);
                                item.str=item.str.substring(2);
                            }else if((!item.isLast&&!item.isFirst)||(item.isLast&&e.width-lineWidth>1)){
                                lineWidth=width-60*lu;
                                letterSpacing=(lineWidth-e.width)/(item.str.length);
                            }else if(item.isFirst){
                                letterSpacing=0;
                                item.str=item.str.substring(2);
                            }else{
                                letterSpacing=0
                            }
                            item.letterSpacing=letterSpacing;
                            pagesList[i][j]=item;
                            if(j==len-1){
                                k++;
                            }
                            if(k==6){
                                that.pageInit(pageIndex,contentTitle,fontSize,lineHeight,pagesList)
                            }
                        })
                        
                    });
                }else{
                    k++;
                    if(k==6){
                        that.pageInit(pageIndex,contentTitle,fontSize,lineHeight,pagesList)
                    }
                }
            }else{
                k++;
                if(k==6){
                    that.pageInit(pageIndex,contentTitle,fontSize,lineHeight,pagesList)
                }
            }
        }
    }
    pageInit(pageIndex,contentTitle,fontSize,lineHeight,pagesList){
        this.state.firstPageLeft.setValue(0);
        this.state.secondPageLeft.setValue(0);
        this.state.thirdPageLeft.setValue(-width-10);
        this.setState({
            touchTarget:0,
            pageOneIndex:1,
            pageTwoIndex:2,
            pageThreeIndex:3,
            touchIndex:pageIndex,
            pageOneIndex:pageIndex+1,
            pageTwoIndex:pageIndex+2,
            pageThreeIndex:pageIndex,
            contentTitle:contentTitle,
            fontSize:fontSize,
            pagesList:pagesList,
            lineHeight:lineHeight,
            pagesLen:pagesList.length,
            pageOneContent:pagesList[pageIndex],
            pageTwoContent:pagesList[pageIndex+1],
            pageThreeContent:pagesList[pageIndex-1],
        });
    }
    startVoice(){
        DeviceEventEmitter.emit('sendAllData',{
            contentTitle:this.state.contentTitle,
            touchIndex:this.state.touchIndex,
            lineHeight:this.state.lineHeight,
            fontSize:this.state.fontSize,
            pagesList:this.state.pagesList,
            fontFamily:this.state.fontFamily,
            backgroundColor:this.state.backgroundColor,
            fontColor:this.state.fontColor
        })
    }
    changeState(){
        this.showMenu=false;
    }
    componentWillMount() {
        var self=this;
        this._panResponder = PanResponder.create({
          // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
            // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
                if(self.touchEnabled==false){
                    return;
                }
                self.dragging = true;
                self._dragStart(gestureState)
                // gestureState.{x,y} 现在会被设置为0
            },
            onPanResponderMove: (evt, gestureState) => {
                // 最近一次的移动距离为gestureState.move{X,Y}
                evt.preventDefault();
                if(self.touchEnabled==false||self.showMenu){
                    return
                }
                if (self.dragging) {
                    self._dragMove(gestureState)
                }
                // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                if(self.showMenu){
                    self.showMenu=false;
                    self.props.closeSetting();
                    return;
                }
                if(self.touchEnabled==false){
                    return
                }
                self.touchEnabled=false;
                setTimeout(()=>{
                    self.touchEnabled=true;
                },300)
                if (self.dragging) {
                    self._dragDrop(gestureState)
                }
                self.dragging = false
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // if (self.dragging) {
                //     self._dragDrop(gestureState)
                // }
                // self.dragging = false
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return false;
            },
        });
    }
    _dragStart(gestureState){
        
        switch (this.state.touchTarget) {
            case 0:
                this.touchLeftView=this.pageOne;
                this.touchRightView=this.pageThree;
                this.targetLeft=this.state.firstPageLeft;
                this.targetRight=this.state.thirdPageLeft;
                break;
            case 1:
                this.touchLeftView=this.pageTwo;
                this.touchRightView=this.pageOne;
                this.targetLeft=this.state.secondPageLeft;
                this.targetRight=this.state.firstPageLeft;
                break;
            default:
                this.touchLeftView=this.pageThree;
                this.touchRightView=this.pageTwo;
                this.targetLeft=this.state.thirdPageLeft;
                this.targetRight=this.state.secondPageLeft;
                break;
        }
    }
    _dragMove(gestureState){
        if(!this.dFlag&&gestureState.dx!=0){
            if(gestureState.dx>0){
                this.toLeft=false;          //往右滑
            }else{
                this.toLeft=true;           //往左滑
            }
            this.dFlag=true;
        }else{
            if((this.toLeft&&gestureState.dx>0)||(!this.toLeft&&gestureState.moveX<0)){
                return;
            }
        }
        if(!this.toLeft&&this.state.touchIndex==0){
            return
        }else if(this.toLeft&&this.state.touchIndex==this.state.pagesLen-1){
            return
        }
        this.moveDirection=gestureState.dx;
        if(this.toLeft){
            this.targetLeft.setValue(gestureState.dx)
        }else{
            this.rightDirection=gestureState.moveX-width;
            this.targetRight.setValue(-width+gestureState.dx)
        }
       
    }
    _dragDrop(gestureState){
        if(this.dFlag){
            if(!this.toLeft&&this.state.touchIndex==0){
                ToastAndroid.show('没有上一章', ToastAndroid.SHORT);
                this.dFlag=false;
                return;
            }else if(this.toLeft&&this.state.touchIndex==this.state.pagesLen-1){
                ToastAndroid.show('没有下一章', ToastAndroid.SHORT);
                this.dFlag=false;
                return
            }
        }else{
            let offsetX=gestureState.x0,offsetY=gestureState.y0;
            if(offsetX<width/3||offsetY>height*2/3&&offsetX<width*2/3){
                if(this.state.touchIndex==0){
                    ToastAndroid.show('没有上一章', ToastAndroid.SHORT);
                }else{
                    this.prePage();
                }
            }else if(offsetX>width*2/3||offsetY<height/3&&offsetX>width/3){
                if(this.state.touchIndex==this.state.pagesLen-1){
                    ToastAndroid.show('没有下一章', ToastAndroid.SHORT);
                }else{
                    this.nextPage();
                }
                
            }else{
                
                // this.refs.webViewRef.postMessage(1);
                if(this.state.pagesList[this.state.touchIndex][0].imgUrl){
                    DeviceEventEmitter.emit("showPicture",this.state.pagesList[this.state.touchIndex][0].imgUrl)
                }else{
                    this.showMenu=true;
                    this.props.onPress();
                }
                
            }
            return;
        }
        this.dFlag=false;
        
        if(this.toLeft){
            if(this.moveDirection<-30){
                this.nextPage();
            }else{
                this.pageToRight(false);
            }
        }else{
            if(this.moveDirection>30){
                this.prePage();
            }else{
                this.pageToLeft(false);
            }
        }
    }
    pageToLeft(flag){
        let tar=flag===true?this.targetLeft:this.targetRight;
        Animated.timing(                       
            tar,            
            {
                toValue: -width-10,                        
                duration: 300,   
                useNativeDriver: true              
            }
        ).start();
    }
    pageToRight(flag){
        let tar=flag===true? this.targetRight:this.targetLeft;
        Animated.timing(                       
            tar,            
            {
                toValue: 0,                        
                duration: 300,   
                useNativeDriver: true              
            }
        ).start();
    }
    prePage(){
        let index=this.state.touchIndex;
        let target=this.state.touchTarget,that=this;
        this.pageToRight(true);
        setTimeout(() => {
            index--;
            let pagesList=this.state.pagesList;
            let tarItem=pagesList[this.state.touchIndex-4];
            if(tarItem&&tarItem[0].letterSpacing===undefined&&tarItem[0].imgUrl==undefined){
                console.log('重置')
                let len=tarItem.length;
                tarItem.forEach((item,i)=>{
                    that.getLineWidth(item.str,that.state.fontSize).then(e=>{
                        if((item.isFirst&&!item.isLast)||(item.isFirst&&item.isLast&&e.width-lineWidth>1)){
                            lineWidth=width-60*lu;
                            letterSpacing=(lineWidth-e.width)/(item.str.length);
                            item.str=item.str.substring(2);
                        }else if((!item.isLast&&!item.isFirst)||(item.isLast&&e.width-lineWidth>1)){
                            lineWidth=width-60*lu;
                            letterSpacing=(lineWidth-e.width)/(item.str.length);
                        }else if(item.isFirst){
                            letterSpacing=0;
                            item.str=item.str.substring(2);
                        }else{
                            letterSpacing=0
                        }
                        item.letterSpacing=letterSpacing;
                        pagesList[that.state.touchIndex+3][i]=item;
                        if(i==len-1){
                            that.prePageChanged(target,index,pagesList)
                        }
                    })
                })
            }else{
                // console.log('不重置')
                this.prePageChanged(target,index)
            }
        }, 50);
        
    }
    nextPage(){
        let index=this.state.touchIndex;
        let target=this.state.touchTarget,that=this;
        this.pageToLeft(true);
        setTimeout(() => {
            index++;
            let pagesList=this.state.pagesList;
            let tarItem=pagesList[this.state.touchIndex+3];
            if(tarItem&&tarItem[0].letterSpacing===undefined&&tarItem[0].imgUrl==undefined){
                console.log('重置')
                let len=tarItem.length;
                tarItem.forEach((item,i)=>{
                    that.getLineWidth(item.str,this.state.fontSize).then(e=>{
                        if((item.isFirst&&!item.isLast)||(item.isFirst&&item.isLast&&e.width-lineWidth>1)){
                            lineWidth=width-60*lu;
                            letterSpacing=(lineWidth-e.width)/(item.str.length);
                            item.str=item.str.substring(2);
                        }else if((!item.isLast&&!item.isFirst)||(item.isLast&&e.width-lineWidth>1)){
                            lineWidth=width-60*lu;
                            letterSpacing=(lineWidth-e.width)/(item.str.length);
                        }else if(item.isFirst){
                            letterSpacing=0;
                            item.str=item.str.substring(2);
                        }else{
                            letterSpacing=0
                        }
                        item.letterSpacing=letterSpacing;
                        pagesList[that.state.touchIndex+3][i]=item;
                        if(i==len-1){
                            that.nextPageChanged(target,index,pagesList)
                        }
                    })
                })
            }else{
                console.log('不重置')
                this.nextPageChanged(target,index)
            }
        }, 50);
        
        
    }
    prePageChanged(target,index,pagesList){
        var pagesList=pagesList||this.state.pagesList,that=this;
        DeviceEventEmitter.emit('changeProcess',(index+1)/pagesList.length);
        switch (target) {
            case 0:
                target=2;
                pageOneZIndex=1;
                pageTwoZIndex=3;
                pageThreeZIndex=2;
                that.setState({
                    touchTarget:target,
                    touchIndex:index,
                    pagesList:pagesList,
                    pageTwoContent:that.state.pagesList[index-1],
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    pageTwoIndex:index
                })
                that.state.secondPageLeft.setValue(-width-10);
                break;
            case 1:
                target=0;
                pageOneZIndex=2;
                pageTwoZIndex=1;
                pageThreeZIndex=3;
                that.setState({
                    touchTarget:target,
                    touchIndex:index,
                    pagesList:pagesList,
                    pageThreeContent:that.state.pagesList[index-1],
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    pageThreeIndex:index
                })
                that.state.thirdPageLeft.setValue(-width-10);
                break;
            default:
                target=1;
                pageOneZIndex=3;
                pageTwoZIndex=2;
                pageThreeZIndex=1;
                that.setState({
                    touchTarget:target,
                    touchIndex:index,
                    pagesList:pagesList,
                    pageOneContent:that.state.pagesList[index-1],
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    pageOneIndex:index
                })
                that.state.firstPageLeft.setValue(-width-10);
                break;
        }
    }
    nextPageChanged(target,index,pagesList){
        var pagesList=pagesList||this.state.pagesList,that=this;
        DeviceEventEmitter.emit('changeProcess',(index+1)/pagesList.length);
        switch (target) {
            case 0:
                target=1;
                pageOneZIndex=3;
                pageTwoZIndex=2;
                pageThreeZIndex=1;
                that.setState({
                    touchTarget:target,
                    touchIndex:index,
                    pagesList:pagesList,
                    pageThreeContent:that.state.pagesList[index+1],
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    pageThreeIndex:index+2
                })
                that.state.thirdPageLeft.setValue(0);
                break;
            case 1:
                target=2;
                pageOneZIndex=1;
                pageTwoZIndex=3;
                pageThreeZIndex=2;
                that.setState({
                    touchTarget:target,
                    touchIndex:index,
                    pagesList:pagesList,
                    pageOneContent:that.state.pagesList[index+1],
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    pageOneIndex:index+2
                })
                that.state.firstPageLeft.setValue(0);
                break;
            default:
                target=0;
                pageOneZIndex=2;
                pageTwoZIndex=1;
                pageThreeZIndex=3;
                that.setState({
                    touchTarget:target,
                    touchIndex:index,
                    pagesList:pagesList,
                    pageTwoContent:that.state.pagesList[index+1],
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    pageTwoIndex:index+2
                })
                that.state.secondPageLeft.setValue(0);
                break;
        }
    }
    render(){
        const shadowOpt = {
            width:width, //包裹的子内容多宽这里必须多宽
            height:height,//同上
            color:"#000",//阴影颜色
            border:10,//阴影宽度
            opacity:0.3,//透明度
            x:1,
            y:0
        }
        return (<View style={{flex:1,position:'relative',overflow:'hidden'}} {...this._panResponder.panHandlers}>
        {/* <WebView
            originWhitelist={['*']} 
            style={{height:30,width:30}}
            ref="webViewRef"
            javaScriptEnabled={true}
            allowsInlineMediaPlayback={true}
            source={require('./html/audio.html')}
        /> */}
        
        <Animated.View ref={(refs)=>this.pageOne = refs} style={[styles.page,{backgroundColor:this.state.backgroundColor,zIndex:this.state.pageOneZIndex,transform:[{translateX:this.state.firstPageLeft}]}]}>
            <BoxShadow setting={shadowOpt}>
                <Page content={this.state.pageOneContent} 
                    isTouch={true}
                    contentTitle={this.state.contentTitle} 
                    backgroundColor={this.state.backgroundColor} 
                    pageIndex={this.state.pageOneIndex}
                    pagesNum={this.state.pagesList.length}
                    lineHeight={this.state.lineHeight}
                    fontSize={this.state.fontSize}
                    fontFamily={this.state.fontFamily}
                    fontColor={this.state.fontColor}/>
            </BoxShadow>    
        </Animated.View>
        <Animated.View ref={(refs)=>this.pageTwo = refs} style={[styles.page,{backgroundColor:this.state.backgroundColor,zIndex:this.state.pageTwoZIndex,transform:[{translateX:this.state.secondPageLeft}]}]}>
            <BoxShadow setting={shadowOpt}>
                <Page 
                    content={this.state.pageTwoContent} 
                    contentTitle={this.state.contentTitle} 
                    backgroundColor={this.state.backgroundColor} 
                    pageIndex={this.state.pageTwoIndex}
                    pagesNum={this.state.pagesList.length}
                    lineHeight={this.state.lineHeight}
                    fontSize={this.state.fontSize}
                    fontFamily={this.state.fontFamily}
                    fontColor={this.state.fontColor}/>
             </BoxShadow>           
        </Animated.View>
        <Animated.View ref={(refs)=>this.pageThree = refs} style={[styles.page,{backgroundColor:this.state.backgroundColor,zIndex:this.state.pageThreeZIndex,transform:[{translateX:this.state.thirdPageLeft}]}]}>
            <BoxShadow setting={shadowOpt}>
                <Page 
                    content={this.state.pageThreeContent} 
                    contentTitle={this.state.contentTitle} 
                    backgroundColor={this.state.backgroundColor} 
                    pageIndex={this.state.pageThreeIndex}
                    pagesNum={this.state.pagesList.length}
                    lineHeight={this.state.lineHeight}
                    fontSize={this.state.fontSize}
                    fontFamily={this.state.fontFamily}
                    fontColor={this.state.fontColor}/>
            </BoxShadow>    
        </Animated.View>
    </View>)
    }
}
const {width,height} =  Dimensions.get('window');
const lu=width/750;
const styles=StyleSheet.create({
    page:{
        position:'absolute',
        left:0,
        width:width,
        height:height,
        elevation:1
    }
})