import React, { Component, useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import CountryPicker, { CountryModalProvider } from 'react-native-country-picker-modal';
import { qoutaInputDataSaver } from "../../../redux/actions/transactionAction";
import { setError, setActivityLoader } from "../../../redux/actions/uiAction";
import { connect } from "react-redux";

import { TextInput } from 'react-native-paper';
function CountrySelect(props) {
    const [sendCountry, setSendCountry] = useState({
        "cca2": "SE",
        "currency":["SEK"],
        "flag": "flag-se",
        "name": "Sweden",
      })
     useEffect(() => {
         props.onCurrencyChange(sendCountry.currency[0])
     }, [sendCountry])
    return (
        <View style={styles.rateInputGroup}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.cardText} disabled={true} value={sendCountry.name} label='Send From' mode='outlined'>

                </TextInput>
            </View>

            <View style={{borderRadius:5,
                justifyContent: "center", paddingLeft: 5, paddingRight: 5,marginTop:5,backgroundColor: "#C7CAC8", flex: 0.65
            }}>
                <CountryPicker withModal withFlagTouchableOpacity withCloseButton withFilter withAlphaFilter withFlag {...{
                    countryCode: sendCountry.cca2,

                }} onSelect={(country) =>{ setSendCountry(country);
                console.log(country)}}>
                </CountryPicker>
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
        flex: 3,
        height: 65,
    },
    cardText: {
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 17,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'left',
        letterSpacing: -0.41,
        lineHeight: 22,
        borderRadius:0,
        borderEndWidth:0



    },
    rateInputGroup: {
        display: "flex",
        flexDirection: "row",
        marginTop: 7.5,
        marginBottom: 7.5,
        flex: 1
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


export default connect(mapStateToProp, mspDispatchToProp())(CountrySelect);