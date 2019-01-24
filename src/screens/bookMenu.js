import React,{Component} from 'react';
import {View,Text,StatusBar,FlatList,Dimensions,StyleSheet,TouchableNativeFeedback} from 'react-native';
import TitleBar from '../components/titleBar';
import appPathList from '../components/conf-app';
class Item extends Component{
    
    render(){
        let contentFontColor;
        if(this.props.type=="content"){
            if(this.props.id==this.props.currentContentId){
                contentFontColor='#ff9c4a';
            }else{
                contentFontColor='#989898';
            }
        }
        return this.props.type=="content"?(
            <TouchableNativeFeedback onPress={()=>{console.log(this.props.id)}}>
                <View style={styles.itemType}>
                    <Text style={[styles.itemFont,{color:contentFontColor}]}>{this.props.title}</Text>
                </View>
            </TouchableNativeFeedback>
        ):(
            <View style={[styles.itemType,{backgroundColor:'#f2f2f2'}]}>
                <Text style={[styles.itemFont,{color:'#656565'}]}>
                    {this.props.title}
                </Text>
            </View>
        )
    }
}
export default class BookMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            bookId:props.navigation.state.params.bookId,
            title:props.navigation.state.params.bookName,
            from:props.navigation.state.params.from,
            bookType:props.navigation.state.params.bookType,
            currentContentId:props.navigation.state.params.contentId,
            content:[]
        }
    }
    componentDidMount(){
        if(this.state.bookType=='online'){
            const url=appPathList.queryBookDirectory+'?bookId='+this.state.bookId;
            let that=this;
            fetch(url).then(res=>res.json()).then((res)=>{
                let data=res.bookCustom.volumeCustomList;
                that.handleDataOnline(data);
            })
        }
    }
    handleDataOnline(data){
        let arr=[];
        data.forEach((item)=>{
            arr.push({title:item.volumeName,type:'volume',id:item.volumeId});
            item.contentEntityList.forEach((subItem)=>{
                arr.push({title:subItem.contentTitle,type:'content',id:subItem.contentId})
            });
        })
        this.setState({
            content:arr
        })
    }
    back(){
        this.props.navigation.goBack();
        if(this.state.from=='voice'){
            StatusBar.setHidden(true,'none')
        }
    }
    render(){
        return(<View style={{flex:1}}>
            <TitleBar title={this.state.title} _onPress={()=>{this.back();}}/>
            <View style={{flex:1}}>
                <FlatList
                    removeClippedSubviews={true} 
                    getItemLayout={(data, index) => ({length:89*lu, offset: 89*lu * index, index})}
                    keyExtractor={(item,index) => index.toString()} 
                    data={this.state.content}
                    renderItem={({item,index}) => {
                        return (<Item {...item} currentContentId={this.state.currentContentId}/>)
                    }}
                    />
            </View>
        </View>)
    }
}
const {width,height} =  Dimensions.get('window');
const lu=width/750;
const styles=StyleSheet.create({
    itemType:{
        height:89*lu,
        borderBottomWidth:0.5,
        borderBottomColor:'#f2f2f2',
        justifyContent:'center'
    },
    itemFont:{
        fontSize:26*lu,
        marginLeft:30*lu
    }
})
