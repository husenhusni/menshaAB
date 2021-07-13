import React,{ useEffect, useState } from "react";
import { Alert } from "react-native";
import CountryPicker, { CountryModalProvider } from 'react-native-country-picker-modal';


function CountryCodeRenderer(props) {
    const [countryCodePicker, setCountryCodePicker] = useState({
        country: undefined,
        countryCode: "ET"
    });
    useEffect(() => {
       if(props.countryCode){
        setCountryCodePicker({...countryCodePicker,countryCode:props.countryCode})
    }
    }, [])
    

    const onSelect = (country) => {
        if(country.cca2!="ET"){
        
            Alert.alert("Invalid Country code","only Ethiopian phone number is allowed",[{text:'ok'}])
        }
    }
    return(
        <CountryPicker {...{
            withModal: "true", countryCode: countryCodePicker.countryCode,
            withFlagButton: "true", withCallingCodeButton:"true" ,withCloseButton: "true", withFilter: "true", withAlphaFilter: "true", withEmoji: "true", withFlag: "false", withAlphaFilter: "true", visible: "true",
            
         containerButtonStyle:{paddingTop:10,borderWidth:1,borderColor:'grey',borderRadius:5,height:52, paddingBottom:10,paddingRight:5,marginTop:5, marginRight:10}}}  onSelect={(country) => onSelect(country)} />
    )
    
}
export default CountryCodeRenderer