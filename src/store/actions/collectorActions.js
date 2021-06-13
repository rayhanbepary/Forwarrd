import Axios from 'axios';
import * as Types from './types';

export const loadAllCollectors = () => dispatch => {
    Axios.get('https://forwarrd.herokuapp.com/api/collectors/all/collectors')
        .then(response => {
            dispatch({
                type: Types.LOAD_ALL_COLLECTORS,
                payload: {
                    collectors: response.data
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.COLLECTOR_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const addNewCollector = collector => dispatch => {
    Axios.post('https://forwarrd.herokuapp.com/api/collectors/create/collector', collector)
        .then(response => {
            dispatch({
                type: Types.COLLECTOR_ERROR,
                payload: {
                    error:  {}
                }
            })
        })
        .catch(error => {
            dispatch({
                type: Types.COLLECTOR_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const removeOneCollector = collectorId => dispatch => {
    Axios.delete(`https://forwarrd.herokuapp.com/api/collectors/${collectorId}`)
        .then(response => {
            dispatch({
                type: Types.REMOVE_COLLECTOR,
                payload: {
                    id: response.data._id
                }
            })
        })
        .catch(err => console.log(err))
}

export const updateCollectorProfile = (collectorId, collector) => dispatch => {
    Axios.put(`https://forwarrd.herokuapp.com/api/collectors/${collectorId}`, collector)
        .then(response => {
            dispatch({
                type: Types.UPDATE_COLLECTOR,
                payload: {
                    collector: response.data.collector
                }
            })
        })
        .catch(err => console.log(err))
}