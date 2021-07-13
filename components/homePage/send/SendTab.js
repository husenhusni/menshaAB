import React, { Component } from 'react';
import { Container, Header, Content} from 'native-base';
import Qoute from './sendTab/Qoute';
import Send from './sendTab/Send';
import Review from './sendTab/Review'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {t} from '../../../languages/index'

const Tab = createMaterialTopTabNavigator();
export default function SendTab (props){
    return (
      <Container >
            <Tab.Navigator  initialRouteName={t("qoute") }swipeEnabled={false} 
            tabBarOptions={{
                indicatorStyle:{
                  height:48,
                  borderRadius:8,
                  backgroundColor:'#711cf1'

                },
                labelStyle: { 
                fontFamily: 'SF Pro Text - Medium',
                fontSize: 13,
                fontWeight: '400',
                fontStyle: 'normal',
                letterSpacing: -0.08,
                 },
                  activeTintColor:'#fff',
                  inactiveTintColor:'#000000',
                style:{
                    width: "90%",
                    borderRadius: 8,
                    alignSelf:"center",
                    borderColor:"black",
                    borderWidth:1,
                    marginTop:8,
                    elevation: 0,
                    backgroundColor: 'rgba(118, 118, 128, 0.12)',
                  }
                }}
            >
                <Tab.Screen  options={{ tabBarLabel: 'Qoute' }} name={t("qoute" )} children={()=><Qoute qouteData={props}/> } />
                <Tab.Screen name={t("reciever")} component={Send}  />
                <Tab.Screen name={t("review")} component={Review} />
                
            </Tab.Navigator>
      </Container>
    );
}