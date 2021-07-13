import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { connect } from 'react-redux';
import { LogingOutUser } from '../../../../redux/actions/userAction'
import { t } from "../../../../languages/index";
import { Divider } from 'react-native-paper';

function LogoutModal(props) {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        setVisible(props.logoutModal)

    }, [props.logoutModal])
    const handleSureEvent = () => {

        props.onRequistClose(false);
        props.LogingOutUser(props.props);
    }
    const handleCancelEvent = () => {
        props.onRequistClose(false);
        setVisible(false)
    }
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visible}
        >
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: "center" }}>
                <View style={styles.centeredView}>
                    <Text style={styles.title}>Log out</Text>
                    <Text numberOfLines={2} style={styles.normalText}>{t("sureLogOut")}</Text>
                    <Divider></Divider>
                    <Pressable onPress={() => handleSureEvent()} style={{ ...styles.botton}}>
                        <Text style={{ ...styles.bottonText }}>{t("yes")}</Text>
                    </Pressable>
                    <Divider></Divider>
                    <Pressable onPress={() => handleCancelEvent()} style={styles.botton}>
                        <Text style={{ ...styles.bottonText}}>{t("cancel")}</Text>
                    </Pressable>
                    
                    
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        paddingTop: 18,
        width: "72.19%",
        height: 187,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        alignSelf: "center"
    },
    botton: {
        justifyContent: "center",
        height: 43,


    },
    bottonText: {
        color: '#711cf1',
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 17,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.41,
        lineHeight: 22,
    },
    bottemView: {
        marginTop: 37,
        marginLeft: 20,
        justifyContent: "space-around",
        marginRight: 20,
        flexDirection: "column"
    },
    title: {
        color: '#000000',
        fontFamily: 'SF Pro Text - Semibold',
        fontSize: 17,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.41,
        lineHeight: 22,

    },
    normalText: {
        color: '#000000',
        height:33,
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 13,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.08,
        lineHeight: 18,
        marginBottom:23,
    
    }
})

function mapStateToProp(state) {

    return {
        user: state.user,
    }
}
function mspDispatchToProp() {
    return { LogingOutUser }
}


export default connect(mapStateToProp, mspDispatchToProp())(LogoutModal)
