import * as types from './types';

export const initWeb3 = (payload) => ({
	type: types.INIT_WEB3,
	payload
});
