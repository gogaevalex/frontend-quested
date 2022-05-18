import {
	put, takeEvery, all, call,
} from 'redux-saga/effects';
import {
	STATISTIC_STUDENT,
	statisticStudentSuccess,
	statisticStudentError,

} from '@src/redux/actions';
import $api from '../../http';

function* getStatisticStudent(data) {
	try {
		const result = yield call((idBracelet, mongoTeacherId) => 
            $api.post('/student/statistic/access/teacher', idBracelet, mongoTeacherId), data.params);
		yield put(statisticStudentSuccess(result.data));
	} catch (error) {
		yield put(statisticStudentError(error));
	}
}

export default function* statisticSaga() {
	yield all([
		takeEvery(STATISTIC_STUDENT, getStatisticStudent),
	]);
}
