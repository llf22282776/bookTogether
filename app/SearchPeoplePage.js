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
export default class SearchPeoplePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: "",
            peopleList: []
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.renderRowFunc = this.renderRowFunc.bind(this);
        this.toDetailPeople=this.toDetailPeople.bind(this);
        this.findPeoples=this.findPeoples.bind(this);
        this.getPeoples=this.getPeoples.bind(this);
    }
    render() {
        return (
            <Container>
                <Header searchBar >
                    <Body>
                        <InputGroup rounded style={{ backgroundColor: "#FFFFFF" }}>
                            <Icon name="ios-search" />
                            <TextInput underlineColorAndroid='transparent' onChangeText={this.onTextChange} style={{ flex: 1, color: "#808080" }} placeholder="输入人的名字" />
                            <Button transparent onPress={this.findPeoples}>
                                <Icon name="md-search" />
                            </Button>
                        </InputGroup>
                    </Body>
                </Header>
                <Content>
                    <ListView enableEmptySections dataSource={ds.cloneWithRows(this.state.peopleList)} renderRow={this.renderRowFunc} />
                </Content>
            </Container>

        );


    }
    onTextChange(data) {

        this.setState({ uname: data });



    }
    findPeoples(){
        //this.setState({peopleList:contant.people_test});
        this.getPeoples();
    }

    async getPeoples(){
         var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.SEARCH_PEOPLE_BY_NAME + "?" + "name=" + this.state.uname;
            var response;
            var ud;
            try {
                response = await fetch(
                    url, {
                        method: "GET",
                    });
                console.log(response);
                ud = await response.json();
                var peopleDataList = ud.list;
                this.setState({ peopleList: peopleDataList });

            } catch (e) {

                console.log(e);
                //异常
                Alert.alert("错误", "搜索失败\n");



            }






    }
    renderRowFunc(data) {
        return (<ListItem>
            <Thumbnail source={require('../resources/1.png')} />
            <Body>
                <Text >{data.uname}</Text>
                <Text note>年龄:{data.age}</Text>
                <Text note>性别:{data.sex == 1 ? "男" : "女"}</Text>
            </Body>
            <Right>
                <Button info transparent iconRight onPress={()=>{this.toDetailPeople(data)}}>
                    <Icon name="ios-arrow-forward" />
                </Button>
            </Right>
        </ListItem>);


    }
    toDetailPeople(peopleData){
        var route={
            id:contant.idList.DetailPeoplePage,
            passProps:peopleData,
            type:"Right"
        }
        this.props.navigator.push(route);

    }

}