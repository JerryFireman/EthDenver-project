import * as types from './types';
import { combineReducers } from 'redux';

const initialState = {
	web3: null,
	accounts: null,
	contract: null,
	groups: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.INIT_WEB3:
			return {
				...state,
				web3: action.payload.web3,
				accounts: action.payload.accounts,
				contract: action.payload.contract
			};
		case types.SETUP_GROUPS:
			console.log('reducer group', action.payload);
			return {
				...state,
				groups: action.payload
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	common: reducer
});

export default rootReducer;
