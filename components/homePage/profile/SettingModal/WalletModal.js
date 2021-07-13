import { Card, Text, Icon } from 'native-base';
import React, { useState } from 'react';
import {
    Image, Modal,StyleSheet, TouchableOpacity, View, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { UploadUserCard } from '../../../../redux/actions/userAction';
import { useForm } from 'react-hook-form'
import CardEditComponentModal from '../../../../CardEditComponentModal';


function WalletModal(props) {
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
    const [editCardMOdal, setEditCardMOdal] = useState(false)
    const [addNewCard, setAddNewCard] = useState(false)



    return (

        <Modal
            animationType="none"
            transparent={false}
            visible={props.walletModal}
        >
            <SafeAreaView>
                {editCardMOdal == true &&
                    <CardEditComponentModal onRequistClose={(boolValue) => setEditCardMOdal(boolValue)} />
                }
                {addNewCard == true &&
                    <CardEditComponentModal onRequistClose={(boolValue) => setAddNewCard(boolValue)} />}
                <View  >
                    <View>
                        <View style={{ ...styles.header, width: "100%", marginBottom: 30, marginRight: 15, flexDirection: "row" }}>
                            <View >
                                <Icon onPress={() => {
                                    props.onRequistClose(false);
                                }} name="arrow-back" type="Ionicons" style={{ fontSize: 24, }}></Icon>
                            </View>
                            <View style={{ flex: 1, marginRight: 24 }}>
                                <Text style={styles.headerModalText}>My Card</Text>
                            </View>


                        </View>

                        {props.user.card == undefined &&
                            <View style={{ marginRight: 15, marginLeft: 15 }}>
                                <Card style={styles.cardContainer}>
                                    <Text style={styles.cardHeader}>Pay Faster</Text>
                                    <Text style={styles.normalText}>Upload your credit card details or debit and save time when you want to pay.</Text>

                                </Card>
                                <TouchableOpacity onPress={() => setAddNewCard(true)} style={styles.bottom}>
                                    <Text style={styles.bottomText}>Add New Card</Text>
                                </TouchableOpacity>

                            </View>
                        }
                        
                    </View>




                </View>


            </SafeAreaView>
        </Modal>


    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avoider: {
        flex: 1,
        padding: 36,
    },
    button: {
        margin: 36,
        marginTop: 0,
    },
    header: {
        paddingBottom: 21,
        display: "flex",
        flexDirection: "row",
        paddingTop: 10,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        paddingLeft: 15,
        paddingRight: 15
    },
    headerModalText: {

        flex: 1,
        color: '#000000',
        fontFamily: 'Roboto - Bold',
        fontSize: 22,
        fontWeight: '700',
        fontStyle: 'normal',
        alignSelf: "center",
    },
    cardContainer: {
        paddingRight: 56,
        paddingTop: 35,
        paddingLeft: 43,
        paddingRight: 43,
        width: "100%", height: 170, shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 6, height: 0 },
        shadowRadius: 14,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginBottom: 7.5
    },
    bottom: {
        marginTop: 7.5,
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
    cardHeader: {
        color: '#000000',
        fontFamily: 'Roboto - Bold',
        fontSize: 18,
        fontWeight: '700',
        fontStyle: 'normal',
        textAlign: 'center',
        marginBottom: 7.5
    },
    normalText: {
        marginTop: 7.5,
        color: '#000000',
        fontFamily: 'Roboto - Regular',
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'center',

    }
})

function mapStateToProp(state) {

    return { user: state.user }
};

function mspDispatchToProp() {
    return { UploadUserCard }
};


export default connect(mapStateToProp, mspDispatchToProp())(WalletModal)