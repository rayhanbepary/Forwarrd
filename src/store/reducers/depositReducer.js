import * as Types from '../actions/types';


const init = {
    deposits: {},
    error: {}
}

const depositReducer = (state = init, action) => {
    switch (action.type) {
        case Types.LOAD_ALL_DEPOSIT: {
            return {
                ...state,
                deposits: action.payload.deposits
            }
        }
        case Types.CREATE_DEPOSIT: {
            let deposits = state.deposits;
            deposits.unshift(action.payload.deposit)
            return deposits
        }
        case Types.UPDATE_DEPOSIT: {
            let deposits = state.deposits;
            return deposits.map(deposit => {
                if (deposit._id === action.payload.deposit._id) {
                    return action.payload.deposit
                }
                return deposit 
            })
        }
        case Types.USER_DEPOSIT: {
            return {
                userDeposit: action.payload.userDeposit
            }
        }
        case Types.DEPOSIT_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state;
    }
}

export default depositReducer;