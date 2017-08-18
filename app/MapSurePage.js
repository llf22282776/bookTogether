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
import { Segment,Badge, Thumbnail, StyleProvider, Container, Header, Title, CheckBox, Content, Label, List, ListItem, Footer, Form, Item, FooterTab, Left, Button, Body, Right, Icon, InputGroup, Input, Card, CardItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as contant from "../app/contant"
import TabNavigator from 'react-native-tab-navigator';
import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';
export default class MapSurePage extends Component {


    constructor(props){ 
        super(props);
        this.state={
            timeText:"",
            x:0,
            y:0,
            pName:"",
            rid:this.props.rid,
            lastPage:this.props.lastPage,
        };
        this.mapSure=this.mapSure.bind(this);
        this.returnLastOne=this.returnLastOne.bind(this);
        this.successFuc=this.successFuc.bind(this);
        this.errorFunc=this.errorFunc.bind(this);
        
    }

    render(){

         return (
            <Container>
               <Header>
                    <Left>
                        <Button iconLeft transparent onPress={this.returnLastOne}>
                            <Icon name="ios-arrow-back" style={{ fontSize: 26 }} />
                        </Button>
                    </Left>

                </Header>
                <Content>
                   <MapView ref="_map"
                        style={contant.styles.map1}
                        trafficEnabled={contant.mapState.trafficEnabled}
                        baiduHeatMapEnabled={contant.mapState.baiduHeatMapEnabled}
                        zoom={contant.mapState.zoom}
                        mapType={contant.mapState.mayType1}
                        center={contant.mapState.center}

                        markers={[{ longitude: this.state.x, latitude: this.state.y, title: "约定点" }]}
                        onMarkerClick={(e) => {
                            //点被点一下，下边列表刷新
                        }}

                        onMapClick={(e) => {
                            this.setState({ x: e.longitude, y: e.latitude });
                             Geolocation.reverseGeoCodeGPS(e.latitude,e.longitude)
                                .then(data => {
                                    //显示地名，各种东西加起来
                                    console.log(e)
                                    console.log(data)
                                    this.setState({pName:data.province+data.city+data.district+data.street+data.streetNumber});
                                    })
                                .catch(e =>{
                                    console.warn(e, 'error');
                            })
                        }}
                    />
                          <Text>{this.state.pName}</Text>
                       <Button block success onPress={this.mapSure}><Text>确认</Text></Button>

                </Content>
            </Container>

        );

    }

    mapSure(){
        //确认
     if(this.state.lastPage == 1){
         if(this.state.x == 0 || this.state .y == 0 || this.state.pName == ""){
        Alert.alert("错误","请选择地点")

         }else{

            if(this.state.lastPage == 1){
            //从卖书页面进来的
            //有个callback
            this.props.call_back({
                pName:this.state.pName,
                x:this.state.x,
                y:this.state.y

            });
            //然后出去
              this.props.navigator.pop();
         }
     }
    }else {
         if(this.state.x == 0 || this.state .y == 0 || this.state.pName == ""){
        Alert.alert("错误","请选择地点")

        }else{
          var parm={
             "type":1,
             "msg":this.state.pName,
             "class_":1, //是地点
             "uid":contant.USER.uname,
             "pname":this.state.pName,
             "x":this.state.x,
             "y":this.state.y,
             "rid":this.state.rid,
        }
        contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.SEND_MSG,parm,this.successFuc,this.errorFunc);

      }
         
     }
    }
    returnLastOne(){
        this.props.navigator.pop();


    }
    successFuc(data){
        //直接返回
        if(this.state.lastPage == 1){
            //从卖书页面进来的
            //有个callback
            this.props.call_back({
                pName:this.state.pName,
                x:this.state.x,
                y:this.state.y

            });
            //然后出去
              this.props.navigator.pop();
        }else {

            if(data.isSucceed == true || data.isSucceed == "true"){

            this.props.call_back(
                {
             type:1,
             msg:this.state.pName,
             btime:this.state.timeText,
             class_:1, //是地点
             uid:contant.USER.uname,
             x:this.state.x,
             y:this.state.y,
             pName:this.state.pName,
             operation:0

                }

            ); //直接压进去了
           this.props.navigator.pop();

        }
        }

    }
    errorFunc(data){
        console.log(data);
        Alert.alert("错误","确定失败");

    }

}