import { Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, Image, View, ScrollView, Alert } from 'react-native';
import { CountUp } from 'use-count-up'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { connect } from 'react-redux';
import { OtpVertification } from "../../redux/actions/userAction"
import { setError, setActivityLoader } from "../../redux/actions/uiAction"
import Loader from '../Loader';
import Header from "../Header";
import { t } from 'i18n-js';
import { auth } from "../../firebase";
import firebase from 'firebase/app'
import "firebase/auth";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent"
  },
  codeFieldRoot: { marginTop: 15, width: "100%" },
  cell: {
    width: 55,
    height: 55,
    lineHeight: 38,
    fontSize: 24,
    color: '#3418AB',
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOffset: { width: 6, height: 0 },
    shadowRadius: 14,
    borderWidth: 4,
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.07)',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#3418AB',
  },
  errorCell: {
    borderColor: '#D8000C',
  },
  title: {
    marginTop: 34,
    alignSelf: "center",
    color: '#1c2340',
    color: '#000000',
    fontFamily: 'Roboto - Bold',
    fontSize: 22,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'left',
  },
  error: {
    color: "#D8000C",
    fontFamily: 'Roboto - Medium',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'left',
    alignSelf: "center",


  },
  imageVertification: {
    marginTop: 30,
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  normalText: {
    color: '#15294b',
    color: '#000000',
    fontFamily: 'Roboto - Regular',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    paddingTop: 23,
    paddingStart: 44
  },
  sendText: {
    color: "red",
    fontFamily: 'Roboto - Regular',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'center',
    paddingTop: 23,


  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    backgroundColor: '#711cf1',
    marginBottom: 20,
    paddingTop: 17,
    alignSelf: "center",
    marginTop: 15
  },
  textButton: {
    alignSelf: "center",
    textAlign: "center",
    color: '#ffffff',
    fontFamily: 'SF Pro Text - Semibold',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    alignSelf: "center",
    letterSpacing: -0.41,
    lineHeight: 22,
  },
  header: {
    height: 70,
    alignSelf: "stretch"
  }

});

const CELL_COUNT = 6;

const OtpInput = (props) => {
  const scrollerRef = useRef()
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [validInput, setValidInput] = useState(true)
  const [inputPosition, setInputPosition] = useState()
  const [prefix, setPrefix] = useState(t("retryIn"));
  const [suffix, setSuffix] = useState(t("seconds"));
  const [countDown, setCountDown] = useState(0)
  useEffect(() => {
    setCountDown(1)
    return () => {
      setCountDown(0)
    }
  }, [])

  console.log("user state at otp", props.user)


  const codeValidator = async (value) => {
    props.setError({ otpInput: "" })
    setValidInput(true)
    const pattern = (/^[0-9\b]+$/);
    if (value == "") {
      props.setError({ otpInput: t("fourDigit") })
      setValidInput(false)
      props.setActivityLoader({
        isLoading: false
      })
      return false
    }
    if (!pattern.test(value)) {

      props.setError({ otpInput: t("onlyNumber") })
      setValidInput(false)
      props.setActivityLoader({
        isLoading: false
      })
      return false

    }
    if (value.length != 6) {
      props.setError({ otpInput: t("fourDigit") })
      setValidInput(false)
      props.setActivityLoader({
        isLoading: false
      })
      return false
    }
    return true
  }

  const handleSubmit = async (event) => {
    props.setActivityLoader({
      isLoading: true
    })
    codeValidator(value).then((response) => {
      if (response == true) {
        const code = value;
        // handle code Error
        const credential = new firebase.auth.PhoneAuthProvider.credential(
          props.user.verificationId,
          code
        );
        firebase.auth().signInWithCredential(credential).then((authResult) => {
          props.OtpVertification(authResult, props);
        }).catch((err) => {
          props.setActivityLoader({
            isLoading: false
          })
          setTimeout(() => {
            Alert.alert(
              "Wrong Vertification code",
              "Please try again and enter correct Verification code",
              [
                { text: "OK", onPress: () => props.navigation.navigate("Login") }
              ],
              { cancelable: false }
            );
          }, 0);
        })
      }
    })

  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar hidden={false}></StatusBar>
      <Loader isLoading={props.ui.isLoading} />
      <Header singUp="Vertification" style={styles.header}></Header>
      <ScrollView ref={scrollerRef} style={{
        flex: 1, paddingRight: 15, paddingLeft: 15
      }} contentContainerStyle={{
        alignItems: "center", height: 700
      }} >
        <Image
          source={require("../../assets/images/107-layers.png")}
          resizeMode="contain"
          style={styles.imageVertification}
        />
        <Text style={styles.error}>{props.ui.otpInput}</Text>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't OtpInputear
          value={value}
          onFocus={() => { scrollerRef.current.scrollTo({ x: 0, y: inputPosition + 500, animated: true }); }}
          onChangeText={(value) => { setValue(value) }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell, !validInput && styles.errorCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <View onLayout={(e) => {
          setInputPosition(e.nativeEvent.layout.y);
        }} style={{ display: 'flex', flexDirection: "row" }}>
          <Text style={styles.normalText}>{t("dontHaveCode")}</Text>



          <Text style={styles.sendText}>{countDown > 0 && <CountUp prefix={prefix} suffix={suffix} isCounting start={180} end={0} duration={180} />}</Text>






        </View>

        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.button}
        >
          <Text style={styles.textButton}>{t("verify")}</Text>

        </TouchableOpacity>


      </ScrollView>

    </SafeAreaView>
  );
};
function mapStateToProp(state) {
  return {
    user: state.user,
    ui: state.ui
  }
}
function mspDispatchToProp() {
  return { OtpVertification, setError, setActivityLoader }
}


export default connect(mapStateToProp, mspDispatchToProp())(OtpInput)