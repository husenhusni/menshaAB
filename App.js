import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackRouter } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Landing from './components/authentication/Landing'
import SignUp from './components/authentication/Registration';
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './components/authentication/Login';
import Home from './VIew/Home';
import OtpInput from './components/authentication/OtpInput';
import SplashScreen from './components/authentication/SplashScreen';
import * as Font from 'expo-font';
import TransferDetailCard from './components/homePage/pageComponent/TransferDetailCard';
import Loader from './components/Loader';
import SuccessPayment from './VIew/SuccessPayment';
import FailedPayment from './VIew/FailedPayment';
import { StripeProvider } from '@stripe/stripe-react-native';
import * as Localization from 'expo-localization';
import i18n from './languages/index';
import OnBoarding from './components/authentication/Onboarding';
import firebase from 'firebase/app'
import "firebase/auth";
import { firebaseConfig } from "./firebase";


i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;



const Stack = createStackNavigator()

const loadFonts = async () => {
  await Font.loadAsync({
    // Load a font `Montserrat` from a static resource
    'SF Pro Text - Semibold': require('./assets/fonts/SFProText-Semibold.ttf'),
    'SF Pro Text - Regular': require('./assets/fonts/SFProText-Regular.ttf'),
    'SF Pro Display - Bold':require('./assets/fonts/SFProDisplay-Bold.ttf'),
    'SF Pro Text - Medium':require('./assets/fonts/SFProText-Medium.ttf'),
    'SF Pro Display - Regular':require('./assets/fonts/SFProDisplay-Regular.ttf'),
    'Roboto - Bold': require('./assets/fonts/SFProDisplay-Thin.ttf'),
    'Roboto - Regular': require('./assets/fonts/SFProDisplay-Thin.ttf'),
    'Roboto - Medium': require('./assets/fonts/SFProDisplay-Thin.ttf'),
    'RobotoMono_400Regular': require('./assets/fonts/RobotoMono-Regular.ttf'),
    'RobotoMono_700Bold': require('./assets/fonts/RobotoMono-Bold.ttf'),

  })
}


export default function App() {
  const [fontLoaded, setFOntLoaded] = useState(false)
  useEffect(() => {
    loadFonts().then(() => {
      setFOntLoaded(true)

    }).catch(error => {
      console.log(error)
    })

  }, [])
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
   }
  }, [])


  if (!fontLoaded) {
    return <Loader isLoading={fontLoaded} />
  }
  else {
    return (
      <StripeProvider publishableKey="pk_test_51IpCBfFxx4lftOkGRlYrgQDHw1NzA7Lg7SsGYcZFlAPyJ0NP2iuasDSk16vJ8kvojhaobgjA5pfQHWYiJOrVVTGq00cHseoQms">
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
              <Stack.Screen name="SplashScreen" component={SplashScreen}
                options={{ headerShown: false }}>
              </Stack.Screen>
              <Stack.Screen name="Landing" component={Landing}
                options={{ headerShown: false }}>
              </Stack.Screen>
              <Stack.Screen name="TransferDetailPage" component={TransferDetailCard}
                options={{ headerShown: false }}>
              </Stack.Screen>
              <Stack.Screen name="Onboarding" component={OnBoarding}
                options={{ headerShown: false }}>
              </Stack.Screen>

              <Stack.Screen name="Register" component={SignUp}
                options={{ headerShown: false }}>
              </Stack.Screen>

              <Stack.Screen name="Login" component={Login}
                options={{ headerShown: false }}>
              </Stack.Screen>
              <Stack.Screen name="OtpInput" component={OtpInput}
                options={{ headerShown: false }}>
              </Stack.Screen>
              <Stack.Screen name="SuccessPayment" component={SuccessPayment}
                options={{ headerShown: false }}>
              </Stack.Screen>
              <Stack.Screen name="FailedPayment" component={FailedPayment}
                options={{ headerShown: false }}>
              </Stack.Screen>
              <Stack.Screen name="HomeDrawer" component={Home}
                options={{ headerShown: false }}>
              </Stack.Screen>


            </Stack.Navigator>

          </NavigationContainer>
        </Provider>
      </StripeProvider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
