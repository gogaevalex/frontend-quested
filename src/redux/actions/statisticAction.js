export const STATISTIC_STUDENT = `STATISTIC_STUDENT`;
export const STATISTIC_STUDENT_SUCCESS = `STATISTIC_STUDENT_SUCCESS`;
export const STATISTIC_STUDENT_ERROR = `STATISTIC_STUDENT_ERROR`;

export const statisticStudent = (params) => ({
	type: STATISTIC_STUDENT,
	params,
});

export const statisticStudentSuccess = (data) => ({
	type: STATISTIC_STUDENT_SUCCESS,
	data,
});

export const statisticStudentError = (error) => ({
	type: STATISTIC_STUDENT_ERROR,
	error,
});