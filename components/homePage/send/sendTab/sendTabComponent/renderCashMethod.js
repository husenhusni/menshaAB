import { Card } from "native-base";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { sendingTransactionOrder } from "../../../../../redux/actions/transactionAction"
import { connect } from "react-redux";
import SearchInput, { createFilter } from 'react-native-search-filter';
import { TextInput } from 'react-native-paper';
import {t} from '../../../../../languages/index'
import { useFocusEffect } from "@react-navigation/native";
function RenderCashMethods(props) {
    const cities = [
        {
            "2021": 2757729,
            "name": "Addis Ababa"
        },
        {
            "2021": 252279,
            "name": "Dire Dawa"
        },
        {
            "2021": 215546,
            "name": "Mek'ele"
        },
        {
            "2021": 213995,
            "name": "Nazret"
        },
        {
            "2021": 168899,
            "name": "Bahir Dar"
        },
        {
            "2021": 153914,
            "name": "Gondar"
        },
        {
            "2021": 136056,
            "name": "Dese"
        },
        {
            "2021": 133097,
            "name": "Hawassa"
        },
        {
            "2021": 128306,
            "name": "Jimma"
        },
        {
            "2021": 104215,
            "name": "Bishoftu"
        },
        {
            "2021": 93605,
            "name": "Kombolcha"
        },
        {
            "2021": 90218,
            "name": "Harar"
        },
        {
            "2021": 86050,
            "name": "Sodo"
        },
        {
            "2021": 85871,
            "name": "Shashemene"
        },
        {
            "2021": 75963,
            "name": "Hosa'ina"
        },
        {
            "2021": 69622,
            "name": "Arba Minch"
        },
        {
            "2021": 65000,
            "name": "Adigrat"
        },
        {
            "2021": 59920,
            "name": "Debre Mark'os"
        },
        {
            "2021": 57787,
            "name": "Debre Birhan"
        },
        {
            "2021": 56821,
            "name": "Jijiga"
        },
        {
            "2021": 50078,
            "name": "Inda Silase"
        },
        {
            "2021": 49416,
            "name": "Ziway"
        },
        {
            "2021": 47021,
            "name": "Dila"
        },
        {
            "2021": 43920,
            "name": "Hagere Hiywet"
        },
        {
            "2021": 42366,
            "name": "Gambela"
        },
        {
            "2021": 41249,
            "name": "Axum"
        },
        {
            "2021": 38394,
            "name": "Waliso"
        },
        {
            "2021": 36292,
            "name": "Yirga `Alem"
        },
        {
            "2021": 34547,
            "name": "Mojo"
        },
        {
            "2021": 34369,
            "name": "Goba"
        },
        {
            "2021": 34078,
            "name": "Shakiso"
        },
        {
            "2021": 33429,
            "name": "Felege Neway"
        },
        {
            "2021": 33150,
            "name": "Areka"
        },
        {
            "2021": 32997,
            "name": "Boditi"
        },
        {
            "2021": 32659,
            "name": "Debre Tabor"
        },
        {
            "2021": 32115,
            "name": "Jinka"
        },
        {
            "2021": 31809,
            "name": "Gimbi"
        },
        {
            "2021": 30772,
            "name": "Asbe Teferi"
        },
        {
            "2021": 30633,
            "name": "Korem"
        },
        {
            "2021": 30512,
            "name": "Asosa"
        },
        {
            "2021": 30502,
            "name": "Butajira"
        },
        {
            "2021": 29648,
            "name": "Metu"
        },
        {
            "2021": 28268,
            "name": "Agaro"
        },
        {
            "2021": 27854,
            "name": "Kibre Mengist"
        },
        {
            "2021": 27186,
            "name": "Maych'ew"
        },
        {
            "2021": 26813,
            "name": "Werota"
        },
        {
            "2021": 26748,
            "name": "Dembi Dolo"
        },
        {
            "2021": 26370,
            "name": "Dubti"
        },
        {
            "2021": 25758,
            "name": "Fiche"
        },
        {
            "2021": 25614,
            "name": "K'olito"
        },
        {
            "2021": 25239,
            "name": "Mendi"
        },
        {
            "2021": 24700,
            "name": "Debark'"
        },
        {
            "2021": 24169,
            "name": "Tippi"
        },
        {
            "2021": 23861,
            "name": "Kemise"
        },
        {
            "2021": 23790,
            "name": "Asasa"
        },
        {
            "2021": 23753,
            "name": "Genet"
        },
        {
            "2021": 23463,
            "name": "Finote Selam"
        },
        {
            "2021": 23403,
            "name": "Metahara"
        },
        {
            "2021": 23116,
            "name": "Dodola"
        },
        {
            "2021": 22946,
            "name": "Addiet Canna"
        },
        {
            "2021": 22522,
            "name": "Adis Zemen"
        },
        {
            "2021": 22105,
            "name": "Hagere Maryam"
        },
        {
            "2021": 22038,
            "name": "Bure"
        },
        {
            "2021": 20679,
            "name": "Robit"
        },
        {
            "2021": 20342,
            "name": "Asaita"
        },
        {
            "2021": 20293,
            "name": "Bedele"
        },
        {
            "2021": 20166,
            "name": "Nejo"
        },
        {
            "2021": 19533,
            "name": "Sebeta"
        },
        {
            "2021": 19260,
            "name": "Bati"
        },
        {
            "2021": 18973,
            "name": "Bonga"
        },
        {
            "2021": 17872,
            "name": "Bako"
        },
        {
            "2021": 17819,
            "name": "Yabelo"
        },
        {
            "2021": 17526,
            "name": "Bedesa"
        },
        {
            "2021": 17120,
            "name": "Wenji"
        },
        {
            "2021": 16757,
            "name": "Ginir"
        },
        {
            "2021": 16583,
            "name": "Gebre Guracha"
        },
        {
            "2021": 16411,
            "name": "Bichena"
        },
        {
            "2021": 16065,
            "name": "Gelemso"
        },
        {
            "2021": 15354,
            "name": "Shambu"
        },
        {
            "2021": 15258,
            "name": "Abomsa"
        },
        {
            "2021": 14002,
            "name": "Mizan Teferi"
        },
        {
            "2021": 12945,
            "name": "Wendo"
        },
        {
            "2021": 12442,
            "name": "Huruta"
        },
        {
            "2021": 12295,
            "name": "Hirna"
        },
        {
            "2021": 11739,
            "name": "Dejen"
        },
        {
            "2021": 11544,
            "name": "Dabat"
        },
        {
            "2021": 11415,
            "name": "Awash"
        },
        {
            "2021": 11398,
            "name": "Leku"
        },
        {
            "2021": 11279,
            "name": "Gewane"
        },
        {
            "2021": 11152,
            "name": "Lalibela"
        },
        {
            "2021": 10736,
            "name": "Gidole"
        },
        {
            "2021": 10579,
            "name": "Debre Werk'"
        },
        {
            "2021": 10531,
            "name": "Tulu Bolo"
        },
        {
            "2021": 10089,
            "name": "Sirre"
        },
        {
            "2021": 9859,
            "name": "Adis `Alem"
        },
        {
            "2021": 9643,
            "name": "Kofele"
        },
        {
            "2021": 9409,
            "name": "Debre Sina"
        },
        {
            "2021": 9352,
            "name": "Gore"
        },
        {
            "2021": 8884,
            "name": "Deder"
        },
        {
            "2021": 7636,
            "name": "Were Ilu"
        },
        {
            "2021": 7499,
            "name": "Gedo"
        },
        {
            "2021": 7326,
            "name": "Sendafa"
        },
        {
            "2021": 6884,
            "name": "Mega"
        },
        {
            "2021": 5169,
            "name": "Hagere Selam"
        },
        {
            "2021": 833,
            "name": "Semera"
        }
    ]
    const [searchTerm, searchUpdated] = useState("");
    const KEYS_TO_FILTERS = ["2021", "name"]
    const [renderCity,setRenderCity]=useState(false)
    const [filteredCities,setFilterCities]=useState([{
        "2021":"",
        "name":""
    }])
    const [citySelected,setCitySelected]=useState(false)
   
    useEffect(() => {
        setFilterCities(cities.filter(createFilter(searchTerm, KEYS_TO_FILTERS)))
        if(searchTerm!="" && citySelected===false)
            setRenderCity(true)
        else
        setRenderCity(false)

    }, [searchTerm])
    useFocusEffect(
        React.useCallback(() => {
            props.sendingTransactionOrder({accountName:undefined})
            props.sendingTransactionOrder({accountNumber:undefined})
        }, [])
    );
    return (
        <View style={{...styles.container,height:renderCity?250:50}}>
            <TextInput
                onChangeText={(term) => { searchUpdated(term) }}
                style={styles.searchInput}
                value={searchTerm}
                label={t("city")}
                mode='outlined'
            />
            {renderCity===true &&<ScrollView
            style={{
                height:70,
                backgroundColor: 'white',
              }}
            contentContainerStyle={{ height: 500, backgroundColor: 'white' }}
             
            >
                {filteredCities.map(city => {
                    return (
                        <TouchableOpacity onPress={() => {
                            props.sendingTransactionOrder({ accountNumber: city.name });
                            props.sendingTransactionOrder({ accountName: "Cash-pickup" });
                            searchUpdated(city.name);

                            setCitySelected(true);
                        }} key={city[2021]} style={styles.emailItem}>
                            <View>
                                <Text>{city.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        marginLeft:15,
        marginRight:15,
        marginTop:7.5

    },
    emailItem: {
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        padding: 10
    },
    emailSubject: {
        color: 'rgba(0,0,0,0.5)'
    },
    searchInput: {
        height:50,
       
        color: '#868a9a',
        color: '#000000',
        fontFamily: 'Roboto - Regular',
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'normal',
        textAlign: 'left',
        
    }
});
function mapStateToProp(state) {
    return { transaction: state.transaction }
}
function mspDispatchToProp() {
    return { sendingTransactionOrder }
}


export default connect(mapStateToProp, mspDispatchToProp())(RenderCashMethods);