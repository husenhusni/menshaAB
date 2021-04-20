import { Container, Header,Grid,Picker,Label, Input, Card, Item, Form, Col, Row, Content, CardItem, Icon, Button } from 'native-base';
import React, { useEffect, useState } from "react";
import PhoneInput from 'react-native-phone-input'
import { ScrollView ,Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';


function Send() {
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', e => {
          e.preventDefault();
          alert('Press fill the form and press the botton');
        });
    
        return unsubscribe;
      }, [navigation]);

    const [phone,setPhone]=useState({
        valid: "",
        type: "",
        value: ""
    });
    const [bank,setBank]=useState({
       bankName:undefined,
       bankAccount:""
    })
   
    return(
        <Content>
            <Card transparent>

            </Card>
            <Card >
                <Grid>
                <Col >
                    <Form style={{marginBottom: 25}}>
                    <Item floatingLabel>
                        <Label>Reciever First Name</Label>
                        <Input />
                    </Item>
                </Form>
                </Col>
                <Col>
                    <Form>
                    <Item floatingLabel>
                        <Label>Reviever Last Name</Label>
                        <Input />
                    </Item>
                </Form>
                </Col>
                </Grid>
            </Card>
            <Card style={{marginBottom: 15}}>
                <Grid>
                <Col >
                    <Form style={{marginBottom: 15}}>
                    <Item floatingLabel>
                        <Label>City</Label>
                        <Input />
                    </Item>
                </Form>
                </Col >
                <Col>
                    <Form>
                    <Item floatingLabel>
                        <Label>Region</Label>
                        <Input />
                    </Item>
                </Form>
                </Col>
                </Grid>
            </Card> 
            <Card style={{padding: 10}}>
                <CardItem header>
                    <Text>Reciver Phone Number </Text>
                </CardItem>
                <PhoneInput ref={ref => {setPhone(ref)}} initialCountry={'et'} 
                 textStyle={{fontSize: 16}} 
                 textProps={{placeholder: 'Receiver Telephone number'}}
                 />     
            </Card> 
            <Card style={{marginBottom: 25}}>
                <Grid>
                <Col >
                    <Form style={{marginBottom: 15}}>
                    <Item floatingLabel>
                        <Label>Amount in SEK</Label>
                        <Input />
                    </Item>
                </Form>
                </Col >
                <Col>
                    <Form>
                    <Label>Reciever gets</Label>
                    <Text style={{marginTop:8}}> 1000 birr </Text>
                </Form>
                </Col>
                </Grid>
            </Card>
            <Card>
            <CardItem header>
                    <Text>Bank Detail </Text>
                </CardItem>
                <Grid>
                <Col size={35}>
                    <Form>
                        <Picker
                            selectedValue={bank.bankName}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => setBank({
                                ...bank,
                                bankName:itemValue
                            })}
                        >
                            <Picker.Item label="Dashin" value="Dashin" />
                            <Picker.Item label="Oromia" value="Oromia" />
                            <Picker.Item label="Ethipia Commertial" value="ECB" />
                            <Picker.Item label="Abessinia" value="Abessinia" />
                            <Picker.Item label="None" value="None" />
                        </Picker>
                    </Form>  
                </Col>
                <Col size={65}>
                    <Form>
                        <Item stackedLabel>
                            <Label>Account Number </Label>
                            <Input />
                        </Item>
                    </Form>
                </Col>
                </Grid>
                
                 
            </Card>
            <Button style={{margin:30,alignSelf: "center"}  }>
                <Text>Sumbit Order</Text>
            </Button>
        </Content>
        
      
    );

}
export default Send