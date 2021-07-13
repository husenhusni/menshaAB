import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Card, Icon } from "native-base";
import { TextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/core";
import CountryPicker, { CountryModalProvider } from 'react-native-country-picker-modal';
import { sendingTransactionOrder } from "../../../../redux/actions/transactionAction"
import { qoutaInputDataSaver } from "../../../../redux/actions/transactionAction";
import { setActivityLoader, setError } from "../../../../redux/actions/uiAction"
import { connect } from "react-redux";
import { Divider } from 'react-native-paper';
import numbro from 'numbro'
import axios from "axios";
import {t} from '../../../../languages/index'
import Loader from "../../../Loader";
import CountrySelect from "../../welcome/CountrySelect";

function Qoute(props) {
  const navigation = useNavigation();

  const [readyToRender, setReadyToRender] = useState(false)

  const [transaction, setTransaction] = useState({
    country: {
      "callingCode":["46",],
      "cca2": "SE",
      "currency":["SEK",],
      "flag": "flag-se",
      "name": "Sweden",
      "region": "Europe",
      "subregion": "Northern Europe",
    },
    currency: ["SEK"],
    countryCode: "SE",
    amountSending: 0,
    amountReceiving: 0,
    tempAmountSending: 0,
    rate: 0,
    receiveAmount: 0,
    fee: 0,
  })

  const [visible, setVisible] = useState(false)

  const scrollerRef = useRef()
  const [summeryPosition, setSummeryPosition] = useState()

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      e.preventDefault();
      alert(t("pleaseFill"));
    });

    return unsubscribe;

  }, [navigation]);


  useEffect(() => {
    const qouteData = props.qouteData.props
    if (qouteData !== undefined) {

      setTransaction({
        ...transaction,
        ...qouteData,
      })
      setReadyToRender(true)
      console.log("before Fitch", transaction)


    }
    else {
      setReadyToRender(false)
      props.sendingTransactionOrder();
      setTransaction({
        country:{
          "callingCode":["46",],
          "cca2": "SE",
          "currency":["SEK",],
          "flag": "flag-se",
          "name": "Sweden",
          "region": "Europe",
          "subregion": "Northern Europe",
        },
        currency: "SEK",
        countryCode: "SE",
        amountSending: 0,
        rate: 0,
        receiveAmount: 0,
        fee: 0
      })
    }
  }, [props.qouteData.props])
    ;

  useEffect(() => {
    if (transaction.amountSending !== undefined) {
      if (transaction.amountSending !== 0) { onFitchingRate() }
    }
  }, [transaction.amountSending, transaction.currency])

  useEffect(() => {
   
  }, [])
  const renderSummery = () => {
    if (readyToRender) {
      scrollerRef.current.scrollTo({ x: 0, y: summeryPosition + 240 });

      return (
        <View onLayout={(e) => { setSummeryPosition(e.nativeEvent.layout.y) }} style={{
          flexDirection: 'row',
        }}>
          <Card style={{ ...styles.container, flex: 1, display: "flex", }}>
            <View style={{ ...styles.receitLine, }}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>{t("fee")} </Text>
              <Text style={{ ...styles.normalText, flex: 0.1, marginLeft: 5 }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{transaction.fee.toString()} {transaction.currency}</Text>
            </View>
            <Divider />
            <View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>{t("total")}</Text>
              <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{`${Number(transaction.fee) + Number(transaction.amountSending)}`} {transaction.currency}</Text>
            </View>
            <Divider />
            <View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>{t("receiverGets")}</Text>
              <Text style={{ ...styles.normalText, flex: 0.1, }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{transaction.receiveAmount.toString()} ETB</Text>
            </View>
            <Divider />
            <View style={styles.receitLine}>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>{t("deliveryTime")}</Text>
              <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
              <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}> 30 {t("minutes")}</Text>
            </View>
          </Card>
        </View>
      )
    }
    else { return (null) }
  };

  const validateCurrencyInput = async (inputAmount) => {

    const pattern = (/^[0-9\b]+$/);


    if (!pattern.test(inputAmount)) {

      props.setActivityLoader({
        isLoading: false
      })
      props.setError({ transactionCurrencyInput: t("amountToSend") })
      return false

    }
    props.setActivityLoader({
      isLoading: false
    })
    return true
  }

  const onFitchingRate = () => {

    const body = {

      sendCurrency: transaction.currency,
      sendAmount: transaction.amountSending,
      receiverCurrency: ["ETB"]
    }
    props.setActivityLoader({
      isLoading: true
    })
    axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/user/fetch-rate', body).then((response) => {
      setTransaction({ ...transaction, rate: response.data.rate, receiveAmount: response.data.receiveAmount, fee: response.data.fee });

    }).catch(error => { console.log(error) })
    props.setActivityLoader({
      isLoading: false
    })
    setReadyToRender(true)
  }

  // Contry Drop down
  const onSelect = (country) => {
    console.log("displaying country", country.currency[0])
    setTransaction({
      ...transaction,
      currency: country.currency[0],
      country: country,
      countryCode: country.cca2
    })
  }

  const onChangeSending = (value) => {
    validateCurrencyInput(value).then((response) => {
      if (response == true) {
        setTransaction({
          ...transaction,
          amountSending: Number(value),
        });
      }


    })

  }

  /* const onChangeReceiving = (value) => {
    setTransaction({
      ...transaction,
      amountReceiving:  numbro(value).format({
        thousandSeparated: true,
        mantissa: 2 
      }),
      amountSending:numbro(Number(value)/5.7).format({
        thousandSeparated: true,
        mantissa: 2 
      }),
    })
  } */
  const switchVisible = () => {
    setVisible(!visible);
  }

  function handleOnPress() {
    const transactionData = {
      ...props.transaction,
      amountReceiving: transaction.receiveAmount,
      amountSending: transaction.amountSending,
      country_sender: transaction.countryCode,
      currency_sender: transaction.currency,
      fee: transaction.fee,
      rate: transaction.rate,
    }
    props.sendingTransactionOrder(transactionData);
    navigation.navigate(t("reciever"));

  }

  return (
    <CountryModalProvider >
       <Loader isLoading={props.ui.isLoading} />
      <ScrollView ref={scrollerRef}
        style={{
          flex: 1,
          display: "flex",
          backgroundColor: 'white',
        }}
        contentContainerStyle={{ height: 730, backgroundColor: 'white' }}>
        <View style={styles.mb} transparent>

    
          <View style={styles.headerContainer}>
            <Text style={styles.header}> {t("sendEthiopia")} </Text>
            <Text style={{ ...styles.inputGroupText, marginTop: 8, alignSelf: "center" }}> {t("getQoute")} </Text>
          </View>
        </View>
        <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 7.5 }}>
          <View style={styles.inputGroupContainer}>
            <CountrySelect onCurrencyChange={(currency)=>{ setTransaction({ ...transaction,currency:currency})}}/>
          </View>

          <TextInput value={transaction.tempAmountSending ? transaction.tempAmountSending.toString() : ""} keyboardType="numbers-and-punctuation" onEndEditing={(value) => { onChangeSending(value.nativeEvent.text) }} onChangeText={(value) => {
            setTransaction({ ...transaction, tempAmountSending: value });
          }}
            style={styles.inputMoney} keyboardType="number-pad" right={<TextInput.Affix style={styles.inputMoney} text={transaction.currency} />} label={t("youSend")} mode='outlined'>

          </TextInput>
          <TextInput style={{ ...styles.inputMoney, marginBottom: 0 }} disabled={true} value={transaction.receiveAmount.toString()} right={<TextInput.Affix style={styles.inputMoney} text="BIRR" />} label={t("receiverGets")} mode='outlined'>

          </TextInput>
        </View>
        <Text style={styles.cardText, { marginTop: 7.5, marginBottom: 7.5, marginRight: 15, marginLeft: 15, alignSelf: "center" }}>{readyToRender == true ? `${t("currentRate")} ${transaction.currency} = ${transaction.rate} ETB` : null}</Text>
        {renderSummery()}

        <View style={{ marginLeft: 15, marginRight: 15 }}>
          <TouchableOpacity style={{ ...styles.button, width: "100%", backgroundColor: readyToRender == true ? '#711cf1' : 'grey', }} disabled={!readyToRender} onPress={() => handleOnPress()}>
            <Text style={styles.textButton}>{t("proceed")}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>


    </CountryModalProvider>
  );
}




const styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  inputMoney: { width: "100%", alignSelf: "center", fontSize: 16, marginBottom: 10, height: 50 },


  headerContainer: {
    display: "flex",
    flexDirection: "column",

  },
  mb: {
    display: "flex",
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 6, height: 0 },
    shadowRadius: 14,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    alignSelf: "center",
    paddingLeft: 20,
    paddingTop: 17,
    paddingBottom: 14,
    marginTop: 15,
  },
  receitLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
  },
  cardText: {
    color: '#000000',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 17,
    fontWeight: '400',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    lineHeight: 22,
    textAlign: 'left',



  },
  inputGroupContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: '#ffffff',
    alignSelf: "center",
    justifyContent: "space-between",
    marginBottom: 10,

  },
  inputGroupText: {
    color: '#000000',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 13,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    letterSpacing: -0.24,
    lineHeight: 18,

  },

  scrollView: {
    flex: 1,


  },
  contentContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#C7CBC9',
    flex: 1,
  },
  normalText: {
    color: '#000000',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    letterSpacing: -0.24,
    lineHeight: 18,
  },


  button: {
    height: 50,
    borderRadius: 5,
    marginBottom: 7.5,
    paddingTop: 17,
    alignSelf: "center",
    marginTop: 7.5,
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
  container: {
    marginTop: 7.5,
    marginBottom: 7.5,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 20,
    paddingRight: 18,
    paddingTop: 23,
    shadowOpacity: 0.06,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 14,
    borderRadius: 5,
    elevation: 3,

  },
  header: {
    alignSelf: "center",
    color: '#000000',
    fontFamily: 'SF Pro Display - Bold',
    fontSize: 22,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'left',

  },
  subtitle: {
    color: '#000000',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    letterSpacing: -0.24,
    lineHeight: 18,

  }, receitLine: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10

  },
  normalText: {
    color: '#15294b',
    color: '#000000',
    fontFamily: 'Roboto - Regular',
    fontSize: 16,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
  },
});



function mapStateToProp(state) {
  return {
    transaction: state.transaction,
    ui: state.ui
  }
}
function mspDispatchToProp() {
  return { sendingTransactionOrder, qoutaInputDataSaver, setActivityLoader, setError }
}


export default connect(mapStateToProp, mspDispatchToProp())(Qoute);
