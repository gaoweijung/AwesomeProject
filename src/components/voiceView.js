import React,{Component} from 'react';
import Svg from './svgs/Svg';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions,Slider,AsyncStorage,DeviceEventEmitter,StatusBar,Animated,PanResponder,ToastAndroid} from 'react-native';
import cntts from 'react-native-cn-tts';
import rnTextSize, { TSFontSpecs } from 'react-native-text-size';
import {BoxShadow} from 'react-native-shadow';
import Page from './voicePage';
//语音朗读
class VoiceSpeed extends Component{
    constructor(props){
        super(props);
        this.state={
            voiceSpeed:5
        }
    }
    componentDidMount(){
        let that=this;
        AsyncStorage.getItem('setting',(e,res)=>{
            if(res!=null){
                let result=JSON.parse(res);
                if(result.voiceSpeed!=undefined){
                    console.log(result.voiceSpeed)
                    cntts.changeSpeed(result.voiceSpeed.toString());
                    if( that.pageProcess){
                        that.pageProcess.setNativeProps({
                            value:result.voiceSpeed/9
                        })
                    }
                    that.setState({
                        voiceSpeed:result.voiceSpeed
                    })
                }
            }
        })
    }
    setVoiceSpeed(e){
        let speed= parseInt(e*9);
        DeviceEventEmitter.emit("startVoice");
        this.setState({
            voiceSpeed:speed
        })
     }
    changeProcess(){
        AsyncStorage.mergeItem('setting',JSON.stringify({'voiceSpeed':this.state.voiceSpeed}),(e)=>{})
        cntts.stop();
        cntts.changeSpeed(this.state.voiceSpeed.toString());
        this.pageProcess.setNativeProps({
            value:  this.state.voiceSpeed/9
        })
    }
    render (){
        return(<View style={{height:89*lu,borderBottomColor:'#f2f2f2',width:width,borderBottomWidth:0.5,flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:'#ff9c49',fontSize:24*lu,marginLeft:30*lu,width:80*lu}}>
            语速
        </Text>
        <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
            <Svg icon="readVoiceReduce" size={20*lu} />
            <Slider minimumTrackTintColor="#ff4975" thumbTintColor="#ff4975" style={{flex:1}} value={0.5} ref={refs=>this.pageProcess=refs}
            onValueChange={(e)=>{ this.setVoiceSpeed(e) }}
            onSlidingComplete={(e)=>{ this.changeProcess() }}/>
            <Svg icon="readVoiceAdd" size={20*lu} style={{marginRight:30*lu}}/>
        </View>
        <Text style={{color:'#ff9c49',fontSize:28*lu,marginRight:30*lu,width:76*lu,textAlign:'center'}} includeFontPadding={false}>{this.state.voiceSpeed}</Text>
    </View>)
    }
}
class VoiceSpeaker extends Component{
    constructor(props){
        super(props);
        this.state={
            speaker:'0'
        }
    }
    componentDidMount(){
        let that=this;
        AsyncStorage.getItem('setting',(e,res)=>{
            if(res!=null){
                let result=JSON.parse(res);
                if(result.voiceSpeaker!=undefined){
                    cntts.changeSpeaker(result.voiceSpeaker);
                    that.setState({
                        speaker:result.voiceSpeaker
                    })
                }
            }
        })
    }
    changeSpeaker(res){
        console.log(res);
        AsyncStorage.mergeItem('setting',JSON.stringify({'voiceSpeaker':res}),(e)=>{})
        cntts.stop();
        cntts.changeSpeaker(res);
        DeviceEventEmitter.emit("startVoice");
        this.setState({
            speaker:res
        })
    }
    setSpeaker(){
        StatusBar.setHidden(false,'none');
        this.props.navigation.navigate('ChoiceSpeaker',{speaker:this.state.speaker,callback:this.changeSpeaker.bind(this)});
    }
    render(){
        return (<TouchableOpacity onPress={()=>{this.setSpeaker()}}>
            <View style={{marginLeft:30*lu,width:156*lu,alignItems:'center'}}>
                <Svg icon="readSpeaker" size={36*lu}/>
               { this.state.speaker=='0'?
                (<Text style={{fontSize:20*lu,color:'#ff9b49',marginTop:10*lu}}>女声</Text>):
                (<Text style={{fontSize:20*lu,color:'#ff9b49',marginTop:10*lu}}>男声</Text>)}
            </View>
        </TouchableOpacity>)
    }
}
class VoicePlayer extends Component{
    constructor(props){
        super(props);
        this.state={
            playFlag:true
        }
    }
    componentDidMount(){
        let that=this;
        this.listener=DeviceEventEmitter.addListener("startVoice",function(){
            that.setState({
                playFlag:true
            })
        })
    }
    componentWillUnmount(){
        if(this.listener!=null){
            this.listener.remove();
        }
    }
    voiceStart(){
        this.setState({
            playFlag:true
        });
        cntts.resume();
    }
    voicePause(){
        this.setState({
            playFlag:false
        });
        cntts.pause();
    }
    render(){
        return (<View style={{flexDirection:'row',flex:1}}>
                    <View style={{width:120*lu,height:176*lu,justifyContent:'center'}}>
                        <Svg icon="readVoicePre" size={36*lu}/>
                    </View>
                    {this.state.playFlag?
                    (<TouchableOpacity onPress={()=>{this.voicePause();}}>
                        <View style={{width:135*lu,height:176*lu,justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:88*lu,height:88*lu,justifyContent:'center',alignItems:'center',backgroundColor:"#ff9b49",borderRadius:44*lu}}>
                                <Svg icon="readVoicePause" size={36*lu} style={{marginLeft:1}}/>
                            </View>
                        </View>
                    </TouchableOpacity>):
                    (<TouchableOpacity onPress={()=>{this.voiceStart();}}>
                        <View style={{width:135*lu,height:176*lu,justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:88*lu,height:88*lu,justifyContent:'center',alignItems:'center',backgroundColor:"#ff9b49",borderRadius:44*lu}}>
                                <Svg icon="readVoiceStart" size={36*lu} style={{marginLeft:8*lu}}/>
                            </View>
                        </View>
                    </TouchableOpacity>)}
                    <View style={{width:120*lu,height:176*lu,justifyContent:'center',alignItems:'flex-end'}}>
                        <Svg icon="readVoiceNext" size={36*lu}/>
                    </View>
                </View>)
    }
}
class SelectionView extends Component{
    constructor(props){
        super(props);
        this.state={
            scrollTop:new Animated.Value(0),
            showFlag:false
        }
        
    }
    changeScroll(y){
        this.state.scrollTop.setValue(y)
    }
    showSelectionView(){
        this.setState({
            showFlag:true
        })
    }
    hideSelectionView(){
        this.setState({
            showFlag:false
        })
    }
    setStartTop(){
        return this.state.scrollTop._value;
    }
    render(){
        return this.state.showFlag?(<Animated.View style={{height:40*lu,position:'absolute',left:0,right:0,top:0,zIndex:999,elevation:2,backgroundColor:'rgba(195,195,195,0.8)',transform:[{translateY:this.state.scrollTop}]}}>
                </Animated.View>):null
    }
}
export default class VoiceView extends Component{
    constructor(props){
        super(props);
        this.state={
            showFlag:false,
            bottom:new Animated.Value(0),
            paragraphList:[],
            contentTitle:'',
            fontSize:16,
            lineHeight:16,
            fontFamily:'monospace',
            backgroundColor:'#d5bc83',
            pageOneZIndex:3,
            pageTwoZIndex:2,
            pageThreeZIndex:1,
            firstPageLeft:new Animated.Value(0),
            secondPageLeft:new Animated.Value(0),
            thirdPageLeft:new Animated.Value(-width-10),
            pageOneContent:[],
            pageTwoContent:[],
            pageThreeContent:[],
            voiceList:[],
            pageOneIndex:1,
            pageTwoIndex:2,
            pageThreeIndex:3,
            firstPlayFlag:true,
            secondPlayFlag:false,
            thirdPlayFlag:false,
            touchTarget:0,
            pagesLen:0,
            fontColor:'rgba(0,0,0,0.85)'
        };
        this.settingFlag=true;
        this.preHeight=0;
        this.dragging = false;
        this.toLeft=true;       //是否往左
        this.dFlag=false;    //是否决定方向
        this.touchEnabled=true;
        this.moveDirection=0;
        this.count=0;
        this.timer={};
        this.updownFlag=false;
        this.showMenu=false;
        this.touchLeftView={};
        this.touchRightView={};
        this.rightDirection=0;
        this.targetContnet=[];
        this.targetLeft={};
        this.targetRight={};
        this.floorIndex=0;
    }
   
    componentWillMount() {
        var self=this;
        this.clickFlag=true;
        this._panResponder = PanResponder.create({
          // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderGrant: (evt, gestureState) => {
                // self.clickFlag=true;
                // self.startY=self.selectView.setStartTop();
                // self.showSelectedFlag=true;
                // self.onceFlag=true;
                // self.floorIndex=self.voicePage.getFloorIndex();
                self.dragging = true;
                self.dFlag=false;
                self.updownFlag=false;
                self._dragStart(gestureState)
            },
            onPanResponderMove: (evt, gestureState) => {
                if (self.dragging) {
                    self._dragMove(gestureState)
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                self._dragDrop(gestureState);
                self.dragging = false
            },
            onPanResponderTerminate: (evt, gestureState) => {},
            onShouldBlockNativeResponder: (evt, gestureState) => false
        });
    }
    componentDidMount(){
        let appID='15391431';
        let apiKey='IuGBNyPs7Z1e7DNEvIZQvLvW';
        let secretKey='hfRKZ89zXlY3Yz7DksyPg5yXHNlyXnue';
        let that=this;
        cntts.init(appID,apiKey,secretKey).then(()=>{

        }).catch((e)=>{
            ToastAndroid.show("网络错误", ToastAndroid.SHORT);
        });
        // DeviceEventEmitter.addListener('onSpeechChanged', function(e) {console.log(e) })
        
        this.speechLisener=DeviceEventEmitter.addListener('onSpeechFinish', function(e) { 
            let vLen=that.state.voiceList[that.state.touchIndex].length,speechContent,voicePage;
            if(++that.floorIndex<vLen){
                console.log("下一段"+that.floorIndex)
                speechContent=that.state.voiceList[that.state.touchIndex][that.floorIndex];
                cntts.speak(speechContent);
                if(that.state.touchIndex%3==0){
                    voicePage=that.voiceOne
                }else if(that.state.touchIndex%3==1){
                    voicePage=that.voiceTwo
                }else{
                    voicePage=that.voiceThree
                }

                console.log(voicePage)
                voicePage.setParagraphIndex(that.floorIndex);
            }else{
                let touchIndex=that.state.touchIndex;
                if(touchIndex<that.state.voiceList.length){
                    touchIndex++;
                    that.setState({
                        touchIndex:touchIndex
                    })
                    console.log('第'+touchIndex+'页')
                    that.nextPage(false);
                    cntts.stop();
                    that.floorIndex=0;
                    that.voicePage.setParagraphIndex(that.floorIndex);
                    if(that.state.voiceList[touchIndex]){
                        cntts.speak(that.state.voiceList[touchIndex][0]);
                    }
                }
             }
        });
        this.contentListener=DeviceEventEmitter.addListener('sendAllData',(e)=>{
            let pagesList=e.pagesList,touchIndex=e.touchIndex,contentTitle=e.contentTitle,lh=e.lineHeight,voiceList=[],str='',subVoiceList=[];
            pageOneContent=that.getVoiceContent(pagesList,touchIndex,lh);
            pageTwoContent=that.getVoiceContent(pagesList,touchIndex+1,lh);
            pageThreeContent=that.getVoiceContent(pagesList,touchIndex+2,lh);
            pagesList.forEach(item=>{
                if(item[0].str){
                    item.forEach(subItem=>{
                        if(subItem.isLast){
                            if(subItem.isFirst&&subItem.letterSpacing===undefined){
                                str+=subItem.str.substring(2);
                            }else{
                                str+=subItem.str
                            }
                            
                            subVoiceList.push(str);
                            str='';
                        }else{
                            if(subItem.isFirst&&subItem.letterSpacing===undefined){
                                str+=subItem.str.substring(2);
                            }else{
                                str+=subItem.str
                            }
                        }
                    })
                    if(str!=''){
                        subVoiceList.push(str);
                        str=''
                    }
                    voiceList.push(subVoiceList);
                    subVoiceList=[];
                }else{
                    voiceList.push(['图片']);
                }
                
            })
            that.preHeight=0;
            that.floorIndex=0;
            console.log(voiceList)
            cntts.speak(voiceList[touchIndex][0]);
            that.setState({
                pagesList:pagesList,
                voiceList:voiceList,
                pageOneContent:pageOneContent,
                pageTwoContent:pageTwoContent,
                pageThreeContent:pageThreeContent,
                lineHeight:lh,
                fontSize:e.fontSize,
                touchIndex:touchIndex,
                contentTitle:contentTitle,
                fontFamily:e.fontFamily,
                fontColor:e.fontColor,
                backgroundColor:e.backgroundColor,
                pagesLen:pagesList.length,
                pageOneZIndex:3,
                pageTwoZIndex:2,
                pageThreeZIndex:1,
                firstPageLeft:new Animated.Value(0),
                secondPageLeft:new Animated.Value(0),
                thirdPageLeft:new Animated.Value(-width-10),
                pageOneIndex:1,
                pageTwoIndex:2,
                pageThreeIndex:3,
                touchTarget:0,
            })
        })
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
    componentWillUnmount(){
        if(this.contentListener){
            this.contentListener.remove();
        }
        if(this.speechLisener){
            this.speechLisener.remove();
        }
    }
    voiceReplay(){
        cntts.stop();
    }
    _dragStart(gestureState){
        this.startY=this.selectView.setStartTop();
        switch (this.state.touchTarget) {
            case 0:
                this.touchLeftView=this.pageOne;
                this.targetContnet=this.state.pageOneContent;
                this.voicePage=this.voiceOne;
                this.touchRightView=this.pageThree;
                this.targetLeft=this.state.firstPageLeft;
                this.targetRight=this.state.thirdPageLeft;
                break;
            case 1:
                this.touchLeftView=this.pageTwo;
                this.targetContnet=this.state.pageTwoContent;
                this.voicePage=this.voiceTwo;
                this.touchRightView=this.pageOne;
                this.targetLeft=this.state.secondPageLeft;
                this.targetRight=this.state.firstPageLeft;
                break;
            default:
                this.touchLeftView=this.pageThree;
                this.targetContnet=this.state.pageThreeContent;
                this.voicePage=this.voiceThree;
                this.touchRightView=this.pageTwo;
                this.targetLeft=this.state.thirdPageLeft;
                this.targetRight=this.state.secondPageLeft;
                break;
        }
        this.voicePlayer.voicePause();
    }
    _dragMove(gestureState){
        if(!this.dFlag){
            if(gestureState.dy!=0){
                this.updownFlag=true;
                this.selectView.showSelectionView();
            }
            this.dFlag=true;
        }else{
            var scrollTop=this.startY+gestureState.dy;
            if(scrollTop<0){
                scrollTop=0;
            }else if(scrollTop>height-40*lu){
                scrollTop=height-40*lu;
            }else{
                this.touchUpdown(scrollTop);
            }
        }
    }
    _dragDrop(gestureState){
        let speechContent;
        if(this.dFlag){
            this.selectView.hideSelectionView();
            speechContent=this.state.voiceList[this.state.touchIndex][this.floorIndex];
            cntts.speak(speechContent)
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
                    this.nextPage(true);
                }
                
            }else{
                if(this.state.pagesList[this.state.touchIndex][0].imgUrl){
                    DeviceEventEmitter.emit("showPicture",this.state.pagesList[this.state.touchIndex][0].imgUrl)
                }else{
                    if(!this.settingFlag){
                        this.settingFlag=true;
                        this.openSettingAnimated();
                    }else{
                        this.settingFlag=false;
                        this.closeSettingAnimated();
                        this.voicePlayer.voiceStart();
                    }
                }
                
            }
            return;
        };
        this.dFlag=false;
    }
    touchUpdown(scrollTop){
        let self=this,floorHeight;
        console.log(this.targetContnet[self.floorIndex]);
        floorHeight=this.targetContnet[self.floorIndex].height;
        
        if(floorHeight<scrollTop){
            self.floorIndex++;
            if(self.floorIndex<this.targetContnet.length){
                self.preHeight=floorHeight;
                self.voicePage.setParagraphIndex(self.floorIndex);
            }else{
                self.floorIndex=this.targetContnet.length-1
            }
        }else if(self.preHeight>scrollTop){
            self.floorIndex--;
            if(self.floorIndex>=0){
                if(self.floorIndex-1>=0){
                    self.preHeight=this.targetContnet[self.floorIndex-1].height;
                }else{
                    self.preHeight=0;
                }
                
                self.voicePage.setParagraphIndex(self.floorIndex);
            }else{
                self.floorIndex=0;
            }
        }
        this.selectView.changeScroll(scrollTop);
    }
    getVoiceContent(pagesList,touchIndex,lh){
        let paragraphList=[],paragraph=[],scrollTop=60*lu;
        let lineHeight=lh||this.state.lineHeight;
        if(pagesList[touchIndex]){
            if(!pagesList[touchIndex][0].imgUrl){
                pagesList[touchIndex].forEach((item)=>{
                    if(item.isLast){
                        paragraph.push(item);
                        scrollTop+=(lineHeight*paragraph.length);
                        paragraphList.push({paragraph:paragraph,height:scrollTop});
                        paragraph=[];
                    }else{
                        paragraph.push(item)
                    }
                })
                if(paragraph.length>0){
                    paragraphList.push({paragraph:paragraph,height:scrollTop});
                }
            }else{
                paragraphList=pagesList[touchIndex];
            }
        }
        
        
        return paragraphList;
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
    pageToLeft(flag){
        let tar;
        switch (this.state.touchTarget) {
            case 0:
                this.targetContnet=this.state.pageOneContent;
                this.voicePage=this.voiceOne;
                tar=flag===true?this.state.firstPageLeft:this.state.thirdPageLeft;
                break;
            case 1:
                this.targetContnet=this.state.pageTwoContent;
                this.voicePage=this.voiceTwo;
                tar=flag===true?this.state.secondPageLeft:this.state.firstPageLeft;
                break;
            default:
                this.targetContnet=this.state.pageThreeContent;
                this.voicePage=this.voiceThree;
                tar=flag===true?this.state.thirdPageLeft:this.state.secondPageLeft;
                break;
        }
        tar.setValue(-width-10);
    }
    pageToRight(flag){
        let tar=flag===true? this.targetRight:this.targetLeft;
        tar.setValue(0);
    }
    prePage(){
        let index=this.state.touchIndex;
        let target=this.state.touchTarget,that=this;
        this.floorIndex=0;
        this.voicePage.setParagraphIndex(this.floorIndex);
        this.selectView.changeScroll(0);
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
    nextPage(flag){
        let index=this.state.touchIndex;
        let target=this.state.touchTarget,that=this;
        this.pageToLeft(true);
        this.selectView.changeScroll(0);
        setTimeout(() => {
            console.log(index+"------")
            if(flag){
                index++;
            }
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
                    pageTwoContent:that.getVoiceContent(that.state.pagesList,index-1),
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    firstPlayFlag:false,
                    secondPlayFlag:false,
                    thirdPlayFlag:true,
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
                    pageThreeContent:that.getVoiceContent(that.state.pagesList,index-1),
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    firstPlayFlag:true,
                    secondPlayFlag:false,
                    thirdPlayFlag:false,
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
                    pageOneContent:that.getVoiceContent(that.state.pagesList,index-1),
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    firstPlayFlag:false,
                    secondPlayFlag:true,
                    thirdPlayFlag:false,
                    pageOneIndex:index
                })
                that.state.firstPageLeft.setValue(-width-10);
                break;
        }
    }
    nextPageChanged(target,index,pagesList){
        var pagesList=pagesList||this.state.pagesList,that=this;
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
                    pageThreeContent:that.getVoiceContent(that.state.pagesList,index+1),
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    pageThreeIndex:index+2,
                    firstPlayFlag:false,
                    secondPlayFlag:true,
                    thirdPlayFlag:false,
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
                    pageOneContent:that.getVoiceContent(that.state.pagesList,index+1),
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    pageOneIndex:index+2,
                    firstPlayFlag:false,
                    secondPlayFlag:false,
                    thirdPlayFlag:true,
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
                    pageTwoContent:that.getVoiceContent(that.state.pagesList,index+1),
                    pageOneZIndex:pageOneZIndex,
                    pageTwoZIndex:pageTwoZIndex,
                    pageThreeZIndex:pageThreeZIndex,
                    firstPlayFlag:true,
                    secondPlayFlag:false,
                    thirdPlayFlag:false,
                    pageTwoIndex:index+2
                })
                that.state.secondPageLeft.setValue(0);
                break;
        }
    }
    openVoice(){
        this.setState({
            showFlag:true,
        })
    }
    closeVoice(){
        this.setState({
            showFlag:false,
        });
        this.settingFlag=false;
        cntts.stop();
        DeviceEventEmitter.emit('exitVoice',{pagesList:this.state.pagesList,touchIndex:this.state.touchIndex})
    }
    openSettingAnimated(){
        Animated.timing(
            this.state.bottom,
            {
                toValue:0,
                duration:400,
                useNativeDriver: true
            }
        ).start();
    }
    closeSettingAnimated(){
        Animated.timing(
            this.state.bottom,
            {
                toValue:354*lu,
                duration:400,
                useNativeDriver: true
            }
        ).start();
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
        StatusBar.setHidden(false,'none');
        this.props.navigation.navigate('BookMenu',{
            bookId:this.bookId,
            bookName:this.bookName,
            contentId:this.contentId,
            from:'voice',
            bookType:this.bookType
        });
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
        return this.state.showFlag?(
            
        <View style={[styles.voiceView,{height:height,width:width}]} {...this._panResponder.panHandlers}>
            <SelectionView ref={refs=>this.selectView=refs}/>
            <Animated.View ref={(refs)=>this.pageOne = refs} style={[styles.page,{backgroundColor:this.state.backgroundColor,zIndex:this.state.pageOneZIndex,transform:[{translateX:this.state.firstPageLeft}]}]}>
                <BoxShadow setting={shadowOpt}>
                    <Page   ref={(refs)=>this.voiceOne = refs}
                            fontColor={this.state.fontColor} 
                            backgroundColor={this.state.backgroundColor}
                            contentTitle={this.state.contentTitle} 
                            fontSize={this.state.fontSize} 
                            lineHeight={this.state.lineHeight} 
                            playFlag={this.state.firstPlayFlag}
                            paragraphList={this.state.pageOneContent} 
                            pageProcess={this.state.pageProcess} 
                            fontFamily={this.state.fontFamily}
                            />
                 </BoxShadow>    
            </Animated.View>
            <Animated.View ref={(refs)=>this.pageTwo = refs} style={[styles.page,{backgroundColor:this.state.backgroundColor,zIndex:this.state.pageTwoZIndex,transform:[{translateX:this.state.secondPageLeft}]}]}>
                <BoxShadow setting={shadowOpt}>
                    <Page   ref={(refs)=>this.voiceTwo = refs}
                            fontColor={this.state.fontColor} 
                            backgroundColor={this.state.backgroundColor}
                            contentTitle={this.state.contentTitle} 
                            fontSize={this.state.fontSize} 
                            lineHeight={this.state.lineHeight} 
                            playFlag={this.state.secondPlayFlag}
                            paragraphList={this.state.pageTwoContent} 
                            pageProcess={this.state.pageProcess} 
                            fontFamily={this.state.fontFamily}
                            />
                 </BoxShadow>    
            </Animated.View>
            <Animated.View ref={(refs)=>this.pageThree = refs} style={[styles.page,{backgroundColor:this.state.backgroundColor,zIndex:this.state.pageThreeZIndex,transform:[{translateX:this.state.thirdPageLeft}]}]}>
                <BoxShadow setting={shadowOpt}>
                    <Page   ref={(refs)=>this.voiceThree = refs}
                            fontColor={this.state.fontColor} 
                            backgroundColor={this.state.backgroundColor}
                            contentTitle={this.state.contentTitle} 
                            fontSize={this.state.fontSize} 
                            lineHeight={this.state.lineHeight} 
                            playFlag={this.state.thirdPlayFlag}
                            paragraphList={this.state.pageThreeContent} 
                            pageProcess={this.state.pageProcess} 
                            fontFamily={this.state.fontFamily}
                            />
                 </BoxShadow>    
            </Animated.View>
            <Animated.View style={{backgroundColor:'#ffffff',position:'absolute',bottom:0,zIndex:99,elevation:2,transform:[{translateY:this.state.bottom}]}}>
                <VoiceSpeed/>
                <View style={{height:176*lu,flexDirection:'row',alignItems:'center',borderBottomColor:'#f2f2f2',borderBottomWidth:0.5}}>
                    <VoiceSpeaker navigation={this.props.navigation}/>
                    <VoicePlayer ref={refs=>this.voicePlayer=refs} />
                    <TouchableOpacity onPress={()=>{this.goToBookMenu()}}>
                        <View style={{marginRight:30*lu,width:126*lu,marginLeft:30*lu,alignItems:'center'}}>
                            <Svg icon="readMenu" size={36*lu}/>
                            <Text style={{fontSize:20*lu,color:'#ff9b49',marginTop:10*lu}}>目录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{height:88*lu,justifyContent:'center',alignItems:'center',flexDirection:'row'}} onPress={()=>{this.closeVoice()}}>
                    <Svg icon="readColseVoice" size={30*lu}/>
                    <Text style={{fontSize:28*lu,color:'#ff9b49',marginLeft:14*lu}} includeFontPadding={false}>退出阅读</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>):null
    }
}
const {width,height} =  Dimensions.get('window');
const lu=width/750;
var styles=StyleSheet.create({
    center:{
        justifyContent:'center',
        alignItems:'center'
    },
    voiceView:{
        position:'absolute',
        left:0,
        bottom:0,
        right:0,
        top:0,
        zIndex:9999
    },
    page:{
        position:'absolute',
        left:0,
        width:width,
        height:height,
        elevation:1
    }
    
})