'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,
    Navigator,
    Image,
    Alert,
    TextInput,

} from 'react-native';
import { Thumbnail, StyleProvider, Container, Header, Title, CheckBox, Content, Label, List, ListItem, Footer, Form, Item, FooterTab, Left, Button, Body, Right, Icon, InputGroup, Input, Card, CardItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as contant from "../app/contant"
import TabNavigator from 'react-native-tab-navigator';
export default class UserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.toUpdateMoeny = this.toUpdateMoeny.bind(this);
        this.LogOut = this.LogOut.bind(this);
        this.showSoldBooks = this.showSoldBooks.bind(this);
        this.showSellingBooks = this.showSellingBooks.bind(this);
        this.showBoughtBooks = this.showBoughtBooks.bind(this);
    }
    render() {
        return (
            <Container>
                <Header><Title>个人信息</Title></Header>
                <Content>
                    <List>
                        <ListItem>
                            <Thumbnail square size={80} source={require('../resources/1.png')} />
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
}