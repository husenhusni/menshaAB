import { Card } from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from 'react-native';
import { sendingTransactionOrder } from "../../../../../redux/actions/transactionAction"
import { connect } from "react-redux";
import { useFocusEffect } from "@react-navigation/core";
import { TextInput } from 'react-native-paper';
import {t} from '../../../../../languages/index'

function RenderBankMethods(props) {
    useFocusEffect(
        React.useCallback(() => {

            setValue(null);
            props.sendingTransactionOrder({accountName:undefined})
            props.sendingTransactionOrder({accountNumber:undefined})
        }, [])
    );


    const [bankOpen, setBankOpen] = useState(false)
    const [bankName, setBankName] = useState([
        { label: "Dashin Bank", value: "Dashin" },
        { label: "Oromia Bank", value: "Oromia" },
        { label: "Ethipia Commertial Bank", value: "ECB" },
        { label: "Abessinia Bank", value: "Abessinia" },

    ])
    const [value, setValue] = useState(null)
    return (
        <View style={{ height: 127.5,marginLeft:15,marginRight:15}}>
            <DropDownPicker
                listMode="SCROLLVIEW"
                placeholder={t("selectMethod")}
                open={bankOpen}
                onChangeValue={(value)=>{props.sendingTransactionOrder({accountName:value})}}
                value={value}
                items={bankName}
                labelStyle={{
                fontFamily: 'Roboto - Regular',
                fontSize: 16,
                fontWeight: '400',
                fontStyle: 'normal',
                textAlign: 'left',}}
                textStyle={{
                    fontSize: 14
                  }}
                containerStyle={{alignSelf:"center",width:"100%",marginTop:7.5,marginBottom:7.5}}
                setOpen={setBankOpen}
                setValue={setValue}
                setItems={setBankName}
            />
            <TextInput onChangeText={(accountNumber) => {
            props.sendingTransactionOrder({accountNumber:accountNumber})}}
                    style={{
                        color: '#868a9a',
                        color: '#000000',
                        fontFamily: 'Roboto - Regular',
                        fontSize: 16,
                        fontWeight: '400',
                        fontStyle: 'normal',
                        textAlign: 'left',
                        marginBottom: 7.5,
                        width:"100%",
                        height: 50
                    }} label={t("accountNumber")} mode='outlined'
                    >

                </TextInput>
            


        </View>
    )


}
function mapStateToProp(state) {
    return { transaction: state.transaction }
}
function mspDispatchToProp() {
    return { sendingTransactionOrder }
}


export default connect(mapStateToProp, mspDispatchToProp())(RenderBankMethods);