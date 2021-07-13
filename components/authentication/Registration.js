import React, { Component, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar, SafeAreaView, Image, Text, ScrollView, Modal, TouchableOpacity, Keyboard

} from "react-native";
import CountryPicker, { CountryModalProvider } from 'react-native-country-picker-modal';
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import axios from "axios";
import Header from "../Header";
import Loader from "../Loader";
import { connect } from "react-redux";
import { UserSignup } from "../../redux/actions/userAction"
import { setError, setActivityLoader } from "../../redux/actions/uiAction"
import { Divider, TextInput } from 'react-native-paper';
import { Card } from "native-base";
import {t} from '../../languages/index'


function SignUp(props) {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    language: ''

  });
  const [position, setPosition] = useState("0")
  const [validFirstName, setValidFirstName] = useState(true)
  const [validLastName, setValidLastName] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const scrollerRef = useRef()

  const nameValidator = (nameInput, indicatator) => {
    const pattern = /^([a-zA-Z]{2,40})+$/;

    if (!pattern.test(nameInput)) {

      props.setError({ first_name: t("correctName") })
      if (indicatator == "first_name")
        setValidFirstName(false)
      else
        setValidLastName(false)

    }

    else if(pattern.test(nameInput))  {
      if (indicatator == "first_name")
        setValidFirstName(true)
      else
        setValidLastName(true)
    }
    
    if(validFirstName==true && validLastName==true){
      props.setError({ first_name: undefined })
    }

  }

  const phoneValidator = (value) => {
    props.setError({ registerPhone: undefined })
    setValidPhone(true)
    const pattern = (/^[0-9\b]+$/);
    if (value == "") {
      props.setError({ registerPhone: t("enterPhone")})
      setValidPhone(false)
    }
    if (!pattern.test(value)) {

      setValidPhone(false)
      props.setError({ registerPhone: t("onlyNumber" )})

    }
    if (value.length != 9) {

      props.setError({ registerPhone: t("validNumber") })
      setValidPhone(false)
    }

  }

  const onHandleSignUp = () => {
    props.setActivityLoader({
      isLoading:true
    })
    props.UserSignup(user, props);
  }
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar hidden={false}></StatusBar>
      <Loader isLoading={props.ui.isLoading} />
      <View style={styles.container}>
        <View style={styles.group}>
          <Header singUp={t("signUp")} style={styles.header}></Header>
          <View style={{ flex: 1 }}>
            <ScrollView ref={scrollerRef} style={{
              flex: 1
            }} contentContainerStyle={{
              alignItems: "center", marginLeft: 15, marginRight: 15,

              height: 1000
            }} ><Image
              source={require("../../assets/images/107-layers.png")}
              resizeMode="contain"
              style={styles.image}
            ></Image>
              <Text style={styles.letsSignYouIn}>{t("letsSignUp")}</Text>
                <Text style={styles.error}>{props.ui.first_name}</Text>
                <Text style={styles.error}>{props.ui.registerPhone}</Text>
              <TextInput value={user.first_name} error={!validFirstName} onFocus={()=>{scrollerRef.current.scrollTo({ x: 0, y:240, animated: true });}}
           onChangeText={(value) => {
                setUser({ ...user, first_name: value });
                nameValidator(value,"first_name");

              }}
                style={styles.inputMoney} label={t("firstName")} mode='outlined'>

              </TextInput>
              <TextInput value={user.last_name} error={!validLastName} onFocus={()=>{scrollerRef.current.scrollTo({ x: 0, y:300, animated: true });}} onChangeText={(value) => {
                setUser({ ...user, last_name: value });
                nameValidator(value)
              }}
                style={styles.inputMoney} label={t("lastName")} mode='outlined'>
              </TextInput>
              
              <View onLayout={(e) => setPosition(e.nativeEvent.layout.y)} style={{ width: "100%", height: 50, marginBottom: 15 }}>
                <TextInput value={user.language} onBlur={()=>{scrollerRef.current.scrollTo({ x: 0, y:40, animated: true });}} onChangeText={() => setModalVisible(true)}
                  style={{ ...styles.inputMoney, flex: 1 }} label={t("selectLan")} mode='outlined'>
                </TextInput>
              </View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={{ flex: 1, justifyContent: "center", backgroundColor: "background-color: rgba(0,0,0,.2)", marginBottom: 7.5 }}>
                  <View style={{ width: "100%", alignSelf: "center", height: 100 }}>
                    <Card style={{ marginLeft: 15, marginRight: 15 }}>
                      <Text style={{ ...styles.loremIpsum2, fontSize: 18 }}>{t("yourLan")}</Text>
                      <Divider></Divider>
                      <TouchableOpacity onPress={() => {
                        Keyboard.dismiss()
                        setUser({ ...user, language: "en" });
                        setModalVisible(false)
                        
                      }}>
                        <Text style={styles.loremIpsum2}>English</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        setUser({ ...user, language: "sv" });
                        setModalVisible(false)
                        
                      }}>
                        <Text style={styles.loremIpsum2}>Svenska</Text>
                      </TouchableOpacity>
                    </Card>
                  </View>

                </View>
              </Modal>
              <TouchableOpacity onPress={() => onHandleSignUp()} style={styles.button}>
                <Text style={styles.sIngIn}>{t("signUp")}</Text>
              </TouchableOpacity>
              <View style={{flexDirection:"row"}}>
            </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#ffffff"

  },
  inputMoney: {
    width: "100%", alignSelf: "center", fontSize: 16, marginBottom: 10, height: 50
  },
  letsSignYouIn: {
    fontFamily: 'Roboto - Bold',
    color: "#121212",
    fontSize: 22,
    marginBottom: 7.5,
    marginTop: 7.5
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 7.5,
    marginBottom: 7.5
  },
  header: {
    height: 70,
    alignSelf: "stretch"
  },
  loremIpsum2: {
    marginLeft: 10,
    marginTop: 7.5,
    marginBottom: 7.5,
    fontFamily: 'Roboto - Regular',
    color: "#121212",
    fontSize: 16
  },
  group: {

    flex: 1,


    width: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(235,235,235,1)"
  },
  button: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "rgba(113,28,241,1)",
    borderRadius: 5,
    fontFamily: 'Roboto - Regular',
    fontStyle: "normal",
    fontWeight: "400",
    color: "#121212",
    fontSize: 16,
    width: "100%",
    marginBottom: 7.5,
    marginTop: 7.5
  },
  sIngIn: {
    fontFamily: 'Roboto - Bold',
    color: "rgba(247,246,246,1)",
    alignSelf: "center",
    fontSize: 16
  },
  error: {
    color: "#D8000C",
    fontFamily: 'Roboto - Medium',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
    alignSelf: "center",
  },
});

function mapStateToProp(state) {
  return {
    user: state.user,
    ui: state.ui
  }
}
function mspDispatchToProp() {
  return { UserSignup, setError, setActivityLoader }
}


export default connect(mapStateToProp, mspDispatchToProp())(SignUp)
