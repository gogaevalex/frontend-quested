import {
	put, takeEvery, all, call,
} from 'redux-saga/effects';
import {
	LESSON_LIST,
	getLessonListSuccess,
	getLessonListError,

	LESSON_ONE,
	getLessonOneSuccess,
	getLessonOneError,

} from '@src/redux/actions';
import $api from '../../http';

function* getMyLessones(data) {
	try {
		const result = yield call((mongoTeacherId) => $api.post('/lesson/list', mongoTeacherId), data.params);
		yield put(getLessonListSuccess(result.data));
	} catch (error) {
		yield put(getLessonListError(error));
	}
}

function* getMyOneLesson(data) {
	try {
		const result = yield call((mongoTeacherId, mongoLessonId) => $api.post('/lesson/one', mongoTeacherId, mongoLessonId), data.params);
		yield put(getLessonOneSuccess(result.data));
	} catch (error) {
		yield put(getLessonOneError(error));
	}
}


export default function* lessonSaga() {
	yield all([
		takeEvery(LESSON_LIST, getMyLessones),
		takeEvery(LESSON_ONE, getMyOneLesson),
	]);
}
