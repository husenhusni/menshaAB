import { Card } from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import React, {  useState } from "react";
import { StyleSheet, View } from 'react-native';
import { sendingTransactionOrder } from "../../../../../redux/actions/transactionAction"
import {setError } from "../../../../../redux/actions/uiAction"
import { connect } from "react-redux";
import { TextInput } from 'react-native-paper';
import CountryCodeRenderer from "../../../../CountryCodeRenderer";
import {t} from '../../../../../languages/index'
import { useFocusEffect } from "@react-navigation/native";
function RenderMobileMethods(props) {
    const [countryCodePicker, setCountryCodePicker] = useState({
        country: undefined,
        countryCode: "ET"
    })
    const [mobileOpen, setMobileOpen] = useState(false)
    const [walletName, setWalletName] = useState([
        { label: "MBirr", value: "MBirr" },
        { label: "HalloCash", value: "HalloCash" },
        { label: "CBEBirr", value: "CBEBirr" },
        { label: "Amole", value: "amole" }

    ])
    const [value, setValue] = useState(null)
    const [validPhone, setValidPhone]=useState(true)
    const validatePhoneInput = (phoneInput) => {

        const pattern = /^([0-9]{9,9})$/;

        if (!pattern.test(phoneInput)) {


            props.setError({ walletPhoneInput:t("correctWalletNumber")  })
            setValidPhone(false)
            return null
        }
        
            props.setError({ walletPhoneInput: undefined })
            setValidPhone(true)

        
    }
    useFocusEffect(
        React.useCallback(() => {
            props.sendingTransactionOrder({accountName:undefined})
            props.sendingTransactionOrder({accountNumber:undefined})
        }, [])
    );

    return (




        <View style={{ height: !mobileOpen? 115:250,marginLeft:15,marginRight:15 }}>

            <DropDownPicker
                listMode="SCROLLVIEW"
                placeholder={t('selectWalletProvider')}
                open={mobileOpen}
                onChangeValue={(value) => { props.sendingTransactionOrder({ accountName: value }) }}
                value={value}
                items={walletName}
                labelStyle={{
                    fontFamily: 'Roboto - Regular',
                    fontSize: 16,
                    fontWeight: '400',
                    fontStyle: 'normal',
                    textAlign: 'left',
                }}
                textStyle={{
                    fontSize: 14
                }}
                containerStyle={{ alignSelf: "center",marginBottom:7.5, width: "100%", }}
                setOpen={setMobileOpen}
                setValue={setValue}
                setItems={setWalletName}
            />

            <View style={{
                marginBottom: 7.5, 
                 flexDirection: "row",
            }}>
                <CountryCodeRenderer></CountryCodeRenderer>
                <TextInput placeholder={t("phone")}
                    style={styles.inputPhone}
                    mode='outlined'
                    error={!validPhone}
                    keyboardType="numeric"
                    onChangeText={(value) => {
                        validatePhoneInput(value)
                        props.sendingTransactionOrder({ accountNumber: value })
                    }} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    inputPhone: {
        color: '#868a9a',
        color: '#000000',
        fontFamily: 'Roboto - Regular',
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'left',
        height: 50,
        flex:5
        
    }
})
function mapStateToProp(state) {
    return { transaction: state.transaction,
        ui: state.ui}
}
function mspDispatchToProp() {
    return { sendingTransactionOrder,setError}
}


export default connect(mapStateToProp, mspDispatchToProp())(RenderMobileMethods);