import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";

import React, { Component, useState } from "react";
import {Content} from "native-base";

function Welcome(props) {
  return (
        <ImageBackground
                source={require("../../assets/images/gettyimages-111919734-2048x2048.jpg")}
                resizeMode="cover"
                style={styles.image}
                imageStyle={styles.image_imageStyle}
            >
                <View style={styles.button1Filler}></View>
                <TouchableOpacity
                onPress={() => props.navigation.navigate("Timeline")}
                style={styles.button1}
                >
                <Text style={styles.sendMoney}>Send money</Text>
                </TouchableOpacity>
            </ImageBackground> 
  );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: "#000000",
    backgroundColor: "rgba(128,157,171,1)"
  },
  image: {
    height:890
  },
  image_imageStyle: {},
  button1Filler: {
    flex: 1
  },
  button1: {
    height: 55,
    backgroundColor: "rgba(29,114,145,1)",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 179,
    marginLeft: 43,
    marginRight: 43
  },
  sendMoney: {
    width: 115,
    color: "rgba(12,12,12,1)",
    fontSize: 20,
    textAlign: "left",
    marginTop: 13,
    marginLeft: 86
  }
});

export default Welcome;
