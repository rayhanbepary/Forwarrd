import * as Types from '../actions/types';


const init = {
    collectors: {},
    error: {}
}

const collectorReducer = (state = init, action) => {
    switch (action.type) {
        case Types.LOAD_ALL_COLLECTORS: {
            return {
                ...state,
                collectors: action.payload.collectors
            }
        }
        case Types.CREATE_COLLECTOR: {
            let collectors = state.collectors;
            collectors.unshift(action.payload.collector)
            return collectors
        }
        case Types.REMOVE_COLLECTOR: {
            let collectors = state.collectors;
            return collectors.filter(collector => {
                return collector._id !== action.payload.id
            })
        }
        case Types.UPDATE_COLLECTOR: {
            let collectors = state.collectors;
            return collectors.map(collector => {
                if (collector._id === action.payload.collector._id) {
                    return action.payload.collector
                }
                return collector 
            })
        }
        case Types.COLLECTOR_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state;
    }
}

export default collectorReducer;