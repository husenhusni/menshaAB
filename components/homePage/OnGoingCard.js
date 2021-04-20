import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Header, Content, Card, CardItem, Icon, Right } from 'native-base';

function OnGoingCard(props) {
  return(
          <Card style={{marginBottom:26}}>
            <CardItem>
              <Text>Full Name</Text>
              <Right>
                <Text>Husni Husen</Text>
              </Right>
             </CardItem>
             <CardItem>
              <Text>Address</Text>
              <Right>
                <Text>ADDIS ABABA</Text>
              </Right>
             </CardItem>
             <CardItem>
              <Text>Account Info</Text>
              <Right>
                <Text>12345678978765</Text>
              </Right>
             </CardItem>
             <CardItem>
              <Text>Telephone</Text>
              <Right>
                <Text>251912895801</Text>
              </Right>
             </CardItem>
             <CardItem>
              <Text>Transfer Method</Text>
              <Right>
                <Text>Dashin</Text>
              </Right>
             </CardItem>
             <CardItem>
              <Text>Amount the reciever in birr</Text>
              <Right>
                <Text>25000</Text>
              </Right>
             </CardItem>
             <CardItem>
              <Text>Amount paid by sender</Text>
              <Right>
                <Text>1000</Text>
              </Right>
             </CardItem>
             <CardItem>
              <Text>Expected payment</Text>
              <Right>
                <Text>12/12/12</Text>
              </Right>
             </CardItem>
             <CardItem>
              <Text>Status</Text>
              <Right>
                <Text>Pedding</Text>
              </Right>
             </CardItem>
             
             
           </Card>   
)};

export default OnGoingCard;