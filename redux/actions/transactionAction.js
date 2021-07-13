
import axios from 'axios';
import { Alert } from 'react-native';
import { ONGOING_TRANSACTION, SET_Qoute, SET_TRANSACTION, COMPLETE_TRANSACTION } from '../type';
import { setActivityLoader, setError } from './uiAction';
import { t } from "../../languages/index";



export const uploadTransactionOrder = (transactionData, props) => dispatch => {
    console.log("going to fitch item id", transactionData)
    axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/user/add_to_bucket',
        transactionData).then(result => {
            if (result.data.item_id) {
                props.setActivityLoader({
                    isLoading: false
                })
                const transactionPayLoad={
                    ...transactionData,
                    item_id : result.data.item_id,
                    paymentIntent : result.data.paymentIntent,
                    ephemeralKey: result.data.ephemeralKey,
                }

                dispatch({
                    type: SET_TRANSACTION,
                    payLoad: transactionPayLoad
                })
                props.navigation.navigate(t("review"));
            }
            if (result.data.statusCode == 400) {
                props.setActivityLoader({
                    isLoading: false
                })
                setTimeout(() => Alert.alert('Error 400', 'Internal Eror have occured, please try again later', [
                    {
                        text: "go back home",
                        onPress: () => { props.navigation.navigate("HomeDrawer") },
                        style: "cancel",

                    },
                ], { cancelable: true }), 0);

            }
        }).catch(error => {
            console.log("item id: fetch erros", error);
        })
}
export const sendingTransactionOrder = (transactionData) => dispatch => {
    dispatch({
        type: SET_TRANSACTION,
        payLoad: transactionData
    })

}
export const qoutaInputDataSaver = (qoutaInputData) => dispatch => {
    dispatch({
        type: SET_Qoute,
        payLoad: qoutaInputData
    })

}
export const completeTransactionOrder = (props) => dispatch => {
    axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/user/charge-payment', {
        cardInfo: props.cardData
    })
        .then(result => {
            console.log("Pure result", result)

            if (result.data.status === "succeeded") {
                dispatch({
                    type: COMPLETE_TRANSACTION,
                    payLoad: {
                        cardInfo: {
                            ...transactionData,
                            "transactionPaid": true
                        }
                    }
                })
                props.navigation.navigate("SuccessPayment")

            }
            else if (result.data.statusCode === 400) {
                props.setActivityLoader({
                    isLoading: false
                })
                props.navigation.navigate("FailedPayment")
            }
            else {
                console.log("UNcatched error code", result)
            }


        }).catch((error) => {
            props.props.setActivityLoader({
                isLoading: false
            })
            props.navigation.navigate("FailedPayment")
        })

};

