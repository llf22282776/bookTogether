/**
 * Created by bitholic on 2017/3/1.
 */
'use strict';

import React, { Component } from 'react';
import { Alert, View, Image, TextInput } from 'react-native';
import {
    Container,
    Content,
    Header,
    Title,
    Left,
    Body,
    Right,
    Thumbnail,
    Card,
    CardItem,
    Item,
    Icon,
    Input,
    Button,
    Text,
    Form,
    InputGroup
} from 'native-base';
import * as contant from "./contant"
Date.prototype.format = function (formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace('/yyyy|YYYY/', this.getFullYear());
    str = str.replace('/MM/', (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
    str = str.replace('/dd|DD/', this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
    return str;
}
export default class AddQuestionPage extends Component {
    constructor(props) {
        super(props);
        this.returnLastOne = this.returnLastOne.bind(this);
        this.commitOneQuestion = this.commitOneQuestion.bind(this);
        this.changeText_EVENT = this.changeText_EVENT.bind(this);
        this.changeText_EVENT1 = this.changeText_EVENT1.bind(this);
        this.fetchInsertCoversion = this.fetchInsertCoversion.bind(this);
        this.getNowFormatDate=this.getNowFormatDate.bind(this);
        this.state = {
            content: "",
            title: "",
            nid: contant.USER.nid
        }

    }




    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button iconLeft transparent onPress={this.returnLastOne}>
                            <Icon name="ios-arrow-back" style={{ fontSize: 26 }} />
                            <Text style={{ fontSize: 16 }}>取消</Text>
                        </Button>
                    </Left>

                    <Right>
                        <Button iconRight transparent onPress={this.commitOneQuestion}>
                            <Icon name="ios-checkmark-outline" style={{ fontSize: 26 }} />
                            <Text style={{ fontSize: 16 }}>确定</Text>

                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Card transparent>
                        <CardItem >
                            <InputGroup rounded>
                                <Input placeholder="请输入题目...." onChangeText={this.changeText_EVENT} />
                            </InputGroup >
                        </CardItem>
                        <CardItem >
                            <InputGroup rounded>
                                <Input style={{ height: 400, width: 400, textAlignVertical: "top" }} multiline={true} placeholder="请输入内容..." onChangeText={this.changeText_EVENT1} />
                            </InputGroup >
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button iconLeft transparent>
                                    <Icon name="menu" />
                                </Button>
                                <Button iconLeft transparent>
                                    <Icon name="ios-image" />
                                </Button>
                            </Left>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }

    returnLastOne() {
        this.props.navigator.pop();
    }
    commitOneQuestion() {
        //发帖,然后等待服务器获取东西，回到上个界面的时候，服务器又获得了新的coversionlist
        this.fetchInsertCoversion();//先返回再说

    }
    async fetchInsertCoversion() {
        //上传
        var url = contant.SERVER_COMMUNITY + contant.SERVER_SERVICE. INSERT_COVERSION;
        url = url + "?";
        url += "nid=" + this.state.nid + "&";
        url += "content=" + this.state.content + "&";
        url += "title=" + this.state.title + "&";
        url += "date=" + this.getNowFormatDate();
        console.log("url:" + url);



        try {
            let response = await fetch(
                url,
                {
                    method: "GET",
                    headers: {
                        "Content-type": "text/html;charset=UTF-8"
                    }
                });

            let data = await response.json();
            console.log("data")
            console.log(data)

            data = data.coversionList;//从这个字段取东西
            this.props.call_back();//刷新上一个界面
            this.returnLastOne();
        } catch (e) {
            //异常
            Alert.alert("错误", "发帖失败");



        }



    }

    
    changeText_EVENT(text) {
        //文字改变
        this.setState({ title: text });
    }
    changeText_EVENT1(text) {
        //文字改变
        this.setState({ content: text });
    }
    getNowFormatDate() {
        var day = new Date();
        var Year = 0;
        var Month = 0;
        var Day = 0;
        var CurrentDate = "";
        var hours;
        var mins;
        var second;
        //初始化时间
        //Year= day.getYear();//有火狐下2008年显示108的bug
        Year = day.getFullYear();//ie火狐下都可以
        Month = day.getMonth() + 1;
        Day = day.getDate();
        hours=day.getHours();
        mins=day.getMinutes();
        second=day.getSeconds();
        //Hour = day.getHours();
        // Minute = day.getMinutes();
        // Second = day.getSeconds();
        CurrentDate += Year + "-";
        if (Month >= 10) {
            CurrentDate += Month + "-";
        }
        else {
            CurrentDate += "0" + Month + "-";
        }
        if (Day >= 10) {
            CurrentDate += Day;
        }
        else {
            CurrentDate += "0" + Day;
        }
        CurrentDate+=" "
        if (hours >= 10) {
            CurrentDate += hours;
        }
        else {
            CurrentDate += "0" + hours;
        }
        CurrentDate+=":"
        if (mins >= 10) {
            CurrentDate += mins;
        }
        else {
            CurrentDate += "0" + mins;
        }
         CurrentDate+=":"
        if (second >= 10) {
            CurrentDate += second;
        }
        else {
            CurrentDate += "0" + second;
        }
     
        return CurrentDate;
    }

    
}
