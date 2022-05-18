export const STUDENT_REG = `STUDENT_REG`;
export const STUDENT_REG_SUCCESS = `STUDENT_REG_SUCCESS`;
export const STUDENT_REG_ERROR = `STUDENT_REG_ERROR`;

export const studentReg = (params) => ({
	type: STUDENT_REG,
	params,
});

export const studentRegSuccess = (data) => ({
	type: STUDENT_REG_SUCCESS,
	data,
});

export const studentRegError = (error) => ({
	type: STUDENT_REG_ERROR,
	error,
});

export const STUDENT_LOGIN = `STUDENT_LOGIN`;
export const STUDENT_LOGIN_SUCCESS = `STUDENT_LOGIN_SUCCESS`;
export const STUDENT_LOGIN_ERROR = `STUDENT_LOGIN_ERROR`;

export const studentLogin = (params) => ({
	type: STUDENT_LOGIN,
	params,
});

export const studentLoginSuccess = (data) => ({
	type: STUDENT_LOGIN_SUCCESS,
	data,
});

export const studentLoginError = (error) => ({
	type: STUDENT_LOGIN_ERROR,
	error,
});

export const STUDENT_GET_CURRENT = `STUDENT_GET_CURRENT`;
export const STUDENT_GET_CURRENT_SUCCESS = `STUDENT_GET_CURRENT_SUCCESS`;
export const STUDENT_GET_CURRENT_ERROR = `STUDENT_GET_CURRENT_ERROR`;

export const studentGetCurrent = () => ({
	type: STUDENT_GET_CURRENT,
});

export const studentGetCurrentSuccess = (data) => ({
	type: STUDENT_GET_CURRENT_SUCCESS,
	data,
});

export const studentGetCurrentError = (error) => ({
	type: STUDENT_GET_CURRENT_ERROR,
	error,
});

export const UPDATE_STUDENT_PROFILE = `UPDATE_STUDENT_PROFILE`;
export const UPDATE_STUDENT_PROFILE_SUCCESS = `UPDATE_STUDENT_PROFILE_SUCCESS`;
export const UPDATE_STUDENT_PROFILE_ERROR = `UPDATE_STUDENT_PROFILE_ERROR`;

export const updateStudentProfile = (data) => ({
	type: UPDATE_STUDENT_PROFILE,
	data,
});

export const updateStudentProfileSuccess = (data) => ({
	type: UPDATE_STUDENT_PROFILE_SUCCESS,
	data,
});

export const updateStudentProfileError = (error) => ({
	type: UPDATE_STUDENT_PROFILE_ERROR,
	error,
});

export const UPDATE_STUDENT_PASSWORD = `UPDATE_STUDENT_PASSWORD`;
export const UPDATE_STUDENT_PASSWORD_SUCCESS = `UPDATE_STUDENT_PASSWORD_SUCCESS`;
export const UPDATE_STUDENT_PASSWORD_ERROR = `UPDATE_STUDENT_PASSWORD_ERROR`;

export const updateStudentPassword = (data) => ({
	type: UPDATE_STUDENT_PASSWORD,
	data,
});

export const updateStudentPasswordSuccess = () => ({
	type: UPDATE_STUDENT_PASSWORD_SUCCESS,
});

export const updateStudentPasswordError = (error) => ({
	type: UPDATE_STUDENT_PASSWORD_ERROR,
	error,
});


export const LOGOUT_STUDENT = 'LOGOUT_STUDENT';

export const logoutStudent = () => ({
	type: LOGOUT_STUDENT,
});
