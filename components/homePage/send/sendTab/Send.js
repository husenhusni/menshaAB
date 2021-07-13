import { Picker, Card, Icon, Button } from 'native-base';
import React, { useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { uploadTransactionOrder } from "../../../../redux/actions/transactionAction"
import { setActivityLoader, setError } from "../../../../redux/actions/uiAction"
import { connect } from "react-redux";
import CountryPicker, { CountryModalProvider } from 'react-native-country-picker-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import numbro from 'numbro'
import RenderBankMethods from './sendTabComponent/renderBankMethod';
import RenderMobileMethods from './sendTabComponent/renderMobileMethod';
import RenderCashMethods from './sendTabComponent/renderCashMethod';
import { TextInput } from 'react-native-paper';
import CountryCodeRenderer from '../../../CountryCodeRenderer';
import Loader from '../../../Loader'
import {t} from '../../../../languages/index'


function Send(props) {
    const [transferMethod, setTransferMethod] = useState({
        inCash: false,
        mobile: false,
        bank: false
    })

    const [validName, setValidName] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    const [validPhone, setValidPhone] = useState(true);
    const [paymentMethodPosition, setPaymentMethodPosition] = useState(0)
    const [readyToCheckOut, setReadyToCheckOut] = useState(false)
    const scrollerRef = useRef()
    const paymentMethodRef = useRef()

    //country code picker
    const [countryCodePicker, setCountryCodePicker] = useState({
        country: undefined,
        countryCode: "ET"
    });

    const onSelect = (country) => {
        setCountryCodePicker({
            countryCode: country.cca2,
            country: country
        })
    }


    const [recieverDetail, setRecieverDetail] = useState({
    });

    useEffect(() => {
        props.setActivityLoader({
            isLoading: false
        })
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            console.log("Transaction data on receiver", props.transaction)
            setRecieverDetail({
                ...recieverDetail,
                ...props.transaction
            })
        }, [props.transaction, props.ui.isLoading])
    );

    useEffect(() => {
        
        if(validLastName==true && validName==true && validPhone==true && props.transaction.accountName!=undefined && props.transaction.accountNumber!=undefined)
            setReadyToCheckOut(true)
        else{
            setReadyToCheckOut(false)
        }
        console.log("check out button",recieverDetail)
    }, [recieverDetail,props.transaction])

    const validateNameInput = (nameInput, indicatator) => {
        const pattern = /^([a-zA-Z]{2,40})+$/;
        if (!pattern.test(nameInput)) {
            props.setError({ receiverNameInput: t("correctName") })
            if (indicatator == "first_name")
                setValidName(false)
            else
                setValidLastName(false)
        }
        else {
            props.setError({ receiverNameInput: undefined })
            
            if (indicatator == "first_name")
                setValidName(true)
            else
                setValidLastName(true)
        }
    }
    const validatePhoneInput = (phoneInput) => {

        const pattern = /^([0-9]{9,9})$/;

        if (!pattern.test(phoneInput)) {

            props.setError({ receiverPhoneInput: t("validNumber") })
            setValidPhone(false)
            return null
        }
        props.setError({ receiverPhoneInput: undefined })
        setValidPhone(true)
    }

    const handleOnPress = () => {
        props.setActivityLoader({
            isLoading: true
        })
        props.uploadTransactionOrder(recieverDetail, props);
    }


    return (

        <CountryModalProvider >
            <Loader isLoading={props.ui.isLoading} />
            <ScrollView ref={scrollerRef}

                style={{
                    flex: 1,
                    backgroundColor: 'white',

                }}
                nestedScrollEnabled={true}
                contentContainerStyle={{ height: 1020, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                    <Text style={styles.title}>{t("aboutReciever")} </Text>

                </View>
                {props.ui.receiverNameInput != undefined &&
                    <Text style={styles.error}>{props.ui.receiverNameInput}</Text>}
                {props.ui.receiverPhoneInput != undefined &&
                    <Text style={styles.error}>{props.ui.receiverPhoneInput}</Text>}
                {props.ui.walletPhoneInput != undefined &&
                    <Text style={styles.error}>{props.ui.walletPhoneInput}</Text>}

                <View style={{ marginLeft: 15, marginRight: 15 }}>
                    <TextInput error={!validName} value={recieverDetail.first_name} onChangeText={(first_name) => {
                        validateNameInput(first_name, "first_name"),
                            setRecieverDetail({ ...recieverDetail, first_name: first_name })
                    }}
                        style={styles.input} label={t("firstName")}mode='outlined'>

                    </TextInput>
                    <TextInput error={!validLastName} value={recieverDetail.last_name}
                        onChangeText={(last_name) => {
                            validateNameInput(last_name, "last_name");
                            setRecieverDetail({ ...recieverDetail, last_name: last_name })
                        }}
                        style={{ ...styles.input }} label={t("lastName")} mode='outlined'>

                    </TextInput>


                    <View style={{
                        marginBottom: 10,
                        height: 50, flexDirection: "row",
                    }}>
                        <CountryCodeRenderer></CountryCodeRenderer>
                        <TextInput placeholder={t("phone")}
                            style={styles.inputPhone}
                            mode='outlined'
                            error={!validPhone}
                            keyboardType="numeric"
                            value={recieverDetail.phone_number}
                            onChangeText={(value) => {
                                validatePhoneInput(value)
                                setRecieverDetail({ ...recieverDetail, phone_number: value })
                            }} />
                    </View>


                </View><Text style={styles.innerHeader}>{t("HowToSend")}</Text>

                <View style={{ display: "flex", height: 140, marginLeft: 15, marginTop: 15, marginBottom: 7.5,marginRight:15,justifyContent:"space-around", flexDirection: 'row' }}>
                    <TouchableOpacity ref={paymentMethodRef} onLayout={(e) => setPaymentMethodPosition(e.nativeEvent.layout.y)}
                        style={transferMethod.inCash ? styles.methodSelected : styles.method} onPress={() => {
                            setTransferMethod({ inCash: true, mobile: false, bank: false });
                            setRecieverDetail({ ...recieverDetail, method: "Cash" })
                            paymentMethodRef.current.on
                            scrollerRef.current.scrollTo({ x: 0, y: paymentMethodPosition + 455, animated: true })

                        }}>

                        <Image style={{ width: 75, height: 75, alignSelf: 'center' }} source={require('../../../../assets/images/cashTransfer.webp')} />
                        <Text style={{ alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto - Regular' }}>{t("inCash")}</Text>


                    </TouchableOpacity>
                    <TouchableOpacity style={transferMethod.bank ? styles.methodSelected : styles.method} onPress={() => {

                        setTransferMethod({ inCash: false, mobile: false, bank: true });
                        setRecieverDetail({ ...recieverDetail, method: "Bank" })


                    }}>

                        <Image style={{ width: 75, height: 75, alignSelf: 'center' }} source={require('../../../../assets/images/bankTransfer.png')} />
                        <Text style={{ alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto - Regular' }}>{t("viaBank")}</Text>


                    </TouchableOpacity>
                    <TouchableOpacity style={transferMethod.mobile ? styles.methodSelected : styles.method} onPress={() => {
                        setTransferMethod({ inCash: false, mobile: true, bank: false });
                        setRecieverDetail({ ...recieverDetail, method: "Mobile" })
                    }}>

                        <Image style={{ width: 75, height: 75, alignSelf: 'center' }} source={require('../../../../assets/images/mobileTransfer.png')} />
                        <Text style={{ alignSelf: 'center', marginTop: 10, fontFamily: 'Roboto - Regular' }}>{t("viaMobil")}</Text>

                    </TouchableOpacity>

                </View>

                {transferMethod.inCash === true && (
                    <RenderCashMethods />
                )}
                {transferMethod.mobile === true && (
                    <RenderMobileMethods />
                )}
                {transferMethod.bank === true && (
                    <RenderBankMethods />

                )}
                <View style={{
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop:7.5,
                }}>
                    <TouchableOpacity disabled={!readyToCheckOut}
                        onPress={() => handleOnPress()}
                        style={{ ...styles.button,backgroundColor:readyToCheckOut==true? '#711cf1':'grey' }}
                    >
                        <Text style={styles.textButton}>{t("CheckOut")}</Text>
                    </TouchableOpacity>
                </View>
 </ScrollView>
 </CountryModalProvider>


    );


}

const styles = StyleSheet.create({
    title: {
        alignSelf: "center",
        color: '#000000',
        fontFamily: 'SF Pro Display - Bold',
        fontSize: 22,
        fontWeight: '700',
        fontStyle: 'normal',
        textAlign: 'left',
        marginBottom: 20
    },
    error: {
        color: "#D8000C",
        fontFamily: 'Roboto - Medium',
        fontSize: 16,
        fontWeight: '700',
        fontStyle: 'normal',
        textAlign: 'center',
        alignSelf: "center",
    },
    innerHeader: {
        color: '#000000',
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 17,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.41,
        lineHeight: 22,
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        textAlign: "center"
    },
    input: {
        color: '#000000',
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 17,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'left',
        letterSpacing: -0.24,
        lineHeight: 18,
        marginBottom: 5,
        width: "100%",
        height: 50
    },
    inputPhone: {
        color: '#868a9a',
        color: '#000000',
        fontFamily: 'Roboto - Regular',
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'left',
        height: 50,
        flex: 5

    },
    method: {
        flex: 1, shadowOpacity: 0.06,
        padding: 15,
        height: 105,
        width: 105,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 5,
        borderRadius: 5,
        elevation: 3,
        marginBottom: 7.5
    },
    methodSelected: {
        shadowOpacity: 0.06,
        height: 105,
        width: 105,
        padding: 15,
        borderRadius: 5,
        flex: 1, borderColor: "#711cf1", borderRadius: 1, 
        borderWidth: 3,
        alignSelf:"flex-start",
        marginBottom: 7.5

    },
    button: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        backgroundColor: '#711cf1',
        marginBottom: 20,
        paddingTop: 17,
        alignSelf: "center",
        marginTop:15,
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
    createAccountLink: {
        color: '#d80677',
        color: '#000000',
        fontFamily: 'Roboto - Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        textAlign: 'right',
        marginStart: 50
    }


});

function mapStateToProp(state) {

    return {
        transaction: state.transaction,
        ui: state.ui
    }
}
function mspDispatchToProp() {
    return { uploadTransactionOrder, setActivityLoader, setError }
}


export default connect(mapStateToProp, mspDispatchToProp())(Send);
