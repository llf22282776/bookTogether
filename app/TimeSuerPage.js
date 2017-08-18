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

export default class TimeSuerPage extends Component {


    constructor(props){ 
        super(props);
        this.state={
            timeText:"",
            rid:this.props.rid
        };
        this.timeSure=this.timeSure.bind(this);
        this.returnLastOne=this.returnLastOne.bind(this);
        this.successFuc=this.successFuc.bind(this);
        this.errorFunc=this.errorFunc.bind(this);
    }

    render(){

        return (
             <Container>
                <Header>
                    <Left>
                        <Button iconLeft transparent onPress={this.returnLastOne}>
                            <Icon name="ios-arrow-back" style={{ fontSize: 26 }} />
                        </Button>
                    </Left>
                </Header>
                <Content>
                    <TextInput placeholder="请输入时间 如2017-08-10 14:20:30" onChangeText={
                        (text)=>this.setState(
                            {
                                timeText:text
                            }
                        )}></TextInput>
                    <Button block success onPress={this.timeSure}><Text>确认</Text></Button>
                </Content>
              </Container>
              );

    }

    timeSure(){
        //确认
        var parm={
             "type":1,
             "msg":this.state.timeText,
             "btime":this.state.timeText,
             "class_":0, //是时间
             "uid":contant.USER.uname,
             "rid":this.state.rid
        }
        //console.warn(this.state.timeText)
        contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.SEND_MSG,parm,this.successFuc,this.errorFunc);
    }
    returnLastOne(){
        this.props.navigator.pop();


    }
    successFuc(data){
        //直接返回
        if(data.isSucceed == true || data.isSucceed == "true"){
            this.props.call_back(
                {
                    type:1,
                    msg:this.state.timeText,
                    btime:this.state.timeText,
                    operation:0,
                    class_:0, //是时间
                    uid:contant.USER.uname
                }

            ); //直接压进去了
           this.props.navigator.pop();

        }

    }
    errorFunc(data){
        Alert.alert("错误","确定失败");

    }

}