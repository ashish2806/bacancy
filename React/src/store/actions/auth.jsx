import axios from '../../axios';

import * as actionType from './actionTypes.jsx';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const fetchaddressSuccess = (address) =>{
    return{
        type : actionType.ADDRESS_SUCCESS,
        address : address
    }
}
export const authFail = (error) => {
    return {
        type: actionType.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    console.log("here");
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionType.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            console.log('[action/Auth] ======> checkAuthTimeout');
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return  dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };

        //let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAJIFVxhEciqmbZFm_NdjDBaf3bUqiAHPM';
        let url = 'login';
        
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + 3660 * 1000);
                console.log('response123', response);
                localStorage.setItem('token', response.data.success.token);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.success.userid);
                dispatch(authSuccess(response.data.success.token, response.data.success.userid));
               // dispatch(checkAuthTimeout(60*1000));
            })
            .catch(err => {
                console.log("ggg");
                console.log(err.error);

               // dispatch(authFail(err.error));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            console.log('[action/Auth] ======> authCheckState');
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                console.log('[action/Auth] ======> date');
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
              //  dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

export const registerFail = (error) => {
    return {
        type: actionType.GERISTER_FAIL,
        error: error
    };
};

export const addressFail = (error) => {
    return {
        type: actionType.ADDRESS_FAIL,
        error: error
    };
};

export const save_AddressFail = (error) => {
    return {
        type: actionType.SAVEADDRESS_FAIL,
        error: error
    };
}
export const register = (accArr) => {
	return dispatch => {
	let url = 'register';
        
    axios.post(url, accArr)
        .then(response => {
            console.log('response', response);
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', response.data.success.token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.success.userid);
            dispatch(authSuccess(response.data.success.token, response.data.success.userid));
            dispatch(checkAuthTimeout(60*1000));
        })
        .catch(err => {
        	console.log('error', err.response);
            dispatch(registerFail(err.error));
        });
    };
};


export const getaddress = () =>{
    return dispatch => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const Data = {
            userId : userId
        }; 
        let url = 'address';
            
        axios.post(url,Data,{headers: {
            Authorization: 'Bearer '+ token
          }})
            .then(response => {
                console.log('response', response);
               dispatch(fetchaddressSuccess(response.data.success)) 
            })
            .catch(err => {
                console.log('error', err.response);
                dispatch(addressFail(err.error));
            });
        };
};


export const save_address= (city,state,pincode) =>{
    return dispatch => {
        let url = 'saveaddress';
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const Data = {
            city: city,
            state: state,
            pincode:pincode,
            userId : userId
        };     
        axios.post(url,Data,{headers: {
            Authorization: 'Bearer '+ token
          }})
            .then(response => {
                console.log('response', response);
               dispatch(getaddress()); 
            })
            .catch(err => {
                console.log( err.error);
                dispatch(save_AddressFail(err.error));
            });
        };
}

export const show_addressHandler = () => {
    return {
        type: actionType.SHOW_ADDRESS,
        data : true
    };
}