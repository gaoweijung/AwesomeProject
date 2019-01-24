import React,{Component} from 'react';
import Svg from '../components/svgs/Svg';
import SQLiteStorage from 'react-native-sqlite-storage';
import {
    View,
    Text,
    Alert,
    Dimensions,
    StyleSheet,
    Modal,
    ToastAndroid,
    ScrollView,
    TouchableWithoutFeedback,
    TouchableHighlight,
    TouchableOpacity,
    
}from 'react-native';
class BookcaseMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            menuBtn:props.menuBtn
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            menuBtn:nextProps.menuBtn
        })
    }
    render(){
        return(
        <Modal transparent={true} visible={this.state.menuBtn} onRequestClose={()=>{}}>
            <TouchableWithoutFeedback onPress={()=>{this.props.closeMenu()}}>
                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0}}>
                    <View style={{position:'absolute',right:25*lu,top:74*lu,elevation:3,backgroundColor:'#fff'}}>
                        <View style={styles.menuItem}>
                            <View style={styles.menuItemSvg}>
                                <Svg icon="bookcaseBook" size={26*lu}/>
                            </View>
                            <Text style={styles.menuItemFont}>云端书架</Text>
                        </View>
                        <View style={styles.menuItem}>
                            <View style={styles.menuItemSvg}>
                                <Svg icon="localImport" size={26*lu}/>
                            </View>
                            <Text style={styles.menuItemFont}>本地导入</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{this.props.editBookcase()}}>
                            <View style={styles.menuItem}>
                                <View style={styles.menuItemSvg}>
                                    <Svg icon="bookcaseSetting" size={26*lu}/>
                                </View>
                                <Text style={styles.menuItemFont}>编辑书架</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.menuItem}>
                            <View style={styles.menuItemSvg}>
                                <Svg icon="bookcaseRecords" size={26*lu}/>
                            </View>
                            <Text style={styles.menuItemFont}>历史记录</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>)
    }
}
class TitleBar extends Component{
    constructor(props){
        super(props);
        this.state={
            menuBtn:props.menuBtn
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            menuBtn:nextProps.menuBtn
        })
    }
    render(){
        return (
            <View>
            <View style={{height:40*lu}}></View> 
            <View style={styles.titleBar}>
                <View style={{width:130*lu,justifyContent:'center',alignItems:'center'}}>
                    <Text style={[styles.headerPhoto]}>&#xe906;</Text>
                </View>
                <View style={{flex:1}}>
                    <Text style={{fontSize:32*lu,color:'#323232',textAlign:'center',lineHeight:88*lu}}>书架</Text>
                 </View>
                <TouchableOpacity onPress={()=>{this.setState({menuBtn:true})}}>
                    <View style={{width:100*lu,height:88*lu,justifyContent:'center',alignItems:'center'}}>
                        <Svg icon="bookcaseMenu" size={32*lu}/>
                    </View>
                </TouchableOpacity>
                <BookcaseMenu menuBtn={this.state.menuBtn} closeMenu={this.props.closeMenu} editBookcase={this.props.editBookcase}/>
            </View>
         </View>    
        )
    }
}

class Book extends Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        return this.props.selectedFlag!=nextProps.selectedFlag||this.props.editFlag!=nextProps.editFlag;
    }
    render(){
        return (
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ReadView",{filePath:this.props.filePath,bookTitle:this.props.bookTitle})}}>   
        <View style={{marginRight:(this.props.index+1)%3!=0?40*lu:0}}>
            <View style={styles.bookStyle}>
                {this.props.editFlag?
                (<TouchableWithoutFeedback onPress={()=>{this.props.selectBook(this.props.index)}}>
                    <View style={styles.bookModalStyle}>
                    { this.props.selectedFlag?
                        (<Svg icon='selected' size={88*lu}/>):
                        (<Svg icon='unselected' size={88*lu}/>)
                        }
                    </View>
                </TouchableWithoutFeedback>):null}
            </View>
            <View style={{height:70*lu}}>
                <Text style={{width:200*lu,textAlign:'center',lineHeight:70*lu,fontSize:26*lu,color:'#656565'}} numberOfLines={1}>{this.props.bookTitle}</Text>
            </View>
        </View>
        </TouchableOpacity>)
    }
}
export default class Bookcase extends Component{
    constructor(props){
        super(props);
        this.state={
            localList:[],
            selectNum:0,
            db:{},
            editFlag:false,
            menuBtn:false
        }
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
                'bookId varchar,'+
                'bookTitle VARCHAR,' +
                'filePath VARCHAR,' +
                'menu VARCHAR,' +
                'bookCoverImage VARCHAR,' +
                'type VARCHAR,' +
                'isOPS boolean)'
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
    componentDidMount(){
        var that=this;
        let db=this.createDB();
       
            this.setState({
                db:db
            })
            this.getLocalBooks(db);
    }
    //获取本地列表
    getLocalBooks(db){
        var database=db||this.state.db;
        var localList=[];
        database.transaction(tx=>{
            tx.executeSql("select * from LocalBooks", [],(tx,results)=>{
                var len = results.rows.length;
                for(let i=0; i<len; i++){
                    var u = results.rows.item(i);
                    localList.push({
                        filePath:u.filePath,
                        bookTitle:u.bookTitle,
                        bookId:u.bookId,
                        selectedFlag:false,
                        
                    });
                }
                this.setState({
                    localList:localList
                })
            })
        })
    }
    //单选
    selectBook(index){
        var list=this.state.localList;
        var selectNum=this.state.selectNum;
        if(list[index].selectedFlag){
            list[index].selectedFlag=false;
            selectNum--;
        }else{
            list[index].selectedFlag=true;
            selectNum++;
        }
        this.setState({
            selectNum:selectNum,
            localList:list
        })
    }
    //全选
    selectAll(){
        var list=this.state.localList;
        var selectNum=this.state.selectNum;
        if(this.state.selectNum==list.length){
            list=list.map(item=>{item.selectedFlag=false;return item});
            selectNum=0;
        }else{
            list=list.map(item=>{item.selectedFlag=true;return item});
            selectNum=list.length;
        }
        this.setState({
            selectNum:selectNum,
            localList:list
        })
    }
    //从本地列表中删除选中的图书
    delSelected(){
        var delList=[];
        var that=this;
        that.state.localList.forEach(item=>{
            if(item.selectedFlag){
                delList.push(item.bookId)
            }
        })
        if(delList.length==0){
            ToastAndroid.show('请选择需要删除的图书！', ToastAndroid.SHORT);
            return
        }
        Alert.alert(
            '删除图书',
            "确定删除图书？",
            [
              {text: '取消', onPress: () => {}},
              {text: '确定', onPress: () => {
                this.state.db.transaction(tx=>{
                    delList.forEach((item,i)=>{
                        tx.executeSql('DELETE FROM LocalBooks WHERE bookId=?', [item], function() {
                            if(i==delList.length-1){
                                ToastAndroid.show('删除完成', ToastAndroid.SHORT);
                                that.getLocalBooks();
                            }
                        }, function(tx, err) {
                            console.log(err.message)
                        })
                    })
                })
              }},
            ],
            { cancelable: false }
        )
       
        console.log(delList)
    }
    //编辑书架
    editBookcase(){
        this.setState({
            editFlag:true,
        })
    }
    //取消编辑
    cancelEdit(){
        let list=this.state.localList;
        list=list.map(item=>{item.selectedFlag=false;return item});
        let selectNum=0;
        this.setState({
            editFlag:false,
            localList:list,
            selectNum:selectNum
        })
    }
    //关闭菜单
    closeMenu(){
        this.setState({
            menuBtn:false
        })
    }
    render(){
        let bookList=[];
        this.state.localList.forEach((item,i)=>{
            bookList.push(<Book {...item} index={i} key={i} editFlag={this.state.editFlag} selectBook={this.selectBook.bind(this)} navigation={this.props.navigation}/>)
        })
        return (
            <View style={{backgroundColor:'#fff',height:height}}>
               <TitleBar editBookcase={this.editBookcase.bind(this)} closeMenu={this.closeMenu.bind(this)} menuBtn={this.state.menuBtn}/>
               {/* 最近阅读  编辑 */}

               {this.state.editFlag?(<View style={styles.editorBoxStyle}>
                        <TouchableOpacity onPress={()=>{this.selectAll()}}>
                            <View style={{justifyContent:'center',height:74*lu}}>
                                <Text style={styles.fontNormal}>全选</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.delSelected()}}>
                            <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center',height:70*lu}}>
                                <Svg icon="bookcaseDelete" size={28*lu}/>
                                <Text style={[styles.fontNormal,{color:'#ff9a4a',lineHeight:34*lu,marginLeft:28*lu}]}>删除</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{this.cancelEdit()}}>
                            <View style={{justifyContent:'center',height:74*lu}}>
                                <Text style={styles.fontNormal}>完成</Text>
                            </View>
                        </TouchableOpacity>
                    </View>):(
                   <View style={styles.newRead}>
                       <View style={{marginLeft:20*lu}}>
                            <View style={{flexDirection:'row',height:90*lu,alignItems:'center',marginTop:14*lu}}>
                                <View>
                                   <Svg icon="bookcaseItinerary" size={32*lu}/>
                                </View>
                                <Text style={{color:'#ff9b49',fontSize:28*lu,lineHeight:36*lu,marginLeft:16*lu}}>最近阅读：启明星</Text>
                                <View>
                                    <Svg icon="bookcaseEnter" size={32*lu}/>
                                </View>
                            </View>
                            <View>
                                <Text style={{marginLeft:50*lu,color:"#656565",fontSize:24*lu}}>第七章 测试</Text>
                            </View>
                       </View>
                       <View style={{height:176*lu,justifyContent:'center',marginRight:20*lu}}>
                            <View style={styles.signBtn}>
                                <View>
                                    <Svg icon="signin" size={30*lu}/>
                                </View>
                                <Text style={{color:'#fff',fontSize:28*lu,marginLeft:10*lu,lineHeight:33*lu}}>
                                    签到
                                </Text>
                            </View>
                       </View>
                   </View>)}
               {/* 书籍列表 */}
               <View style={{flex:1,backgroundColor:'#fff'}}>
                   <ScrollView style={{marginLeft:30*lu,marginRight:30*lu,backgroundColor:'#fff'}} showsVerticalScrollIndicator={false}>
                        <View style={{flexDirection: 'row',flexWrap:'wrap'}}>
                            {bookList}
                            <View>
                                <View style={styles.bookStyle}>
                                    <Svg icon="bookcaseAdd" size={86*lu}/>
                                </View>
                                <View style={{height:70*lu}}></View>
                            </View>    
                        </View>
                   </ScrollView>
               </View>
            </View>    
        )
    }
}
const {width,height} =  Dimensions.get('window');
const lu=width/750;
var styles=StyleSheet.create({
    titleBar:{
        height:88*lu,
        flexDirection:'row'
    },
    headerPhoto:{
        width:54*lu,
        height:54*lu,
        backgroundColor:'#999',
        borderRadius:27*lu,
        textAlign:'center',
        lineHeight:54*lu,
        fontFamily:'icomoon2',
        color:'#fff',
        fontSize:40*lu
    },
    newRead:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:30*lu,
        marginRight:30*lu,
        backgroundColor:"#fff",
        elevation:10
    },
    menuItem:{
        width:236*lu,
        height:88*lu,
        flexDirection:'row'
    },
    menuItemSvg:{
        width:88*lu,
        justifyContent:'center',
        alignItems:'center'
    },
    menuItemFont:{
        fontSize:28*lu,
        color:'#ff9b49',
        lineHeight:88*lu
    },
    signBtn:{
        width:160*lu,
        height:58*lu,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ff6a91" ,
        borderTopStartRadius:26*lu,
        borderTopLeftRadius:22*lu,
        borderTopEndRadius:26*lu,
        borderTopRightRadius:22*lu,
        borderBottomStartRadius:26*lu,
        borderBottomLeftRadius:22*lu,
        borderBottomEndRadius:26*lu,
        borderBottomRightRadius:22*lu,
    },
    bookStyle:{
        width:200*lu,
        height:286*lu,
        backgroundColor:'#f2f2f2',
        borderRadius:5*lu,
        marginTop:50*lu,
        elevation:3,
        justifyContent:'center',
        alignItems:'center',
        position:'relative'
    },
    fontNormal:{
        fontSize:28*lu,
        color:"#656565",
        lineHeight:28*lu
    },
    editorBoxStyle:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:74*lu,
        borderBottomColor:'#c3c3c3',
        borderBottomWidth:1,
        borderTopColor:'#c3c3c3',
        borderTopWidth:1,
    },
    bookModalStyle:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        bottom:0,
        backgroundColor:'rgba(0,0,0,0.3)',
        borderRadius:5*lu,
        justifyContent:'center',
        alignItems:'center'
    }
})