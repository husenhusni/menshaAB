import React, { useEffect, useState } from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Image, StyleSheet } from 'react-native'
function OnBoarding(props) {
    return (
        <Onboarding onDone={() => props.navigation.navigate("Login")} 
        onSkip={() => props.navigation.navigate("Login")}
        pages={[
            {
              backgroundColor: '#fff',
              image: <Image source={require("../../assets/images/onboardingOne.png")} resizeMode="contain"
              style={styles.image}/>,
              title: 'Send Money Easily',
              subtitle: 'Send money to your family in ethipia with your mobile and credit/debit card',
            },
            {
                backgroundColor: '#fff',
                image: <Image source={require("../../assets/images/onboardingTwo.png")} resizeMode="contain"
                style={{width:600,height:300}}/>,
                title: 'Track Transaction',
                subtitle: 'Track the transaction all the way',
              },
              {
                backgroundColor: '#fff',
                image: <Image source={require("../../assets/images/onboarding(1).png")} resizeMode="contain"
                style={styles.image}/>,
                title: 'Get Notified',
                subtitle: 'You will be notified when the reciever collectes the money',
              }
          ]} >

        </Onboarding>
    )

}
const styles=StyleSheet.create({
image: {
    width: 400,
    height:260
  },

})
export default OnBoarding