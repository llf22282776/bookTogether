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
import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';
export default class SellBookPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            des: "",
            company: "",
            productor: "",
            price: 0,
            x: 0.000,
            y: 0.000,
        }

        this.priceChange = this.priceChange.bind(this);
        this.productorChange = this.productorChange.bind(this);
        this.companyChange = this.companyChange.bind(this);
        this.desChange = this.desChange.bind(this);
        this.sellBook = this.sellBook.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }
    render() {
        return (
            <Container>
                <Header>
                    <Title>卖书</Title>
                </Header>
                <Content>
                    <Button full success transparent>
                        <Icon name="md-camera" />
                        <Text>图片</Text>
                    </Button>
                    <MapView
                        style={contant.styles.map1}
                        trafficEnabled={contant.mapState.trafficEnabled}
                        baiduHeatMapEnabled={contant.mapState.baiduHeatMapEnabled}
                        zoom={contant.mapState.zoom}
                        mapType={contant.mapState.mayType1}
                        center={contant.mapState.center}

                        markers={[{ longitude: this.state.x, latitude: this.state.y, title: "卖书点" }]}
                        onMarkerClick={(e) => {
                            //点被点一下，下边列表刷新

                        }}

                        onMapClick={(e) => {
                            this.setState({ x: e.longitude, y: e.latitude });
                        }}
                    />






                    <List>
                        <ListItem itemDivider>
                            <Text>  </Text>
                        </ListItem>
                        <ListItem>
                            <TextInput style={{ flex: 1, backgroundColor: "#ffffff" }} placeholder="价格" onChangeText={this.priceChange} />

                        </ListItem>

                        <ListItem itemDivider>
                            <Text>  </Text>
                        </ListItem>
                        <ListItem>
                            <TextInput style={{ flex: 1, backgroundColor: "#ffffff" }} placeholder="书名" onChangeText={this.nameChange} />

                        </ListItem>
                        <ListItem>
                            <TextInput style={{ flex: 1, backgroundColor: "#ffffff" }} placeholder="作者" onChangeText={this.productorChange} />

                        </ListItem>
                        <ListItem>
                            <TextInput style={{ flex: 1, backgroundColor: "#ffffff" }} placeholder="出版社" onChangeText={this.companyChange} />
                        </ListItem>
                        <ListItem>

                            <TextInput multiline={true} style={{ borderWidth: 1, borderRadius: 18, borderColor: "#cccccc", backgroundColor: "#ffffff", flex: 1, height: 400, width: 300, textAlignVertical: "top" }} placeholder="简介"

                                onChangeText={this.desChange}
                            />


                        </ListItem>

                    </List>

                    <Button full info onPress={this.sellBook} >
                        <Icon name="md-desktop" />
                        <Text>卖书</Text>
                    </Button>


                </Content>
            </Container>

        );


    }

    desChange(data) {
        this.setState({ des: data });
    }
    nameChange(data) {
        this.setState({ name: data });
    }
    companyChange(data) {
        this.setState({ company: data });
    }
    productorChange(data) {
        this.setState({ productor: data });
    }
    priceChange(data) {
        this.setState({ price: data });
    }
    async sellBook() {
        // var bookMsg={
        //      name:this.state.name,
        //      uid:contant.USER.uname,
        //      x:this.state.x,
        //      y:this.state.y,
        //      det:{
        //         des:this.state.des,
        //         productor:this.state.productor,
        //         company:this.state.company,
        //         price:this.state.price,
        //         images:[]
        //         }

        // }
        var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.SELL_BOOK + "?";
        url = url + "name=" + this.state.name + "&";
        url = url + "uid=" + contant.USER.uid + "&";
        url = url + "x=" + this.state.x + "&";
        url = url + "y=" + this.state.y + "&";
        url = url + "des=" + this.state.des + "&";
        url = url + "productor=" + this.state.productor + "&";
        url = url + "company=" + this.state.company + "&";
        url = url + "price=" + this.state.price;

        var response;
        var ud;
        try {
            response = await fetch(
                url, {
                    method: "GET",
                });
            console.log(response);
            ud = await response.json();
            
            var isSucceed = ud.isSucceed;
            if(isSucceed == "true" || isSucceed == true ){
                //
                 Alert.alert("成功", "卖书成功\n");

            }
        
        } catch (e) {
            console.log(response);
            console.log(e);
            //异常
            Alert.alert("错误", "卖书失败\n");
        }





        var bookMsg = {
            bid: 3,
            uname: contant.USER.name,
            name: this.state.name,
            uid: contant.USER.uname,
            x: this.state.x,
            y: this.state.y,
            det: {
                des: this.state.des,
                productor: this.state.productor,
                company: this.state.company,
                price: this.state.price,
                images: []
            },
            comt: []

        }

        contant.bookList_test.push(bookMsg);




    }
}

