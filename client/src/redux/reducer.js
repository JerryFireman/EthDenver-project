import * as types from './types';
import { combineReducers } from 'redux';

const initialState = {
	web3: null,
	accounts: null,
	contract: null,
	groups: null,
	totalNumberOfGroups: 0,
	currentActiveTab: 0
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
				totalNumberOfGroups: action.payload
			};
		case types.SETUP_TAB:
			console.log('tab!!', action.payload);
			return {
				...state,
				currentActiveTab: action.payload
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	common: reducer
});

export default rootReducer;
