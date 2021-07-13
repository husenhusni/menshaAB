import { Text, View, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import React, { useState } from "react";
import { Icon } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';
import { t } from '../../../../languages/index';
import i18n from '../../../../languages/index';
function SettingModal(props) {
    const [state, setstate] = useState(false)
    const [languageOpen, setLanguageOpen] = useState(false)
    const [languageName, setLanguageName] = useState([
        { label: "English", value: "en" },
        { label: "Svenska", value: 'sv' },


    ])
    const [value, setValue] = useState("en")

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.settingModal}
        ><SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1,marginTop: 8,backgroundColor: '#efeff4',borderTopLeftRadius: 10,borderTopRightRadius: 10,borderWidth: 1, borderColor:'rgba(249, 249, 249, 1)'}}>
                    <View style={styles.header}>
                        <View style={{flex:1}} ></View>
                        <View style={{ flex: 1,height:22}}>
                            <Text style={styles.headerModalText}>{t("setting")}</Text>
                        </View>
                        <View style={{flex:1,justifyContent:"flex-end",paddingRight:16}}>
                        <TouchableOpacity style={{flex:1}} onPress={() => { props.onRequistClose(false); }}  >
                            <Text style={styles.headerRightText}> Done</Text>
                        </TouchableOpacity>
                        </View>


                    </View>
                    <View style={{ paddingLeft: 15, paddingRight: 15,marginTop:20}}>
                        <Text style={styles.subTitile} >{t("language")}</Text>
                        <Text style={styles.normalText}>{t("selectLanguage")}</Text>

                        <DropDownPicker

                            open={languageOpen}
                            value={value}
                            items={languageName}
                            onChangeValue={(value)=>{i18n.locale=value.toString();
                                setstate(!state)}}
                            labelStyle={{
                                color: 'rgba(60, 60, 67, 0.6)',
                                fontFamily: 'SF Pro Text - Regular',
                                fontSize: 15,
                                fontWeight: '400',
                                fontStyle: 'normal',
                                textAlign: 'left',
                                letterSpacing: -0.24,
                                lineHeight: 18,
                                                        }}
                            textStyle={{
                                color: 'rgba(60, 60, 67, 0.6)',
                                fontFamily: 'SF Pro Text - Regular',
                                fontSize: 15,
                                fontWeight: '400',
                                fontStyle: 'normal',
                                textAlign: 'left',
                                letterSpacing: -0.24,
                                lineHeight: 18,
                            }}
                            containerStyle={{ alignSelf: "center", width: "100%", marginTop: 7.5, marginBottom: 7.5 }}
                            setOpen={setLanguageOpen}
                            setValue={setValue}
                            setItems={setLanguageName}
                        />
                    </View>
                </View>
            </SafeAreaView>




        </Modal >
    )

}
const styles = StyleSheet.create({
    inputMoney: { width: "100%", alignSelf: "center", fontSize: 16, marginBottom: 7.5, marginTop: 7.5, height: 50 },
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
    headerModalText: {
        flex: 1,
        color: '#000000',
        fontFamily: 'SF Pro Text - Semibold',
        fontSize: 17,
        fontWeight: '600',
        fontStyle: 'normal',
        alignSelf: "center",
        letterSpacing: -0.41,
        lineHeight: 22
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
    normalText: {
        color: 'rgba(60, 60, 67, 0.6)',
        fontFamily: 'SF Pro Text - Regular',
        fontSize: 15,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'left',
        letterSpacing: -0.24,
        lineHeight: 18,
        marginBottom: 7.5
    },
    subTitile: {
        color: '#000000',
        fontFamily: 'SF Pro Text - Semibold',
        fontSize: 17,
        fontWeight: '600',
        fontStyle: 'normal',
        textAlign: 'left',
        letterSpacing: -0.41,
        lineHeight: 22,
        marginBottom: 7.5
    }



})
export default SettingModal
