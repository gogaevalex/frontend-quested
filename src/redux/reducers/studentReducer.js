import {
	STUDENT_REG,
	STUDENT_REG_SUCCESS,
	STUDENT_REG_ERROR,

	STUDENT_LOGIN,
	STUDENT_LOGIN_SUCCESS,
	STUDENT_LOGIN_ERROR,

	STUDENT_GET_CURRENT,
	STUDENT_GET_CURRENT_SUCCESS,
	STUDENT_GET_CURRENT_ERROR,

	UPDATE_STUDENT_PROFILE,
	UPDATE_STUDENT_PROFILE_SUCCESS,
	UPDATE_STUDENT_PROFILE_ERROR,

	UPDATE_STUDENT_PASSWORD,
	UPDATE_STUDENT_PASSWORD_SUCCESS,
	UPDATE_STUDENT_PASSWORD_ERROR,

	LOGOUT_STUDENT,
} from '@src/redux/actions';
import {push} from 'picus';

const initialState = {
	id: null,
	name: null,
	surname: null,
	isAuth: false,
	idBracelet: null,
	avatar: null,
	mail: null,
	loads: {
		isLoadAuth: false,
		isLoadGetCurrentStudent: true,
		isLoadUpdateProfile: false,
		isLoadUpdatePassword: false,
	},
	errors: {
		isLoadAuthError: null,
		isLoadGetCurrentStudentError: null,
		updateProfileError: null,
		updatePasswordError: null,
	},
};

export default (state = initialState, action) => {
	console.log('action', action);
	switch (action.type) {
	case STUDENT_REG:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadAuth: true,
				isLoadGetCurrentStudent: true,
			},
		};
	case STUDENT_REG_SUCCESS:
		return {
			...state,
			...action.data,
			loads: {
				...state.loads,
				isLoadAuth: false,
				isLoadGetCurrentStudent: false,
			},
			errors: {
				...state.errors,
				isLoadAuthError: null,
			},
			isAuth: true,
		};
	case STUDENT_REG_ERROR:
		push('error', 'Incorrect Student code or email or password');
		return {
			...state,
			loads: {
				...state.loads,
				isLoadAuth: false,
				isLoadGetCurrentStudent: false,
			},
			errors: {
				...state.errors,
				isLoadAuthError: action.error,
			},
			isAuth: false,
		};
	case STUDENT_LOGIN:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadAuth: true,
				isLoadGetCurrentStudent: true,
			},
		};
	case STUDENT_LOGIN_SUCCESS:
		return {
			...state,
			...action.data,
			loads: {
				...state.loads,
				isLoadAuth: false,
				isLoadGetCurrentStudent: false,
			},
			errors: {
				...state.errors,
				isLoadAuthError: null,
			},
			isAuth: true,
		};
	case STUDENT_LOGIN_ERROR:
		push('error', 'Incorrect email or password');
		return {
			...state,
			loads: {
				...state.loads,
				isLoadAuth: false,
				isLoadGetCurrentStudent: false,
			},
			errors: {
				...state.errors,
				isLoadAuthError: action.error,
			},
			isAuth: false,
		};
	case STUDENT_GET_CURRENT:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadGetCurrentStudent: true,
			},
		};
	case STUDENT_GET_CURRENT_SUCCESS:
		return {
			...state,
			...action.data,
			loads: {
				...state.loads,
				isLoadGetCurrentStudent: false,
			},
			isAuth: true,
		};
	case STUDENT_GET_CURRENT_ERROR:
		return {
			...state,
			errors: {
				...state.errors,
				isLoadGetCurrentStudentError: action.error,
			},
			loads: {
				...state.loads,
				isLoadGetCurrentStudent: false,
			},
			isAuth: false,
		};
	case UPDATE_STUDENT_PROFILE:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadUpdateProfile: true,
			},
		};
	case UPDATE_STUDENT_PROFILE_SUCCESS:
		push('success', 'Profile changed successfully');
		return {
			...state,
			...action.Student,
			loads: {
				...state.loads,
				isLoadUpdateProfile: false,
			},
			errors: {
				...state.errors,
				updateProfileError: null,
			},
		};
	case UPDATE_STUDENT_PROFILE_ERROR:
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
	case UPDATE_STUDENT_PASSWORD:
		return {
			...state,
			loads: {
				...state.loads,
				isLoadUpdatePassword: true,
			},
		};
	case UPDATE_STUDENT_PASSWORD_SUCCESS:
		push('success', 'PASSWORD changed successfully');
		return {
			...state,
			...action.Student,
			loads: {
				...state.loads,
				isLoadUpdatePassword: false,
			},
			errors: {
				...state.errors,
				updatePasswordError: null,
			},
		};
	case UPDATE_STUDENT_PASSWORD_ERROR:
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
	case LOGOUT_STUDENT:
		return {
			...initialState,
			loads: {
				isLoadAuth: false,
				isLoadGetCurrentStudent: false,
				isLoadUpdateProfile: false,
			},
		};
	default:
		return state;
	}
};
