'use strict';

import React, { Component } from 'react';
import {
    View,
    Image,
    ListView,
    Alert
} from 'react-native';
import {
    Container,
    Content,
    Header,
    Left,
    List,
    ListItem,
    Body,
    Right,
    Thumbnail,
    Card,
    CardItem,
    Item,
    Icon,
    Input,
    Button,
    Text
} from 'native-base';
import * as contant from "./contant"
var ds = contant.ds;
var cidsTemp = [];
var nidsTemp = [];
export default class NewMsgListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newMsgList: this.props.commentList,//传回来的数据
            cids: [],
            nids: []
        }
        this.toLast = this.toLast.bind(this);
        this.setMsgViewed = this.setMsgViewed.bind(this);
        this.getCidListAndCidList = this.getCidListAndCidList.bind(this);
        this.renderCommits = this.renderCommits.bind(this);
        this.thumbnailRender = this.thumbnailRender.bind(this);
        this.toDetail = this.toDetail.bind(this);

    }
    render() {
        return (

            <Container>
                <Header >
                    <Left>
                        <Button transparent onPress={this.toLast}>
                            <Icon name="md-arrow-back" />
                        </Button>
                    </Left>
                </Header>
                <Content>
                    <ListView enableEmptySections dataSource={ds.cloneWithRows(this.state.newMsgList)} renderRow={this.renderCommits} />
                </Content>
            </Container>

        )



    }

    toLast() {
        //先去清空一下
        this.getCidListAndCidList();
        this.setMsgViewed();
        //调用回调函数
        this.props.call_back();
        //然后返回
        this.props.navigator.pop();//返回

    }
    async setMsgViewed() {
        //向服务器发送请求更新数据库
        var url = contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.SET_PERSONAL_NEW_MSG_VIEWED;
        try {
           
            let response = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cids: cidsTemp,
                        nids: nidsTemp
                    })
                });

            let data = await response.json;//数据没啥用


        } catch (e) {
            //异常
            Alert.alert("错误", "消息清空失败");
        }

    }
    getCidListAndCidList() {

        for (var i = 0; i < this.state.newMsgList.length; i++) {
            cidsTemp[i] = this.state.newMsgList[i].cid;
            nidsTemp[i] = this.state.newMsgList[i].nid;


        }

   



    }


    renderCommits(data) {
        //Alert.alert(data.date);
        var date = contant.removeYearsAndSecond_1(data.date);

        //显示评论
        return (
            <ListItem>
                {
                    this.thumbnailRender(data)
                }
                <Body>
                    <Text note>{date}</Text>
                    <Text >{data.nick}</Text>
                    <Text note>{data.content}</Text>

                </Body>
                <Right>
                    <Button transparent iconRight onPress={() => { this.toDetail(data); }}>
                        <Text note style={{color:"#cccccc"}}>{data.title}</Text>
                        <Icon name="ios-arrow-forward" />
                    </Button>

                </Right>


            </ListItem>




        );

    }
    thumbnailRender(rowData) {
        if (rowData.thumbnail == "" || rowData.thumbnail == undefined || rowData.thumbnail == null) {

            return (<Thumbnail source={require('../resources/1.png')} />);

        } else {
            return (<Thumbnail source={{ uri: contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.IMAGE_ROOT_PEOPLE + rowData.thumbnail }} />)
            //显示头像
        }


    }
    async toDetail(data) {
        //进入帖子详情,请求帖子
        var url = contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.GET_COVERSIONLIST_BY_ID;
        url = url + "?";
        url += "nid=" + contant.USER.nid + "&";
        url += "cid=" + data.cid;
        try {
            let response = await fetch(
                url,
                {
                    method: "GET",
                    headers: {
                        "Content-type": "text/html;charset=UTF-8"
                    }
                });

            var data = await response.json();

            var jsonObj = {
                id: contant.idList.DetialQuestionPage,
                passProps: data,
                type:"Right"
            };
            this.props.navigator.push(jsonObj);

        } catch (e) {
            //异常
            Alert.alert("错误", "查看消息失败拉取失败");



        }





    }

}