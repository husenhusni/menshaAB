import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackRouter} from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import  Landing from './components/authentication/Landing'
import SignUp from './components/authentication/Registration';
import { Provider} from 'react-redux';
import store from './redux/store';
import Login from './components/authentication/Login';
import Home from './VIew/Home';
import HomeDrawer from './VIew/HomeDrawer';


const Stack= createStackNavigator()
export default function App() {
  return (
    <Provider store={store}>
       <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={Landing}
            options={{headerShown:false}}>
          </Stack.Screen>

          <Stack.Screen name="Register" component={SignUp}
            options={{headerShown:false}}>
          </Stack.Screen>

          <Stack.Screen name="Login" component={Login}
            options={{headerShown:false}}>
          </Stack.Screen>
          <Stack.Screen name="HomeDrawer" component={HomeDrawer}
            options={{headerShown:false}}>
          </Stack.Screen>

        </Stack.Navigator>

      </NavigationContainer>
    </Provider>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
