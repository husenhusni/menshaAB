import React, { Component, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text, Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import CountryPicker, { CountryModalProvider } from 'react-native-country-picker-modal';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { LogingUser } from "../../redux/actions/userAction"
import { setError, setActivityLoader } from "../../redux/actions/uiAction"
import { useFocusEffect } from "@react-navigation/core";
import Loader from "../Loader";
import { CountUp } from "use-count-up";
import Header from "../Header";
import { t } from "i18n-js";
import firebase from 'firebase/app'
import "firebase/auth";
import { firebaseConfig } from "../../firebase";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

function Login(props) {
  const [validPhone, setValidPhone] = useState(true);
  const [start, setStart] = useState(0);
  const [prefix, setPrefix] = useState("Retry in ");
  const [suffix, setSuffix] = useState(" seconds");
  const [userCredential, setUserCredential] = useState({
    phone: "",
    countryCode: "SE",
    country: undefined,
    callingCode: "+46"
  })
  const [inputPosition, setInputPosition] = useState()
  const scrollerRef = useRef()
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const recaptchaVerifier = useRef(null);


  useFocusEffect(
    React.useCallback(() => {
      setUserCredential({
        ...userCredential, phone: "",

      })
      props.setError({ loginPhoneInput: "" })
      if (props.ui.waitToRetry > 0) {

        setStart(props.ui.waitToRetry);
      }



    }, [])

  );

  useFocusEffect(
    React.useCallback(() => {
      if (props.ui.waitToRetry > 0) {

        setStart(props.ui.waitToRetry);
      }



    }, [props.ui.waitToRetry])
  )


  const phoneValidator = (value) => {
    props.setError({ loginPhoneInput: undefined })
    setValidPhone(true)
    const pattern = (/^[0-9\b]+$/);
    if (value == "") {
      props.setError({ loginPhoneInput: t("enterPhone") })
      setValidPhone(false)
    }
    if (!pattern.test(value)) {

      setValidPhone(false)
      props.setError({ loginPhoneInput: t("onlyNumber") })

    }
    if (value.length != 9) {

      props.setError({ loginPhoneInput: t("validNumber") })
      setValidPhone(false)
    }

  }

  const handleSubmit = async (event) => {
    props.setActivityLoader({
      isLoading: true
    })
    const phone = userCredential.callingCode + userCredential.phone;
      const phoneProvider = new firebase.auth.PhoneAuthProvider()
      console.log(phoneProvider)

      phoneProvider.verifyPhoneNumber(
        phone,
        recaptchaVerifier.current
      ).then((verificationId)=>{
        console.log(verificationId)
        setVerificationId(verificationId);
        props.LogingUser(verificationId,props)
      }).catch((err) =>{
        console.log("vertification error",err)
        props.setActivityLoader({
          isLoading: false
        })
        setTimeout(() => {
          Alert.alert(
            "Error have occured",
            "Please try again leter",
            [
                { text: "OK", onPress: () => props.navigation.navigate("Login") }
            ], 
            { cancelable: false }
        );
        }, 0);
      
    })
    
    /*props.LogingUser(user, props);*/
  } ;


  return (
    <SafeAreaView style={styles.root}>
       <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />
      <StatusBar hidden={false}></StatusBar>
      <Loader isLoading={props.ui.isLoading} />
      <View style={styles.container}>
        <View style={styles.group}>
          <Header singUp="Log in or Sign up" style={styles.header}></Header>
          <ScrollView ref={scrollerRef} style={{
            width: 375,

          }} contentContainerStyle={{

            alignItems: "center",
            alignSelf: "center", height: 700
          }} >
            <Image
              source={require("../../assets/images/107-layers.png")}
              resizeMode="contain"
              style={styles.image}
            ></Image>
            <Text style={styles.letsSignYouIn}>{t('letsSign')}</Text>
            <Text style={styles.loremIpsum}>
              {t("welcomeBack")}
            </Text>
            {props.ui.loginPhoneInput != undefined &&
              <Text style={styles.error}>{props.ui.loginPhoneInput}</Text>}
            <View onLayout={(e) => setInputPosition(e.nativeEvent.layout.y)
            } style={{
              marginBottom: 7.5,
              marginTop: 7.5, flexDirection: "row", width: "100%", paddingLeft: 15, paddingRight: 15
            }}>
              <CountryPicker {...{
                withModal: "true", countryCode: userCredential.countryCode,
                withFlagButton: "true", withCallingCodeButton: "true", withCloseButton: "true", withFilter: "true", withAlphaFilter: "true", withEmoji: "true", withFlag: "false", withAlphaFilter: "true", visible: "true",

                containerButtonStyle: { paddingTop: 10, borderWidth: 1, borderColor: 'grey', borderRadius: 5, height: 52, paddingBottom: 10, paddingRight: 5, marginTop: 5, marginRight: 10 }
              }}
                onSelect={(country) => {
                  setUserCredential({ ...userCredential, callingCode: "+" + country.callingCode[0], countryCode: country.cca2 });
                  console.log("country", userCredential.callingCode)
                }} />

              <TextInput value={userCredential.phone} error={!validPhone} keyboardType="number-pad" onFocus={() => { scrollerRef.current.scrollTo({ x: 0, y: inputPosition + 500, animated: true }); }} onChangeText={(value) => {
                setUserCredential({ ...userCredential, phone: value });
                phoneValidator(value)
              }}
                style={styles.inputMoney} label={t("phone") }mode='outlined'>

              </TextInput>
            </View>
            <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
              <Text style={styles.sIngIn}>{t("log")}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView  >

  );
}

const styles = StyleSheet.create({
  error: {
    color: "#D8000C",
    fontFamily: 'Roboto - Medium',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
    alignSelf: "center",
  },
  root: {
    flex: 1,
    backgroundColor: "#ffffff"

  }, container: {
    flex: 1,
    backgroundColor: "rgba(235,235,235,1)"
  },
  group: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "100%"
  },
  header: {
    height: 70,
    alignSelf: "stretch"
  },
  image: {
    width: 200,
    height: 200
  },
  letsSignYouIn: {
    color: '#000000',
    fontFamily: 'SF Pro Text - Semibold',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    alignSelf: "center",
    letterSpacing: -0.41,
    lineHeight: 22
  },
  loremIpsum: {
    color: '#000000',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    alignSelf: "center",
    letterSpacing: -0.41,
    lineHeight: 22,
    color: "#121212",
    marginBottom: 7.5,
    marginTop: 7.5,
    marginLeft:10,
    marginRight:10,
  },
  inputMoney: {
    flex: 1, alignSelf: "center", fontSize: 17, marginBottom: 10, height: 50,color: '#000000',
    fontFamily: 'SF Pro Text - Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    alignSelf: "center",
    letterSpacing: -0.41,
    lineHeight: 22,


  },
  button: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "rgba(113,28,241,1)",
    borderRadius: 5,
    width: 345,
    marginBottom: 7.5,
    marginTop: 7.5
  },
  sIngIn: {
    color: '#ffffff',
    fontFamily: 'SF Pro Text - Semibold',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    alignSelf: "center",
    letterSpacing: -0.41,
    lineHeight: 22,
    alignSelf: "center",
  },
  loremIpsum2: {
    fontFamily: 'Roboto - Regular',
    color: "#121212",
    fontSize: 16
  }

});

function mapStateToProp(state) {
  return {
    user: state.user,
    ui: state.ui
  }
}
function mspDispatchToProp() {
  return { LogingUser, setError, setActivityLoader }
}


export default connect(mapStateToProp, mspDispatchToProp())(Login)
