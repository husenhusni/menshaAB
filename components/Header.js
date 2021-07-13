import { t } from "i18n-js";
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function Header(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.singUp}>{props.singUp || t("log")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)"
  },
  singUp: {
    color: '#000000',
    fontFamily: 'SF Pro Text - Semibold',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    alignSelf: "center",
    letterSpacing: -0.41,
    lineHeight: 22,
    color: "rgba(0,0,0,1)",
    marginTop: 25,
    alignSelf: "center"
  }
});

export default Header;
