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
import  ImagePicker  from 'react-native-image-picker';
var photoOptions = {
    //底部弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}
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
            pName:"未选择地点",
            
            imgPath:"", //图片连接字符串
            type: 'image/jpg',
            fileName:""

        }

        this.priceChange = this.priceChange.bind(this);
        this.productorChange = this.productorChange.bind(this);
        this.companyChange = this.companyChange.bind(this);
        this.desChange = this.desChange.bind(this);
        this.sellBook = this.sellBook.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.call_back=this.call_back.bind(this);
        this.catImage=this.catImage.bind(this);
        this.renderImage=this.renderImage.bind(this);
        this.successFunc=this.successFunc.bind(this);
        this.errorFunc=this.errorFunc.bind(this);
    }
    render() {
        return (
            <Container>
                <Header>
                    <Title>卖书</Title>
                </Header>
                <Content>
                    <Button full success transparent onPress={this.catImage}>
                        <Icon name="md-camera" />
                        <Text>图片</Text>
                    </Button>
                   {
                        this.renderImage()

                   }

                    <List>
                        <ListItem itemDivider>
                            <Text>  </Text>
                        </ListItem>
                          <ListItem icon>
                            <Left>
                                <Icon name="md-map" />
                            </Left>
                            <Body>
                                 <Text>{this.state.pName}</Text>
                            </Body>
                            <Right>
                                <Button transparent onPress={()=>{
                                    var obj = {
                                        id:contant.idList.MapSurePage,
                                        passProps:{
                                            call_back:this.call_back,
                                            lastPage:1,
                                        },
                                        type:"Right"

                                    };
                                    this.props.navigator.push(obj);
                                    
                                    }}>
                                <Text>选择地点</Text>
                                <Icon name="arrow-forward" />
                                    </Button>
                             </Right>
            </ListItem>
                          <ListItem>
                            <Text>  </Text>
                        </ListItem>
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
    renderImage(){
        if(this.state.imgPath == ""){

            return  <Image style={{flex:1,width:400,height:400}} source={require("../resources/2.png")} />
                     
        }else {

            return  <Image style={{flex:1,width:400,height:400}} source={{uri:this.state.imgPath}} />
;
        }

    }
    catImage(){
        //获取图片
    //拉取图片
        ImagePicker.showImagePicker(photoOptions, (response) => {
      

            if (response.didCancel) {
                //取消
            }
            else if (response.error) {
                //出错

            }
            else if (response.customButton) {
              //自定义
              response.fileName
              console.warn(response.fileName)
              console.warn(response.uri)
            }
            else {
            
             
                this.setState({
                    imgPath:response.uri, 
                    fileName:response.fileName
                })
       

            }
        });

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
      sellBook() {

        var url = contant.SERVER_ROOT + contant.SERVER_SERVICE.SELL_BOOK ;
        console.log("url:"+url);
        var formData =new FormData();
        formData.append("image",{uri: this.state.imgPath, type: 'image/jpg',name: this.state.fileName});
        formData.append("name",this.state.name);
        formData.append("uid",contant.USER.uid);
        formData.append("x",this.state.x);
        formData.append("y",this.state.y);
        formData.append("des",this.state.des);
        formData.append("productor",this.state.productor);
        formData.append("company",this.state.company);
        formData.append("price",this.state.price);


        //  var parmObj={
        // "name":this.state.name,
        // "uid":contant.USER.uid,
        // "x":this.state.x,
        // "y":this.state.y,
        // "des":this.state.des,
        // "productor":this.state.productor,
        // "company":this.state.company,
        // "price":this.state.price,
        //  };
        //  contant.http_get(url,parmObj,this.successFunc,this.errorFunc);
        // try {
        //     let response = await fetch(
        //    url,
        //     {
        //         method: "POST",
        //         body:formData,
        //     }
            
        //     );

        // let data = await response.json();
        // var isSucceed = data.isSucceed;
        //     if(isSucceed == "true" || isSucceed == true ){
        //         //
        //          Alert.alert("成功", "卖书成功\n");
        //     }
        // } catch (e) {
        //      //异常
        //     this.errorFunc(e);
        // }


        contant.http_post(url,formData,this.successFunc,this.errorFunc);



    }
    call_back(data){
        this.setState({
            x:data.x,
            y:data.y,
            pName:data.pName
        });

    }
    successFunc(data){
      var isSucceed = data.isSucceed;
            if(isSucceed == "true" || isSucceed == true ){
                //
                 Alert.alert("成功", "卖书成功\n");
            }
    }
    errorFunc(e){

            console.log(e);
            //异常
            Alert.alert("错误", "卖书失败\n");


    }
}

