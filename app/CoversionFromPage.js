'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,

    Image,
    Alert,
    TextInput,

} from 'react-native';
import { Segment,Badge, Thumbnail, StyleProvider, Container, Header, Title, CheckBox, Content, Label, List, ListItem, Footer, Form, Item, FooterTab, Left, Button, Body, Right, Icon, InputGroup, Input, Card, CardItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as contant from "../app/contant"
import TabNavigator from 'react-native-tab-navigator';
//这个界面来显示“我的预约的对话”
export default class CoversionFromPage extends Component {


    constructor(props){ 
        super(props);
        this.state={
            msgList:[], //消息列表
            rState:this.props.rStatus, // 状态
            inputContentText:"",//输入框内容
            rid:this.props.rid,
            sid:-1,//卖家id
            uid:-1,//买家id 就是user.username
            callback_:this.props.call_back
        };
        this.renderEveryData=this.renderEveryData.bind(this);
        this.specificFunc=this.specificFunc.bind(this);
        this.btnRender=this.btnRender.bind(this);
        this.myRenderFooter=this.myRenderFooter.bind(this);
        this.pressSendBtn=this.pressSendBtn.bind(this);
        this.callback_sendMsg=this.callback_sendMsg.bind(this);
        this.error_sendMsg=this.error_sendMsg.bind(this);
        this.returnLastPage=this.returnLastPage.bind(this);
        this.sendTimeMsg=this.sendTimeMsg.bind(this);
        this.sendLocationMsg=this.sendLocationMsg.bind(this);
        this.callback_sendTime=this.callback_sendTime.bind(this);
        this.callback_sendLocation=this.callback_sendLocation.bind(this);  
        this.sureStatus=this.sureStatus.bind(this);
        this.callback_getCoversion=this.callback_getCoversion.bind(this);
        this.error_getCoversion=this.error_getCoversion.bind(this);
        this.error_suerRecord=this.error_suerRecord.bind(this);
        this.callback_suerRecord=this.callback_suerRecord.bind(this);
        this.renderTop=this.renderTop.bind(this);
    }

    render(){

         return (
            <View style={ styles.container }>
                <Header>
                <Left>
                    
                 <Button  transparent iconLeft  onPress={this.returnLastPage}>     
                         <Icon name="md-arrow-back"/>
                        <Text style={ styles.bottomBtnText }>返回</Text>
                    </Button>
                </Left>
                <Body>
                     {
                        this.renderTop()

                    }
                </Body>
                <Right>
                     <Button transparent iconLeft  onPress={()=>this.sureStatus(false)}>
                         <Text style={ styles.bottomBtnText }> 取消</Text>
                  
                    </Button>
                      <Button transparent iconLeft  onPress={()=>this.sureStatus(true)}><Text style={ styles.bottomBtnText }>
                       交易完成</Text>
                  
                    </Button>
                </Right>
              </Header>
 
 
              <ListView
                ref='_listView'
                enableEmptySections
                onLayout={(e)=>{this.listHeight = e.nativeEvent.layout.height;}}
                dataSource={contant.ds.cloneWithRows(this.state.msgList)}
                renderRow={this.renderEveryData.bind(this)}
                renderFooter={this.myRenderFooter.bind(this)}
              />
 
 
             
           <Footer>
                  <Left>
                      <Button onPress={this.sendTimeMsg}><Text>时间</Text></Button>
                      <Button onPress={this.sendLocationMsg}><Text>地点</Text></Button>
                  </Left>
                  <Body>
                      <TextInput
                      ref='_textInput'
                      onChangeText={(text) =>{this.state.inputContentText=text}}
                      placeholder=' 请输入对话内容'
                      returnKeyType='done'
                      style={styles.inputText}
                  />
                  </Body>
                  <Right>
                       <Button  onPress={this.pressSendBtn}><Text>发送</Text></Button>
                  </Right>
              </Footer>


            </View>
        );
    }
     renderTop(){
        //根据rState显示交易状态
       for(var i=0;i<6;i++){
            if(this.state.rState == i){
                   return <Text style={{fontSize:10,color:"#ffffff"}}>{contant.RECORD_TEXT[i]}</Text>
            }

       }


    }
    sureStatus(data){
        //确认交易完成
        if(data == true ){
            var parm={
            "rid":this.state.rid,
            "uid":contant.USER.uname,
            "type":2,
            "operation":0


         }
         contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.UPDATE_RECORD_STATUS,parm,this.callback_suerRecord,this.error_suerRecord);

        }else {
        //取消交易
            var parm={
            "rid":this.state.rid,
            "uid":contant.USER.uname,
            "type":2,
            "operation":1 ,//取消
         }
         contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.UPDATE_RECORD_STATUS,parm,this.callback_suerRecord,this.error_suerRecord);
        
    }
}

    callback_suerRecord(data){
        //确认交易完成回调函数
        if(data.isSucceed == "true" || data.isSucceed == true){
            Alert.alert("提示","操作成功!")
              var parm={
            "type":0 ,
            "msg":this.state.inputContentText,
            "uid":contant.USER.uname,
            "rid":this.state.rid,
         }
         contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.GET_COVERSION_DETAIL,parm,this.callback_getCoversion,this.error_getCoversion);

        }else {
            Alert.alert("错误","无法完成交易")
        }

    }
    error_suerRecord(data){

        Alert.alert("错误","消息发送失败")

    }

    renderEveryData(eData) {
        return (
                <View style={{flexDirection:'row',alignItems: 'center'}}>
                    <Image
                        source={eData.uid==contant.USER.uname? null:require("../resources/1.png") }
                        style={eData.uid==contant.USER.uname==true?null:styles.talkImg}
                    />
                <View style={eData.uid==contant.USER.uname==true?styles.talkViewRight:styles.talkView}>
            {

                this.specificFunc(eData)          
            }
    </View>
          <Image
            source={eData.uid==contant.USER.uname? require("../resources/1.png") :null}
            style={eData.uid==contant.USER.uname?styles.talkImgRight:null}
          />
   </View>
   );
   }
    specificFunc(data){
        if(data.type == 0 || data.type == "0"){
            //普通消息
           return(  
           <Text style={ styles.talkText }>
               {data.msg}
            </Text>);
        }else if(data.class_ == 0 || data.class_ == "0"){
            //半结构化信息,时间
            return (
                <Card>
                    <CardItem header>
                        <Text>时间约定信息</Text>
                    </CardItem>
                    <CardItem>
                       <Text>{data.msg}</Text>
                    </CardItem>
                    {

                        this.btnRender(data)
                    }
                </Card>

            );

        }else if(data.class_ == 1 || data.class_ == "1"){
              //半结构化信息,地点   
            return (
                    <Card>
                        <CardItem header>
                        <Text> 地点约定信息</Text>
                        </CardItem>
                        <CardItem>
                            <Text>{data.msg}</Text>
                        </CardItem>
                        {

                            this.btnRender(data)
                        }
                    </Card>
                );
        }


    }
    btnRender(data){
        //根据半结构化消息是否失效
        if(data.operation == "0" || data.operation == 0){
                //未确认，
            return <CardItem><Text>未确认</Text></CardItem>
        }else if(data.operation == "1" || data.operation == 1){
                //已经确认，
            return <CardItem><Text>已确认</Text></CardItem>

        }else{
            return <CardItem><Text>已拒绝</Text></CardItem>
        }

    }
    myRenderFooter(e){
    }
 
    pressSendBtn(){
        //点击发送按钮
        //组织参数，调用公共函数
         var parm={
            "type":0 ,
            "msg":this.state.inputContentText,
            "uid":contant.USER.uname,
            "rid":this.state.rid,
         }
         contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.SEND_MSG,parm,this.callback_sendMsg,this.error_sendMsg);

    }
     componentDidMount() {
         //组件渲染完成,从服务器拉取数据
           var parm={
            "type":0 ,
            "msg":this.state.inputContentText,
            "uid":contant.USER.uname,
            "rid":this.state.rid,
         }
         contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.GET_COVERSION_DETAIL,parm,this.callback_getCoversion,this.error_getCoversion);
    }
    callback_sendMsg(data){
        //成功调用，直接加进去就行了，被告复杂
        if(data.isSucceed == "true" || data.isSucceed == true){
           var datas=this.state.msgList; 
           datas.push({
                        uid:  contant.USER.uname   ,  //用户id
                        uname: contant.USER.name  ,   //用户名称  
                        type: 0 ,     //消息类型  普通消息 0 还是 半结构化消息 1
                        class_:  -1 ,  //消息类别  时间 0/地点 1
                        operation: -1 ,//消息操作情况 未确认 0 已确认 1 已失效 2
                        time: "" ,   //消息时间戳
                        btime:""  ,   //消息其他戳
                        msg:this.state.inputContentText
            });
 
         this.refs._textInput.clear();
         this.setState({
            inputContentText:'',
            msgList: datas
         })

        }
        
    }

    error_sendMsg(e){
        //发送信息失败
        console.warn(e);
        Alert.alert("错误","消息发送失败");
    }
    returnLastPage(){
        //返回上一个页面
        this.props.call_back(1);
        this.props.navigator.pop();

    }
    
     sendTimeMsg(){
        //发送时间消息
        //界面跳转
        if(this.state.rState == 0 || this.state.rState == 1){
            //时间和地点均未确认+地点确认时间未确认
             var obj={
                id:contant.idList.TimeSuerPage,
                passProps:{
                    call_back:this.callback_sendTime, 
                    rid:this.state.rid
                },
                type:"Right",

             }
             this.props.navigator.push(obj);
        }else {
            Alert.alert("提示","当前交易状态是:"+contant.RECORD_TEXT[this.state.rState]+"\n无法发送时间消息");

        }
       
    }
      sendLocationMsg(){
            //发送地点消息
            //界面跳转
       if(this.state.rState == 0 || this.state.rState == 2){
            var obj={
                id:contant.idList.MapSurePage,
                passProps:{
                    call_back:this.callback_sendLocation,
                    rid:this.state.rid
                },
                type:"Right",

            }
            this.props.navigator.push(obj);
       }else {
             Alert.alert("提示","当前交易状态是:"+contant.RECORD_TEXT[this.state.rState]+"\n无法发送地点消息");
       }

    }
    callback_sendTime(data){
        //成功后调用,
        //刷新,data就是新消息
           var datas=this.state.msgList; 
           datas.push(data);
 
         this.setState({
            msgList: datas
         })

    }

    callback_sendLocation(data){
          //成功后调用,
        //刷新,data就是新消息
        var datas=this.state.msgList; 
        datas.push(data);
        this.setState({
            msgList: datas
         })

    }
    callback_getCoversion(data){
        //拉取数据，并保存
        


         this.setState({
            inputContentText:'',
            msgList: data.list,
            sid:data.sid,//卖家id
            rState:data.rStatus
         })



    }
    error_getCoversion(e){
         //拉取数据信息
        console.warn(e);
        Alert.alert("错误","交易数据拉取失败");
    }
    
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE'
  },
  topView:{
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height: 52,
    padding:5
  },
  bottomView:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height: 52,
    padding:5
  },
  sendBtn: {
    alignItems: 'flex-start',
    backgroundColor: '#3366FF',
    padding: 10,
    borderRadius:5,
    height:40,
  },
  bottomBtnText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
 
  talkView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderRadius:5,
    marginLeft:5,
    marginRight:55,
    marginBottom:10
  },
  talkImg: {
    height: 40,
    width: 40,
    marginLeft:10,
    marginBottom:10
    },
  talkText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    },
  talkViewRight: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#90EE90',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    borderRadius:5,
    marginLeft:55,
    marginRight:5,
    marginBottom:10
  },
  talkImgRight: {
    height: 40,
    width: 40,
    marginRight:10,
    marginBottom:10
    },
  searchBox: {
    height: 40,
    flexDirection: 'row',
    flex:1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
    borderRadius: 5,  // 设置圆角边
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft:5,
    marginRight:5,
    marginTop:10,
    marginBottom:10,
  },
  inputText: {
    flex:1,
    backgroundColor: 'transparent',
    fontSize: 20,
    marginLeft:5
  },
});