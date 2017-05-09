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
import * as contant from "../app/contant"
var commitList_temp = [
    {
        contentText: '受教育了',
        nick: "b",
        date: "11h ago",

    },
    {

        titleText: '谢谢',
        nick: "c",
        date: "11h ago"
    }

];
export default class DetialQuestionPage extends Component {
    constructor(props) {

        super(props);
        console.log("DetialQuestionPage this.props");
        console.log(this.props)
        this.returnLastOne = this.returnLastOne.bind(this);
        this.commitOneQuestion = this.commitOneQuestion.bind(this);
        this.toGetCommit = this.toGetCommit.bind(this);
        this.renderCommits = this.renderCommits.bind(this);
        this.fetchCommentList = this.fetchCommentList.bind(this);
        this.callBack_ADDCOMMENT = this.callBack_ADDCOMMENT.bind(this);
        this.imageRender = this.imageRender.bind(this);
        this.renderSupportIcons = this.renderSupportIcons.bind(this);
        this.supportOrNot = this.supportOrNot.bind(this);
        this.thumbnailRender=this.thumbnailRender.bind(this);
        this.removeYearAndSecond_this=this.removeYearAndSecond_this.bind(this);

        this.state = {
            dq_ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            commentList: [],
            date: this.removeYearAndSecond_this(this.props.date),
            isSupport: this.props.isSupport,
            supportNum: this.props.supportNum,
            cid: this.props.cid

        }//初始化评论表
        console.log(this.state);
        this.toGetCommit(this.props.cid);


    }
    render() {
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
                    <Card style={{ height: 380, width: 420 }}>
                        <CardItem header bordered style={{ paddingBottom: 4 }}>
                            <Left>
                                {
                                    this.thumbnailRender(this.props)
                                }
                                <Body>
                                    <Text>{this.props.titleText}</Text>
                                    <Text note>{this.props.nick}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        {
                            this.imageRender(this.props)


                        }
                        <CardItem content  >
                            <Text>{this.props.contentText}</Text>
                        </CardItem>
                        <CardItem footer style={{ paddingBottom: 4 }}>
                            <Left>
                                <Button transparent iconLeft>
                                    {
                                        this.renderSupportIcons(this.state)
                                    }
                                    <Text>{this.state.supportNum}</Text>
                                </Button>

                                <Button transparent iconLeft>
                                    <Icon active name="chatbubbles" style={{padding:5}} />
                                    <Text>{this.props.commitNums}</Text>
                                </Button>

                            </Left>
                            <Body>
                            </Body>
                            <Right>
                                <Text>{this.state.date}</Text>
                            </Right>

                        </CardItem>
                        <CardItem cardBody>

                            <Button style={{ flex: 1 }} info block onPress={this.commitOneQuestion}>
                                <Icon active name="md-text" />
                            </Button>


                        </CardItem>
                    </Card>

                    <View Style={{ height: 1200 }}>
                        <ListView enableEmptySections dataSource={(this.state.dq_ds).cloneWithRows(this.state.commentList)} renderRow={this.renderCommits} />
                    </View>
                </Content>
            </Container>
        );




    }
    
    commitOneQuestion() {
        //回答，写问题,跳转界面
        var jsonObj = {
            id: contant.idList.AnswerToQuestionPage,
            passProps: {
                titleText: this.props.titleText, //把题目穿进去
                cid: this.props.cid,
                call_back: this.callBack_ADDCOMMENT
            }
        };

        this.props.navigator.push(jsonObj);


    }
    renderSupportIcons() {

        if (this.state.isSupport == true) {
            return (<Icon style={{ color: "#ee4400" }} name="thumbs-up" onPress={() => { this.supportOrNot(this.props.cid, this.state.isSupport); }} />)
        } else {
            return (<Icon active name="thumbs-up" onPress={() => { this.supportOrNot(this.props.cid, this.state.isSupport); }} />)
        }



    }
    callBack_ADDCOMMENT(commentList) {
        //更新
        console.log("this:")
        console.log(this)
        this.toGetCommit(this.props.cid);


    }
    toGetCommit(cid) {
        //从服务器搞来评论
        this.fetchCommentList(cid);

    }
    removeYearAndSecond_this(newDate) {
         //var newDate = rowData.date;

         
        

        var stringList=newDate.split("-");//第一个是年,第二个是月
     
        var mouth=stringList[1];


        var str1=stringList[2];
   
        var  stringList1=str1.split(" ");//第一个是天
        var day=stringList1[0];
         str1=stringList1[1];

         var stringList2=str1.split(":");//第一个是时，第二个是分，第三个是秒
        var hours=stringList2[0];
        var mins=stringList2[1];
        var sec=stringList2[2];
        newDate=mouth+"-"+day+" "+hours+":"+mins;
        
        return newDate;

    }
    async fetchCommentList(cid1) {
        //获取一次评论

        var url = contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.GET_COMMENTLIST_JSON;
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
                        cid: cid1
                    })
                });
            console.log("评论response");
            console.log(response);

            let data = await response.json();
            console.log("评论json");
            console.log(data);
            console.log("commentList");
            var data = data.commentList;//从这个字段取东西
            console.log(data);
            this.setState({ commentList: data });

        } catch (e) {
            //异常
            console.log(e);
        }

    }
    returnLastOne() {
        this.props.navigator.pop();//返回

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
                    <Text >{data.nick}</Text>
                    <Text note>{data.content}</Text>
                </Body>
                <Right>
                    <Text note>{date}</Text>
                </Right>
            </ListItem>




        );

    }
    renderSupportIcons(rowData) {

        if (rowData.isSupport == "true") {
            return (<Icon style={{ color: "#ee4400" }} name="thumbs-up" onPress={() => { this.supportOrNot(rowData.cid, rowData.isSupport); }} />)
        } else {
            return (<Icon active name="thumbs-up" onPress={() => { this.supportOrNot(rowData.cid, rowData.isSupport); }} />)
        }



    }
    imageRender(rowData) {

        console.log("图片地址" + rowData.url);
        if (rowData.url == "" || rowData.url === "" || rowData.url == null) {
            return null;
        }
        else {
            return (
                <CardItem cardBody >
                    <Image style={{ height: 120, width: 400 }} source={{ uri: contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.IMAGE_ROOT + rowData.url }} />
                </CardItem>
            );
        }
    }
    thumbnailRender(rowData) {
        if (rowData.thumbnail == "" || rowData.thumbnail == undefined || rowData.thumbnail == null) {

            return (<Thumbnail source={require('../resources/1.png')} />);

        } else {
            return (<Thumbnail source={{ uri: contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.IMAGE_ROOT_PEOPLE + rowData.thumbnail }} />)
            //显示头像
        }


    }
    async supportOrNot(cid, isSupportNow) {
        //点赞或取消点赞
        console.log("isSupportNow:" + isSupportNow)

        var type = (isSupportNow == "true") ? 2 : 1;
        console.log("isSupportNow:" + isSupportNow + " type:" + type);
        var jsonObj = {
            cid: cid,
            nid: contant.USER.nid,
            type: type, //如果是支持的状态，就发送取消，如果不是就发送支持
        };
        console.log(jsonObj);
        var url = contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.SUPPORT_COVERSION;
        try {
            let response = await fetch(
                url,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cid: cid,
                        nid: contant.USER.nid,
                        type: type, //如果是支持的状态，就发送取消，如果不是就发送支持
                    })
                });
            let data = await response.json();
            if (data.nowState == "1") {
                this.setState({ isSupport: "true" });
                this.setState({ supportNum: this.state.supportNum + 1 })
            }
            else {
                this.setState({ isSupport: "false" });
                this.setState({ supportNum: this.state.supportNum - 1 });
            }
            console.log(data);


        } catch (e) {
            //异常
            console.log(e);
            Alert.alert("错误", "点赞失败！");
        }



    }



}

/**
 *
 * <Content>
                        <Card>
                            <CardItem header style={{ paddingBottom: 4 }} >
                                <Left>
                                    <Thumbnail source={require('../resources/qa_selected.png')} />
                                    <Body>
                                        <Text>{this.props.titleText}</Text>
                                        <Text note>{this.props.nick}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem content style={{ paddingBottom: 4 }}>
                                <Text>{this.props.contentText}</Text>
                            </CardItem>
                            <CardItem footer style={{ paddingBottom: 4 }}>
                                <Left>
                                    <Button transparent>
                                        <Icon active name="thumbs-up" />
                                        <Text>{this.props.supportNum}</Text>
                                    </Button>
                                    <Button transparent>
                                        <Icon active name="chatbubbles" />
                                        <Text>{this.props.commitNums}</Text>
                                    </Button>
                                </Left>
                                <Body>
                                </Body>
                                <Right>
                                    <Text>{this.props.date}</Text>
                                </Right>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem content>
                                <Button iconLeft onPress={this.commitOneQuestion}>
                                    <Icon active name="pencil" />
                                    <Text>回答</Text>
                                </Button>
                            </CardItem>
                        </Card>

                    </Content>
                    *  <ListView dataSource={this.state.dq_ds.cloneWithRows(this.state.commitList)} renderRow={this.renderCommits} />
                    * 
*/