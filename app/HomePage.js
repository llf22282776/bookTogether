'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,
    Navigator,
    Image,

} from 'react-native';


import { Alert,StyleProvider, Container, Header, Title, CheckBox, Content, Label, List, ListItem, Footer, Form, Item, FooterTab, Left, Button, Body, Right, Icon, InputGroup, Input, Card, CardItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as contant from "./contant"
import TabNavigator from 'react-native-tab-navigator';

import SearchBookPage from '../app/SearchBookPage';
import SellBookPage from '../app/SellBookPage';

import SearchPeoplePage from '../app/SearchPeoplePage';

import UserPage from '../app/UserPage';


export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab:contant.tabList.SEARCH_BOOK
        }


    }
    render() {
        return (<TabNavigator>
            <TabNavigator.Item
                selected={this.state.selectedTab === contant.tabList.SEARCH_BOOK}
                title="搜书"
                renderIcon={() => <Icon name="md-book" />}
                renderSelectedIcon={() => <Icon active name="md-book" style={{color:"#0066FF"}} />}
                onPress={() => this.setState({ selectedTab: contant.tabList.SEARCH_BOOK })}>
                <SearchBookPage navigator={this.props.navigator} />
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === contant.tabList.SEARCH_PEOPLE}
                title="搜人"
                renderIcon={() => <Icon name="md-body" />}
                renderSelectedIcon={() => <Icon active name="md-body" style={{color:"#0066FF"}}/>}
                onPress={() => this.setState({ selectedTab: contant.tabList.SEARCH_PEOPLE })}>
                <SearchPeoplePage navigator={this.props.navigator} />
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === contant.tabList.SELL_BOOK}
                title="卖书"
                renderIcon={() => <Icon name="ios-share" />}
                renderSelectedIcon={() => <Icon active name="ios-share" style={{color:"#0066FF"}}/>}
                onPress={() => this.setState({ selectedTab: contant.tabList.SELL_BOOK })}>
                <SellBookPage navigator={this.props.navigator} />
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === contant.tabList.USER_PAGE}
                title="个人"
                renderIcon={() => <Icon name="md-person" />}
                renderSelectedIcon={() => <Icon active name="md-person" style={{color:"#0066FF"}}/>}
                onPress={() => this.setState({ selectedTab: contant.tabList.USER_PAGE })}>
                <UserPage navigator={this.props.navigator} />
            </TabNavigator.Item>
        </TabNavigator>
        );


    }




}
