import {
	STUDENT_LESSONS,
	STUDENT_LESSONS_SUCCESS,
	STUDENT_LESSONS_ERROR,

} from '@src/redux/actions';
import {push} from 'picus';

const initialState = {
    student: null,
    isLoad: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case STUDENT_LESSONS:
		return {
			...state,
			isLoad: true,
		};
	case STUDENT_LESSONS_SUCCESS:
		return {
			...state,
			student: action.data,
			isLoad: false,
			error: null,
		};
	case STUDENT_LESSONS_ERROR:
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