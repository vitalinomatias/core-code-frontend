import {SET_SHOW, SET_ACTIONFORM } from "./type"

export const setShow = (show) => {
    return {
        type: SET_SHOW, 
        payload: show
    }
}

export const setActionForm = (actionForm) =>{
    return {
        type: SET_ACTIONFORM,
        payload: actionForm
    }
}