'use strict';

import React, { Component } from 'react';
import { View, Image, TextInput, Alert } from 'react-native';
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
import * as contant from "../app/contant"
export default class AnswerToQuestionPage extends Component {
    constructor(props) {
        super(props);
        this.returnLastOne = this.returnLastOne.bind(this);
        this.commitOneQuestion = this.commitOneQuestion.bind(this);
        this.changeTextEvent = this.changeTextEvent.bind(this);

        this.getNowFormatDate = this.getNowFormatDate.bind(this);
        this.thumbnailRender = this.thumbnailRender.bind(this);
        this.state = {
            contentText: ""


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
                            <InputGroup disabled>
                                <Input placeholder={this.props.titleText} />
                            </InputGroup >
                        </CardItem>
                        <CardItem >
                            <InputGroup rounded>
                                <Input style={{ height: 300, width: 300, textAlignVertical: "top" }} multiline={true} placeholder="请输入内容..." onChangeText={this.changeTextEvent} />
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
        this.props.navigator.pop();//返回上个界面
    }
    thumbnailRender(rowData) {
        if (rowData.thumbnail == "" || rowData.thumbnail == undefined || rowData.thumbnail == null) {

            return (<Thumbnail source={require('../resources/1.png')} />);

        } else {
            return (<Thumbnail source={{ uri: contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.IMAGE_ROOT_PEOPLE + rowData.thumbnail }} />)
            //显示头像
        }


    }
    async commitOneQuestion() {
        var url = contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.INSERT_COMMENT + "?" + "nid=" + contant.USER.nid + "&" + "cid=" + this.props.cid + "&" + "content=" + this.state.contentText + "&" + "date=" + this.getNowFormatDate();
        try {
            let response = await fetch(
                url,
                {
                    method: "GET"

                });
            console.log("评论response");
            console.log(response);

            let data = await response.json();
            console.log("评论json");
            console.log(data);

            var data = data.commentList;//从这个字段取东西
            this.props.call_back();

            this.returnLastOne();//返回界面

        } catch (e) {
            //异常
            console.warn(e);
            Alert.alert("错误：","评论失败");
        }





    }
    changeTextEvent(text) {
        this.setState({ contentText: text });

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
        hours = day.getHours();
        mins = day.getMinutes();
        second = day.getSeconds();
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
        CurrentDate += " "
        if (hours >= 10) {
            CurrentDate += hours;
        }
        else {
            CurrentDate += "0" + hours;
        }
        CurrentDate += ":"
        if (mins >= 10) {
            CurrentDate += mins;
        }
        else {
            CurrentDate += "0" + mins;
        }
        CurrentDate += ":"
        if (second >= 10) {
            CurrentDate += second;
        }
        else {
            CurrentDate += "0" + second;
        }

        console.log(CurrentDate);
        return CurrentDate;
    }

}