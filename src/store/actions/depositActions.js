import Axios from 'axios';
import * as Types from './types';

export const loadAllDeposit = () => dispatch => {
    Axios.get('https://forwarrd.herokuapp.com/api/deposits/admin/allDeposits')
        .then(response => {
            dispatch({
                type: Types.LOAD_ALL_DEPOSIT,
                payload: {
                    deposits: response.data
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.DEPOSIT_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const addNewDeposit = deposit => dispatch => {
    Axios.post('https://forwarrd.herokuapp.com/api/deposits/create/deposit', deposit)
        .then(response => {
            dispatch({
                type: Types.DEPOSIT_ERROR,
                payload: {
                    error:  {}
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.DEPOSIT_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const updateDeposit = (id, deposit) => dispatch => {
    console.log(deposit);
    Axios.put(`https://forwarrd.herokuapp.com/api/deposits/${id}/update/deposit`, deposit)
        .then(response => {
            dispatch({
                type: Types.UPDATE_DEPOSIT,
                payload: {
                    deposit: response.data.deposit
                }
            })
            console.log(response.data.deposit);
        })
        .catch(error => console.log(error))
}

export const getUserDeposit = (client) => dispatch => {
    Axios.get(`https://forwarrd.herokuapp.com/api/deposits/${client}/deposits`)
        .then(response => {
            dispatch({
                type: Types.USER_DEPOSIT,
                payload: {
                    userDeposit: response.data
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.DEPOSIT_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}
