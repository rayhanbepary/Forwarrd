import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../store/reducers/rootReducer";
import thunk from "redux-thunk";

const middleware = [thunk];

// const store = createStore(rootReducer, compose(
//     applyMiddleware(...middleware),
// 	window.navigator.userAgent.includes('Chrome') ?
//       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : compose,
// ));


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
);
const store = createStore(rootReducer, enhancer);

export default store;


