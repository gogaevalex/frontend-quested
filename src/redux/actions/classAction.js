export const CLASS_LIST = `CLASS_LIST`;
export const CLASS_LIST_SUCCESS = `CLASS_LIST_SUCCESS`;
export const CLASS_LIST_ERROR = `CLASS_LIST_ERROR`;

export const getClassList = (params) => ({
	type: CLASS_LIST,
	params,
});

export const getClassListSuccess = (data) => ({
	type: CLASS_LIST_SUCCESS,
	data,
});

export const getClassListError = (error) => ({
	type: CLASS_LIST_ERROR,
	error,
});

export const CLASS_ONE = `CLASS_ONE`;
export const CLASS_ONE_SUCCESS = `CLASS_ONE_SUCCESS`;
export const CLASS_ONE_ERROR = `CLASS_ONE_ERROR`;

export const getClassOne = (params) => ({
	type: CLASS_ONE,
	params,
});

export const getClassOneSuccess = (data) => ({
	type: CLASS_ONE_SUCCESS,
	data,
});

export const getClassOneError = (error) => ({
	type: CLASS_ONE_ERROR,
	error,
});