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
import LoginPage from "../app/LoginPage";
import UserPage from "../app/UserPage";
import SearchBookPage from "../app/SearchBookPage";
import SearchPeoplePage from "../app/SearchPeoplePage";
import SellBookPage from "../app/SellBookPage";
import HomePage from "../app/HomePage";
import DetailBookPage from "../app/DetailBookPage";
import DetailPeoplePage from "../app/DetailPeoplePage";
import BookListPageSellingPage from "../app/BookListPageSellingPage"
var idList = contant.idList;
export default class IndexPage extends Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);
        this.configureScene = this.configureScene.bind(this);
    }
    render() {
        return (
            <Navigator initialRoute={
                {
                    id: idList.LoginPage,
                    passProps: {},
                    type: "Right"  //从右边滑入
                }
            } renderScene={this.renderScene} configureScene={this.configureScene} />


        );
    }
    renderScene(route, navigator) {

        switch (route.id) {

            case idList.LoginPage: {
                return <LoginPage navigator={navigator} {...route.passProps} />;
            }
            case idList.HomePage: {
                return <HomePage navigator={navigator} {...route.passProps} />;
            }
            case idList.SearchBookPage: {
                return <SearchBookPage navigator={navigator} {...route.passProps} />;
            }
            case idList.SearchPeoplePage: {
                return <SearchPeoplePage navigator={navigator} {...route.passProps} />;
            }
             case idList.SellBookPage: {
                return <SellBookPage navigator={navigator} {...route.passProps} />;
            } 
            case idList.UserPage: {
                return <UserPage navigator={navigator} {...route.passProps} />;
            } 
            case idList.DetailBookPage:{
                return <DetailBookPage navigator={navigator} {...route.passProps} />;
            }
            case idList.DetailPeoplePage:{
                return <DetailPeoplePage navigator={navigator} {...route.passProps} />;
            }
             case idList.BookListPageSellingPage:{
                return <BookListPageSellingPage navigator={navigator} {...route.passProps} />;


             }
            default: {
                return <LoginPage navigator={navigator} {...route.passProps} />;
            }
        }


    }
    configureScene(route, routeStack) {
        switch (route.type) {
            case "Right": {
                return Navigator.SceneConfigs.PushFromRight;
            }
            case "Left": {
                return Navigator.SceneConfigs.PushFromLeft;
            }
            case "Top": {
                return Navigator.SceneConfigs.FadeAndroid;
            }
            case "Bottom": {
                return Navigator.SceneConfigs.FloatFromBottomAndroid
            }
            default: {
                return Navigator.SceneConfigs.PushFromRight;
            }

        }



    }
}