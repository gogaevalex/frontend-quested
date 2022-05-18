import {
	LESSON_LIST,
	LESSON_LIST_SUCCESS,
	LESSON_LIST_ERROR,

} from '@src/redux/actions';
import {push} from 'picus';

const initialState = {
    list: null,
	filter: null,
    isLoad: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case LESSON_LIST:
		return {
			...state,
			isLoad: true,
		};
	case LESSON_LIST_SUCCESS:
		return {
			...state,
			list: action.data.lessonList,
			filter: action.data.filterList,
			isLoad: false,
			error: null,
		};
	case LESSON_LIST_ERROR:
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