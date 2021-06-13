import Axios from 'axios';
import * as Types from './types';

export const loadAllWithdraw = () => dispatch => {
    Axios.get('https://forwarrd.herokuapp.com/api/withdraws/admin/allWithdraw')
        .then(response => {
            dispatch({
                type: Types.LOAD_ALL_WITHDRAW,
                payload: {
                    withdraws: response.data
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.WITHDRAW_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const createWithdraw = withdraw => dispatch => {
    Axios.post('https://forwarrd.herokuapp.com/api/withdraws/create/withdraw', withdraw)
        .then(response => {
            dispatch({
                type: Types.WITHDRAW_ERROR,
                payload: {
                    error: {}
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.WITHDRAW_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const updateWithdraw = (id, withdraw) => dispatch => {
    Axios.put(`https://forwarrd.herokuapp.com/api/withdraws/${id}/update/Withdraw`, withdraw)
        .then(response => {
            dispatch({
                type: Types.UPDATE_WITHDRAW,
                payload: {
                    withdraw: response.data.withdraw
                }
            })
        })
        .catch(error => console.log(error))
}

