export const TEACHER_REG = `TEACHER_REG`;
export const TEACHER_REG_SUCCESS = `TEACHER_REG_SUCCESS`;
export const TEACHER_REG_ERROR = `TEACHER_REG_ERROR`;

export const teacherReg = (params) => ({
	type: TEACHER_REG,
	params,
});

export const teacherRegSuccess = (data) => ({
	type: TEACHER_REG_SUCCESS,
	data,
});

export const teacherRegError = (error) => ({
	type: TEACHER_REG_ERROR,
	error,
});

export const TEACHER_LOGIN = `TEACHER_LOGIN`;
export const TEACHER_LOGIN_SUCCESS = `TEACHER_LOGIN_SUCCESS`;
export const TEACHER_LOGIN_ERROR = `TEACHER_LOGIN_ERROR`;

export const teacherLogin = (params) => ({
	type: TEACHER_LOGIN,
	params,
});

export const teacherLoginSuccess = (data) => ({
	type: TEACHER_LOGIN_SUCCESS,
	data,
});

export const teacherLoginError = (error) => ({
	type: TEACHER_LOGIN_ERROR,
	error,
});

export const TEACHER_GET_CURRENT = `TEACHER_GET_CURRENT`;
export const TEACHER_GET_CURRENT_SUCCESS = `TEACHER_GET_CURRENT_SUCCESS`;
export const TEACHER_GET_CURRENT_ERROR = `TEACHER_GET_CURRENT_ERROR`;

export const teacherGetCurrent = () => ({
	type: TEACHER_GET_CURRENT,
});

export const teacherGetCurrentSuccess = (data) => ({
	type: TEACHER_GET_CURRENT_SUCCESS,
	data,
});

export const teacherGetCurrentError = (error) => ({
	type: TEACHER_GET_CURRENT_ERROR,
	error,
});

export const UPDATE_TEACHER_PROFILE = `UPDATE_TEACHER_PROFILE`;
export const UPDATE_TEACHER_PROFILE_SUCCESS = `UPDATE_TEACHER_PROFILE_SUCCESS`;
export const UPDATE_TEACHER_PROFILE_ERROR = `UPDATE_TEACHER_PROFILE_ERROR`;

export const updateTeacherProfile = (params) => ({
	type: UPDATE_TEACHER_PROFILE,
	params,
});

export const updateTeacherProfileSuccess = (data) => ({
	type: UPDATE_TEACHER_PROFILE_SUCCESS,
	data,
});

export const updateTeacherProfileError = (error) => ({
	type: UPDATE_TEACHER_PROFILE_ERROR,
	error,
});

export const UPDATE_TEACHER_PASSWORD = `UPDATE_TEACHER_PASSWORD`;
export const UPDATE_TEACHER_PASSWORD_SUCCESS = `UPDATE_TEACHER_PASSWORD_SUCCESS`;
export const UPDATE_TEACHER_PASSWORD_ERROR = `UPDATE_TEACHER_PASSWORD_ERROR`;

export const updateTeacherPassword = (data) => ({
	type: UPDATE_TEACHER_PASSWORD,
	data,
});

export const updateTeacherPasswordSuccess = () => ({
	type: UPDATE_TEACHER_PASSWORD_SUCCESS,
});

export const updateTeacherPasswordError = (error) => ({
	type: UPDATE_TEACHER_PASSWORD_ERROR,
	error,
});


export const LOGOUT_TEACHER = 'LOGOUT_TEACHER';
export const logoutTeacher = () => ({
	type: LOGOUT_TEACHER,
});
