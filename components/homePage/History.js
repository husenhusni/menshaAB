import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import HistoryCard from "./HistoryCard";

function History(props) {
  return (
    
  <View style={styles.rect}>
    <ScrollView
        horizontal={false}>
      <HistoryCard/>
      <HistoryCard/>
      
    </ScrollView>
  </View>
);
}

const styles = StyleSheet.create({

  onGoingCard: {
    marginTop:6
  },
  rect: {
    backgroundColor: "rgba(247, 247, 247,1)",
  },

});

export default History;
