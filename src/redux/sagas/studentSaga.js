import {
	put, takeEvery, all, call,
} from 'redux-saga/effects';
import {
	STUDENT_REG,
	studentRegSuccess,
	studentRegError,

	STUDENT_LOGIN,
	studentLoginSuccess,
	studentLoginError,

	STUDENT_GET_CURRENT,
	studentGetCurrentSuccess,
	studentGetCurrentError,

	STUDENT_LESSONS,
	getStudentLessonsSuccess,
	getStudentLessonsError,
} from '@src/redux/actions';
import $api from '../../http';

function* registration(data) {
	try {
		const result = yield call(({idBracelet, password}) =>
			$api.post('/registration/student', {idBracelet, password}), data.params);
		console.log('registration', result);
        localStorage.setItem('token', result.data.accessToken);
		localStorage.setItem('roleUser', 'student');
		yield put(studentRegSuccess(result.data));
	} catch (error) {
		yield put(studentRegError(error));
	}
}

function* login(data) {
	try {
		const result = yield call(({idBracelet, password}) => $api.post('/login/student', {idBracelet, password}), data.params);
		console.log('login', result);

        localStorage.setItem('token', result.data.accessToken);
		localStorage.setItem('roleUser', 'student');
		yield put(studentLoginSuccess(result.data));
	} catch (error) {
		yield put(studentLoginError(error));
	}
}

function* getCurrentStudent() {
	try {
		const result = yield call(() => $api.get('/profile/student'));
		console.log('getCurrentStudent', result);
		localStorage.setItem('token', result.data.accessToken);
		localStorage.setItem('roleUser', 'student');

		yield put(studentGetCurrentSuccess(result.data.student));
	} catch (error) {
		yield put(studentGetCurrentError(error));
	}
}

function* getStudentLessons() {
	try {
		const result = yield call(() => $api.get('/student/lessons'));
		yield put(getStudentLessonsSuccess(result.data));
	} catch (error) {
		yield put(getStudentLessonsError(error));
	}
}


export default function* studentSaga() {
	yield all([
		takeEvery(STUDENT_REG, registration),
		takeEvery(STUDENT_LOGIN, login),
		takeEvery(STUDENT_GET_CURRENT, getCurrentStudent),
		takeEvery(STUDENT_LESSONS, getStudentLessons),

	]);
}
