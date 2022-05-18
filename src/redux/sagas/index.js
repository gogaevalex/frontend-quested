import {fork, all} from 'redux-saga/effects';
import teacherSaga from './teacherSaga'
import studentSaga from './studentSaga'
import classSaga from './classSaga'
import lessonSaga from './lessonSaga'
import statisticSaga from './statisticSaga'

export default function* root() {
	yield all([
		fork(teacherSaga),
		fork(studentSaga),
		fork(classSaga),
		fork(lessonSaga),
		fork(statisticSaga),
	]);
}
