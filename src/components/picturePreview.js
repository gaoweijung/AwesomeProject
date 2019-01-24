import React,{Component} from 'react';
import {View,StatusBar,TouchableWithoutFeedback,DeviceEventEmitter} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';
export default class PicturePreView extends Component{
    constructor(props){
        super(props);
        this.state={
            showFlag:false,
            imgUrl:[{
                url:''
            }]
        }
        this.imgUrl=[{
            url:''
        }];
    }
    componentWillMount(){
        var that=this;
        this.listener=DeviceEventEmitter.addListener("showPicture",function(url){
            that.imgUrl[0].url=url;
            that.setState({
                showFlag:true,
                imgUrl:[{
                    url:url
                }]
            })
        })
    }
    componentWillUnmount(){
        if(this.listener){
            this.listener.remove();
        }
    }
    closeView(){
        this.setState({
            showFlag:false
        })
    }
    render (){
        return this.state.showFlag?(
                <View style={{position:'absolute',left:0,right:0,top:0,bottom:0,zIndex:9999}}>
                    <ImageViewer imageUrls={this.state.imgUrl} saveToLocalByLongPress={false} onClick={this.closeView.bind(this)}/>
                </View>):null
    }
}