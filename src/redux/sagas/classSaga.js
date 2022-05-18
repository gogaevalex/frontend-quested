import {
	put, takeEvery, all, call,
} from 'redux-saga/effects';
import {
	CLASS_LIST,
	getClassListSuccess,
	getClassListError,

	CLASS_ONE,
	getClassOneSuccess,
	getClassOneError,

} from '@src/redux/actions';
import $api from '../../http';

function* getMyClasses(data) {
	try {
		const result = yield call((mongoTeacherId) => $api.post('/classes/list', mongoTeacherId), data.params);
		yield put(getClassListSuccess(result.data));
	} catch (error) {
		yield put(getClassListError(error));
	}
}

function* getMyOneClass(data) {
	try {
		const result = yield call((mongoTeacherId, mongoClassId) => $api.post('/classes/one', mongoTeacherId, mongoClassId), data.params);
		yield put(getClassOneSuccess(result.data));
	} catch (error) {
		yield put(getClassOneError(error));
	}
}


export default function* classSaga() {
	yield all([
		takeEvery(CLASS_LIST, getMyClasses),
		takeEvery(CLASS_ONE, getMyOneClass),
	]);
}
