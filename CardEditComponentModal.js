import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Modal,
    TouchableOpacity,
    Text,
    View,
} from 'react-native'
import LottieView from 'lottie-react-native'
import CreditCardForm, { Button, FormModel } from 'rn-credit-card'
import { Icon } from 'native-base'
import { connect } from 'react-redux'
import { UploadUserCard } from './redux/actions/userAction';
import { setActivityLoader } from './redux/actions/uiAction';
import Loader from './components/Loader'

var creditCardType = require("credit-card-type");
const CardEditComponentModal = (props) => {
    const [visible, setVisible] = useState(false)
    const formMethods = useForm({
        // to trigger the validation on the blur event
        mode: 'onBlur',
        defaultValues: {
            holderName: '',
            cardNumber: '',
            expiration: '',
            cvv: '',

        },
    })
    const { handleSubmit, formState } = formMethods

    function onSubmit(model) {
        props.setActivityLoader({
            isLoading: true
        })
        const cardTypeArray = creditCardType(model.cardNumber)
        const cardType = { cardType: cardTypeArray[0].type }
        props.UploadUserCard({ ...props, model, ...cardType })

    }

    return (
        <FormProvider {...formMethods}>

            <Modal transparent={false}
                visible={true} >
                <Loader isLoading={props.ui.isLoading}></Loader>
                <SafeAreaView style={styles.container} >
                    <KeyboardAvoidingView
                        style={styles.avoider}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <View style={{ ...styles.header, width: "100%", marginBottom: 30, marginRight: 10, flexDirection: "row" }}>
                            <View style={{ flex: 1 }}>
                                <Icon onPress={() => {
                                    props.onRequistClose(false);
                                }} name="arrow-back" type="Ionicons" style={{ fontSize: 24, }}></Icon>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.headerModalText}>My Card</Text>
                            </View>
                            <View style={{ flex: 1 }}></View>

                        </View>
                        <CreditCardForm
                            LottieView={LottieView}
                            horizontalStart
                            overrides={{
                                inputLabel: {


                                },

                                input: {
                                    paddingTop: 15,
                                    paddingBottom: 15,
                                    height: 50
                                },
                            }}
                        />
                    </KeyboardAvoidingView>
                    {formState.isValid && (<View style={{
                        margin: 15
                    }}>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ ...styles.bottom }}>
                            <Text style={styles.bottomText}>{props.user.card ? "Update" : "Add Card"}</Text>
                        </TouchableOpacity>
                    </View>

                    )}</SafeAreaView >
            </Modal>

        </FormProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avoider: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,

    },
    bottom: {
        width: "100%",
        height: 50,
        borderRadius: 5,
        backgroundColor: '#711cf1',
        paddingTop: 17,
        alignSelf: "center",
    },
    bottomText: {
        alignSelf: "center",
        textAlign: "center",
        color: '#ffffff',
        color: '#000000',
        fontFamily: 'Roboto - Bold',
        fontSize: 16,
        fontWeight: '700',
        fontStyle: 'normal',
        textAlign: 'left',
        color: "white",
    },
    header: {
        paddingBottom: 21,
        display: "flex",
        flexDirection: "row",
        paddingTop: 10,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        backgroundColor: "#fff",
    },
    headerModalText: {
        flex: 1,
        color: '#000000',
        fontFamily: 'Roboto - Bold',
        fontSize: 22,
        fontWeight: '700',
        fontStyle: 'normal',
        alignSelf: "center",
        textAlign: "left"
    }
})

function mapStateToProp(state) {

    return {
        user: state.user,
        ui: state.ui
    }
};

function mspDispatchToProp() {
    return {
        UploadUserCard
        , setActivityLoader
    }
};


export default connect(mapStateToProp, mspDispatchToProp())(CardEditComponentModal)