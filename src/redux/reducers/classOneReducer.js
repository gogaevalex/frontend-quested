import {
	CLASS_ONE,
	CLASS_ONE_SUCCESS,
	CLASS_ONE_ERROR,

} from '@src/redux/actions';
import {push} from 'picus';

const initialState = {
    classId: null,
    className: null,
    mongoClassId: null,
    studentList: null,
    isLoad: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case CLASS_ONE:
		return {
			...state,
			isLoad: true,
		};
	case CLASS_ONE_SUCCESS:
		return {
			...state,
            ...action.data,
			isLoad: false,
			error: null,
		};
	case CLASS_ONE_ERROR:
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