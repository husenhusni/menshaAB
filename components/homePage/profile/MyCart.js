
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import numbro from 'numbro';
import { Divider } from 'react-native-paper';
import ContactModal from './SettingModal/ContactModal';
import LogoutModal from './SettingModal/LogoutModal';
import WalletModal from './SettingModal/WalletModal';
import AddressModal from './SettingModal/AddressModal';
import SettingModal from './SettingModal/SettingModal';
import { t } from '../../../languages/index';
import { connect } from 'react-redux';


function Profile(props) {
    const [contactModal, setContactModal] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [settingModal, setSettingModal] = useState(false);

   /* etracted from return because of non usablity
   <WalletModal walletModal={walletModal} onRequistClose={(boolValue) => setWalletModal(boolValue)} />
    <AddressModal addressModal={addressModal} onRequistClose={(boolValue) => setAddressModal(boolValue)}></AddressModal>
    
    
    <TouchableOpacity onPress={() => setWalletModal(true)} style={{ ...styles.menuentry, height: 40 }}>
                    <View style={{ backgroundColor: "#711cf1", width: 28, height: 28, borderRadius: 5, borderColor: "#711cf1", borderWidth: 1, justifyContent: "center", alignSelf: "center" }}>
                        <Icon style={{ color: "#fff", fontSize: 18, textAlign: "center" }} name="wallet" type="Entypo"> </Icon>
                    </View>
                    <Text style={styles.normalText}>Wallet</Text>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Icon style={{ fontSize: 18, color: "#444", textAlign: "right" }} name="right" type="AntDesign"></Icon>
                    </View>
                </TouchableOpacity>
                <Divider></Divider>
                <TouchableOpacity onPress={() => setAddressModal(true)} style={{ ...styles.menuentry, height: 40 }}>
                    <View style={{ backgroundColor: "#711cf1", width: 28, height: 28, borderRadius: 5, borderColor: "#711cf1", borderWidth: 1, justifyContent: "center", alignSelf: "center" }}>
                        <Icon style={{ color: "#fff", fontSize: 18, textAlign: "center" }} name="address" type="Entypo"> </Icon>
                    </View>
                    <Text style={styles.normalText}>Billing Address</Text>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Icon style={{ fontSize: 18, color: "#444", textAlign: "right" }} name="right" type="AntDesign"></Icon>
                    </View>
                </TouchableOpacity>
                <Divider></Divider>*/
    return (
        <View style={{ display: "flex", flex: 1 }}>
            <ContactModal contactModal={contactModal} onRequistClose={(boolValue) => setContactModal(boolValue)} />
            <LogoutModal {...{ "logoutModal": logoutModal, ...props }} onRequistClose={(boolValue) => setLogoutModal(boolValue)} />
            <SettingModal settingModal={settingModal} onRequistClose={(boolValue) => setSettingModal(boolValue)}></SettingModal>
            <View style={{ flex: 1, paddingTop: 40, backgroundColor: '#711cf1', flex: 3 }}>
                <Icon style={{ fontSize: 89, textAlign: "center", color: "white" }} name="account-circle" type="MaterialIcons"></Icon>
                <Text style={styles.headerText}>{props.user.userData.first_name} {props.user.userData.last_name}</Text>
                <Text style={styles.subHeaderText}>{props.user.userData.phone_number}</Text>
            </View>
            <View style={{ flex: 7 }}>
                
                <TouchableOpacity onPress={() => setSettingModal(true)} style={{ ...styles.menuentry, height: 40 }}>
                    <View style={{ backgroundColor: "#711cf1", width: 28, height: 28, borderRadius: 5, borderColor: "#711cf1", borderWidth: 1, justifyContent: "center", alignSelf: "center" }}>
                        <Icon style={{ color: "#fff", fontSize: 18, textAlign: "center" }} name="ios-settings-sharp" type="Ionicons"> </Icon>
                    </View>
                    <Text style={styles.normalText}>{t("setting")}</Text>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Icon style={{ fontSize: 18, color: "#444", textAlign: "right" }} name="right" type="AntDesign"></Icon>
                    </View>
                </TouchableOpacity>

                <Divider></Divider>
                <TouchableOpacity onPress={() => setLogoutModal(true)} style={{ ...styles.menuentry, height: 40 }}>
                    <View style={{ backgroundColor: "#711cf1", width: 28, height: 28, borderRadius: 5, borderColor: "#711cf1", borderWidth: 1, justifyContent: "center", alignSelf: "center" }}>
                        <Icon style={{ color: "#fff", fontSize: 18, textAlign: "center" }} name="logout" type="AntDesign"> </Icon>
                    </View>
                    <Text style={styles.normalText}>{t("logOut")}</Text>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Icon style={{ fontSize: 18, color: "#444", textAlign: "right" }} name="right" type="AntDesign"></Icon>
                    </View>
                </TouchableOpacity>

                <Divider></Divider>
                <TouchableOpacity onPress={() => setContactModal(true)} style={{
                    ...styles.menuentry, height: 40, shadowColor: 'rgba(0, 0, 0, 0.29)',
                    shadowOffset: { width: 6, height: 1 },
                    shadowRadius: 14,
                }}>
                    <View style={{ backgroundColor: "#711cf1", width: 28, height: 28, borderRadius: 5, borderColor: "#711cf1", borderWidth: 1, justifyContent: "center", alignSelf: "center" }}>
                        <Icon style={{ color: "#fff", fontSize: 18, textAlign: "center" }} name="phone" type="Feather"> </Icon>
                    </View>
                    <Text style={styles.normalText}>{t("contactUs")}</Text>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Icon style={{ fontSize: 18, color: "#444", textAlign: "right" }} name="right" type="AntDesign"></Icon>
                    </View>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text style={styles.subTitle}>Version:1.0.0</Text>
                </View>

            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    header: {
        paddingBottom: 21,
        display: "flex",
        flexDirection: "row",
        paddingTop: 10,
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        backgroundColor: "#fff",
        marginLeft: 15,
        marginRight: 15
    },
    contactModalContect: {

    },
    title: {
        color: '#000000',
        fontFamily: 'Roboto - Regular',
        fontSize: 18,
        fontWeight: '400',
        fontStyle: 'normal',

    },
    subHeaderText:{
        color: '#fff',
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 13,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.08,
        lineHeight: 18,
        },
    underTitle: {
        color: '#444',
        fontFamily: 'Roboto - Regular',
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal',
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
    subTitle: {
        height: 19,
        color: '#273435',
        marginTop: 7.5,
        marginBottom: 7.5,
        fontFamily: 'Roboto - Medium',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        textAlign: "center",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    menuentry: { backgroundColor: "#fff", width: "100%", alignContent: "center", paddingLeft: 15, paddingRight: 15, flexDirection: "row" },
    footer: {
        marginTop: 37.5,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 7.5,
        marginTop: 7.5,
        flex: 1,
    },
    iconContainer: {
        width: 44,
        marginTop: 7.5,
        marginBottom: 7.5,
        height: 44,
        backgroundColor: '#15294b',
        alignSelf: "center"
    },
    headerText: {
        color: '#fff',
        fontFamily: 'SF Pro Display - Bold',
        fontSize: 28,
        fontWeight: '700',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: 0.34,
        lineHeight: 34,

    },
    normalText: {
        color: '#000000',
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 17,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'left',
        letterSpacing: -0.41,
        lineHeight: 22,
        marginLeft: 15,
        alignSelf:"center"

    },
    cardLog: {
        marginTop: 7.5,
        flex: 1,
        paddingLeft: 10,
        height: 70,
        paddingTop: 7.5,
        paddingBottom: 7.5,
        borderRadius: 7.5,
        flexDirection: "row",

    }
})

function mapStateToProp(state) {
    return {
      user:state.user
    }
  }
  export default connect(mapStateToProp)(Profile);
