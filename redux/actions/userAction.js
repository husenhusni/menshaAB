import {SET_USER, SET_ERRORS, LOADING_UI} from '../type';
import axios from 'axios';
//import SyncStorage from 'sync-storage';



export const LogingUser = ( userData, props) => dispatch =>{
        console.log("user action dispatch is being fired");
        dispatch({type:LOADING_UI});    
        axios.post('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/login',userData).then(result =>{
        console.log(result.data);

        const FBIdToken = `Bearer ${result.data.token}`
       // SyncStorage.set('FBIdToken', FBIdToken);
        axios.defaults.headers.common['Authorization']=FBIdToken;
        dispatch(getUserData());
        console.log(userData);
        props.navigation.navigate("HomeDrawer");
    }).catch((error)=>{
        console.log(error);
        dispatch({type:SET_ERRORS,payLoad:{
            error:error,
        }})
    });
}

export const getUserData=()=>(dispatch) =>{
    axios.get('https://europe-west1-mysehelling-backend.cloudfunctions.net/api/user/home').then(result =>{
        dispatch({
            type:SET_USER,
            payLoad:result.data,
        })
    }).catch(error=>{
        console.log(error);
    })

}