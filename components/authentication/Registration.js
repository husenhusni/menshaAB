import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";
import axios from "axios";

export default function SignUp({navigation}) {
  const[user, setUser]=  useState({
    first_name: '',
    last_name:'',
    phone_number   : '',
    password: ''
    
  }); 
  const onClickListener = (viewId) => {
      console.log(user);
      axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/signup', user).then(function(result){
      navigation.navigate("Landing");

      }).catch(function(error){
        console.log(error);
      });

    }
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0)" />
      <View style={styles.backgroundStack}>
        <View style={styles.background}>
          <ImageBackground
            style={styles.rect2}
            imageStyle={styles.rect2_imageStyle}
            source={require("../../assets/images/Gradient_HtqQoUO.png")}
          >
            <View style={styles.name1StackColumn}>
              <Text style={styles.text3}>CREATE ACCOUNT</Text>
              <View style={styles.form}>
                <View style={styles.nameColumn}>
                  <View style={styles.name}>
                    <EvilIconsIcon
                      name="user"
                      style={styles.icon5}
                    ></EvilIconsIcon>
                    <TextInput
                      placeholder="First Name"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.nameInput}
                      onChangeText={first_name => setUser({  ...user, first_name } )}
                    ></TextInput>
                  </View>
                  <View style={styles.name}>
                   <EvilIconsIcon
                      name="user"
                      style={styles.icon5}
                    ></EvilIconsIcon>
                    <TextInput
                      placeholder="Last Name"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.nameInput2}
                      onChangeText={last_name => setUser({  ...user, last_name })}
                    ></TextInput>
                  </View>
                  <View style={styles.email}>
                    <EvilIconsIcon
                      name="envelope"
                      style={styles.icon6}
                    ></EvilIconsIcon>
                    <TextInput
                      placeholder="Phone"
                      placeholderTextColor="rgba(255,255,255,1)"
                      secureTextEntry={false}
                      style={styles.emailInput}
                      onChangeText={phone_number => setUser({ ...user, phone_number  })}
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.nameColumnFiller}></View>
                <View style={styles.password}>
                  <EvilIconsIcon
                    name="lock"
                    style={styles.icon7}
                  ></EvilIconsIcon>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(255,255,255,1)"
                    secureTextEntry={true}
                    style={styles.passwordInput}
                    onChangeText={password => setUser({  ...user, password })}
                  ></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.name1StackColumnFiller}></View>
            <View style={styles.buttonColumn}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Timeline")}
                style={styles.button}
              >
                <Text style={styles.text5}
                onPress={() =>onClickListener('sign_up')}
                >Sign Up</Text>
              </TouchableOpacity>
              <Text style={styles.text4}>Terms &amp; Conditions</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.name2}>
          <EvilIconsIcon name="user" style={styles.icon9}></EvilIconsIcon>
          <TextInput
            placeholder="Name"
            placeholderTextColor="rgba(255,255,255,1)"
            secureTextEntry={false}
            style={styles.nameInput2}
          ></TextInput>
        </View>
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
    top: 39,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 0
  },
  rect2: {
    flex: 1
  },
  rect2_imageStyle: {},
  name1: {
    top: 0,
    left: 0,
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    position: "absolute",
    right: 0,
    borderRadius: 5,
    flexDirection: "row"
  },
  icon8: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 20,
    marginTop: 13
  },
  nameInput1: {
    height: 30,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  icon10: {
    left: 20,
    position: "absolute",
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    top: 13
  },
  name1Stack: {
    height: 59
  },
  text3: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    marginTop: 101,
    alignSelf: "center"
  },
  form: {
    height: 230,
    marginTop: 108,
    marginLeft: 46,
    marginRight: 31
  },
  name: {
    height: 59,
    marginTop: 27,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 287,
    flexDirection: "row"
  },
  icon5: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 16,
    marginTop: 13
  },
  nameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 16,
    marginLeft: 13,
    marginTop: 14
  },
  group: {
    top: 0,
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    position: "absolute",
    borderRadius: 5,
    width: 287
  },
  icon11: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginTop: 13,
    marginLeft: 16
  },
  nameInput3: {
    top: 13,
    left: 55,
    height: 32,
    color: "rgba(255,255,255,1)",
    position: "absolute",
    right: 12,
    fontSize: 14
  },
  groupStack: {
    height: 59,
    marginTop: 18,
    marginLeft: 2
  },
  email: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    width: 287,
    flexDirection: "row",
    marginTop: 27
  },
  icon6: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    alignSelf: "center"
  },
  emailInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    marginTop: 14
  },
  nameColumn: {
    marginTop: -77,
    marginLeft: -4,
    marginRight: -2
  },
  nameColumnFiller: {
    flex: 1
  },
  password: {
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 5,
    flexDirection: "row",
    marginBottom: 8,
    marginTop: 27,
    marginLeft: -4,
    marginRight: 35
  },
  icon7: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    marginLeft: 15,
    marginTop: 13
  },
  passwordInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 17,
    marginLeft: 13,
    alignSelf: "center"
  },
  name1StackColumn: {},
  name1StackColumnFiller: {
    flex: 1
  },
  button: {
    height: 55,
    backgroundColor: "rgba(247,247,247,0)",
    borderRadius: 5,
    borderColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    marginBottom: 55
  },
  text5: {
    width: 66,
    color: "rgba(255,255,255,1)",
    marginTop: 17,
    marginLeft: 105
  },
  text4: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "center"
  },
  buttonColumn: {
    marginBottom: 31,
    marginLeft: 41,
    marginRight: 41
  },
  name2: {
    top: 0,
    left: 0,
    height: 59,
    backgroundColor: "rgba(255,255,255,0.25)",
    position: "absolute",
    right: 0,
    borderRadius: 5,
    flexDirection: "row"
  },
  icon9: {
    color: "rgba(255,255,255,1)",
    fontSize: 33,
    width: 33,
    height: 33,
    marginLeft: 20,
    marginTop: 13
  },
  nameInput2: {
    height: 30,
    color: "rgba(255,255,255,1)",
    fontSize: 14,
    flex: 1,
    marginRight: 17,
    marginLeft: 8,
    marginTop: 14
  },
  backgroundStack: {
    flex: 1,
    marginTop: -39
  }
});
