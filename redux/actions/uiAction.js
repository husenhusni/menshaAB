import {SET_ERRORS,LOADING_UI} from "../type"



export const setError=(props)=>(dispatch) =>{
    dispatch({
        type:SET_ERRORS,
        payLoad:props
    })
}
export const setActivityLoader=(props)=>(dispatch)=>{
    console.log('Just fired',props)
    dispatch({
        type:LOADING_UI,
        payLoad:props
    })

}
