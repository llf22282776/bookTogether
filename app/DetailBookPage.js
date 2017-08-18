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
import {
    Thumbnail,
    StyleProvider,
    Container,
    Header,
    Title,
    CheckBox,
    Content,
    Label,
    List,
    ListItem,
    Footer,
    Form,
    Item,
    FooterTab,
    Left,
    Button,
    Body,
    Right,
    Icon,
    InputGroup,
    Input,
    Card,
    CardItem,
    Text
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as contant from "../app/contant"
import TabNavigator from 'react-native-tab-navigator';
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export default class DetailBookPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentNums: this.props.comt.length,
            bid:this.props.bid,

        }
        console.log(this.props);
        this.toLast = this.toLast.bind(this);
        this.toBuy = this.toBuy.bind(this);
        this.toDetailPeople = this.toDetailPeople.bind(this);
        this.toDetailProductor = this.toDetailProductor.bind(this);
        this.toDetailBookDes = this.toDetailBookDes.bind(this);
        this.renderRowFunc = this.renderRowFunc.bind(this);
        this.showOwnerOrNot = this.showOwnerOrNot.bind(this);
        this.showBuyOptions = this.showBuyOptions.bind(this);
        this.callback_success=this.callback_success.bind(this);
        this.error_func=this.error_func.bind(this);
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
                        <Title>图书详情</Title>
                    </Body>

                </Header>
                <Content>
                    <Card>
                        <CardItem cardBody>
                            <Image style={{ width: 400, height: 400 }} source={{uri:contant.imageGetter(contant.getOneImage(this.props.det.images),contant.IMAGE_TYPE.BOOK_IMAGE)}} />
                        </CardItem>
                        <CardItem content>
                            <Text>{this.props.det.des}</Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Button transparent>
                                    <Icon active name="thumbs-up" />
                                    <Text>12</Text>
                                </Button>
                                <Button transparent>
                                    <Icon active name="ios-pricetag" />
                                    <Text>{this.props.det.price} 元</Text>
                                </Button>


                            </Left>
                            <Body>

                            </Body>
                            <Right>
                                <Text note>4-11</Text>
                            </Right>
                        </CardItem>
                    </Card>





                    <List>
                        <ListItem itemDivider>
                            <Text>  </Text>
                        </ListItem>
                        {

                            this.showBuyOptions()
                        }

                        <ListItem itemDivider>
                            <Text>  </Text>
                        </ListItem>
                        {
                            this.showOwnerOrNot()

                        }
                        <ListItem itemDivider>
                            <Text>  </Text>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Icon style={{ color: "#0066FF" }} name="md-person" />
                                <Text>作者:  {this.props.det.productor}</Text>
                            </Left>
                            <Right>
                                <Button transparent onLongPress={this.toDetailProductor}>
                                    <Icon name="md-arrow-forward" />
                                </Button>
                            </Right>
                        </ListItem>
                        <ListItem >
                            <Left>
                                <Icon style={{ color: "#0066FF" }} name="ios-paper" />
                                <Text>出版社:{this.props.det.company}</Text>
                            </Left>
                        </ListItem>


                        <ListItem itemDivider>
                            <Text>  </Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text style={{ color: "#0066FF" }} >评价</Text>
                        </ListItem>


                    </List>
                    <ListView style={{ minHeight: 200, maxHeight: 1400 }} scrollEnabled={true} enableEmptySections dataSource={ds.cloneWithRows(this.props.comt)} renderRow={this.renderRowFunc} />

                </Content>
            </Container >

        );

    }
    toLast() {
        this.props.navigator.pop();


    }
    async toBuy() {
        //买书
                //买过的书
        var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.IS_IN_DEALING + "?"+ "bid=" + this.state.bid+"&uid="+contant.USER.uname ;
        var response;
        var ud;
        try {
            response = await fetch(
                url, {
                    method: "GET",
                });
           
            ud = await response.json();
           if(ud.candeal == false || ud.candeal == "false"){
                if(ud.isInYourDeal ==true ||ud.isInYourDeal =="true"){
                    //在自己的交易里面
                     //直接进入下个页面
                     console.warn("xx")
                    var obj={
                        id:contant.idList.CoversionFromPage,
                        passProps:{
                            rid:ud.rid //只需要这个
                        },
                        type:"Right"

                    }
                    this.props.navigator.push(obj);//拉取coversion，进去下一个页面
                }else {
                    //不可交易
                    Alert.alert("提示","无法交易");
                }

           }else {
                //可以交易
                 var parm={
                    "uid":contant.USER.uname,
                    "bid":this.state.bid,
                    "x":0,
                    "y":0,
                    "pname":"",
                    "time":"2014-07-11 00:00:00",
                 }
                 
              //   contant.http_get(contant.SERVER_ROOT+contant.SERVER_SERVICE.BUY_BOOK,parm,callback_success,error_func);

              try{
                var url1= contant.SERVER_ROOT+contant.SERVER_SERVICE.BUY_BOOK+"?"+"uid="+contant.USER.uname+"&bid="+this.state.bid+"&x="+0+"&y="+0+"&pname="+" &time="+"2014-07-11 00:00:00";
                var  response1 = await fetch(
                                 url1, {
                                 method: "GET",
                                });
                            var data= await response1.json();
                            console.warn(data.isSucceed);
                     if(data.isSucceed == "true" || data.isSucceed == true  ){
                            
                            var obj={
                                    id:contant.idList.CoversionFromPage,
                                    passProps:{
                                        rid:data.rid //只需要这个
                                    },
                                    type:"Right"

                                }
                                this.props.navigator.push(obj);//拉取coversion，进去下一个页面
                    }else {
                            Alert.alert("错误","无法交易!");

                    }
              }catch(e){
                   console.log(e)


              }


           }
        } catch (e) {
   
           console.log(e);
            //异常
            Alert.alert("错误", "买书失败\n");



        }


    }
    callback_success(data){
        
         if(data.isSucceed == "true" || data.isSucceed == true  ){
            
                 var obj={
                        id:contant.idList.CoversionFromPage,
                        passProps:{
                            rid:data.rid //只需要这个
                        },
                        type:"Right"

                    }
                    this.props.navigator.push(obj);//拉取coversion，进去下一个页面
         }else {
                 Alert("错误","无法交易!");

         }

    }
    error_func(){
        Alert("错误","无法交易!");

    }
    async  toDetailPeople() {
        var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.SEARCH_PEOPLE_BY_UID + "?" + "uid=" + this.props.uid;
        var response;
        var ud;
        try {
            response = await fetch(
                url, {
                    method: "GET",
                });
            console.log(response);
            ud = await response.json();
            var peopleData = ud;
            var route = {
                id: contant.idList.DetailPeoplePage,
                passProps: peopleData,
                type: "Right"

            }
            this.props.navigator.push(route);
        } catch (e) {
            console.log(response);
            console.log(e);
            //异常
            Alert.alert("错误", "查看人物详情失败\n");



        }











    }
    toDetailProductor() {


    }
    toDetailBookDes() {


    }
    renderRowFunc(data) {
        return (
            <ListItem>
                <Thumbnail source={require('../resources/1.png')} />
                <Body>
                    <Text note>{data.uname}</Text>
                    <Text>{data.content}</Text>
                </Body>
                <Right>
                </Right>
            </ListItem>
        );


    }
    showOwnerOrNot() {

        if (this.props.showOwner == true) {
        
            //显示不显示拥有者
            return (
                <ListItem >
                    <Left>
                        <Icon style={{ color: "#0066FF" }} name="people" />
                        <Text>拥有人:   {this.props.uname}</Text>
                    </Left>
                    <Right>
                        <Button transparent onPress={this.toDetailPeople}>
                            <Icon name="md-arrow-forward" />
                        </Button>
                    </Right>
                </ListItem>);

        }//不是
        else return null;
    }


    showBuyOptions() {
        if (this.props.showBuyItem == false) {
            //同一个人的书，当然不能买
            return null;

        }//不是
        else return (
            <ListItem >
                <Button style={{ flex: 1 }} block success onPress={this.toBuy}>
                    <Icon style={{ color: "#FFFFFF" }} name="ios-cart" />
                </Button>
            </ListItem>);
    }

}