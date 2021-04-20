import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
import {Text} from 'react-native'
export default function LogOut(){
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Text>Log out</Text>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
}