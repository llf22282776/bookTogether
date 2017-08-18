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
import { Segment,Badge, Tabs ,Tab,Thumbnail, StyleProvider, Container, Header, Title, CheckBox, Content, Label, List, ListItem, Footer, Form, Item, FooterTab, Left, Button, Body, Right, Icon, InputGroup, Input, Card, CardItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as contant from "../app/contant"
import TabNavigator from 'react-native-tab-navigator';
import DealToDetailPage from "../app/DealToDetailPage";
export default class DealToMePage extends Component {


    constructor(props){ 
        super(props);
        this.state={
        
        };

    }

    render(){

        return (
              <Container>
                <Content>
                   <Tabs initialPage={1}>
                        <Tab heading="正在处理" > 
                              <DealToDetailPage navigator={this.props.navigator} status={contant.DEAL_STATUS.DEALING}/>
                        </Tab>
                        <Tab heading="已完成">
                              <DealToDetailPage navigator={this.props.navigator} status={contant.DEAL_STATUS.DEAL_COMPLETE}/>
                        </Tab>
                        <Tab heading="已取消">
                              <DealToDetailPage navigator={this.props.navigator} status={contant.DEAL_STATUS.DEAL_CANCEL}/>
                        </Tab>
                    </Tabs>
                </Content>
              </Container>
              );

    }

}