import React, { Component } from 'react';
import Svg from '../components/svgs/Svg';
import RNFS from 'react-native-fs';
import SQLiteStorage from 'react-native-sqlite-storage';

import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    Modal,
    Alert,
    StatusBar,
    ToastAndroid,
    ScrollView,
    Dimensions,
    FlatList,
    NativeModules,
    TouchableOpacity,
    TouchableHighlight ,
    TouchableNativeFeedback,
    TouchableWithoutFeedback
   } from 'react-native';
class SortView extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            sortBtn:props.sortBtn,
            sortType:props.sortType
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            sortBtn:nextProps.sortBtn,
            sortType:nextProps.sortType
        })
    }
    render(){
        return (
        <Modal transparent={true} visible={this.state.sortBtn} onRequestClose={() => {}}  onShow={()=>{}}>
            
            <TouchableWithoutFeedback onPress={()=>{this.props.closeMenu()}}>
            
                <View style={{position:'absolute',left:0,top:0,right:0,bottom:0}}>
                <StatusBar barStyle={'dark-content'}/>
                    <View style={styles.sortBox}>
                        <TouchableNativeFeedback onPress={()=>{this.props.setSortType('byTime')}}>
                            <View style={styles.sortBoxPart}>
                                <Text style={[styles.sortBoxText,{color:this.state.sortType=='byTime'?'#ff9a49':'#656565'}]}>按时间排序</Text>
                                <View style={{marginLeft:6*lu}}>
                                {this.state.sortType=='byTime'?
                                    (<Svg icon="importSortB" size={24*lu}/>):( <Svg icon="importSortA" size={24*lu}/>)}
                                </View>    
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{this.props.setSortType('bySize')}}>
                            <View style={styles.sortBoxPart}>
                                <Text style={[styles.sortBoxText,{color:this.state.sortType=='bySize'?'#ff9a49':'#656565'}]}>按大小排序</Text>
                                <View style={{marginLeft:6*lu}}>
                                {this.state.sortType=='bySize'?
                                    (<Svg icon="importSortB" size={24*lu}/>):( <Svg icon="importSortA" size={24*lu}/>)}
                                </View>
                            </View>
                        </TouchableNativeFeedback>    
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>    )
    }
}
class TypeModal extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            typeBtn:props.typeBtn,
            importType:props.importType
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            typeBtn:nextProps.typeBtn,
            importType:nextProps.importType
        })
    }
    render(){
        return (
            
            <Modal transparent={true} visible={this.state.typeBtn} style={{}} onRequestClose={() => {}} presentationStyle='overFullScreen'>
                <TouchableWithoutFeedback onPress={()=>{this.props.closeMenu()}}>
                <View style={{position:'absolute',left:0,top:0,right:0,bottom:0,backgroundColor:"rgba(0,0,0,0.8)"}}>
                    <View style={{position:'absolute',width:176*lu,top:82*lu,left:60*lu,backgroundColor:'#ffffff',zIndex:20,elevation:20}}>
                        <TouchableNativeFeedback onPress={()=>{this.props.setTypeBtn('快速导入')}}>
                            <View style={{backgroundColor:'#ffffff'}}>
                                <Text style={[styles.typeView,{color:this.state.importType=='快速导入'?'#ff9a49':'#282828'}]}>快速导入</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={()=>{this.props.setTypeBtn('本地导入')}}>
                            <View  style={{backgroundColor:'#ffffff'}}>
                                <Text style={[styles.typeView,{color:this.state.importType=='本地导入'?'#ff9a49':'#282828'}]}>本地导入</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            </Modal>
           
        )
    }
}
class TitleView extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            importType:'快速导入',
            typeBtn:false,
            searchBtn:false,
            sortBtn:false,
            searchValue:props.searchValue,
            cancelBtn:props.cancelBtn,
            sortType:'byTime',
            currentPath:''
        }
        this.setTypeBtn=this.setTypeBtn.bind(this);
        this.setSortType=this.setSortType.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            cancelBtn:nextProps.cancelBtn,
            searchValue:nextProps.searchValue
        })
    }
    //快速导入和本地导入之间转换
    setTypeBtn(type){
        console.log(type)
        this.setState({
            'importType':type,
            'typeBtn':false
        });
        if(type=="本地导入"){
           this.props.importLocal('');
        }else{
            this.props.importQuick();
        }
    }
    //切换排序方式
    setSortType(type){
        this.setState({
            'sortType':type,
            'sortBtn':false
        })
        this.props.getSortType(type)
    }
    //返回上级目录
    backLevel(){
        var paths=this.props.currentPath.split("/");
        paths.pop();
        var upPath=paths.join('/');
        if(this.props.rootPath.length>upPath.length){
            return;
        }
        this.props.importLocal(upPath)
    }
    //关闭排序和快速导入菜单
    closeMenu(){
        this.setState({
            sortBtn:false,
            typeBtn:false
        })
    }
    render(){
        console.log("重绘")
        return (
            <View>
                <View style={styles.titleStyle}>
                    <TouchableOpacity onPress={() => {this.props.navigation.goBack()}}>
                        <View  style={{ height: 88*lu,width:92*lu,alignItems:'center',justifyContent:'center' }}>
                            <Svg icon='back' size={lu*32} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.setState({'typeBtn':true,'sortBtn':false});}}>
                        <View style={{justifyContent:'center',fontSize:'16',position:'relative',height: 88*lu,width:148*lu}}>
                            <Text>{this.state.importType}</Text>
                            <View style={{position:'absolute',right:0}}>
                                <Svg icon='seeMore' size={lu*30}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>{let flag=this.state.searchBtn;this.setState({'searchBtn':!flag,'typeBtn':false,'sortBtn':false});}} style={{position:'absolute',right:92*lu,height: 88*lu,justifyContent:'center'}}>
                        <Svg icon='reSearch' size={lu*32} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{let flag=this.state.sortBtn;this.setState({'sortBtn':true,'typeBtn':false});}} style={{position:'absolute',right:30*lu,height: 88*lu,justifyContent:'center'}}>
                        <Svg icon='sort' size={lu*32} />
                    </TouchableOpacity>
                    <TypeModal typeBtn={this.state.typeBtn} importType={this.state.importType} setTypeBtn={this.setTypeBtn} closeMenu={this.closeMenu.bind(this)}/>
                    <SortView sortBtn={this.state.sortBtn} sortType={this.state.sortType} setSortType={this.setSortType} closeMenu={this.closeMenu.bind(this)}/>
                </View>
                {/* 路径 */}
                {this.state.importType=="本地导入"&&this.state.searchBtn==false?(<View style={{flexDirection:'row',justifyContent:'space-between',height:88*lu,width:width,zIndex:10,backgroundColor:'#f2f2f2',alignItems:'center'}}>
                    <View style={{width:628*lu,marginLeft:30*lu}}>
                        <Text numberOfLines={1} ellipsizeMode='middle' style={{color:"#656565",fontSize:lu*26}}>{this.props.currentPath}</Text>
                    </View>
                    <TouchableOpacity style={{width:92*lu,height:88*lu,alignItems:'center',justifyContent:'center'}} onPress={this.backLevel.bind(this)}>
                        <View style={{width:32*lu}}>
                            <Svg icon="backLevel" size={32*lu}/>
                        </View>
                    </TouchableOpacity>
                </View>):null}
                {/* 搜索栏 */}
                {this.state.searchBtn?(
                    <View style={styles.searchBox}>
                        <TouchableOpacity onPress={()=>{this.setState({'searchBtn':false});this.props.closeSearch()}}>
                            <View style={{width:92*lu,height:88*lu,alignItems:'center',justifyContent:'center'}}>
                                <Svg icon='bDel' size={lu*32} />
                            </View>
                        </TouchableOpacity>
                        <View style={{flex:1,backgroundColor:'#f2f2f2',borderRadius:7*lu,height:58*lu,flexDirection:'row'}}>
                            <View style={{width:68*lu,justifyContent:'center',alignItems:'center'}}>
                                <Svg icon='search' size={lu*30}/>
                            </View>
                            <TextInput style={styles.textInputStyle} placeholder ="请输入关键字" ref='search' value={this.state.searchValue} onChangeText={this.props.searchFn}></TextInput>   
                            {this.state.cancelBtn?(<TouchableOpacity style={{width:68*lu,justifyContent:'center',alignItems:'center'}} onPress={()=>{
                                this.setState({
                                    searchValue:''
                                })
                            }}>
                                <Svg icon='sDel' size={lu*28}/>
                            </TouchableOpacity>):null}
                            
                            
                        </View>
                        <View style={{width:108*lu,justifyContent:'center'}}>
                            <Text style={{textAlign:'center',fontSize:32*lu,color:"#282828"}}>搜索</Text>
                        </View>
                    </View>):null
                }
            </View>
        )
    }
}
class QucikItem extends Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps,nextState){
        return (this.props.item != nextProps.item || this.props.chioced != nextProps.chioced);
    }
    render(){
        let type,bgColor,rightView;
        let item=this.props.item;
        if(item.filePath.indexOf('.txt')!=-1){
            type='TXT';
            bgColor='#43bdff'
        }else if(item.filePath.indexOf('.epub')!=-1){
            type='EPUB';
            bgColor='#ff9b49';
        }else if(item.type=='application/pdf'){
            type='PDF';
            bgColor='#ff4273';
        }
        if(item.imported){
            rightView=(<View style={{width:164*lu,alignItems:'center',justifyContent:'center'}}>
                <Text style={{color:'#989898',fontSize:26*lu}}>已在书架</Text>
            </View>)
        }else{
            if(item.chioced){
                rightView=(<View style={{width:164*lu,alignItems:'center',justifyContent:'center'}}>
                    <View style={{width:30*lu,height:30*lu,borderRadius:15*lu,borderWidth:1,borderColor:'#ff9b49',justifyContent:'center',alignItems:'center'}}>
                        <View style={{width:20*lu,height:20*lu,borderRadius:10*lu,backgroundColor:'#ff9b49'}}></View>
                    </View>
                </View>)
            }else{
                rightView=(<View style={{width:164*lu,alignItems:'center',justifyContent:'center'}}>
                   <View style={{width:30*lu,height:30*lu,borderRadius:15*lu,borderWidth:1,borderColor:'#ff9b49'}}>
                       
                    </View>
                </View>)
            }
        }
        return (
                <TouchableNativeFeedback onPress={this.props.onPress}>
                <View style={styles.part}>
                    <View style={{width:560*lu}}>
                        <View style={styles.partLeftTop}>
                            <Text style={{...styles.partType,backgroundColor:bgColor}}>
                            {type}
                            </Text>
                            <Text style={styles.partName} numberOfLines={1}>{item.title}</Text>
                        </View>
                        <View style={styles.partLeftBottom}>
                            <Text style={styles.partTime}>{this.props.changeDateType(item.date)}</Text>
                            <Text style={{...styles.partTime,marginLeft:20*lu}}>{this.props.reSize(item.size)}</Text>
                        </View>
                    </View>
                    {rightView}
                </View>
                </TouchableNativeFeedback>)
    }
}

class LocalItem extends Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps,nextState){
        return (this.props.item != nextProps.item ||this.props.chioced!=nextProps.chioced);
    }
    render(){
        let type,bgColor;
        item=this.props.item;
        if(item.folder){
            item=item.folder;
            return (
                <TouchableNativeFeedback onPress={()=>{this.props.importLocal(this.props.filePath)}}>
                    <View style={{flexDirection:'row',alignItems:'center',height:120*lu,borderBottomWidth:1,borderBottomColor:'#c3c3c3'}}>
                    
                        <View style={{marginLeft:30*lu,position:'relative'}}>
                            <Text style={{fontSize:65*lu,fontFamily:'icomoon',color:'#ce9f08',position:'absolute'}}>
                                &#xe900;
                            </Text>
                            <Text style={{fontSize:65*lu,fontFamily:'icomoon',color:'#ffcd2e'}}>
                                &#xe901;
                            </Text>
                        </View>    
                        <View style={{marginLeft:20*lu}}>
                            <Text style={{color:'#282828',fontSize:28*lu}}>{item.fileName}</Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            )
        }else{
            if(item.file.filePath.indexOf('.txt')!=-1){
                type='TXT';
                bgColor='#43bdff'
            }else if(item.file.filePath.indexOf('.epub')!=-1){
                type='EPUB';
                bgColor='#ff9b49';
            }else if(item.file.type=='application/pdf'){
                type='PDF';
                bgColor='#ff4273';
            }
            if(item.imported){
                rightView=(<View style={{width:164*lu,alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#989898',fontSize:26*lu}}>已在书架</Text>
                </View>)
            }else{
                if(item.chioced){
                    rightView=(<View style={{width:164*lu,alignItems:'center',justifyContent:'center'}}>
                        <View style={{width:30*lu,height:30*lu,borderRadius:15*lu,borderWidth:1,borderColor:'#ff9b49',justifyContent:'center',alignItems:'center'}}>
                            <View style={{width:20*lu,height:20*lu,borderRadius:10*lu,backgroundColor:'#ff9b49'}}></View>
                        </View>
                    </View>)
                }else{
                    rightView=(<View style={{width:164*lu,alignItems:'center',justifyContent:'center'}}>
                       <View style={{width:30*lu,height:30*lu,borderRadius:15*lu,borderWidth:1,borderColor:'#ff9b49'}}>
                           
                        </View>
                    </View>)
                }
            }
            return (
               <TouchableNativeFeedback onPress={this.props.onPress}> 
            <View style={styles.part}>
                <View style={{width:560*lu}}>
                    <View style={styles.partLeftTop}>
                        <Text style={{...styles.partType,backgroundColor:bgColor}}>
                        {type}
                        </Text>
                        <Text style={styles.partName} numberOfLines={1}>{item.file.title}</Text>
                    </View>
                    <View style={styles.partLeftBottom}>
                        <Text style={styles.partTime}>{this.props.changeDateType(item.file.date/1000)}</Text>
                        <Text style={{...styles.partTime,marginLeft:20*lu}}>{this.props.reSize(item.file.size)}</Text>
                    </View>
                </View>
                {rightView}
            </View>
            </TouchableNativeFeedback>)
        }
    }
}

export default class ImportView extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            db:{},
            books:[],
            bookList: [],
            sdFileList:[],
            sdBookList:[],
            sdFolderList:[],
            searchResult:[],
            importedList:[],
            searchFlag:false,
            searchValue:'',
            rootPath:'',
            bookNum:0,
            cancelBtn:false,
            importType:'快速导入',
            quickImportNum:0,
            localImportNum:0,
        }
        this.importLocal=this.importLocal.bind(this);
        this.importQuick=this.importQuick.bind(this);
        this.searchFn=this.searchFn.bind(this);
        this.closeSearch=this.closeSearch.bind(this);
        this.getSortType=this.getSortType.bind(this)
    }
    //获取排序方式
    getSortType(type){
        var list=this.state.books;
        if(type=="byTime"){
            list=this.sortByTime(list);
            this.setState({books:list})
        }else{
            list=this.sortBySize(list);
            this.setState({books:list})
        }
    }
    //按时间排序
    sortByTime(array){
        if (array.length <= 1){
            return array;
        }else{
            var proiindex = Math.floor(array.length / 2);
            var proift = array.splice(proiindex, 1)[0]; //找基准，并把基准从原数组删除
            var left = [];
            var right = [];
            for (var i = 0; i < array.length; i++) {
                if (parseInt(array[i].date||array[i].file.date) >= parseInt(proift.date||proift.file.date)) {
                    left.push(array[i]);
                } else {
                    right.push(array[i]);
                }
            }
            return this.sortByTime(left).concat([proift],this.sortByTime(right));
        }
    }
    //按文件大小排序
    sortBySize(array){
        if (array.length <= 1){
            return array;
        }else{
            var proiindex = Math.floor(array.length / 2);
            var proift = array.splice(proiindex, 1)[0]; //找基准，并把基准从原数组删除
            var left = [];
            var right = [];
            for (var i = 0; i < array.length; i++) {
                if (parseInt(array[i].size) <= parseInt(proift.size)) {
                    left.push(array[i]);
                } else {
                    right.push(array[i]);
                }
            }
            return this.sortBySize(left).concat([proift], this.sortBySize(right));
        }
    }
    //搜索框关闭时触发回调
    closeSearch(){
        this.setState({'searchFlag':false});
    }
    //在个位数前面加‘0’
    toDouble(num) {
        if (num < 10) {
            return "0" + num.toString();
        } else {
            return num;
        }
    }
    //将日期转换成年月日格式
    changeDateType(time){
        var unixTimestamp = new Date(time*1000);
        return unixTimestamp.getFullYear() +"/" +this.toDouble(unixTimestamp.getMonth() + 1) +"/" +this.toDouble(unixTimestamp.getDate());
    }
    //调用原生GetMedia方法获取媒体库中所有txt、epub、pdf文件
    componentDidMount(){
        var that=this;
        var db=this.createDB();
        this.setState({
            db:db
        });
        setTimeout(() => {
            that.importQuick(db);
        }, 100);
        
    };
    importQuick(db){
        var that=this,importedList=[];
        var database=db||this.state.db;
        database.transaction((tx)=>{
            tx.executeSql("select * from LocalBooks", [],(tx,results)=>{
                var len = results.rows.length;
                for(let i=0; i<len; i++){
                    var u = results.rows.item(i);
                    importedList.push(u.filePath)
                    console.log(u.bookId)
                }
                NativeModules.GetMedia.getAllBooks(function(res){
                    let data=JSON.parse(res.replace(/\'/g,'"')),list=[];
                    data.forEach((item,i)=>{
                        item.chioced=false;
                        item.imported=false;
                        for(var j=0;j<importedList.length;j++){
                            if(item.filePath==importedList[j]){
                                item.imported=true;
                                break;
                            }
                        }
                        list.push(item);
                    })
                    list=that.sortByTime(list);
                    that.setState({'books':list,'bookNum':list.length,importType:'快速导入',quickImportNum:0, importedList:importedList});
                })
            });
        },(error)=>{//打印异常信息
            console.log(error);
        });
    }
    //搜索当前文件
    searchFn(value){
        var list,that=this,searchResult=[];
        if(this.state.importType=='快速导入'){
            list=this.state.books;
            list.forEach(function(item){
                if(item.title.toLowerCase().indexOf(value)!=-1){
                    searchResult.push(item)
                }
            });
        }else{
            list=this.state.sdFileList;
            list.forEach(function(item){
                if(item.folder&&item.folder.fileName.toLowerCase().indexOf(value)!=-1){
                    searchResult.push(item) 
                }else if(item.file&&item.file.title.toLowerCase().indexOf(value)!=-1){
                    searchResult.push(item)
                }
            });
        }
        if(value==''){
            this.setState({searchResult:searchResult,searchFlag:true,cancelBtn:false,searchValue:value})
        }else{
            this.setState({searchResult:searchResult,searchFlag:true,cancelBtn:true,searchValue:value})
        }
        
    }
    //本地导入
    importLocal(path){
        var that=this;
        NativeModules.GetMedia.getSDFiles(path,function(sdPath,res){
            var data="["+res.substr(0,res.length-1)+"]",currentPath,list=[],books=[],folders=[];
            var importedList=that.state.importedList;
            data=JSON.parse(data.replace(/\'/g,'"'));
            if(path==''){
                currentPath=sdPath;
            }else{
                currentPath=path;
            }
            data.forEach(item => {
                
                if(item.folder){
                    folders.push(item)
                }else{
                    item.chioced=false;
                    item.imported=false;
                    for(var j=0;j<importedList.length;j++){
                        if(item.file.filePath==importedList[j]){
                            item.imported=true;
                            break;
                        }
                    }
                    books.push(item)
                }
            });
            books=that.sortByTime(books);
            list=books.concat(folders);
            that.setState({rootPath:sdPath,sdFileList:list,sdBookList:books,sdFolderList:folders,currentPath:currentPath,importType:'本地导入',localImportNum:0});
            
        })
    }
    //每项按钮触发事件
    changeItem(item,index){
        if(this.state.importType=="快速导入"){
            let list=this.state.books,quickImportNum=this.state.quickImportNum;
            if(list[index].imported==false){
                if(list[index].chioced){
                    list[index].chioced=false;
                    quickImportNum--;
                }else{
                    list[index].chioced=true;
                    quickImportNum++;
                }
            }else{
                return
            }
            this.setState({books:list,quickImportNum:quickImportNum});
        }else{
            let list=this.state.sdBookList,localImportNum=this.state.localImportNum;
           
            if(list[index].imported==false){
                if(list[index].chioced){
                    list[index].chioced=false;
                    localImportNum--;
                }else{
                    list[index].chioced=true;
                    localImportNum++;
                }
            }else{
                return
            }
            let files=list.concat(this.state.sdFolderList);
            this.setState({sdFileList:files,localImportNum:localImportNum,sdBookList:list});
        }
        
    }
    //全选
    chioceAll(){
        let list=[];
        if(this.state.importType=="快速导入"){
            list=this.state.books;
            if(this.state.quickImportNum==list.length){
                list=list.map(item=>{
                    item.chioced=false;
                    return item
                })
                this.setState({'books':list,quickImportNum:0})
            }else{
                list=list.map(item=>{
                    item.chioced=true;
                    return item
                })
                this.setState({'books':list,quickImportNum:list.length})
            }
           
        }else{
            list=this.state.sdBookList;
            if(this.state.localImportNum==list.length){
                list=list.map(item=>{
                    item.chioced=false;
                    return item
                })
                let files=list.concat(this.state.sdFolderList);
                this.setState({
                    sdBookList:list,
                    sdFileList:files,
                    localImportNum:0
                })
            }else{
                list=list.map(item=>{
                    item.chioced=true;
                    return item
                })
                let files=list.concat(this.state.sdFolderList);
                this.setState({
                    sdBookList:list,
                    sdFileList:files,
                    localImportNum:list.length
                })
            }
            
           
        }
    }
    //获取选中的文件列表
    getChiocedList(){
        let array=[];
        if(this.state.importType=="快速导入"){
            this.state.books.forEach(item=>{
                if(item.chioced==true&&item.imported==false){
                    array.push(item);
                }
            })
        }else{
            this.state.sdBookList.forEach(item=>{
                if(item.chioced==true&&item.imported==false){
                    array.push(item.file)
                }
            })
        }
        return array;
    }
    //删除文件提示框
    delFiles(){
        let delList=[];
        let that=this;
        delList=this.getChiocedList();
        if(delList.length==0){
            ToastAndroid.show('请选择需要删除的图书！', ToastAndroid.SHORT);
            return;
        }
        Alert.alert(
            '删除图书',
            "确定删除图书？",
            [
              {text: '取消', onPress: () => {}},
              {text: '确定', onPress: () => {that.delFn(delList)}},
            ],
            { cancelable: false }
        )
    }
    //删除文件
    delFn(array){
        let len=array.length;
        var that=this;
        array.forEach((item,index)=>{
            RNFS.unlink(item.filePath)
                .then(() => {
                   
                    console.log('FILE DELETED');
                    NativeModules.GetMedia.reshenMedia(item.filePath);
                    console.log(index+'--'+len)
                    if(index==len-1){
                        ToastAndroid.show('图书删除成功', ToastAndroid.SHORT);
                        if(that.state.importType=="快速导入"){
                            var list=that.state.books;
                            for(var i=0;i<array.length;i++){
                                for(var j=0;j<list.length;j++){
                                    if(array[i].date==list[j].date){
                                        list.splice(j,1);
                                        j=j-1;
                                    }
                                }
                            }
                            this.setState({books:list,quickImportNum:0,bookNum:list.length});
                        }else{
                            that.importLocal(that.state.currentPath);
                        }
                        
                    }
                })
                .catch((err) => {
                    i++;
                    console.log("删除失败"+err.message);
                });
        })
        
    }
    reSize(size){
        var s='';
        if(size>1024*1024){
            s=(size/1024/1024).toFixed(2)+'M';
        }else{
            s=(size/1024).toFixed(2)+'K'
        }
        return s;
    }
    //创建sqlite数据库
    createDB(fn){
        var db = SQLiteStorage.openDatabase(
        'qcacg.db',
        "1.0",
        'qcacgBooks',
        -1,
        ()=>{
            console.log('open');
        },
        (err)=>{
            console.log('open',err);
        });
        db.transaction((tx)=> {
            tx.executeSql('CREATE TABLE IF NOT EXISTS LocalBooks(' +
                'id INTEGER PRIMARY KEY  AUTOINCREMENT,' +
                'bookId VARCHAR,'+
                'bookTitle VARCHAR,' +
                'filePath VARCHAR,' +
                'menu VARCHAR,' +
                'bookCoverImage VARCHAR,' +
                'type VARCHAR,' +
                'isOPS BOOLEAN)'
                , [], ()=> {
                    console.log('创建成功');
                }, (err)=> {
                    console.log('创建失败', err);
              });
          }, (err)=> {//所有的 transaction都应该有错误的回调方法，在方法里面打印异常信息，不然你可能不会知道哪里出错了。
            console.log('transaction', err);
          }, ()=> {
            console.log('transaction');
          })
        return db;
    }
    //导入到数据库
    importToDB(){
        let importList=[];
        importList=this.getChiocedList();
        console.log(importList)
        if(importList.length==0){
            ToastAndroid.show('请选择需要导入的图书！', ToastAndroid.SHORT);
            return;
        }
        this.state.db.transaction(tx=>{
            tx.executeSql("select * from LocalBooks", [],(tx,results)=>{
                var len = results.rows.length;
                importList.forEach((item,i)=>{
                    let bookId='book'+(i+len);
                    let bookTitle=item.title;
                    let filePath=item.filePath;
                    let type;
                    if(item.title.indexOf('.txt')!=-1){
                        type='TXT';
                    }else if(item.title.indexOf('.epub')!=-1){
                        type='EPUB';
                    }else if(item.title=='application/pdf'){
                        type='PDF';
                    }
                    let sql="INSERT INTO LocalBooks(bookId,bookTitle,filePath,type)"+"values(?,?,?,?)"
                    tx.executeSql(sql,[bookId,bookTitle,filePath,type],()=>{
                        console.log('插入成功')
                    },(err)=>{
                        console.log(err);
                    }
                  );
                });
            });
        })
    }
    render(){
        let renderList=[],choiceNum;
        if(this.state.searchFlag==true){
            renderList=this.state.searchResult;
        }else{
            renderList=this.state.importType=="快速导入"?this.state.books:this.state.sdFileList
        }
        if(this.state.importType=='快速导入'){
            choiceNum=this.state.quickImportNum;
        }else{
            choiceNum=this.state.localImportNum;
        }
        return (
            
            <View style={{position:'relative',flex:1,backgroundColor:'#ffffff'}}> 
                <View style={{height:40*lu}}></View>
                {/* 头部 */}
                
                <TitleView importLocal={this.importLocal} 
                    navigation={this.props.navigation} 
                    currentPath={this.state.currentPath} 
                    rootPath={this.state.rootPath} 
                    importQuick={this.importQuick} 
                    searchFn={this.searchFn} 
                    cancelBtn={this.state.cancelBtn} 
                    searchValue={this.state.searchValue}
                    closeSearch={this.closeSearch}
                    getSortType={this.getSortType}/>
                
                {/* 内容部分 */}
                <View style={{ flex:1}}>
                    <ScrollView>
                    <FlatList
                        removeClippedSubviews={true} 
                        getItemLayout={(data, index) => ({length:89*lu, offset: 89*lu * index, index})}
                        keyExtractor={(item,index) => (index + '1')} 
                        data={renderList}
                        renderItem={({item,index}) => {
                            if(this.state.importType=="快速导入"){
                                return <QucikItem item={item} chioced={item.chioced} changeDateType={this.changeDateType.bind(this)} reSize={this.reSize.bind(this)} onPress={()=>{this.changeItem(item,index)}}/>
                            }else{
                                return <LocalItem item={item} folder={item.folder} chioced={item.chioced} filePath={item.folder?item.folder.filePath:''} importLocal={this.importLocal} changeDateType={this.changeDateType.bind(this)} reSize={this.reSize.bind(this)} onPress={()=>{this.changeItem(item,index)}}/>
                            }
                        }}
                        />
                       </ScrollView>
                    
                </View>
                {/* 底部 */}
                <View style={styles.footer}>
                    <TouchableNativeFeedback  onPress={this.chioceAll.bind(this)}>
                        <View style={{marginLeft:30*lu}}>
                            <Text style={{color:'#282828',fontSize:28*lu,lineHeight:98*lu}}>
                                全选（
                                <Text style={{color:'#ff4273',fontSize:28*lu}}>共{this.state.importType=='快速导入'?this.state.bookNum:this.state.sdBookList.length}本</Text>
                                ）
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View  style={{flexDirection:'row'}}>
                        <TouchableNativeFeedback onPress={this.delFiles.bind(this)}>
                            <View style={{width:124*lu}}>
                                <Text style={{textAlign:'center',fontSize:32*lu,color:choiceNum>0?'rgba(40,40,40,1)':'rgba(40,40,40,0.38)',lineHeight:98*lu}}>删除</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableHighlight onPress={()=>{this.importToDB()}}>
                            <View style={{backgroundColor:choiceNum>0?'#ff9b49':'#ffd7b6',width:188*lu,height:98*lu}}>
                                <View style={{marginTop:22*lu}}>
                                    <Text style={{color:'#fff',fontSize:32*lu,lineHeight:32*lu,textAlign:'center'}}>导入书架</Text>
                                </View>
                                <View style={{flexDirection:'row',flex:1,marginTop:6*lu}}>
                                    <View style={{marginLeft:36*lu}}>
                                        <Svg icon='cart' size={lu*24} />
                                    </View>
                                    <Text style={{color:'#fff',fontSize:28*lu,lineHeight:28*lu,marginLeft:12*lu}}>{choiceNum}本</Text>
                                </View>
                            </View>
                        </TouchableHighlight >
                    </View>
                </View>
            </View>
        )
    }
}
const {width,height} =  Dimensions.get('window');
const lu=width/750;
const styles=StyleSheet.create({
    searchBox:{
        
        width:width,
        height:87*lu,
        backgroundColor:'#ffffff',
        zIndex:3,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2'
    },
    textInputStyle:{
        flex:1,
        fontSize:28*lu,
        paddingVertical: 0
    },
    sortBox:{
        position:'absolute',
        right:15*lu,
        top:74*lu,
        zIndex:30,
        backgroundColor:'#fff',
        elevation:10
    },
    sortBoxPart:{
        height:88*lu,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width:220*lu
    },
    sortBoxText:{
        color:'#656565',
        fontSize:28*lu
    },
    titleStyle:{
        flexDirection:'row',
        position:'relative',
        borderBottomWidth:1,
        borderBottomColor:"#f2f2f2",
        position:'relative',
        zIndex:10,      
    },
    typeView:{
        fontSize:28*lu,
        height:92*lu,
        lineHeight:92*lu,
        textAlign:'center'
    },
    mainStyle:{
        backgroundColor:'#ffffff',
        position:'relative'
    },
    part:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#c3c3c3'
    },
    partLeftTop:{
        flexDirection:'row',
        height:76*lu,
        marginLeft:30*lu,
        alignItems:'center'
    },
    partLeftBottom:{
        flexDirection:'row',
        height:24*lu,
        marginLeft:30*lu,
        alignItems:'center',
        marginBottom:20*lu
    },
    partType:{
        width:62*lu,
        height:28*lu,
        color:'#fff',
        fontSize:18*lu,
        lineHeight:28*lu,
        borderRadius:3*lu,
        textAlign:'center'
    },
    partName:{
        marginLeft:20*lu,
        color:'#282828',
        fontSize:28*lu
    },
    partTime:{
        fontSize:24*lu,
        color:'#989898',
        lineHeight:24*lu
    },
    footer:{
        height:98*lu,
        flexDirection:'row',
        borderTopWidth:1,
        justifyContent:'space-between',
        borderTopColor:'#f2f2f2'
    }
})