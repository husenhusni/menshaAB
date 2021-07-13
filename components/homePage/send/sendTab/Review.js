
import { Card } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Text, View,  TouchableOpacity,  ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { sendingTransactionOrder } from '../../../../redux/actions/transactionAction'
import { setActivityLoader } from "../../../../redux/actions/uiAction"
import { Divider } from 'react-native-paper';
import { CheckBox } from 'react-native-elements'
import numbro from 'numbro';
import { completeTransactionOrder } from '../../../../redux/actions/transactionAction'
import { useStripe } from '@stripe/stripe-react-native';
import { t} from '../../../../languages/index';



function Review(props) {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [transaction, setBucket] = useState();
    const [Loading, setLoading] = useState(true);
    const [checkedConfirmation, setCheckedConfirmation] = useState(false)
    const [savedCardModal, setSavedCardModal] = useState(false)

    const initializePaymentSheet = async () => {
        initPaymentSheet({customerId: props.user.customerId,
            paymentIntentClientSecret: props.transaction.paymentIntent,
            customerEphemeralKeySecret: props.transaction.ephemeralKey,
            merchantDisplayName: 'Mensha Remitance AB.',
            style: 'alwaysLight',
          }).then(error=>{
              if(!error){

              }
          });

    }
    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet({ clientSecret:props.transaction.paymentIntent });
    
        if (error) {
            props.navigation.navigate("FailedPayment")
          
        } else {
          props.navigation.navigate("SuccessPayment")
        }
      };

    useEffect(() => {
        console.log(props)
        setBucket(props.transaction);
        setLoading(false)
        initializePaymentSheet()

    }, [props.transaction])

    const onHandleSubmit = () => {
        openPaymentSheet()
        
    }
    if (!Loading) {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{
                    flex: 1,
                    width: "100%",
                    backgroundColor: 'white',
                }}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{ height: 800, backgroundColor: 'white' }}>
                    <View style={{ marginLeft: 15, marginRight: 15, marginTop: 15, display: "flex", }}>
                        <Card style={styles.container}>
                            <View style={{ backgroundColor: "#711cf1", borderTopRightRadius: 10, borderTopLeftRadius: 10, width: "100%", paddingBottom: 10, paddingTop: 10 }}>
                                <Text style={styles.header}>{transaction.amountSending} {transaction.currency_sender}</Text>
                                <Text style={styles.subtitle}>{transaction.first_name} {transaction.last_name} </Text>
                            </View>
                            <Divider />
                            <View style={{
                                flexDirection: 'row', padding: 15
                            }}>
                                <View style={{ flex: 1, display: "flex", }}>
                                    <View style={{ ...styles.receitLine, }}>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>{t("country")} </Text>
                                        <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{transaction.country_reciever}</Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.receitLine}>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>{t("accountType")}</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{transaction.method}:-{transaction.accountName}</Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.receitLine}>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>{t("accountNumber")}</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.1, }}>:</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{transaction.accountNumber} </Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.receitLine}>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>{t("receiverGets")}</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{numbro(transaction.amountReceiving).format({
                                            thousandSeparated: true,
                                            mantissa: 2
                                        })} Birr</Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.receitLine}>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>{t("recieverPhone")}</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>0{transaction.phone_number}</Text>
                                    </View>
                                    <Divider />
                                    <View style={styles.receitLine}>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "left" }}>{t("transactionFee")}</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.1 }}>:</Text>
                                        <Text style={{ ...styles.normalText, flex: 0.9, textAlign: "right" }}>{numbro(transaction.fee).format({
                                            thousandSeparated: true,
                                            mantissa: 2
                                        })} {transaction.currency_sender}</Text>
                                    </View>
                                    
                                </View>
                            </View>
                        </Card>
                        <View style={{ display: "flex", flexDirection: "row" }}>
                            <CheckBox
                                textStyle={styles.checkBoxText}
                                containerStyle={{ width: 40, marginLeft: 0, backgroundColor: "#ffffff", borderColor: "grey" }}
                                checked={checkedConfirmation}
                                onPress={() => { setCheckedConfirmation(!checkedConfirmation) }}
                            />
                            <Text style={{ ...styles.checkBoxText, textAlign: "center", alignSelf: "center" }}>{t("confirmInfo")}</Text>
                        </View>
                        <TouchableOpacity disabled={!checkedConfirmation} style={{ ...styles.button, marginTop: 7.5, backgroundColor: checkedConfirmation == true ? '#711cf1' : 'grey', }} onPress={() => onHandleSubmit()}>
                            <Text style={styles.textButton}>{t("payNow")}</Text>
                        </TouchableOpacity>




                    </View>
                </ScrollView>

            </View>

        );
    }
    else {
        return (null)
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 6, height: 0 },
        shadowRadius: 14,
        borderRadius: 5,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 7.5,
        backgroundColor: '#ffffff',
    },
    header: {
        color: '#fff',
        fontFamily: 'SF Pro Text - Semibold',
        fontSize: 17,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.41,
        lineHeight: 22,

    },
    subtitle: {
        color: '#fff',
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 15,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.24,
        lineHeight: 18,

    }, receitLine: {
        display: "flex",
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10

    },
    normalText: {
        color: 'rgba(60, 60, 67, 0.6)',
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 15,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'left',
        letterSpacing: -0.24,
        lineHeight: 18,
    },
    checkBoxText:{
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
        width: "100%",
        height: 50,
        borderRadius: 5,
        backgroundColor: '#711cf1',
        paddingTop: 17,
        alignSelf: "center",
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
})


function mapStateToProp(state) {
    return {
        transaction: state.transaction,
        ui: state.ui,
        user: state.user
    }
}

function mspDispatchToProp() {
    return { sendingTransactionOrder, setActivityLoader, completeTransactionOrder }
}


export default connect(mapStateToProp, mspDispatchToProp())(Review);
