import React, { useEffect, useState } from "react";
import { Text, View, Modal, StyleSheet, TouchableOpacity,Image } from "react-native";
import { Card, Icon } from 'native-base';
import { Divider } from "react-native-elements/dist/divider/Divider";
import { SafeAreaView } from "react-native-safe-area-context";
import { t } from '../../../../languages/index'
import { Linking } from 'react-native'
import { connect } from "react-redux";

function ContactModal(props) {
    const [contactModal, setContactModal] = useState(false);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.contactModal}>
            <SafeAreaView style={{ flex: 1 }} >
                <View style={{ flex: 1,marginTop: 8,backgroundColor: '#efeff4',borderTopLeftRadius: 10,borderTopRightRadius: 10,borderWidth: 1, borderColor:'rgba(249, 249, 249, 1)'}}>
                    <View style={{ ...styles.header }}>
                        <View style={{flex:1}}></View>
                        <View style={{flex:1,height:22 }}>
                            <Text style={styles.headerModalText}>{t("contactUs")}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:"flex-end",paddingRight:16}}>
                        <TouchableOpacity style={{flex:1}} onPress={() => { props.onRequistClose(false); }}  >
                            <Text style={styles.headerRightText}> Done</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.contactModalContect}>
                        <Text style={{ ...styles.subHeader, marginLeft: 15, marginRight: 15, marginBottom: 7.5 }}>{t("contactAddress")}</Text>
                        <Divider></Divider>
                        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${props.user.appData.contact.email}?subject=Customer Service`) } title="support@example.com" style={styles.menuentry}>
                            <Icon style={{ alignSelf: "center", flex: 1 }} name="email" type="Fontisto"> </Icon>
                            <View style={{ flex: 7,flexDirection:"row",justifyContent:'space-between'}}>
                                <View> 
                                    <Text style={styles.title}>{t("email")}</Text>
                                    <Text style={styles.underTitle}>{props.user.appData.contact.email}</Text>
                                </View>
                                <View style={{justifyContent:"center"}}>
                                    <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../../../../assets/images/arrow-right.png")}></Image>
                                </View>
                                </View>
                        </TouchableOpacity>
                        <Divider></Divider>
                        <TouchableOpacity onPress={() => {Linking.openURL(`http://api.whatsapp.com/send?phone=${props.user.appData.contact.whatsApp}`);}} style={styles.menuentry}>
                            <Icon style={{ alignSelf: "center", flex: 1 }} name="whatsapp" type="FontAwesome"> </Icon>
                            <View style={{ flex: 7,flexDirection:"row",justifyContent:'space-between' }}>
                                <View>
                                    <Text style={styles.title}>Whatsapp</Text>
                                    <Text style={styles.underTitle}>{props.user.appData.contact.whatsApp}</Text>
                                </View>
                                <View style={{justifyContent:"center"}}>
                                    <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../../../../assets/images/arrow-right.png")}></Image>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Divider></Divider>
                        <TouchableOpacity onPress={() => {Linking.openURL(`tel:${props.user.appData.contact.directPhone}`);}} style={styles.menuentry}>
                            <Icon style={{ alignSelf: "center", flex: 1 }} name="phone" type="Feather"> </Icon>
                            <View style={{ flex: 7,flexDirection:"row",justifyContent:'space-between'}}>
                                <View>
                                    <Text style={styles.title}>{t("phone")}</Text>
                                    <Text style={styles.underTitle}>{props.user.appData.contact.directPhone}</Text>
                                </View>
                                <View style={{justifyContent:"center"}}>
                                    <Image style={{width:24,height:24,alignSelf:'center'}} source={require("../../../../assets/images/arrow-right.png")}></Image>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Divider></Divider>
                    </View>

                </View>

            </SafeAreaView>
        </Modal>


    )
}
const styles = StyleSheet.create({

    contactModalContect: {
        marginTop:20},
    subHeader: {
        color: '#000000',
        fontFamily: 'SF Pro Display - Regular',
        fontSize: 20,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'left',
        letterSpacing: 0.38,
        lineHeight: 25, 
        marginBottom: 7.5
    },
    title: {
        color: '#000000',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 17,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    letterSpacing: -0.41,
    lineHeight: 22,

    },
    underTitle: {
        color: 'rgba(60, 60, 67, 0.6)',
    fontFamily: 'SF Pro Text - Regular',
    fontSize: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    textAlign: 'left',
    letterSpacing: -0.24,
    lineHeight: 18,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        height: 56,
        flexDirection: "row",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderColor:'rgba(249, 249, 249, 1)',
        backgroundColor: 'rgba(249, 249, 249, 1)',
        paddingTop: 16,
        paddingBottom: 18,
    },
    headerRightText:{
        color: '#711cf1',
        fontFamily: 'SF Pro Text - Semibold',
        fontSize: 17,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'right',
        letterSpacing: -0.41,
        lineHeight: 22,
    },
    headerModalText: {
        color: '#000000',
        fontFamily: 'SF Pro Text - Semibold',
        fontSize: 17,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.41,
        lineHeight: 22,
        textAlign:"center"
    },
    menuentry: { paddingTop: 7.5, paddingBottom: 7.5, backgroundColor: "#fff", width: "100%", paddingLeft: 15, paddingRight: 15, flexDirection: "row" },

})
function mapStateToProp(state) {
    return {
      user:state.user
    }
  }
  export default connect(mapStateToProp)(ContactModal);

