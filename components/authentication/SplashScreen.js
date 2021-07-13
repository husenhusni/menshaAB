import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";;
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";
import { connect } from "react-redux";
import {getUserData} from "../../redux/actions/userAction"
import {setActivityLoader,setError} from "../../redux/actions/uiAction"
import Loader from "../Loader";
import { useFocusEffect } from "@react-navigation/core";
import { LinearGradient } from 'expo-linear-gradient';

const readData =(key) => {  
  AsyncStorage.getItem(key).then(value =>{
      if (value !== null) {
        return value;
      }
    }).catch (e => {
    alert('Failed to fetch the data from storage');
    console.log('Failed to fetch the data from storage'); 
    return 0;
  })
}

function Home(props) {
  let FBIdToken;

  useFocusEffect(
    React.useCallback(() => {
      setTimeout(() => {
        props.setActivityLoader({
          isLoading:true
        })
        AsyncStorage.getItem("uid").then(value =>{
        if (value !== null) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${value.slice(1,-1)}`;
          props.getUserData(props);
        }
        else{
            props.setActivityLoader({
            isLoading:false
          })
            props.navigation.navigate("Onboarding")
        }
       }).catch (e => {
        props.setError({ readingStorage:"We cannot read your storage, Place try again later,if error persist, please contact us" })
        console.log(e)
        });
        
      }, 2000);
     
  
    },[]))
  return(
    <View  style={styles.rect}
    >
        <Loader isLoading={props.ui.isLoading}/>
        <StatusBar hidden />
        <LinearGradient
        // Button Linear Gradient
        colors={['#711cf1','#7F00FF', '#E100FF']}
        style={{flex:1,justifyContent:"center"}}>
         <Text style={styles.error}>{props.ui.readingStorage}</Text>
         <Image style={{width:"120%",alignSelf:"center"}} resizeMode='contain' source={require("../../assets/images/logoBird.png")}></Image>
      </LinearGradient>
      </View>
      )
    
    

  
  
}

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: "rgba(235,242,243,1)"
  },
  error:{color: "#D8000C",
    fontFamily: 'Roboto - Medium',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'left',
    alignSelf:"center",
      

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

function mapStateToProp(state){
  return {user :state.user,
  ui:state.ui}
}
function mspDispatchToProp (){
  return { getUserData,setActivityLoader,setError }
}


export default connect(mapStateToProp,mspDispatchToProp ())(Home)
