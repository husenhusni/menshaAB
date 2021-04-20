import React, { Component, useState } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  
  Body,
  Left,Icon,
  Right,
} from "native-base";
import {Text} from "react-native";
import styles from "./styles";
import OnGoing from "../components/homePage/OnGoing";
import History from "../components/homePage/History";
import SendTab from "../components/homePage/SendTab";
import Welcome from "../components/homePage/Welcome";


function Home(props) {
  const [FooterUI,setFooterUI] =useState({
    send:false,
    ongoing:false,
    history:false,
    home:true,
    backButton:"none"
  });
  return (
    <Container style={styles.container}>
      <Header style={{ backgroundColor:"rgba(29,114,145,1)" }}>
        <Left >
          <Button style={{ display: FooterUI.backButton} }  transparent onPress={() => props.navigation.navigate("Qoute")}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Text style={{ fontWeight: 'bold' , fontSize: 20 ,color:'white'}}>Home</Text>
        </Body>
        <Right >
          <Button transparent >
          <Icon active={FooterUI.history} type="FontAwesome" name="navicon" />
          </Button>
        </Right>
      </Header>

  
      <Content  >
      {FooterUI.home === true && <Welcome/>}
      {FooterUI.ongoing === true && <OnGoing/>}
      {FooterUI.history === true && <History/>}
      {FooterUI.send === true && <SendTab/>}
      </Content>

      <Footer>
        <FooterTab>
          <Button active={FooterUI.home} onPress={() => setFooterUI({ send:false,
              ongoing:false,
              history:false,
              home:true ,
              backButton:"none"} )}>
            <Icon active={FooterUI.home} name="apps" />
            <Text>Home</Text>
          </Button>
          <Button active={FooterUI.send} onPress={() => setFooterUI({ send:true,
              ongoing:false,
              history:false,
              home:false,
              backButton:"flex"} )}>
            <Icon active={FooterUI.send} name="paper-plane" />
            <Text>Send</Text>
          </Button>
          <Button active={FooterUI.ongoing} onPress={() => setFooterUI({ send:false,
              ongoing:true,
              history:false,
              home:false,
              backButton:"flex"} )}>
            <Icon active={FooterUI.ongoing} type="FontAwesome" name="hourglass-2" />
            <Text>Ongoing</Text>
          </Button>
          <Button active={FooterUI.history} onPress={() => setFooterUI({ send:false,
              ongoing:false,
              history:true,
              home:false,
              backButton:"flex"} )}>
            <Icon active={FooterUI.history} type="FontAwesome" name="history" />
            <Text>History</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
  }

export default Home;