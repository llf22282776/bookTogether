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
import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';
export default class SellBookPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            des: "",
            company: "",
            productor: "",
            price: 0,

            x:0.000,
            y:0.000,
        }

        this.priceChange = this.priceChange.bind(this);
        this.productorChange = this.productorChange.bind(this);
        this.companyChange = this.companyChange.bind(this);
        this.desChange = this.desChange.bind(this);
        this.sellBook=this.sellBook.bind(this);
        this.nameChange=this.nameChange.bind(this);
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
                        style={contant.styles.map}
                        trafficEnabled={contant.mapState.trafficEnabled}
                        baiduHeatMapEnabled={contant.mapState.baiduHeatMapEnabled}
                        zoom={contant.mapState.zoom}
                        mapType={contant.mapState.mapType}
                        center={contant.mapState.center}
                        

                        onMarkerClick={(e) => {
                            //点被点一下，下边列表刷新
                           
                        }}
                        onMapClick={(e) => {
                            this.setState({x:e.longitude,y:e.latitude});
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
                            <TextInput style={{ flex: 1, backgroundColor: "#ffffff" }} placeholder="书名" onChangeText={this.productorChange} />

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
    nameChange(data){
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
    sellBook(){
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
           var bookMsg={
             bid:3,
             uname:contant.USER.name,
             name:this.state.name,
             uid:contant.USER.uname,
             x:this.state.x,
             y:this.state.y,
             det:{
                des:this.state.des,
                productor:this.state.productor,
                company:this.state.company,
                price:this.state.price,
                images:[]
            },
            comt:[]

        }

        contant.bookList_test.push(bookMsg);




    }
}