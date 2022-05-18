import {
	TEACHER_REG,
	TEACHER_REG_SUCCESS,
	TEACHER_REG_ERROR,

	TEACHER_LOGIN,
	TEACHER_LOGIN_SUCCESS,
	TEACHER_LOGIN_ERROR,

	TEACHER_GET_CURRENT,
	TEACHER_GET_CURRENT_SUCCESS,
	TEACHER_GET_CURRENT_ERROR,

	UPDATE_TEACHER_PROFILE,
	UPDATE_TEACHER_PROFILE_SUCCESS,
	UPDATE_TEACHER_PROFILE_ERROR,

	UPDATE_TEACHER_PASSWORD,
	UPDATE_TEACHER_PASSWORD_SUCCESS,
	UPDATE_TEACHER_PASSWORD_ERROR,

	LOGOUT_TEACHER,
} from '@src/redux/actions';
import {push} from 'picus';

const initialState = {
	id: null,
	isActivated: false,
	name: null,
	surname: null,
	isAuth: false,
	teacherId: null,
	avatar: null,
	email: null,
	loads: {
		isLoadAuth: false,
		isLoadGetCurrentTeacher: true,
		isLoadUpdateProfile: false,
		isLoadUpdatePassword: false,
	},
	errors: {
		isLoadAuthError: null,
		isLoadGetCurrentTeacherError: null,
		updateProfileError: null,
		updatePasswordError: null,
	},
};

export default (state = initialState, action) => {
	switch (action.type) {
	case TEACHER_REG:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadAuth: true,
				isLoadGetCurrentTeacher: true,
			},
		};
	case TEACHER_REG_SUCCESS:
		return {
			...state,
			...action.data,
			loads: {
				...state.loads,
				isLoadAuth: false,
				isLoadGetCurrentTeacher: false,
			},
			errors: {
				...state.errors,
				isLoadAuthError: null,
				isLoadGetCurrentTeacher: false,
			},
			isAuth: true,
		};
	case TEACHER_REG_ERROR:
		push('error', 'Incorrect TEACHER code or email or password');
		return {
			...state,
			loads: {
				...state.loads,
				isLoadAuth: false,
			},
			errors: {
				...state.errors,
				isLoadAuthError: action.error,
			},
			isAuth: false,
		};
	case TEACHER_LOGIN:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadAuth: true,
				isLoadGetCurrentTeacher: true,
			},
		};
	case TEACHER_LOGIN_SUCCESS:
		return {
			...state,
			...action.data,
			loads: {
				...state.loads,
				isLoadAuth: false,
				isLoadGetCurrentTeacher: false,
			},
			errors: {
				...state.errors,
				isLoadAuthError: null,
			},
			isAuth: true,
		};
	case TEACHER_LOGIN_ERROR:
		push('error', 'Incorrect email or password');
		return {
			...state,
			loads: {
				...state.loads,
				isLoadAuth: false,
				isLoadGetCurrentTeacher: false,
			},
			errors: {
				...state.errors,
				isLoadAuthError: action.error,
			},
			isAuth: false,
		};
	case TEACHER_GET_CURRENT:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadGetCurrentTeacher: true,
			},
		};
	case TEACHER_GET_CURRENT_SUCCESS:
		return {
			...state,
			...action.data,
			loads: {
				...state.loads,
				isLoadGetCurrentTeacher: false,
			},
			isAuth: true,
		};
	case TEACHER_GET_CURRENT_ERROR:
		return {
			...state,
			errors: {
				...state.errors,
				isLoadGetCurrentTeacherError: action.error,
			},
			loads: {
				...state.loads,
				isLoadGetCurrentTeacher: false,
			},
			isAuth: false,
		};
	case UPDATE_TEACHER_PROFILE:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadUpdateProfile: true,
			},
		};
	case UPDATE_TEACHER_PROFILE_SUCCESS:
		push('success', 'Profile changed successfully');
		return {
			...state,
			...action.data,
			loads: {
				...state.loads,
				isLoadUpdateProfile: false,
			},
			errors: {
				...state.errors,
				updateProfileError: null,
			},
		};
	case UPDATE_TEACHER_PROFILE_ERROR:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadUpdateProfile: false,
			},
			errors: {
				...state.errors,
				updateProfileError: action.error,
			},
		};
	case UPDATE_TEACHER_PASSWORD:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadUpdatePassword: true,
			},
		};
	case UPDATE_TEACHER_PASSWORD_SUCCESS:
		push('success', 'PASSWORD changed successfully');
		return {
			...state,
			...action.TEACHER,
			loads: {
				...state.loads,
				isLoadUpdatePassword: false,
			},
			errors: {
				...state.errors,
				updatePasswordError: null,
			},
		};
	case UPDATE_TEACHER_PASSWORD_ERROR:
		push('error', 'Invalid password');
		return {
			...state,
			loads: {
				...state.loads,
				isLoadUpdatePassword: false,
			},
			errors: {
				...state.errors,
				updatePasswordError: action.error,
			},
		};
	case LOGOUT_TEACHER:
		return {
			...initialState,
			loads: {
				isLoadAuth: false,
				isLoadGetCurrentTeacher: false,
				isLoadUpdateProfile: false,
			},
		};
	default:
		return state;
	}
};
