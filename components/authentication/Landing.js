import React, { Component } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";

function Home(props) {
  return (
    <View style={styles.rect}>
      <StatusBar hidden />
      <ImageBackground
        source={require("../../assets/images/gettyimages-111919734-2048x2048.jpg")}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Signup")}
          style={styles.button1}
        >
          <Text style={styles.sendMoney}>Send Money</Text>
        </TouchableOpacity>
        <View style={styles.button2Row}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")}
            style={styles.button2}
          >
            <Text style={styles.logIn}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Register")}
            style={styles.button3}
          >
            <Text style={styles.signUp}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: "rgba(235,242,243,1)"
  },
  image: {
    flex:1,
  },
  image_imageStyle: {},
  button1: {
    height: 57,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    borderRadius: 100,
    justifyContent: "center",
    marginTop: 506,
    marginLeft: 40,
    marginRight: 40
  },
  sendMoney: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    alignSelf: "center"
  },
  button2: {
    height: 48,
    backgroundColor: "rgba(129,153,166,1)",
    borderRadius: 100,
    justifyContent: "center",
    flex: 1,
    marginRight: 22
  },
  logIn: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    alignSelf: "center"
  },
  button3: {
    height: 48,
    backgroundColor: "rgba(129,153,166,1)",
    borderRadius: 100,
    justifyContent: "center",
    flex: 1,
    marginLeft: 22
  },
  signUp: {
    color: "rgba(255,255,255,1)",
    fontSize: 24,
    alignSelf: "center"
  },
  button2Row: {
    height: 48,
    flexDirection: "row",
    marginTop: 70,
    marginLeft: 23,
    marginRight: 20
  }
});

export default Home;
