import { SET_USER, ONGOING_TRANSACTION } from '../type';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setActivityLoader, setError } from './uiAction';
import { Alert } from 'react-native';
import firebase from 'firebase/app'
import "firebase/auth";


//import SyncStorage from 'sync-storage';
const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        console.log(e);
    }
}

const VarifyPhone = async (user, props) => {
    props.setActivityLoader({
        isLoading: true
    })
    const phone = user.phone_number;

    const phoneProvider = new firebase.auth.PhoneAuthProvider()

    phoneProvider.verifyPhoneNumber(
        phone,
        recaptchaVerifier.current
    ).then((verificationId) => {
        dispatch(LogingUser(verificationId, props))
    }).catch((err) => {
        console.log({ text: `Error: ${err.message}`, color: 'red' });
    })
}
const removeItemValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch (exception) {
        return false;
    }
}

const readData = async (key) => {
    AsyncStorage.getItem(key).then(value => {
        if (value !== null) {
            console.log("mhwat i saved", value)
            return value;
        }
    }).catch(e => {
        alert('Failed to fetch the data from storage');
        return e;
    })
}

export const LogingUser = (verificationId, props) => dispatch => {
    dispatch({
        type: SET_USER,
        payLoad: { "verificationId": verificationId },
    })
    props.setActivityLoader({
        isLoading: false
    })
    props.navigation.navigate('OtpInput')
   
}

export const LogingOutUser = (props) => dispatch => {
    removeItemValue('uid').then((value) => {
        if (value == true) {
            firebase.auth().signOut().then(() => {
                props.navigation.navigate('SplashScreen')
              }).catch((error) => {
                // An error happened.
              });
            
        }
    })

};

export const UserSignup = (user, props) => dispatch => {
    AsyncStorage.getItem('uid').then((value) => {
        user.uid = value.slice(1,-1);
        console.log('uid saved', user.uid)
        axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/signup', user).then((result) => {
            if (result.status == 200) {
                dispatch(getUserData(props))
            }

        }).catch((error) => {
            props.setActivityLoader({
                isLoading: false
            })
            setTimeout(() => {
                Alert.alert(
                    "Error Signing up",
                    error,
                    [
                        { text: "OK", onPress: () => props.navigation.navigate("Login") }
                    ]
                );
            })

        });

    })
}


export const UploadUserCard = (props) => dispatch => {
    console.log("card from card librabty", props)
    const cardData = {
        "card": {
            cardNumber: props.model.cardNumber,
            cvv: props.model.cvv,
            expiration: props.model.expiration,
            holderName: props.model.holderName,
            cardType: props.cardType
        }
    };
    axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/user/upload_card_info', cardData).then(result => {
        if (!result.error) {
            dispatch({
                type: SET_USER,
                payLoad: result.data,
            });
            props.setActivityLoader({
                isLoading: false
            });
            props.onRequistClose(false);
        }

    })


}

export const UploadUserAddress = (props) => dispatch => {
    setActivityLoader({
        isLoading: true
    });
    const AddressData = { "address": props.userAddress }
    axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/user/upload_address_info', AddressData).then(result => {
        if (!result.error) {
            console.log("address fitched", result.data)
            dispatch({
                type: SET_USER,
                payLoad: result.data,
            });
            setActivityLoader({
                isLoading: false
            });
            props.onRequistClose(false);
        }

    })




}

export const OtpVertification = (authResult, props) => dispatch => {
    const user = authResult.user;
    console.log('user', user)
    storeData('uid', user.uid).then(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.uid}`;
        dispatch(getUserData(props));
    })

    /* previous 
    readData('phone').then(phone => {
        userData = {
            ...userData,
            ...props.user.phone
        }
        axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/OtpVertification', userData)
            .then(result => {
                const FBIdToken = `Bearer ${result.data.Token}`
                storeData("Token", FBIdToken);
                axios.defaults.headers.common['Authorization'] = FBIdToken;
                dispatch(getUserData(props));
 
 
                if (result.status === "ERROR") {
                    console.log({
                        message: result.message,
                        reason: result.reason
                    })
                }
            }).catch((error) => {
                console.log(error);
            })
    });*/
};

export const getUserData = (props) => (dispatch) => {
    axios.get('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/user/home').then(result => {
        console.log("user data is",result.data)
        dispatch({
            type: SET_USER,
            payLoad: result.data,
        })
        dispatch(setActivityLoader({
            isLoading: false
        }))
        props.navigation.navigate("HomeDrawer");
    }).catch(error => {
        console.log("here",error)
        if (error.response) {
            if (error.response.status === 404) {
                dispatch(setActivityLoader({
                    isLoading: false
                }))
                props.navigation.navigate("Register")
            }
        }
    })


}

export const uploadExpoPushToken = (expoToken) => dispatch => {
    console.log("uploading expo")
    readData('expoToken').then(savedExpoToken => {
        const payLoad = {
            'expoPushToken': expoToken
        }
        console.log("my payload", payLoad)
        axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/user/push_notification', payLoad)
            .then(result => {
                console.log(result)

            }).catch((error) => {
                console.log(error)
            });

    })

}

export const saveExpoPushToken = (expoToken) => dispatch => {
    console.log("hi myn", expoToken)
    dispatch(uploadExpoPushToken(expoToken))
    readData('expoToken').then(savedExpoToken => {
        if (savedExpoToken != expoToken) {
            console.log('found new token');
            storeData('expoToken', expoToken).then(() => {
                dispatch({
                    type: SET_USER,
                    payLoad: { "newExpoToken": expoToken },
                })


            })
        }
    })


}
export const downloadOngoingTransaction = () => dispatch => {
    dispatch({
        type: ONGOING_TRANSACTION,
        payLoad: { "transactionUploaded": true }
    })

};