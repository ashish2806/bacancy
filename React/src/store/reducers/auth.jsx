import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    address : null,
    message :null,
    show_address : false
};

const authStart = ( state, action ) => {
    return updateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    console.log('=====> 1.2');
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null});
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path});
}

const registerFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const fetchaddress = (state ,action )=>{
    return updateObject(state, {
        error: null,
        address: action.address,
        show_address : false
    }); 
}
const failaddress = (state ,action )=>{
    return updateObject(state, {
        error: true,
        address:null,
        message : action.error
    }); 
}

const showaddress = (state ,action ) =>{
    return updateObject(state, {
       show_address : action.data
    }); 
}

const save_AddressFail = (state,action) =>{
    
    return updateObject(state, {
        error: "failed",
        address:null,
     }); 
}
const reducer = (state = initialState, action) => {
    
    console.log('type => '+action.type);

    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action); 
        case actionTypes.GERISTER_FAIL: return registerFail(state, action); 
        case actionTypes.ADDRESS_SUCCESS: return fetchaddress(state, action);
        case actionTypes.ADDRESS_FAIL:return failaddress(state,action);
        case actionTypes.SHOW_ADDRESS:return showaddress(state,action);
        case actionTypes.SAVEADDRESS_FAIL : return save_AddressFail(state,action);
        default: return state;
    }
};

export default reducer;