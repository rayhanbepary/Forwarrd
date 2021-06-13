import { combineReducers } from "redux";
import authReducer from './authReducer';
import withdrawReducer from './withdrawReducer';
import depositReducer from './depositReducer';
import collectorsReducer from './collectorReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    withdraws: withdrawReducer,
    deposits: depositReducer,
    collectors: collectorsReducer,
    admins: adminReducer
})

export default rootReducer;