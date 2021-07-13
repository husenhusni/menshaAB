import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";


import React, {useEffect, useState } from "react";
import { Card,} from "native-base";
import ExchangeInput from "./ExchangeInput";
import axios from "axios";
import { connect } from "react-redux";
import { qoutaInputDataSaver } from "../../../redux/actions/transactionAction";
import { setActivityLoader } from "../../../redux/actions/uiAction"
import Loader from "../../Loader";
import {t} from '../../../languages/index'
import { uploadExpoPushToken } from "../../../redux/actions/userAction";

function Welcome(props) {
  console.log("Welcome just loaded",props.transaction)
  
  const [readyToSend, setReadyToSend] = useState(false)

  const [receiverCountry, setReceiverCountry] = useState("ETB")
  const [isLoading, setIsLoading] = useState(false)
  
  const [rateFitched, setRateFitched] = useState({
    rate: undefined,
    receiveAmount: undefined,
    fee: undefined
  })

 
useEffect(() => {
  setIsLoading(props.ui.isLoading)
}, [props.ui.isLoading])
  useEffect(() => {
    if (props.transaction.qouteSendAmount !== 0 && props.transaction.qouteSendCurrency !== undefined) {
      onFitchingRate()
     
      
    }
    else{
      setReadyToSend(false)
    }
   

  }, [props.transaction.qouteReceiverCurrency,props.transaction.qouteSendAmount, props.transaction.qouteSendCurrency])

  useEffect(() => {
    console.log("My user state",props.user)
    
    return()=>{
      props.qoutaInputDataSaver({ qouteSendAmount:0,receiveAmount: undefined,qouteSendCurrency:undefined })
    }
    
  }, [])


  const onFitchingRate = () => {
    props.setActivityLoader({
      isLoading: true
    })

    const body = {

      sendCurrency: props.transaction.qouteSendCurrency,
      sendAmount: props.transaction.qouteSendAmount,
      receiverCurrency: receiverCountry
    }
    axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/user/fetch-rate', body).then((response) => {
      setRateFitched({ ...rateFitched, rate: response.data.rate, receiveAmount: response.data.receiveAmount, fee: response.data.fee })
      props.qoutaInputDataSaver({ rate: response.data.rate, receiveAmount: response.data.receiveAmount, fee: response.data.fee });
      setReadyToSend(true);
      props.setActivityLoader({
      isLoading: false
    })

    }).catch(error => { console.log(error);
      props.setActivityLoader({
        isLoading: false
      }) })
    
  }

  return (

    <View style={styles.container}
    >
      <Loader isLoading={isLoading} />
      <Card style={styles.qouteCard}>
        <Text style={styles.cardTitle}>{t("checkRate")}</Text>
        <Text style={styles.error}>{props.ui.qouteCurrencyInput}</Text>
        <Text style={styles.cardText}>{t("youSend")}</Text>
        <ExchangeInput onCurrencyInputListner />
        <Text style={styles.cardText}>{t("receiverGets")}</Text>
        <ExchangeInput receiverCountry={receiverCountry} onCountryChanged />
        {readyToSend == true &&
          <Text style={{ ...styles.cardText, alignSelf: "center" }}>{t("totalFees")} - {rateFitched.fee} {props.transaction.qouteSendCurrency}</Text>
        }
        {readyToSend == true && <Text style={{ ...styles.cardText, alignSelf: "center", marginTop: 10 }}>{t("currentRate")}{props.transaction.qouteSendCurrency} = {rateFitched.rate} {props.transaction.qouteReceiverCurrency}</Text>
        }

      </Card>
     
        <View style={{marginLeft:15,marginRight:15}}>
        <TouchableOpacity
          onPress={() => {props.onCallBackLister({
            send: true,
            ongoing: false,
            history: false,
            myCart: false,
            home: false,
            backButton: "none",
            sendProps:{currency:props.transaction.qouteSendCurrency,amountSending:props.transaction.qouteSendAmount,tempAmountSending:props.transaction.qouteSendAmount,countryCode:props.transaction.qouteSendCountryCode}

          });
        setActivityLoader({isLoading:true})}}
          style={{...styles.button,backgroundColor:readyToSend==true?'#711cf1':'grey'}} 
          disabled={!readyToSend}
        >
          <Text style={styles.textButton}>{t("send")}  {props.transaction.qouteSendCurrency? props.transaction.qouteSendCurrency:t("money") } {t("toEthiopia")}</Text>
        </TouchableOpacity>
        </View>
      



    </View >
  );
}

const styles = StyleSheet.create({

  qouteCard: {

    alignSelf: "stretch",
    height: "auto",
    marginLeft: 15,
    marginRight: 15,
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOffset: { width: 6, height: 0 },
    shadowRadius: 14,
    borderRadius: 5,
    elevation: 3,
    paddingBottom: 10,
    paddingTop: 38,
    paddingLeft: 20,
    paddingRight: 20,
    

  },
  cardTitle: {
    alignSelf: "center",
    color: '#000000',
    fontFamily: 'SF Pro Display - Bold',
    fontSize: 22,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'left',
    marginBottom: 7,

  },
  inputContainer: {
    borderEndColor: 'rgba(0, 0, 0, 0.37)',
    borderEndWidth: 2,
    flex: 3,
    paddingTop: 15,
    paddingBottom: 15,
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
  rateInputGroup: {
    display: "flex",
    flexDirection: "row",
    borderColor: 'rgba(0, 0, 0, 0.37)',
    borderRadius: 2,
    borderWidth: 1,
    paddingLeft: 20,
    marginTop: 15,
    marginBottom: 15,

    justifyContent: "space-between"
  },
  rateInput: {


  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    marginBottom: 20,
    paddingTop: 17,
    alignSelf: "center",
    marginTop: 15
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
    marginTop: 15,
    flex: 1
  },error: {
    color: "#D8000C",
    fontFamily: 'Roboto - Medium',
    fontSize: 16,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
    alignSelf: "center",
   
  }
});

function mapStateToProp(state) {
  return {
    transaction: state.transaction,
    ui: state.ui,
    user:state.user
  }
}
function mspDispatchToProp() {
  return { qoutaInputDataSaver, setActivityLoader,uploadExpoPushToken }
}

export default connect(mapStateToProp, mspDispatchToProp())(Welcome);
