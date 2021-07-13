import React, { Component, useState, } from "react"
import numbro from 'numbro';
import { Card } from 'native-base';
import { useFocusEffect } from '@react-navigation/core';
import { Divider } from 'react-native-paper';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
function TransferDetailCard(props) {
  const openBrowser=()=>{
    Linking.openURL(props.url).catch(err => alert("Couldn't load page"));

  }
  const ifHistory=()=>{
    if(props.url){
      return(
        <View>
          <Divider /><View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>Receipt</Text>
              <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
              <TouchableOpacity style={styles.button} onPress={() => openBrowser()}>
              <Text style={{...styles.normalText,textAlign:"right"}}>Click here</Text>
            </TouchableOpacity>
            </View>

        </View>
      )
    }
    else return(null)
  }

  return (
   
    <SafeAreaView style={{ marginLeft: 15, marginRight: 15, marginTop: 15, display: "flex", }}>
      <Card style={styles.container}>
        <View style={{ backgroundColor: "#711cf1", borderTopRightRadius: 10, borderTopLeftRadius: 10, width: "100%", paddingBottom: 10, paddingTop: 10 }}>
          <Text style={styles.header}>{props.amountSending} {props.currency_sender}</Text>
          <Text style={styles.subtitle}>{props.first_name} {props.last_name} </Text>
        </View>
        <Divider />
        <View style={{
          flexDirection: 'row', padding: 15
        }}>
          <View style={{ flex: 1, display: "flex", }}>
            <View style={{ ...styles.receitLine, }}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>Country </Text>
              <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{props.country_reciever}</Text>
            </View>
            <Divider />
            <View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>Account Type</Text>
              <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{props.method}:-{props.accountName}</Text>
            </View>
            <Divider />
            <View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>Account number</Text>
              <Text style={{ ...styles.normalText, flex: 0.1, }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{props.accountNumber} </Text>
            </View>
            <Divider />
            <View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>Reciever gets</Text>
              <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{numbro(props.amountReceiving).format({
                thousandSeparated: true,
                mantissa: 2
              })} Birr</Text>
            </View>
            <Divider />
            <View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>Tracking number</Text>
              <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{props.item_id}</Text>
            </View>
            <Divider />
            <View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>Transaction fee</Text>
              <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{numbro(props.fee).format({
                thousandSeparated: true,
                mantissa: 2
              })} {props.currency_sender}</Text>
            </View>
            <Divider /><View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>Reciever phone</Text>
              <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>0{props.phone_number}</Text>
            </View>
            <Divider /><View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>Transaction cost</Text>
              <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>20 SEK</Text>
            </View>
            { ifHistory() }
          </View>
        </View>
      </Card>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 6, height: 0 },
    shadowRadius: 14,
    borderRadius: 5,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 7.5,
    backgroundColor: '#ffffff',
  },
  button:{
  flex:0.9,
  borderRadius: 5,
  backgroundColor: '#fff',
  paddingRight:5,
  alignSelf: "center",
},
header: {
  color: '#fff',
  fontFamily: 'SF Pro Text - Semibold',
  fontSize: 17,
  fontWeight: '600',
  fontStyle: 'normal',
  textAlign: 'center',
  letterSpacing: -0.41,
  lineHeight: 22,

},
subtitle: {
  color: '#fff',
  fontFamily: 'SF Pro Text - Regular',
  fontSize: 15,
  fontWeight: '400',
  fontStyle: 'normal',
  textAlign: 'center',
  letterSpacing: -0.24,
  lineHeight: 18,

}, receitLine: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10

  },
  normalText: {
    color: 'rgba(60, 60, 67, 0.6)',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    letterSpacing: -0.24,
    lineHeight: 18,
},

})


export default TransferDetailCard

