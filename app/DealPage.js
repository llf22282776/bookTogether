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
import DealFromMePage  from "../app/DealFromMePage";
import DealToMePage  from "../app/DealToMePage";
import TabNavigator from 'react-native-tab-navigator';

export default class DealPage extends Component {
    constructor(props){
        super(props);
        this.state={
            dealState:contant.DEAL_STATE.FROM_STATE,
        };
        this.renderFromOrTo=this.renderFromOrTo.bind(this);
        this.callBack=this.callBack.bind(this);
        this.toLast=this.toLast.bind(this);
    }
    render(){
        //
        return (
              <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.toLast}>

                            <Icon name="md-arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Segment>
                                 <Button first active onPress={()=>{
                                        this.setState({
                                            dealState:contant.DEAL_STATE.FROM_STATE

                                        });
                                     }}><Text>我的预约</Text></Button>
                                 <Button last  onPress={()=>{
                                        this.setState({
                                            dealState:contant.DEAL_STATE.TO_STATE
                                        });
                                     }}><Text>我被预约</Text></Button>
                        </Segment>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                {

                    this.renderFromOrTo()
                }
              </Container>


        );


    }
    toLast(){
        this.props.navigator.pop();

    }
    renderFromOrTo(){
        if(this.state. dealState== contant.DEAL_STATE.FROM_STATE){
            return (
                <DealFromMePage navigator={this.props.navigator}></DealFromMePage>
            );
        }else if(this.state. dealState== contant.DEAL_STATE.TO_STATE){
            return(
                 <DealToMePage navigator={this.props.navigator} ></DealToMePage>
            );

        }


    }
    callBack(){

    }

}