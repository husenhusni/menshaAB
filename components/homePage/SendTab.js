import React, { Component } from 'react';
import { Container, Header, Content} from 'native-base';
import Qoute from './Qoute';
import Send from './Send';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();
export default function SendTab (){
 
    return (
      <Container>
            <Tab.Navigator initialRouteName="Qoute" swipeEnabled={false} tabBarOptions={{
                abelStyle: { fontSize: 12 },
                activeTintColor:'#8b0000',
                }}
            >
                <Tab.Screen name="Qoute" component={Qoute} />
                <Tab.Screen name="Reciever" component={Send} />
                <Tab.Screen name="Payment" component={Send} />
                <Tab.Screen name="Review" component={Send} />
            </Tab.Navigator>
      </Container>
    );
}