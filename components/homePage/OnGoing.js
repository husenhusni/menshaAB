import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import OnGoingCard from "./OnGoingCard";

function OnGoing(props) {
  return (
    
  <View style={styles.rect}>
    <ScrollView
    horizontal={false}>
      <OnGoingCard/>
      <OnGoingCard/>
    </ScrollView>
  </View>
)};


const styles = StyleSheet.create({

  onGoingCard: {
    paddingTop:16
  },
  rect: {
    backgroundColor: "rgba(247, 247, 247,1)",
  },


});

export default OnGoing;
