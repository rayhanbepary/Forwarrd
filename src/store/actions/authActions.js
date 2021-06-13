import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as Types from './types';
import setAuthToken from '../../utils/setAuthToken';

export const register = (user, history) => dispatch => {
    Axios.post('https://forwarrd.herokuapp.com/api/users/register', user)
        .then(res => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: {}
                }
            })
            history.push('/login')
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const login = (user, history) => dispatch => {
    Axios.post('https://forwarrd.herokuapp.com/api/users/login', user)
        .then(res => {
            let token = res.data.token;
            localStorage.setItem('auth_token', token)
            setAuthToken(token)
            let decode = jwtDecode(token);
            
            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decode,
                    success: res.data.message
                }
            })
            history.push('/')

        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
            console.log(error.response);
        })
}

export const loadAllUsers = () => dispatch => {
    Axios.get('https://forwarrd.herokuapp.com/api/users/all/users')
        .then(response => {
            dispatch({
                type: Types.LOAD_ALL_USER,
                payload: {
                    users: response.data
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response
                }
            })
        })
}


export const updateUser = (userId, user) => dispatch => {
    Axios.put(`https://forwarrd.herokuapp.com/api/users/${userId}`, user)
        .then(response => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: {}
                }
            })
        })
        .catch(err => console.log(err))
}

export const removeOneUser = userId => dispatch => {
    Axios.delete(`https://forwarrd.herokuapp.com/api/users/${userId}`)
        .then(response => {
            dispatch({
                type: Types.REMOVE_USER,
                payload: {
                    id: response.data._id
                }
            })
        })
        .catch(err => console.log(err))
}

export const changePassword = (id, passwords) => dispatch => {
    Axios.post(`https://forwarrd.herokuapp.com/api/users/${id}/changePassword`, passwords)
    .then(response => {
        dispatch({
            type: Types.CHANGE_PASSWORD,
            payload: {
                success: response.data.message,
                error: {}
            }
        })

    })
    .catch(error => {
        dispatch({
            type: Types.USERS_ERROR,
            payload: {
                error: error.response.data
            }
        })
    })
}


export const forgotPassword = (email) => dispatch => {
    Axios.post(`https://forwarrd.herokuapp.com/api/users/forgotPassword`, email)
        .then(response => {
            dispatch({
                type: Types.FORGET_PASSWORD,
                payload: {
                    success: response.data.message
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const resetPassword = (password, history) => dispatch => {
    Axios.post(`https://forwarrd.herokuapp.com/api/users/resetPassword`, password)
    .then(res => {
        dispatch({
            type: Types.RESET_PASSWORD,
            payload: {
                success: res.data.message
            }
        })
        history.push('/login')

    })
    .catch(error => {
        dispatch({
            type: Types.USERS_ERROR,
            payload: {
                error: error.response.data
            }
        })
    })
}

export const logout = (history) => {
    localStorage.removeItem('auth_token')
    history.push('/login')
    return {
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    }
}