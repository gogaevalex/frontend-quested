import {
	LESSON_ONE,
	LESSON_ONE_SUCCESS,
	LESSON_ONE_ERROR,

} from '@src/redux/actions';
import {push} from 'picus';

const initialState = {
    gameType: null,
    gameTime: null,
    classId: null, 
    className: null,
    mongoLessonId: null,
    oneStudentLessonList: null,
    productiveInfo: null,
    isLoad: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case LESSON_ONE:
		return {
			...state,
			isLoad: true,
		};
	case LESSON_ONE_SUCCESS:
		return {
			...state,
			...action.data,
			isLoad: false,
			error: null,
		};
	case LESSON_ONE_ERROR:
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