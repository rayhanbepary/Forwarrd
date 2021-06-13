import * as Types from '../actions/types';

const init = {
    withdraws: {},
    error: {}
}

const withdrawReducer = (state = init, action) => {
    switch (action.type) {
        case Types.LOAD_ALL_WITHDRAW: {
            return {
                withdraws: action.payload.withdraws
            }
        }
        case Types.CREATE_WITHDRAW: {
            let withdraws = state.withdraws;
            withdraws.unshift(action.payload.withdraw)
            return withdraws
        }
        case Types.UPDATE_WITHDRAW: {
            let withdraws = state.withdraws;
            return withdraws.map(singleWithdraw => {
                if (singleWithdraw._id === action.payload.withdraw._id) {
                    return action.payload.withdraw
                }
                return singleWithdraw 
            })
        }
        case Types.WITHDRAW_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state;
    }
}

export default withdrawReducer;