import React, { Component, useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from 'react-native';
import CountryPicker, { CountryModalProvider } from 'react-native-country-picker-modal';
import CurrencyPicker from "react-native-currency-picker"
import { qoutaInputDataSaver } from "../../../redux/actions/transactionAction";
import { setError, setActivityLoader } from "../../../redux/actions/uiAction";
import { connect } from "react-redux";
import { t } from "i18n-js";
function ExchangeInput(props) {
  let currencyPickerRef = undefined;

 

  const [sendCountry, setSendCountry] = useState("SEK")
  const [disableInput, setDisableInput] = useState(false)
  const [inputAmount, setInputAmount] = useState({
    qouteSendAmount: "",

  })
  useEffect(() => {

    if (props.receiverCountry) {
      setSendCountry(props.receiverCountry)
      props.qoutaInputDataSaver({ qouteReceiverCurrency: props.receiverCountry });
      setDisableInput(true)
      if (props.transaction.receiveAmount !== undefined && props.transaction.receiveAmount !== null) {
        setInputAmount({ qouteSendAmount: props.transaction.receiveAmount.toString() })
      }
      else {
        setInputAmount({ qouteSendAmount: "" })
      }

    }
    else if (props.onCurrencyInputListner) {
      props.qoutaInputDataSaver({ qouteSendCurrency: sendCountry });
    }


  }, [props.transaction.receiveAmount])




  const validateCurrencyInput = async (inputAmount) => {

    const pattern = (/^[0-9\b]+$/);
    console.log(inputAmount)

    if (!pattern.test(inputAmount)) {

      props.setActivityLoader({
        isLoading: false
      })
      props.setError({ qouteCurrencyInput: t("amountToSend") })
      return false

    }
    props.setActivityLoader({
      isLoading: false
    })
    return true

  }

  const updateInputState = (inputAmount) => {
    props.setActivityLoader({
      isLoading: true
    })
    props.setError({ qouteCurrencyInput: "" })
    validateCurrencyInput(inputAmount).then((respond) => {
      if (respond == true) {

        props.qoutaInputDataSaver({ qouteSendAmount: inputAmount })
        props.setActivityLoader({
          isLoading: false
        })
      }
    })

  }


  const updateSendState = (data) => {
    setSendCountry(data.code)
    if (props.onCountryChanged) {
      props.qoutaInputDataSaver({ qouteReceiverCurrency: data.code });
      setSendCountry(data.code)
    }
    else if (props.onCurrencyInputListner) {
      props.qoutaInputDataSaver({ qouteSendCurrency: data.code})
      setSendCountry(data.code)

    }
  }

  return (
    <View style={styles.rateInputGroup}>
      <View style={styles.inputContainer}>
        <TextInput editable={!disableInput} keyboardType="numbers-and-punctuation" value={inputAmount.qouteSendAmount} onChangeText={(inputAmount) => { setInputAmount({ qouteSendAmount: inputAmount }) }} style={styles.cardText} placeholder="1000" onEndEditing={(value) => { updateInputState(value.nativeEvent.text) }}

        ></TextInput>
      </View>

      <View style={{
        justifyContent: "center", paddingLeft: 5, paddingRight: 5, backgroundColor: "#C7CAC8"
      }}>
        <CurrencyPicker
          currencyPickerRef={(ref) => { currencyPickerRef = ref }}
          enable={true}
          darkMode={false}
          currencyCode={sendCountry}
          showFlag={true}
          showCurrencyName={false}
          showCurrencyCode={true}
          onSelectCurrency={(data) => { updateSendState(data) }}
          showNativeSymbol={false}
          showSymbol={false}
          containerStyle={{
            container: {},
            flagWidth: 25,
            currencyCodeStyle: {
              fontSize:17
            },
            currencyNameStyle: {},
            symbolStyle: {},
            symbolNativeStyle: {}
          }}
          modalStyle={{
            container: {},
            searchStyle: {},
            tileStyle: {},
            itemStyle: {
              itemContainer: {},
              flagWidth: 25,
              currencyCodeStyle: {
                fontSize:12
              },
              currencyNameStyle: {},
              symbolStyle: {},
              symbolNativeStyle: {}
            }
          }}
          title={"Currency"}
          searchPlaceholder={"Search"}
          showCloseButton={true}
          showModalTitle={true}
        />
      </View>
    </View>

  )

}
const styles = StyleSheet.create({

  qouteCard: {

    alignSelf: "stretch",
    height: 350,
    marginLeft: 30,
    marginRight: 30,
    shadowColor: 'rgba(0, 0, 0, 0.07)',
    shadowOffset: { width: 6, height: 0 },
    shadowRadius: 14,
    borderRadius: 5,
    elevation: 3,
    paddingTop: 38,
    paddingLeft: 20,
    paddingRight: 20,

  },
  cardTitle: {
    alignSelf: "center",
    color: '#711cf1',
    color: '#000000',
    fontFamily: 'Roboto - Bold',
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'left',
    marginBottom: 7,

  },
  inputContainer: {
    borderEndColor: 'rgba(0, 0, 0, 0.37)',
    borderEndWidth: 2,
    flex: 3,
    height: 50,
    justifyContent: "center"
  },
  cardText: {
    color: 'rgba(60, 60, 67, 0.6)',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 17,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    letterSpacing: -0.41,
    lineHeight: 22,


  },
  rateInputGroup: {
    display: "flex",
    flexDirection: "row",
    borderColor: "#4444",
    borderRadius: 2,
    borderWidth: 1,
    paddingLeft: 15,
    marginTop: 7.5,
    marginBottom: 7.5,
  },
  rateInput: {


  },
  button1: {
    height: 55,
    backgroundColor: "rgba(29,114,145,1)",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 179,
    marginLeft: 43,
    marginRight: 43
  },
  sendMoney: {
    width: 115,
    color: "rgba(12,12,12,1)",
    fontSize: 20,
    textAlign: "left",
    marginTop: 13,
    marginLeft: 86
  },
  container: {
    marginTop: 30,
    flex: 1
  },

});
function mapStateToProp(state) {
  return {
    transaction: state.transaction,
    ui: state.ui
  }
}
function mspDispatchToProp() {
  return { qoutaInputDataSaver, setError, setActivityLoader }
}


export default connect(mapStateToProp, mspDispatchToProp())(ExchangeInput);