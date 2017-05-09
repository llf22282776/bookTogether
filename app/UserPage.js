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
import { Badge, Thumbnail, StyleProvider, Container, Header, Title, CheckBox, Content, Label, List, ListItem, Footer, Form, Item, FooterTab, Left, Button, Body, Right, Icon, InputGroup, Input, Card, CardItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as contant from "../app/contant"
import TabNavigator from 'react-native-tab-navigator';

export default class UserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgurl: contant.USER.thumbnail
        }
        this.toUpdateMoeny = this.toUpdateMoeny.bind(this);
        this.LogOut = this.LogOut.bind(this);
        this.showSoldBooks = this.showSoldBooks.bind(this);
        this.showSellingBooks = this.showSellingBooks.bind(this);
        this.showBoughtBooks = this.showBoughtBooks.bind(this);
        this.renderThumbnail = this.renderThumbnail.bind(this);
        this.renderMsg = this.renderMsg.bind(this);
        this.callBack_clearNewMsg = this.callBack_clearNewMsg.bind(this);
        this.toMsgListPage = this.toMsgListPage.bind(this);
    }
    render() {
        return (
            <Container>
                <Header><Title>个人信息</Title></Header>
                <Content>
                    <List>
                        <ListItem>
                            {
                                this.renderThumbnail()
                            }
                            <Body>
                                <Text>姓名:{contant.USER.name}</Text>
                                <Text note>性别:{contant.USER.sex == 1 ? "男" : "女"}</Text>
                                <Text note>年龄:{contant.USER.age}</Text>
                            </Body>
                        </ListItem>
                    </List>



                    <ListItem>
                        <Left>
                            <Icon style={{ color: "#1b47ff" }} name="md-flag" />
                            <Text style={{ color: "#1b47ff" }}>积分:{contant.USER.rank}</Text>
                        </Left>
                        <Right>
                            <Button transparent >
                                <Icon name="refresh" />
                            </Button>
                        </Right>
                    </ListItem>
                    <ListItem>
                        <Left>
                            <Icon style={{ color: "#1b47ff" }} name="md-cash" />
                            <Text style={{ color: "#1b47ff" }}>余额:{contant.USER.restMoney}</Text>
                        </Left>
                        <Right>
                            <Button transparent >
                                <Icon name="refresh" />
                            </Button>
                        </Right>
                    </ListItem>
                    <List>
                        <ListItem itemDivider>
                            <Text>  </Text>
                        </ListItem>
                        <ListItem>
                            <Button style={{ flex: 1 }} full info onPress={this.toUpdateMoeny}>
                                <Icon style={{ color: "#FFFFFF" }} name="md-battery-charging" />
                                <Text>充值</Text>
                            </Button>
                        </ListItem>
                    </List>

                    <List>
                        <ListItem icon>

                            <Left>
                                <Icon name="ios-mail-outline" />
                            </Left>
                            <Body>

                                <Text>我的消息</Text>

                            </Body>
                            {
                                this.renderMsg()

                            }

                        </ListItem>
                        <ListItem>
                            <Left>
                                <Icon style={{ color: "#bb4400" }} name="md-book" />
                                <Text>查看已买的书</Text>
                            </Left>
                            <Right>
                                <Button transparent onPress={this.showBoughtBooks}>
                                    <Icon name="md-arrow-forward" />
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Icon style={{ color: "#0066FF" }} name="md-book" />
                                <Text>查看已卖的书</Text>
                            </Left>
                            <Right>
                                <Button transparent onPress={this.showSoldBooks}>
                                    <Icon name="md-arrow-forward" />
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Icon style={{ color: "#ff6622" }} name="md-book" />
                                <Text>查看正在卖的书</Text>
                            </Left>
                            <Right>
                                <Button transparent onPress={this.showSellingBooks}>
                                    <Icon name="md-arrow-forward" />
                                </Button>
                            </Right>
                        </ListItem>



                        <ListItem itemDivider>
                            <Text>  </Text>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Icon style={{ color: "#0066FF" }} name="md-exit" />
                                <Text>退出</Text>
                            </Left>
                            <Right>
                                <Button transparent onPress={this.LogOut}>
                                    <Icon name="md-arrow-forward" />
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>  </Text>
                        </ListItem>

                    </List>
                </Content>
            </Container>);




    }
    renderMsg() {
        //显示消息数
        if (this.state.msgNums > 0) {
            //消息数
            return (
                <Right>
                    <Badge>
                        <Text>{this.state.msgNums}</Text>
                    </Badge>
                    <Button transparent onPress={this.toMsgListPage} >
                        <Icon name="ios-arrow-forward" />
                    </Button>
                </Right>);

        } else if (contant.USER.msgNums > 0) {
            return (
                <Right>
                    <Badge>
                        <Text>{contant.USER.msgNums}</Text>
                    </Badge>
                    <Button transparent onPress={this.toMsgListPage} >
                        <Icon name="ios-arrow-forward" />
                    </Button>
                </Right>);

        } else {

            return (
                <Right>
                    <Button transparent onPress={this.toMsgListPage}>
                        <Icon name="ios-arrow-forward" />
                    </Button>
                </Right>
            );

        }





    }
    renderThumbnail() {

        if (this.state.imgurl == null || this.state.imgurl == undefined || this.state.imgurl == "")
            return <Thumbnail style={{ width: 100, height: 100 }} source={require('../resources/1.png')} />
        else
            return <Thumbnail style={{ width: 100, height: 100 }} source={{ uri: contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.IMAGE_ROOT_PEOPLE + this.state.imgurl }} />

    }
    toUpdateMoeny() {

    }
    LogOut() {
        this.props.navigator.popToTop();

    }
    showSoldBooks() {


    }
    showSellingBooks() {


    }
    showBoughtBooks() {


    }
    async  toMsgListPage() {
        //到消息列表页
        //从服务器获得新消息的数量，然后渲染起来
        var url = contant.SERVER_COMMUNITY + contant.SERVER_SERVICE.GET_PERSONAL_NEW_MSG;
        url = url + "?";
        url += "nid=" + contant.USER.nid;
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
            data.call_back = this.callBack_clearNewMsg;

            var jsonObj = {
                id: contant.idList.NewMsgListPage,
                passProps: data,
                type: "Right"
            };
            this.props.navigator.push(jsonObj);//进入列表页面

        } catch (e) {
            //异常
            Alert.alert("错误", "新消息列表拉取失败");
        }


    }
    callBack_clearNewMsg() {
        this.setState({ msgNums: 0 });//拉取一下新消息


    }
    async showSellingBooks() {
        var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.SEARCH_BOOKS_SELLING + "?" + "uid=" + contant.USER.uid + "&type=" + 3;
        var response;
        var ud;
        try {
            response = await fetch(
                url, {
                    method: "GET",
                });
            console.log(response);
            ud = await response.json();
            var bookList = ud.list;
            var jsonData = {
                bookList: bookList,
                uid: contant.USER.uid,
                type: 3,
                title:"正在卖的书"
            }
            var route = {
                id: contant.idList.BookListPageSellingPage,
                passProps: jsonData,
                type: "Right"
            }
            this.props.navigator.push(route);
        } catch (e) {
            console.log(response);
            console.log(e);
            //异常
            Alert.alert("错误", "查看正在卖的书失败\n");



        }

    }
    async showSoldBooks() {
        var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.SEARCH_BOOKS_SELLING + "?" + "uid=" + contant.USER.uid + "&type=" + 2;
        var response;
        var ud;
        try {
            response = await fetch(
                url, {
                    method: "GET",
                });
            console.log(response);
            ud = await response.json();
            var bookList = ud.list;
            var jsonData = {
                bookList: bookList,
                uid: contant.USER.uid,
                type: 2,
                title:"已卖过的书"
            }
            var route = {
                id: contant.idList.BookListPageSellingPage,
                passProps: jsonData,
                type: "Right"
            }
            this.props.navigator.push(route);
        } catch (e) {
            console.log(response);
            console.log(e);
            //异常
            Alert.alert("错误", "查看卖过的书失败\n");



        }

    }
    async showBoughtBooks() {
        //买过的书
        var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.SEARCH_BOOKS_SELLING + "?" + "uid=" + contant.USER.uid + "&type=" + 1;
        var response;
        var ud;
        try {
            response = await fetch(
                url, {
                    method: "GET",
                });
            console.log(response);
            ud = await response.json();
            var bookList = ud.list;
            var jsonData = {
                bookList: bookList,
                uid:  contant.USER.uid,
                type: 1,
                title:"已买过的书"
            }
            var route = {
                id: contant.idList.BookListPageSellingPage,
                passProps: jsonData,
                type: "Right",
                
            }
            this.props.navigator.push(route);
        } catch (e) {
            console.log(response);
            console.log(e);
            //异常
            Alert.alert("错误", "查看卖过的书失败\n");



        }

    }

}