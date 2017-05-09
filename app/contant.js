import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';
import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,

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
    BookListPageSellingPage: "BookListPageSellingPage",
    DetialQuestionPage: "DetialQuestionPage",
    CommunityPage: "CommunityPage",
    AnswerToQuestionPage: "AnswerToQuestionPage",
    AddQuestionPage: "AddQuestionPage",
    NewMsgListPage: "NewMsgListPage",

}
export const mapState = {
    mayType: MapTypes.NORMAL,
    mayType1: MapTypes.SATELLITE,
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
export const SERVER_ROOT = "http://10.8.161.92:8080/BookFlow/";
export const SERVER_COMMUNITY = "http://192.168.99.2:8080/";
export const SERVER_SERVICE = {
    LOG_IN: "LoginAction",//登陆
    SEARCH_BOOK_BY_NAME: "SearchBooksByBookNameAction",
    SEARCH_PEOPLE_BY_UID: "SearchPeopleByPeopleIdAction",
    SEARCH_BOOKS_SELLING: "SearchBooksByRecordAction",
    SEARCH_PEOPLE_BY_NAME: "SearchPeoplesByPeopleNameAction",
    BUY_BOOK:"BuyBookAction",
    GET_COVERSIONLIST: "api/coversion/getCoversionList",
    GET_COVERSIONLIST_BY_ID: "api/coversion/getCoversionByCid",
    GET_COMMENTLIST: "api/comment/getCommentList",
    GET_COMMENTLIST_JSON: "api/comment/getCommentList_json",
    INSERT_COVERSION: "api/coversion/insertCoversion",
    INSERT_COMMENT: "api/comment/insertComment",
    SEARCH_COVERSIONLIST: "api/coversion/searchCoversionList",
    SUPPORT_COVERSION: "api/comment/upDateSupportNums",
    IMAGE_ROOT: "/static/images/",
    IMAGE_ROOT_PEOPLE: "/static/images/thumbnail/",
    IMAGE_ROOT_MED: "static/images/medImage/",
    GET_PERSONAL_MSG: "api/personal/getPersonalMsg",
    IMAGE_ROOT_NEWS: "/static/images/newsImg/",
    GET_PERSONAL_NEW_MSG: "api/personal/getMsgNew",
    GET_PERSONAL_NEW_MSG_NUM: "api/personal/getMsgNewNums",
    SET_PERSONAL_NEW_MSG_VIEWED: "api/personal/setMsgViewed",//参数json
    LOG_IN_COMMUNITY: "api/personal/Login",//登陆
    SELL_BOOK:"SaleBookAction",//卖书
}
export const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
export const removeYearsAndSecond = (newDate) => {
    //var newDate = rowData.date;
    console.log("newDate");
    console.log(newDate);

    newDate = getDateFormat(newDate);


    var stringList = newDate.split("-");//第一个是年,第二个是月

    var mouth = stringList[1];


    var str1 = stringList[2];

    var stringList1 = str1.split(" ");//第一个是天
    var day = stringList1[0];
    str1 = stringList1[1];

    var stringList2 = str1.split(":");//第一个是时，第二个是分，第三个是秒
    var hours = stringList2[0];
    var mins = stringList2[1];
    var sec = stringList2[2];
    newDate = mouth + "-" + day + " " + hours + ":" + mins;

    return newDate;

}
export const removeYearsAndSecond_1 = (newDate) => {
    //var newDate = rowData.date;



    newDate = newDate + "";
    var stringList = newDate.split("-");//第一个是年,第二个是月

    var mouth = stringList[1];


    var str1 = stringList[2];

    var stringList1 = str1.split(" ");//第一个是天
    var day = stringList1[0];
    str1 = stringList1[1];

    var stringList2 = str1.split(":");//第一个是时，第二个是分，第三个是秒
    var hours = stringList2[0];
    var mins = stringList2[1];
    var sec = stringList2[2];
    newDate = mouth + "-" + day + " " + hours + ":" + mins;

    return newDate;

}

export const getNowFormatDate = () => {
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    var hours;
    var mins;
    var second;
    //初始化时间
    //Year= day.getYear();//有火狐下2008年显示108的bug
    Year = day.getFullYear();//ie火狐下都可以
    Month = day.getMonth() + 1;
    Day = day.getDate();
    hours = day.getHours();
    mins = day.getMinutes();
    second = day.getSeconds();
    //Hour = day.getHours();
    // Minute = day.getMinutes();
    // Second = day.getSeconds();
    CurrentDate += Year + "-";
    if (Month >= 10) {
        CurrentDate += Month + "-";
    }
    else {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10) {
        CurrentDate += Day;
    }
    else {
        CurrentDate += "0" + Day;
    }
    CurrentDate += " "
    if (hours >= 10) {
        CurrentDate += hours;
    }
    else {
        CurrentDate += "0" + hours;
    }
    CurrentDate += ":"
    if (mins >= 10) {
        CurrentDate += mins;
    }
    else {
        CurrentDate += "0" + mins;
    }
    CurrentDate += ":"
    if (second >= 10) {
        CurrentDate += second;
    }
    else {
        CurrentDate += "0" + second;
    }

    //console.log(CurrentDate);
    return CurrentDate;
}
export const getDateFormat = (data) => {
    var day = new Date(data);
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    var hours;
    var mins;
    var second;
    //初始化时间
    //Year= day.getYear();//有火狐下2008年显示108的bug
    Year = day.getFullYear();//ie火狐下都可以
    Month = day.getMonth() + 1;
    Day = day.getDate();
    hours = day.getHours();
    mins = day.getMinutes();
    second = day.getSeconds();
    //Hour = day.getHours();
    // Minute = day.getMinutes();
    // Second = day.getSeconds();
    CurrentDate += Year + "-";
    if (Month >= 10) {
        CurrentDate += Month + "-";
    }
    else {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10) {
        CurrentDate += Day;
    }
    else {
        CurrentDate += "0" + Day;
    }
    CurrentDate += " "
    if (hours >= 10) {
        CurrentDate += hours;
    }
    else {
        CurrentDate += "0" + hours;
    }
    CurrentDate += ":"
    if (mins >= 10) {
        CurrentDate += mins;
    }
    else {
        CurrentDate += "0" + mins;
    }
    CurrentDate += ":"
    if (second >= 10) {
        CurrentDate += second;
    }
    else {
        CurrentDate += "0" + second;
    }

    //console.log(CurrentDate);
    return CurrentDate;
};


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
    USER_PAGE: "USER_PAGE",
    COMMUNITY: "CommunityPage",



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


export const newMsgGetter = async function () {
    //从服务器获得新消息的数量，然后渲染起来
    var url = SERVER_COMMUNITY + SERVER_SERVICE.GET_PERSONAL_NEW_MSG_NUM;
    url = url + "?";
    url += "nid=" + USER.nid;
    console.log("url:" + url);



    try {
        let response = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Content-type": "text/html;charset=UTF-8"
                }
            });

        let data = await response.json();
        var msgNumsData = data.nums;//从这个字段取东西
        USER.newMsgNums = msgNumsData;
        USER.msgNums = msgNumsData;


    } catch (e) {
        //异常
        Alert.alert("错误", "新消息获取失败");



    }
}
export const userMsgGetter = async function () {
    //个人信息
    var url = SERVER_COMMUNITY + SERVER_SERVICE.GET_PERSONAL_MSG;
    url = url + "?";
    url += "nid=" + USER.nid;
    console.log("url:" + url);

    try {
        let response = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Content-type": "text/html;charset=UTF-8"
                }
            });

        let data = await response.json();
        //存个人信息
        USER.nick = data.nick;
        USER.sex = data.sex;
        USER.phone = data.phone;
        USER.thumbnail = data.thumbnail;
        USER.nid = data.nid;
        USER.passPort = data.passPort;





    } catch (e) {
        //异常
        Alert.alert("错误", "个人信息");



    }







}