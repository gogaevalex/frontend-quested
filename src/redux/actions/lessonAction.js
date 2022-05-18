export const LESSON_LIST = `LESSON_LIST`;
export const LESSON_LIST_SUCCESS = `LESSON_LIST_SUCCESS`;
export const LESSON_LIST_ERROR = `LESSON_LIST_ERROR`;

export const getLessonList = (params) => ({
	type: LESSON_LIST,
	params,
});

export const getLessonListSuccess = (data) => ({
	type: LESSON_LIST_SUCCESS,
	data,
});

export const getLessonListError = (error) => ({
	type: LESSON_LIST_ERROR,
	error,
});

export const LESSON_ONE = `LESSON_ONE`;
export const LESSON_ONE_SUCCESS = `LESSON_ONE_SUCCESS`;
export const LESSON_ONE_ERROR = `LESSON_ONE_ERROR`;

export const getLessonOne = (params) => ({
	type: LESSON_ONE,
	params,
});

export const getLessonOneSuccess = (data) => ({
	type: LESSON_ONE_SUCCESS,
	data,
});

export const getLessonOneError = (error) => ({
	type: LESSON_ONE_ERROR,
	error,
});

export const STUDENT_LESSONS = `STUDENT_LESSONS`;
export const STUDENT_LESSONS_SUCCESS = `STUDENT_LESSONS_SUCCESS`;
export const STUDENT_LESSONS_ERROR = `STUDENT_LESSONS_ERROR`;

export const getStudentLessons = (params) => ({
	type: STUDENT_LESSONS,
	params,
});

export const getStudentLessonsSuccess = (data) => ({
	type: STUDENT_LESSONS_SUCCESS,
	data,
});

export const getStudentLessonsError = (error) => ({
	type: STUDENT_LESSONS_ERROR,
	error,
});