import * as Types from '../actions/types';

const init = {
    isAuthenticated: false,
    user: {},
    allUser: {},
    error: {}
}

const authReducer = (state=init, action) => {
    switch (action.type) {
        case Types.SET_USER: {
            return {
                user: action.payload.user,
                isAuthenticated: Object.keys(action.payload.user).length !== 0,
                error: {},
                success: action.payload.success
            }
        }
        case Types.LOAD_ALL_USER: {
            return {
                ...state,
                allUser: action.payload.users
            }
        }
        case Types.UPDATE_USER: {
            let users = state.allUser;
            return users.map(user => {
                if (user._id === action.payload.user._id) {
                    return action.payload.user
                }
                return user 
            })
        }
        case Types.REMOVE_USER: {
            let users = state.allUser;
            return users.filter(user => {
                return user._id !== action.payload.id
            })
        }
        case Types.FORGET_PASSWORD: {
            return {
                ...state,
                success: action.payload.success
            }
        }
        case Types.RESET_PASSWORD: {
            return {
                ...state,
                success: action.payload.success
            }
        }
        case Types.CHANGE_PASSWORD: {
            return {
                ...state,
                success: action.payload.success
            }
        }
        case Types.USERS_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state
    }
}

export default authReducer;