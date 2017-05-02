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

export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            pwd: "",
            text: "登陆"
        }
        this.onPwdAccount = this.onPwdAccount.bind(this);
        this.onNumAccount = this.onNumAccount.bind(this);

        this.onLogin = this.onLogin.bind(this);
    }

    render() {
        return (
            <Container>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ paddingTop: 80, fontSize: 44, color: "#3366FF", paddingBottom: 50 }}>享书吧</Text>
                </View>
                <View>
                    <Form style={{ paddingBottom: 20, paddingRight: 10 }}>
                        <Item >
                            <Label>账号</Label>
                            <TextInput underlineColorAndroid='transparent' style={{ flex: 1 }} onChangeText={this.onNumAccount} />
                        </Item>
                        <Item >
                            <Label>密码</Label>
                            <TextInput underlineColorAndroid='transparent' secureTextEntry style={{ flex: 1 }} onChangeText={this.onPwdAccount} />
                        </Item>

                    </Form>
                    <Button success block onPress={this.onLogin}>
                        <Text>{this.state.text}</Text>
                    </Button>

                </View>
            </Container>);


    }

    onNumAccount(data) {

        this.setState({ uid: data });

    }
    onPwdAccount(data) {

        this.setState({ pwd: data });

    }

    async onLogin() {

        // var route = {
        //     id: contant.idList.HomePage,
        //     passProps: {},
        //     type: "Right"
        // };
        // this.props.navigator.push(route);

        var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.LOG_IN+"?"+"uid="+this.state.uid+"&pwd="+this.state.pwd;
        console.log(url);
        var response;
        var ud;
        try {
            response = await fetch(
                url, {
                    method: "GET"
                });

            ud = await response.json();
            console.log(response);
            if (ud.isLogin == false) {
                Alert.alert("错误", "登陆失败\n");
                return;
            }
            // uname: "zhangweiqi",
            // rank: 100,
            // uid: 1,
            // pwd: "123456",
            // sex: 1,
            // age: 18,
            // restMoney: 1900

            contant.USER.uname = ud.uname;
            contant.USER.uid = ud.uid;
            contant.USER.pwd = ud.pwd;
            contant.USER.sex = ud.sex;
            contant.USER.age = ud.age;
            contant.USER.rank = ud.rank;
            contant.USER.restMoney  = ud.restMoney;
            var route = {
                id: contant.idList.HomePage,
                passProps: {},
                type: "Right"
            };
            this.props.navigator.push(route);
        } catch (e) {
            console.log(response);
            console.log(e);
            //异常
            Alert.alert("错误", "登陆失败\n");



        }





    }


}