import * as types from './types';

export const initWeb3 = (payload) => ({
	type: types.INIT_WEB3,
	payload
});

export const setupGroups = (payload) => ({
	type: types.SETUP_GROUPS,
	payload
});

export const setupTab = (payload) => ({
	type: types.SETUP_TAB,
	payload
});
