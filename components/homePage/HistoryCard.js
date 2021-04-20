import { Container, Header, Content, Card, CardItem, Icon, Right, Thumbnail, Button } from 'native-base';
import React, { useState } from "react";
import { Image, Modal,Text } from 'react-native';

function HistoryCard() {
  const [modalVisible, setModalVisible] = useState(false);
    return (
      <Container>
         <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <Container>
            <Header />
            <Content>
              <Image source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={{height: 200, width: null, flex: 1}}/>
            </Content>
          </Container>
      </Modal>
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
              <Text>Completed</Text>
            </Right>
          </CardItem>
          <CardItem footer>
              <Text>Reciept</Text>
              <Right>
                <Button transparent onPress={() => setModalVisible(true)}>
                  <Thumbnail source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} />
                </Button>
                </Right>
            </CardItem>
     </Card>
      </Container>
      
      
      );
    }
    
 
export default HistoryCard

