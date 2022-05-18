import {
	CLASS_LIST,
	CLASS_LIST_SUCCESS,
	CLASS_LIST_ERROR,

} from '@src/redux/actions';
import {push} from 'picus';

const initialState = {
    list: null,
    isLoad: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case CLASS_LIST:
		return {
			...state,
			isLoad: true,
		};
	case CLASS_LIST_SUCCESS:
		return {
			...state,
			list: action.data,
			isLoad: false,
			error: null,
		};
	case CLASS_LIST_ERROR:
		push('error', 'Error class list');
		return {
			...state,
			isLoad: false,
			error: action.error,
			isAuth: false,
		};
    default:
        return state;
    }
};