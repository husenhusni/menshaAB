
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Alert, Modal, Pressable, FlatList, } from "react-native";
import { Icon, Card } from 'native-base';
import { connect } from "react-redux";
import { downloadOngoingTransaction } from "../../../redux/actions/userAction"
import { setActivityLoader } from "../../../redux/actions/uiAction";
import axios from "axios";
import { Divider } from "react-native-paper";
import TransferDetailCard from "../pageComponent/TransferDetailCard";
import { t } from "../../../languages/index";
import  Loader  from "../../Loader";
const Item = (item) => {
  return (
    <View style={styles.onGoingCard}>
      <View style={styles.mainContent}>
        <View style={styles.imageContainer}>

        </View>
        <View style={styles.textContainer}>
          <Text style={{ ...styles.nameText, }}>{item.transactionData.first_name} {item.transactionData.last_name}</Text>
          <Text style={styles.statusText}>{item.transactionData.status}</Text></View>
        <View style={styles.numberContainer}>

          <Text style={{ ...styles.nameText,textAlign:'right' }}>{item.transactionData.amountReceiving} birr</Text>
          <Text style={{ ...styles.timeText }}>{item.transactionData.data}</Text>
        </View>
      </View>
      <Divider />
      <View style={{ flexDirection: "row", display: "flex", alignSelf: "stretch", paddingTop: 5 }}>
        <Text numberOfLines={3} style={{ ...styles.regularText, color: '#444', marginLeft: 15, flex: 0.76 }}>{t("trackingNumber")}:{item.transactionData.item_id}</Text>
        <TouchableOpacity onPress={() => item.renderTransferModel(item.transactionData)} style={{ flex: 0.2, alignItems: "flex-end", justifyContent: "center" }}>
          <Icon style={{ color: "#711cf1" }} type="Feather" name="arrow-right-circle"></Icon>
        </TouchableOpacity>
      </View>


    </View>

  )
};
function History(props) {
  const [data, setData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [detailToRender, setDetailToRender] = useState({})
  const renderTransferModel = (transactionData) => {
    setDetailToRender({ ...transactionData })
    setModalVisible(true)

  };

  const renderItem = ({ item }) => {
    const transactionData = { ...item }
    return (
      <Item  {...{ ...props, transactionData }} renderTransferModel={(transactionData) => { renderTransferModel(transactionData) }} />
    )
  };

  useEffect(() => {
    let isMounted = true;
    props.setActivityLoader({isLoading:true})
    axios.get('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/user/transaction')
      .then(result => {
        if (isMounted === true) {
          setData(result.data);
          props.setActivityLoader({
            isLoading: false
          })
        }
      }).catch(err => {
        console.log(err);
      });
    return () => {
      isMounted = false;
    };
  }, [])

  return (
   

    <View style={{ flex: 1, paddingBottom: 70 }}>
      <Loader isLoading={props.ui.isLoading} />
      <View style={{ marginLeft: 15, marginRight: 15 }}>
        <Modal visible={modalVisible} >
          <View style={{
            marginLeft: 15,
            marginRight: 15
          }}><TransferDetailCard {...detailToRender} />
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.textButton}>Go back</Text>
            </TouchableOpacity>

          </View>
        </Modal >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.item_id}>
        </FlatList>
      </View>



    </View>

  )
};

const styles = StyleSheet.create({
  mainContent: {
    height: 95,
    display: "flex",
    flexDirection: "row"
  },
  statusText: {
    color: '#ef9700',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    letterSpacing: -0.24,
    lineHeight: 18,
  },
  nameText: {
        color: '#000000',
        fontFamily: 'SF Pro Text - Semibold',
        fontSize: 17,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'left',
        letterSpacing: -0.41,
        lineHeight: 22,
  },
  regularText:{
    color: '#000000',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    letterSpacing: -0.24,
    lineHeight: 18,
  },
  textContainer: {
    width: 140,

    marginLeft: 11,
    height: 45,
    alignSelf: "center"
  },
  imageContainer: {
    borderRadius: 25,

    marginLeft: 15,
    alignSelf: "center",
    width: 45, height: 45, backgroundColor: "gray"
  },
  numberContainer: {
    width: 100,
    height: 45,
    flex: 1,
    alignItems: "flex-end",
    alignSelf: "center",
    marginRight: 20,


  },
  timeText:{
    color: 'rgba(60, 60, 67, 0.6)',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'right',
    letterSpacing: -0.24,
    lineHeight: 18,
  },

  onGoingCard: {
    alignSelf: "center",
    marginTop: 10,
    width: "100%",
    height: 155,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 6, height: 0 },
    shadowRadius: 14,
    borderRadius: 5,
    elevation: 1,
    marginBottom: 7.5,
    marginTop: 7.5,
    backgroundColor: "#fff"
  },
  button: {
    width: 315,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#711cf1',
    marginBottom: 20,
    paddingTop: 15,
    alignSelf: "center",
    marginTop: 15,
    width: "100%"
  },
  textButton: {
    color: '#ffffff',
    fontFamily: 'SF Pro Text - Semibold',
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    alignSelf: "center",
    letterSpacing: -0.41,
    lineHeight: 22,
    alignSelf: "center",
  },

});


function mapStateToProp(state) {

  return { user: state.user,
  ui:state.ui }
};

function mspDispatchToProp() {
  return { downloadOngoingTransaction ,setActivityLoader}
};


export default connect(mapStateToProp, mspDispatchToProp())(History);
