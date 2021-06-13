import Axios from 'axios';
import * as Types from './types';

export const loadAllAdmins = () => dispatch => {
    Axios.get('https://forwarrd.herokuapp.com/api/admins/all/admins')
        .then(response => {
            dispatch({
                type: Types.LOAD_ALL_ADMINS,
                payload: {
                    admins: response.data
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.ADMIN_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const addNewAdmin = admin => dispatch => {
    console.log(admin);
    Axios.post('https://forwarrd.herokuapp.com/api/admins/create/admin', admin)
        .then(response => {
            dispatch({
                type: Types.ADMIN_ERROR,
                payload: {
                    error:  {}
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.ADMIN_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const removeOneAdmin = adminId => dispatch => {
    Axios.delete(`https://forwarrd.herokuapp.com/api/admins/${adminId}`)
        .then(response => {
            dispatch({
                type: Types.REMOVE_ADMIN,
                payload: {
                    id: response.data._id
                }
            })
        })
        .catch(error => console.log(error))
}

export const updateAdminProfile = (adminId, admin) => dispatch => {
    Axios.put(`https://forwarrd.herokuapp.com/api/admins/${adminId}`, admin)
        .then(response => {
            dispatch({
                type: Types.UPDATE_ADMIN,
                payload: {
                    admin: response.data.admin
                }
            })
        })
        .catch(err => console.log(err))
}