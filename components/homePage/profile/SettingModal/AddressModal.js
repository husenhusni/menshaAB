import { Text, View, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import CountryPicker, { CountryModalProvider } from 'react-native-country-picker-modal';
import React, { useEffect, useState } from "react";
import { TextInput } from 'react-native-paper';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { UploadUserAddress } from '../../../../redux/actions/userAction';
function AddressModal(props) {
    const [countryCodePicker, setCountryCodePicker] = useState("SE"
    );
    const [userAddress, setUserAddress] = useState({
        address: '',
        apartment: '',
        city: '',
        zipcode: '',
        country: ''
    })
    const onHandleSubmit = () => {
        props.UploadUserAddress({ userAddress, ...props })

    }
    useEffect(() => {
        if (props.user.address)
            setUserAddress(props.user.address)
    }, [props.user.address])
    return (
        <Modal
            animationType="none"
            transparent={false}
            visible={props.addressModal}
        ><SafeAreaView style={{ flex: 1 }}>


                <View style={{ flex: 1, backgroundColor: "#fff", }}>
                    <View style={{ ...styles.header, width: "100%", marginBottom: 30, marginRight: 15, flexDirection: "row" }}>
                        <View >
                            <Icon onPress={() => {
                                props.onRequistClose(false);
                            }} name="arrow-back" type="Ionicons" style={{ fontSize: 24, }}></Icon>
                        </View>
                        <View style={{
                            flex: 1, marginRight: 24
                        }}>
                            <Text style={styles.headerModalText
                            } > Billing Address</Text>
                        </View>



                    </View>
                    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                        <TextInput style={{ ...styles.inputMoney, marginTop: 7.5 }} onChangeText={(address) => { setUserAddress({ ...userAddress, address: address }) }} placeholder="Example: Galiles Gatan 2" mode='outlined' keyboardType="name-phone-pad" value={userAddress.address} autoCompleteType="street-address" label="Address"></TextInput>
                        <TextInput style={{ ...styles.inputMoney }} mode='outlined' placeholder="Example: 1602" keyboardType="name-phone-pad" onChangeText={(apartment) => { setUserAddress({ ...userAddress, apartment: apartment }) }} autoCompleteType="street-address" value={userAddress.apartment} label="Apartment/suit"></TextInput>
                        <TextInput style={{ ...styles.inputMoney }} mode='outlined' placeholder="Example: Göteborg" keyboardType="name-phone-pad" onChangeText={(city) => { setUserAddress({ ...userAddress, city: city }) }} autoCompleteType="street-address" value={userAddress.city} label="City"></TextInput>
                        <View style={{ display: "flex", flexDirection: "row", height: 50 }}>
                            <TextInput style={{ ...styles.inputMoney, width: 90, marginTop: 0, alignSelf: 'flex-start' }} onChangeText={(zipcode) => { setUserAddress({ ...userAddress, zipcode: zipcode }) }} mode='outlined' keyboardType="number-pad" autoCompleteType="postal-code" value={userAddress.zipcode} label="Zip code" ></TextInput>
                            <View style={{ paddingLeft: 10, marginLeft: 15, marginTop: 7.5, flex: 1, borderColor: "grey", borderWidth: 1, borderRadius: 2, height: 50, justifyContent: "center", width: "100%", borderColor: "grey" }}>
                                <CountryPicker {...{
                                    countryCode: countryCodePicker, withCountryNameButton: true, withCloseButton: "true", withFilter: "true", withFlagButton: false
                                }} containerButtonStyle={{}} onSelect={(country) => {
                                    setCountryCodePicker(country.cca2);
                                    setUserAddress({ ...userAddress, country: countryCodePicker })
                                }} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => onHandleSubmit()} style={
                            { paddingBottom: 15, paddngLeft: 15, width: "100%", marginTop: 22.5, paddingRight: 15, backgroundColor: '#7E8481', borderRadius: 10, }}>
                            <Text style={{ marginTop: 15, fontSize: 16, textAlign: "center", color: 'white' }}>Add Address
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </Modal >
    )

}
const styles = StyleSheet.create({
    inputMoney: { width: "100%", alignSelf: "center", fontSize: 16, marginBottom: 7.5, marginTop: 7.5, height: 50 },
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

})
function mapStateToProp(state) {

    return { user: state.user }
};

function mspDispatchToProp() {
    return { UploadUserAddress }
};


export default connect(mapStateToProp, mspDispatchToProp())(AddressModal)
