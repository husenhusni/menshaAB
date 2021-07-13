import { Card, View,Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { t } from "../languages/index";
function FailedPayment(props) {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        setModalVisible(true)
    }, [])
    return(
        <SafeAreaView >
            <View style={{display:"flex",flex:1,marginTop:150}}>
            <Modal
            style={{display:'flex',flex:1}}
        animationType='slide'
        transparent={false}
        visible={modalVisible}
        
      >
            <Card style={styles.boxStatus} >
                <View style={styles.imageHolder}>
                </View>
                <Text style={{...styles.text,marginBottom:1}}>{t("rejected")}</Text>
                <Text style={{...styles.timeText,marginBottom:12}}> 12 June, 2020 , 12:30 AM</Text>
                <Text style={{...styles.normaltext}}> {t("paymentRejected")}</Text>
                <Text style={styles.normaltext}>{t("thankYou")}</Text>
            </Card>
        <TouchableOpacity
              style={styles.button}
              onPress ={() => {setModalVisible(!modalVisible)}
            }
            >
              <Text style={styles.textButton}>{t("headToHome")}</Text>
            </TouchableOpacity>
        </Modal>
        
            </View>
           </SafeAreaView >


    )
    
}
const styles=StyleSheet.create({
    topBar:{
        backgroundColor:"black",
        height:70,
    },
    imageHolder:{
        width: 43,
        height: 43,
        backgroundColor: 'red',
        borderRadius:43,
        marginTop:30,
        alignSelf:'center'
    },
    text:{
        color: '#000000',
        fontFamily: 'SF Pro Text - Semibold',
        fontSize: 17,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.41,
        lineHeight: 22,
    },
    boxStatus:{
        display:'flex',
        flexDirection:'column',
        marginTop:36,
        marginLeft:30,
        marginRight:30,
        height: 202,
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 6, height: 0 },
        shadowRadius: 14,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    button: {
        width: 315,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#711cf1',
        marginBottom:20,
        paddingTop:17,
        alignSelf:"center" ,
        marginTop:15
      },
      TimeText:{
        color: 'rgba(60, 60, 67, 0.6)',
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 15,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.24,
        lineHeight: 18,
    },
    normaltext:{
        color: '#000000',
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 13,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'center',
        letterSpacing: -0.08,
        lineHeight: 18,
    },
    textButton:{
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
    return { transaction: state.transaction }
}



export default connect(mapStateToProp)(FailedPayment)