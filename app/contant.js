import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';
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
export const USER = {

    uname: "zhangweiqi",
    name: "张炜奇",
    rank: 100,
    uid: 1,
    pwd: "123456",
    sex: 1,
    age: 18,
    restMoney: 1900
};
export const idList = {
    LoginPage: "LoginPage",
    SearchBookPage: "SearchBookPage",
    SearchPeoplePage: "SearchPeoplePage",
    SellBookPage: "SellBookPage",
    UserPage: "UserPage",
    HomePage: "HomePage",
    DetailBookPage: "DetailBookPage",
    DetailPeoplePage: "DetailPeoplePage",
    BookListPageSellingPage: "BookListPageSellingPage"


}
export const mapState = {
    mayType: MapTypes.NORMAL,
    mayType1:MapTypes.SATELLITE,
    zoom: 15,
    center: {
        longitude: 113.981718,
        latitude: 22.542449
    },
    trafficEnabled: false,
    baiduHeatMapEnabled: false,


}

export const styles = StyleSheet.create({
    map: {

        height: 350,

        borderWidth: 1,
        borderColor: '#000000',
    },
    map1: {

        height: 500,

        borderWidth: 1,
        borderColor: '#000000',
    }
});
export const centerMark = {
    longitude: 113.981718,
    latitude: 22.542449
}
export const SERVER_ROOT = "http://192.168.191.2:8080/BookFlow/";
export const SERVER_SERVICE = {
    LOG_IN: "LoginAction",//登陆
    SEARCH_BOOK_BY_NAME: "SearchBooksByBookNameAction",
    SEARCH_PEOPLE_BY_UID: "SearchPeopleByPeopleIdAction",
    SEARCH_BOOKS_SELLING: "SearchBooksByRecordAction",
    SEARCH_PEOPLE_BY_NAME: "SearchPeoplesByPeopleNameAction"


}
export const people_test = [
    {
        uname: "我飞",
        rank: 100000,
        uid: 3,
        sex: 1,
        age: 18,
    },
    {
        uname: "阿阳",
        rank: 100030,
        uid: 4,
        sex: 1,
        age: 18,
    },
    {
        uname: "樱诗",
        rank: 100020,
        uid: 5,
        sex: 1,
        age: 18,
    },
    {
        uname: "狒狒",
        rank: 100040,
        uid: 6,
        sex: 1,
        age: 18,
    },

]
export const tabList = {
    SEARCH_BOOK: "SEARCH_BOOK",
    SEARCH_PEOPLE: "SEARCH_PEOPLE",
    SELL_BOOK: "SELL_BOOK",
    USER_PAGE: "USER_PAGE"



}

export const SEARCH_BOOK_TYPE = {
    SEARCH_BOOK_BY_NAME: 1,
    SEARCH_BOOK_BY_POSITION: 2
}

export const bookList_test = [
    {
        bid: 1,
        name: "软件工程化",
        uname: "张炜奇",
        uid: "zhangweiqi",
        x: 112.33845,
        y: 16.99676,
        det: {
            des: "王安生老师的完美杰作",
            productor: "王安生",
            company: "北京工业出版社",
            price: 16.3,
            images: [],
        },
        comt: [
            {
                uid: 2,
                uname: "廖凌飞",
                content: "太棒了",
            }
        ]
    },
    {
        bid: 1,
        name: "C语言设计",
        uname: "张炜奇",
        uid: "zhangweiqi",
        x: 115.33845,
        y: 14.99676,
        det: {
            des: "世界三大奇迹之一",
            productor: "贝尔",
            company: "贝尔实验室",
            price: 16.3,
            images: [],
        },
        comt: [
            {
                uid: 2,
                uname: "廖凌飞",
                content: "老铁66666",
            }
        ]
    }
];


