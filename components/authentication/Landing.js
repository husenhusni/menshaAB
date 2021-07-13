import React, { } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";
import {t} from '../../languages/index'

function Landing(props) {
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
          onPress={() => props.navigation.navigate("Register")}
          style={styles.button}
        >
          <Text style={styles.text}>{t('createAccount')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Login")}
          style={styles.button}
        >
          <Text style={styles.text}>{t('login')}</Text>
        </TouchableOpacity>

      </ImageBackground>
    </View>

  );
};

const styles = StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: "rgba(235,242,243,1)"
  },
  image: {
    flex: 1,
    paddingTop:500,
    paddingRight:15,
    paddingLeft:15
  },
  image_imageStyle: {},
  button: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    backgroundColor: '#711cf1',
    marginBottom:20,
    paddingTop:17,
    alignSelf:"center"
    
  },
  text:{
    alignSelf: "center",
    textAlign: "center",
    color: '#ffffff',
    color: '#000000',
    fontFamily: 'Roboto - Bold',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'left',
    color: "white",
  }
  
  
});

export default (Landing)
