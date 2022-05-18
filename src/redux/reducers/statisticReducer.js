import {
	STATISTIC_STUDENT,
	STATISTIC_STUDENT_SUCCESS,
	STATISTIC_STUDENT_ERROR,

} from '@src/redux/actions';
import {push} from 'picus';

const initialState = {
    oneStudent: null,
    isLoad: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case STATISTIC_STUDENT:
		return {
			...state,
			isLoad: true,
		};
	case STATISTIC_STUDENT_SUCCESS:
		return {
			...state,
			oneStudent: action.data,
			isLoad: false,
			error: null,
		};
	case STATISTIC_STUDENT_ERROR:
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