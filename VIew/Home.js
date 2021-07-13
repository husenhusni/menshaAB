import React, { Component, useEffect, useRef, useState, } from "react";
import { View, StyleSheet, Platform,TouchableOpacity, Text, StatusBar,Image, SafeAreaView } from "react-native";
import {
  Icon,
} from "native-base";
import Welcome from "../components/homePage/welcome/Welcome";
import OnGoing from "../components/homePage/ongoing/OnGoing";
import SendTab from "../components/homePage/send/SendTab";
import History from "../components/homePage/history/History";
import Profile from "../components/homePage/profile/MyCart";
import { t } from "../languages/index";
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { saveExpoPushToken } from "../redux/actions/userAction";
import { connect } from "react-redux";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("hi",token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


function Home(props) {
  const [FooterUI, setFooterUI] = useState({
    send: false,
    ongoing: false,
    history: false,
    home: true,
    Profile: false,
    backButton: "none"
  });
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      props.saveExpoPushToken(token)
      
    });
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

  }, [])





  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} backgroundColor={"#711cf1"} ></StatusBar>
      {FooterUI.Profile != true &&
        <View style={styles.header}>

          <Text style={styles.textTitle}>{FooterUI.home === true && t("home")}
            {FooterUI.ongoing === true && t("onGoingTransaction")}
            {FooterUI.history === true && t("completedTransaction")}
            {FooterUI.send === true && t("newTransaction")}

          </Text>
        </View>}
      <View style={styles.content}>
        {FooterUI.home === true && <Welcome onCallBackLister={(param => {
          setFooterUI(param);
        })} />}
        {FooterUI.ongoing === true && <OnGoing props={props} />}
        {FooterUI.history === true && <History props={props} />}
        {FooterUI.Profile === true && <Profile props={props} />}
        {FooterUI.send === true && <SendTab props={FooterUI.sendProps} />}

      </View>



<SafeAreaView>
<View style={styles.bottonTab}>
        <TouchableOpacity active={FooterUI.home} onPress={() => setFooterUI({
          send: false,
          ongoing: false,
          history: false,
          Profile: false,
          home: true,
          backButton: "none"
        })}>{ FooterUI.home==false &&
          <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../assets/images/home.png")}></Image>
        }
        { FooterUI.home==true &&
          <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../assets/images/home-active.png")}></Image>
        }<Text style={{ ...styles.footerText, color: FooterUI.home ? "#711cf1" : "#353736" }}>{t("home")}</Text>
        </TouchableOpacity>
        <TouchableOpacity active={FooterUI.send} onPress={() => {
          setFooterUI({
            send: true,
            ongoing: false,
            history: false,
            home: false,
            Profile: false,
            backButton: "flex"
          })
        }}>{FooterUI.send==false &&
          <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../assets/images/send.png")}></Image>
          }
          {FooterUI.send==true &&
          <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../assets/images/send-active.png")}></Image>
          }
          <Text style={{ ...styles.footerText, color: FooterUI.send ? "#711cf1" : "#353736" }}>{t("send")}</Text>
        </TouchableOpacity>
        <TouchableOpacity active={FooterUI.Profile} onPress={() => {
          setFooterUI({
            send: false,
            ongoing: false,
            history: false,
            Profile: true,
            home: false,
            backButton: "flex"
          })
        }}>

          <Icon active={FooterUI.Profile} type="MaterialIcons" style={{ ...styles.iconStyle, color: FooterUI.Profile ? "#711cf1" : "#353736" }} name="account-circle" />
          <Text style={{ ...styles.footerText, color: FooterUI.Profile ? "#711cf1" : "#353736" }}>{t("profile")}</Text>
        </TouchableOpacity>

        <TouchableOpacity active={FooterUI.ongoing} onPress={() => setFooterUI({
          send: false,
          ongoing: true,
          Profile: false,
          history: false,
          home: false,
          backButton: "flex"
        })}>{ FooterUI.ongoing==false &&
          <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../assets/images/ongoing.png")}></Image>
        }
        { FooterUI.ongoing==true &&
          <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../assets/images/ongoing-active.png")}></Image>
        }<Text style={{ ...styles.footerText, color: FooterUI.ongoing ? "#711cf1" : "#353736" }}>{t("onGoing")}</Text>
        </TouchableOpacity>

        <TouchableOpacity active={FooterUI.history} onPress={() => setFooterUI({
          send: false,
          ongoing: false,
          history: true,
          Profile: false,
          home: false,
          backButton: "flex"
        })}>{ FooterUI.history==false &&
          <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../assets/images/history.png")}></Image>
        }
        { FooterUI.history==true &&
          <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../assets/images/history-active.png")}></Image>
        }<Text style={{ ...styles.footerText, color: FooterUI.history ? "#711cf1" : "#353736" }}>{t("history")}</Text>
        </TouchableOpacity>
      </View>
</SafeAreaView>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    justifyContent: "flex-end",
    paddingLeft: 59

  },
  textTitle: {
    color: '#000000',
    fontFamily: 'SF Pro Text - Semibold',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    alignSelf: "center",
    letterSpacing: -0.41,
    lineHeight: 22

  },
  container: {
    flex: 1,


  },
  iconStyle: { textAlign: 'center', fontSize: 24 },
  header: {
    paddingBottom: 21,
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    justifyContent: "center",
    width: "100%",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#fff"
  },
  content: {
    flex: 1,


  },
  bottonTab: {

    paddingBottom: 12,
    paddingTop: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    height: 56,
    bottom: 0,
    paddingStart: 16,
    paddingRight: 16,
    backgroundColor: 'white'
  },

  footerText: {
    color: '#007aff',
    fontFamily: 'SF Pro Text - Medium',
    fontSize: 10,
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    letterSpacing: 0.16,
  }
});





function mspDispatchToProp() {
  return {saveExpoPushToken }
}

export default connect(null,mspDispatchToProp())(Home);