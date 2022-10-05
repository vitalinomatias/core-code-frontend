import { SET_SHOW, SET_ACTIONFORM} from "../actions/type";


const initialState = {
    request: [],
    show: false,
    actionForm: ''
}

export const appReducer = (state=initialState, action) => {
    switch (action.type) {

        case SET_SHOW:
            return{
                ...state,
                show:action.payload
            }
        
        case SET_ACTIONFORM:
            return {
                ...state,
                actionForm: action.payload
            }
    
        default:
            return state
    }
}