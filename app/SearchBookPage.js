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

// var MAP_DEFAULT = [
//     {
//         latitude: number,
//         longitude: number,
//         animateDrop: bool,
//         title: string,
//         subtitle: string,
//         hasLeftCallout: bool,
//         hasRightCallout: bool,
//         onLeftCalloutPress: function, 
//         onRightCalloutPress: function, 
//         id: string
//     }


// ]

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class SearchBookPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [],     //搜书出来的
            bookSetList: [],   //二维数组，搜地点出来的
            thisShowList: [],
            type: contant.SEARCH_BOOK_TYPE.SEARCH_BOOK_BY_NAME,//搜索方式，默认
            bname: "",
            mayType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: 113.981718,
                latitude: 22.542449
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [
                {
                    longitude: 113.981718,
                    latitude: 22.542449,
                    title: "Window of the world"
                }, {
                    longitude: 113.995516,
                    latitude: 22.537642,
                    title: "hello"
                }]
        };
        this.onTextChange = this.onTextChange.bind(this);
        this.reloadMarker = this.reloadMarker.bind(this);
        this.renderMap = this.renderMap.bind(this);
        this.renderFunc = this.renderFunc.bind(this);
        this.toDetailBookPage = this.toDetailBookPage.bind(this);
        this.renderFunc_2 = this.renderFunc_2.bind(this);
        this.showList = this.showList.bind(this);
    }
    render() {
        return (
            <Container>
                <Header searchBar >
                    <Body>
                        <InputGroup rounded style={{ backgroundColor: "#FFFFFF" }}>
                            <Icon name="ios-search" />
                            <TextInput underlineColorAndroid='transparent' onChangeText={this.onTextChange} style={{ flex: 1, color: "#808080" }} placeholder="输入书的名称或地点" />
                            <Button transparent onPress={this.reloadMarker}>
                                <Icon name="md-search" />
                            </Button>
                        </InputGroup>
                    </Body>

                </Header>
                <Content>
                    <MapView
                        style={styles.map}
                        trafficEnabled={this.state.trafficEnabled}
                        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                        zoom={this.state.zoom}
                        mapType={this.state.mapType}
                        center={this.state.center}
                        markers={this.state.markers}

                        onMarkerClick={(e) => {
                            //点被点一下，下边列表刷新
                            this.showList({ x: e.position.longitude, y: e.position.latitude });


                        }}
                        onMapClick={(e) => {

                        }}
                    />
                    <ListView enableEmptySections scrollEnabled={false} dataSource={ds.cloneWithRows(this.state.thisShowList)} renderRow={this.renderFunc} />

                </Content>
            </Container>

        );


    }
    showList(data1) {
        //显示一本书或一系列书
        if (this.state.type == contant.SEARCH_BOOK_TYPE.SEARCH_BOOK_BY_NAME) {
            var listToshow = [];
            var i = 0;
            var bookList = this.state.bookList;
            this.state.bookList.forEach(
                (data) => {
                    if (
                        (
                            (data.x - data1.x >= 0 && data.x - data1.x < 0.00001)
                            ||
                            (data.x - data1.x < 0 && data.x - data1.x > -0.00001)
                        )
                        &&
                        (
                            (data.y - data1.y >= 0 && data.y - data1.y < 0.00001)
                            ||
                            (data.y - data1.y < 0 && data.y - data1.y > - 0.00001)
                        )
                    ) {

                        listToshow[i] = data;
                        i = i + 1;
                    }


                });

            this.setState({ thisShowList: listToshow });

        } else if (this.state.type == contant.SEARCH_BOOK_TYPE.SEARCH_BOOK_BY_POSITION) {
            var listToshow = [];
            var i = 0;
            var bookList = this.state.bookSetList; //集合书
            this.state.bookList.forEach(
                (data) => {
                    if (
                        (bookList[i].x - data.x < 0.00001) &&
                        (bookList[i].y - data.y < 0.00001)
                    ) {
                        listToshow[i] = bookList[i];
                    }
                    i = i + 1;

                });
            if (listToshow.length > 0) this.setState({
                center:
                {
                    longitude: listToshow[0].x,
                    latitude: listToshow[0].y
                }
            })
            this.setState({ thisShowList: listToshow });
        }



    }


    async   reloadMarker() {
        //向服务器获得数据

        if (this.state.type == contant.SEARCH_BOOK_TYPE.SEARCH_BOOK_BY_NAME) {
            var bookDataList = contant.bookList_test;
            //先渲染到地图上
            // this.renderMap(bookDataList);
            // this.setState({ bookList: contant.bookList_test });




            var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.SEARCH_BOOK_BY_NAME + "?" + "name=" + this.state.bname;
            var response;
            var ud;
            try {
                response = await fetch(
                    url, {
                        method: "GET",
                    });
                console.log(response);
                ud = await response.json();
                var bookDataList = ud.list;
                this.renderMap(bookDataList);
                this.setState({ bookList: bookDataList });

            } catch (e) {

                console.log(e);
                //异常
                Alert.alert("错误", "搜索失败\n");



            }
        }
        else if (this.state.type == contant.SEARCH_BOOK_TYPE.SEARCH_BOOK_BY_POSITION) {




        }


    }

    renderMap(bookDataList) {
        console.log(bookDataList);
        var positionArray = [];
        for (var i = 0; i < bookDataList.length; i++) {

            var marker = {
                longitude: bookDataList[i].x,
                latitude: bookDataList[i].y,
                title: bookDataList[i].name + " " + bookDataList[i].det.productor,
            };
            positionArray[i] = marker;

        }
        console.log(positionArray);
        this.setState({ markers: positionArray });//重新渲染坐标



    }
    onTextChange(data) {
        this.setState({ bname: data });//修改图书名字
    }
    renderFunc(data) {
        if (this.state.type == contant.SEARCH_BOOK_TYPE.SEARCH_BOOK_BY_NAME) {
            //按名字搜的，只渲染ListItem

            return (
                <ListItem>
                    <Thumbnail source={require('../resources/1.png')} />
                    <Body>
                        <Text >{data.name}</Text>
                        <Text note>{data.det.productor}</Text>
                    </Body>
                    <Right>
                        <Button info transparent iconRight onPress={() => { this.toDetailBookPage(data); }}>
                            <Text note>{data.det.price}</Text>
                            <Icon name="ios-arrow-forward" />
                        </Button>
                    </Right>
                </ListItem>);

        } else if (this.state.type == contant.SEARCH_BOOK_TYPE.SEARCH_BOOK_BY_POSITION) {
            //去渲染他妈的ListView,因为是图书集，所以数组的每一个又是一个数组;
            return (<ListView enableEmptySections scrollEnabled={false} dataSource={ds.cloneWithRows(data)} renderRow={this.renderFunc} />);

        }

    }
    toDetailBookPage(bookData) {
        bookData.showBuyItem = true;//有买选项

        var route = {
            id: contant.idList.DetailBookPage,
            passProps: bookData,
            type: "Right"
        }
        this.props.navigator.push(route);
    }
    renderFunc_2(data) {
        return (<ListItem>
            <Thumbnail source={require('../resources/1.png')} />
            <Body>
                <Text >{data.name}</Text>
                <Text note>{data.det.productor}</Text>
            </Body>
            <Right>
                <Button info transparent iconRight>
                    <Text note>{data.det.price}</Text>
                    <Icon name="ios-arrow-forward" />
                </Button>
            </Right>
        </ListItem>);

    }


}
var styles = StyleSheet.create({
    map: {

        height: 350,

        borderWidth: 1,
        borderColor: '#000000',
    }
}); 