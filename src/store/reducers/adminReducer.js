import * as Types from '../actions/types';

const init = {
    admins: {},
    error: {}
}

const adminReducer = (state = init, action) => {
    switch (action.type) {
        case Types.LOAD_ALL_ADMINS: {
            return {
                ...state,
                admins: action.payload.admins
            }
        }
        case Types.CREATE_ADMIN: {
            let admins = state.admins;
            admins.unshift(action.payload.admin)
            return admins
        }
        case Types.REMOVE_ADMIN: {
            let admins = state.admins;
            return admins.filter(admin => {
                return admin._id !== action.payload.id
            })
        }
        case Types.UPDATE_ADMIN: {
            let admins = state.admins;
            return admins.map(admin => {
                if (admin._id === action.payload.admin._id) {
                    return action.payload.admin
                }
                return admin 
            })
        }
        case Types.ADMIN_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state;
    }
}

export default adminReducer;