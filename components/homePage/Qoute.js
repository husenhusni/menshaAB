import React, { Component, useEffect } from "react";
import {Text} from "react-native";
import {
  Container,
  Header,
  Col, Grid,Form,Item,Label,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  
  Body,   
  Left,Input,
  Right
} from "native-base";
import styles from "./QouteStyles";
import { useNavigation } from "@react-navigation/core";



function Qoute() {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
     
      e.preventDefault();
      alert('Press fill the form and press the botton');
    
    });
  
    return unsubscribe;
  }, [navigation]);
  return (
    <Container style={styles.container}>

      <Content padder>
        <Card style={styles.mb} transparent>
          <CardItem header>
            <Text style={styles.header}> Send Money To Ethiopia </Text>
          </CardItem>
          <CardItem cardBody>
            <Text> Get Instant Qoute </Text>
          </CardItem>
        </Card>
        <Card  style={styles.mb}>
          <Form>
            <Item stackedLabel>
              <Label>Send From</Label>
              <Input placeholder='Sweden'/>
            </Item>
          </Form>
        </Card>
        <Card style={styles.mb}>
          <Grid>
            <Col size={40}>
              <Form>
                <Item floatingLabel>
                  <Label>Amount in SEK</Label>
                  <Input placeholder='200.00'/>
                  
                </Item>
            </Form>
            </Col>
            <Col size={20}>
              <Icon style={{paddingTop :15}}  type="FontAwesome" name="exchange" />
            </Col>
            <Col size={40}>
              <Form>
                <Item stackedLabel>
                  <Label>Receiver get</Label>
                  <Text style={styles.normalText}>1000 Birr</Text>
                </Item>
            </Form>
            </Col>
          </Grid>
        </Card>
        <Card style={styles.mb}>
          <CardItem header>
            <Text>  1.00 SEK = 3.5923 Thai Baht (THB) 2</Text>
          </CardItem>
          <CardItem header>
            <Text> Exchange rate varies with delivery and payment method</Text>
          </CardItem>
        </Card>
        <Button style={{margin:30,alignSelf: "center"} } onPress={() => {navigation.navigate('Reciever');}}>
          <Text>Proceed</Text>
        </Button>
      </Content>
    </Container>
  );
}
export default Qoute;
