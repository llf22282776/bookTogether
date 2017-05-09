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
import { Thumbnail, StyleProvider, Container, Header, Title, CheckBox, Content, Label, List, ListItem, Footer, Form, Item, FooterTab, Left, Button, Body, Right, Icon, InputGroup, Input, Card, CardItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as contant from "../app/contant"
import TabNavigator from 'react-native-tab-navigator';
export default class DetailPeoplePage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.toUpdateRank = this.toUpdateRank.bind(this);
        this.toLast = this.toLast.bind(this);
        this.showSellingBooks = this.showSellingBooks.bind(this);

    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.toLast}>

                            <Icon name="md-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>个人详情</Title>
                    </Body>
                </Header>
                <Content>
                    <List>
                        <ListItem>
                            <Thumbnail square size={80} source={require('../resources/1.png')} />
                            <Body>
                                <Text>姓名:{this.props.uname}</Text>
                                <Text note>性别:{this.props.sex == 1 ? "男" : "女"}</Text>
                                <Text note>年龄:{this.props.age}</Text>
                            </Body>
                        </ListItem>
                    </List>



                    <ListItem>
                        <Left>
                            <Icon style={{ color: "#1b47ff" }} name="md-book" />
                            <Text style={{ color: "#1b47ff" }}>积分:{this.props.rank}</Text>
                        </Left>
                        <Right>
                            <Button transparent >
                                <Icon name="refresh" />
                            </Button>
                        </Right>
                    </ListItem>



                    <List>

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


                    </List>
                </Content>
            </Container>);




    }
    toUpdateRank() {

    }
    toLast() {
        this.props.navigator.pop();

    }

    async showSellingBooks() {
        var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.SEARCH_BOOKS_SELLING + "?" + "uid=" + this.props.uid +"&type="+3; 
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
            var jsonData={
                bookList:bookList,
                uid:this.props.uid
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

}