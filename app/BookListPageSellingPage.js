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
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class BookListPageSellingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: "",
            bookList:this.props.bookList
        }
        this.toLast = this.toLast.bind(this);
        this.toDetailBook= this.toDetailBook.bind(this);
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
                        <Title>卖书列表</Title>
                    </Body>
                </Header>
                <Content>
                    <ListView enableEmptySections dataSource={ds.cloneWithRows(this.state.bookList)} renderRow={this.renderRowFunc} />
                </Content>
            </Container>

        );


    }
    toLast() {
        this.props.navigator.pop();



    }
    renderRowFunc(data) {
        return (<ListItem>
            <Thumbnail source={require('../resources/1.png')} />
            <Body>
                <Text >{data.name}</Text>
                <Text note>{data.det.productor}</Text>
            </Body>
            <Right>
                <Button info transparent iconRight onPress={()=>{this.toDetailBook(data);}}>
                    <Text note>{data.det.price}</Text>
                    <Icon name="ios-arrow-forward" />
                </Button>
            </Right>
        </ListItem>);

    }
    
    toDetailBook(bookData){
        console.log("this.props");
        console.log(this.props);
        console.log("bookData");
        console.log(bookData);
        bookData.showBuyItem = true;//有买选项
        var route = {
            id: contant.idList.DetailBookPage,
            passProps: bookData,
            type: "Right"
        }
        this.props.navigator.push(route);
    

    }




}