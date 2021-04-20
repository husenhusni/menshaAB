import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import { connect } from "react-redux";
import { LogingUser } from "../../redux/actions/userAction"




function Login(props) {
  const [userCredential,setUserCredential] =useState({
      email:"",
      password:"",
      errors:[]
    }
  )
     
  const handleSubmit=((event)=>{
    const user={
      email:userCredential.email,
      password:userCredential.password,
    };
    props.LogingUser(user,props);
    console.log(user);
  
  });
    
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.background}>
        <ImageBackground
          style={styles.rect}
          imageStyle={styles.rect_imageStyle}
          source={require("./Gradient_HtqQoUO.png")}
        >
          <View style={styles.ማይቴላርColumn}>
            <Text style={styles.ማይቴላር}>ማይ ቴላር</Text>
            <View style={styles.logo}>
              <Text style={styles.logIn}>Log In</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.usernameColumn}>
                <View style={styles.username}>
                  <EvilIconsIcon
                    name="user"
                    style={styles.icon22}
                  ></EvilIconsIcon>
                  <TextInput
                    placeholder="Phone Number "
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={false}
                    style={styles.usernameInput}
                    onChangeText={email => setUserCredential({  ...userCredential, email } )}
                  ></TextInput>
                </View>
                <View style={styles.password}>
                  <EvilIconsIcon
                    name="lock"
                    style={styles.icon2}
                  ></EvilIconsIcon>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={true}
                    style={styles.passwordInput}
                    onChangeText={password => setUserCredential({  ...userCredential, password } )}
                  ></TextInput>
                </View>
              </View>
              <View style={styles.usernameColumnFiller}></View>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.button}
              >
                <Text style={styles.text2}>Log in</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ማይቴላርColumnFiller}></View>
          <View style={styles.footerTexts}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Register")}
              style={styles.button2}
            >
              <View style={styles.createAccountFiller}></View>
              <Text style={styles.createAccount}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.button2Filler}></View>
            <Text style={styles.needHelp}>Need Help?</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  background: {
    flex: 1
  },
  rect: {
    flex: 1
  },
  rect_imageStyle: {},
  ማይቴላር: {
  
    color: "rgba(245,243,243,1)",
    fontSize: 25,
    marginLeft: 98
  },
  logo: {
    width: 244,
    height: 135,
    marginTop: 39,
    marginLeft: 17
  },
  logIn: {

    color: "rgba(255,255,255,1)",
    fontSize: 30,
    width: 134,
    height: 45,
    marginTop: 23,
    marginLeft: 70
  },
  form: {
    height: 230,
    marginTop: 29
  },
  username: {
    height: 59,
    backgroundColor: "rgba(251,247,247,0.25)",
    borderRadius: 5,
    flexDirection: "row"
  },
  icon22: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginLeft: 20,
    alignSelf: "center"
  },
  usernameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    marginTop: 15
  },
  password: {
    height: 59,
    backgroundColor: "rgba(253,251,251,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginTop: 27
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 20,
    alignSelf: "center"
  },
  passwordInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  usernameColumn: {},
  usernameColumnFiller: {
    flex: 1
  },
  button: {
    height: 59,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  ማይቴላርColumn: {
    marginTop: 63,
    marginLeft: 41,
    marginRight: 41
  },
  ማይቴላርColumnFiller: {
    flex: 1
  },
  footerTexts: {
    height: 14,
    flexDirection: "row",
    marginBottom: 36,
    marginLeft: 37,
    marginRight: 36
  },
  button2: {
    width: 104,
    height: 14,
    alignSelf: "flex-end"
  },
  createAccountFiller: {
    flex: 1
  },
  createAccount: {
    color: "rgba(255,255,255,0.5)"
  },
  button2Filler: {
    flex: 1,
    flexDirection: "row"
  },
  needHelp: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "flex-end",
    marginRight: -1
  }
});

function mapStateToProp(state){
  return {user :state.user}
}
function mspDispatchToProp (){
  return { LogingUser}
}


export default connect(mapStateToProp,mspDispatchToProp ())(Login)
