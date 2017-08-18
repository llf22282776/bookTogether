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
import { Segment,Badge,Tabs ,Tab, Thumbnail, StyleProvider, Container, Header, Title, CheckBox, Content, Label, List, ListItem, Footer, Form, Item, FooterTab, Left, Button, Body, Right, Icon, InputGroup, Input, Card, CardItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as contant from "../app/contant"
import TabNavigator from 'react-native-tab-navigator';

export default class DealToDetailPage extends Component {
    constructor(props){ 
        super(props);
        this.state={
            nowStatus:"init",
            dealList:[]
        };
        this.renderRow=this.renderRow.bind(this);
        this.callback_getList=this.callback_getList.bind(this);
        this.error_getList=this.error_getList.bind(this);
        this.refrushUiWithNewData=this.refrushUiWithNewData.bind(this);
        this.callback_update=this.callback_update.bind(this);
        this.toNext=this.toNext.bind(this);
    
    }

    render(){

        return (
             <Container>
                <Content>
                    <ListView enableEmptySections renderRow ={this.renderRow} dataSource={contant.ds.cloneWithRows(this.state.dealList)} />
                </Content>
              </Container>
              );

    }
    componentDidMount() {
         this.refrushUiWithNewData();
    }
    refrushUiWithNewData(){
        //组件渲染完成,从服务器拉取数据
          if(this.props.status == contant.DEAL_STATUS.DEAL_CANCEL){
            //以卖家身份查取消掉的记录
             var parm={
            "uid":contant.USER.uname ,
            "type":1,//卖家
            "dealed":2,
           }
         contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.GET_RECORD_WITH_STATUS,parm,this.callback_getList,this.error_getList);
          }else if(this.props.status == contant.DEAL_STATUS.DEAL_COMPLETE){
             //以买家身份查已经完成的
             var parm={
            "uid":contant.USER.uname ,
            "type":1,//卖家
            "dealed":1,
           }
         contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.GET_RECORD_WITH_STATUS,parm,this.callback_getList,this.error_getList);


          }else if(this.props.status == contant.DEAL_STATUS.DEALING){
            //以买家身份查正在处理的
             var parm={
            "uid":contant.USER.uname ,
            "type":1,//卖家
            "dealed":-1,
           }
            contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.GET_RECORD_WITH_STATUS,parm,this.callback_getList,this.error_getList);


          }
    }
    renderRow(data){
        //显示函数
        var statusText=contant.recordStatusText(data.rStatus);

        return (
            <Card >
              
                <CardItem button cardBody   onPress={()=>{//直接进入下个页面
                        var obj={
                            id:contant.idList.CoversionToPage,
                            passProps:{
                                rid:data.rId, //只需要这个
                                rStatus:data.rStatus,
                                call_back:this.callback_update
                            },
                            type:"Right"

                        }
                        this.props.navigator.push(obj);//拉取coversion，进去下一个页面
                    }}
                    >
                        <Image source={{uri:contant.imageGetter(data.bookImage,contant.IMAGE_TYPE.BOOK_IMAGE) }} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                        <Text>书名：{data.bookName}</Text>
                    <CardItem>
                    </CardItem>
                        <Text>书编号：{data.bId}</Text>
                    <CardItem>
                        <Text>购买者:{data.ownerId}</Text>
                    </CardItem>
                    <CardItem>
                        <Text>当前状态:{statusText}</Text>
                    </CardItem>
                
                </Card>



        );
    }
    callback_getList(data){
    //更换一下
    this.setState({
        dealList:data.list

    })


}
    callback_update(data){
        this.refrushUiWithNewData();


    }
    error_getList(){

        Alert.alert("错误","获取预约列表失败");

}

  toNext(data){
                 //直接进入下个页面
                    var obj={
                        id:contant.idList.CoversionToPage,
                        passProps:{
                            rid:data.rId, //只需要这个
                            rStatus:data.rStatus,
                            call_back:this.callback_update
                        },
                        type:"Right"

                    }
                    this.props.navigator.push(obj);//拉取coversion，进去下一个页面
                }
}