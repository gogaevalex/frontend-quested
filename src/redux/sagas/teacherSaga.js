import {
	put, takeEvery, all, call,
} from 'redux-saga/effects';
import {
	TEACHER_REG,
	teacherRegSuccess,
	teacherRegError,

	TEACHER_LOGIN,
	teacherLoginSuccess,
	teacherLoginError,

	TEACHER_GET_CURRENT,
	teacherGetCurrentSuccess,
	teacherGetCurrentError,

	UPDATE_TEACHER_PROFILE,
	updateTeacherProfileSuccess,
	updateTeacherProfileError,

	LOGOUT_TEACHER,
} from '@src/redux/actions';
import $api from '../../http';

function* registration(data) {
	try {
		const result = yield call((request) => $api.post('/registration/teacher', request), data.params);

        localStorage.setItem('token', result.data.accessToken);
		localStorage.setItem('roleUser', 'teacher');
		yield put(teacherRegSuccess(result.data.teacher));
	} catch (error) {
		yield put(teacherRegError(error));
	}
}

function* login(data) {
	try {
		const result = yield call(({email, password}) => $api.post('/login/teacher', {email, password}), data.params);

        localStorage.setItem('token', result.data.accessToken);
		localStorage.setItem('roleUser', 'teacher');
		yield put(teacherLoginSuccess(result.data.teacher));
	} catch (error) {
		yield put(teacherLoginError(error));
	}
}

function* getCurrentTeacher() {
	try {
		const result = yield call(() => $api.get('/refresh/teacher'));
		localStorage.setItem('token', result.data.accessToken);
		localStorage.setItem('roleUser', 'teacher');

		yield put(teacherGetCurrentSuccess(result.data.teacher));
	} catch (error) {
		yield put(teacherGetCurrentError(error));
	}
}

function* updateProfile(data) {
	console.log('data', data.params)
	try {
		const result = yield call(({name, surname}) => $api.post('/update/teacher', {name, surname}), data.params);
		localStorage.setItem('token', result.data.accessToken);
		localStorage.setItem('roleUser', 'teacher');
		yield put(updateTeacherProfileSuccess(result.data.teacher));
	} catch (error) {
		yield put(updateTeacherProfileError(error));
	}
}

function* logout() {
	try {
		yield call(() => $api.post('/logout/teacher'));
		localStorage.removeItem('token');
		localStorage.removeItem('roleUser');
	} catch (error) {
		console.log('logout', error);
	}
}


export default function* teacherSaga() {
	yield all([
		takeEvery(TEACHER_REG, registration),
		takeEvery(TEACHER_LOGIN, login),
		takeEvery(TEACHER_GET_CURRENT, getCurrentTeacher),
		takeEvery(UPDATE_TEACHER_PROFILE, updateProfile),
		takeEvery(LOGOUT_TEACHER, logout),
	]);
}
