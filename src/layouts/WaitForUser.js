import {
	useEffect,
	memo,
} from 'react';
import {
	useSelector,
	useDispatch,
} from 'react-redux';
import {teacherGetCurrent, studentGetCurrent} from '@src/redux/actions';
import {Preloader} from '@src/components/Preloader';

export const WaitForUser = memo(({
	children,
}) => {
	const dispatch = useDispatch();
	const teacher = useSelector((state) => state.teacher);
	const student = useSelector((state) => state.student);
	const roleUser = localStorage.getItem('roleUser');

	useEffect(() => {
		if (roleUser === 'teacher') {
			dispatch(teacherGetCurrent());
		}
		if (roleUser === 'student') {
			dispatch(studentGetCurrent());
		}
	}, []);
	if (roleUser === 'teacher') {
		if (teacher.loads.isLoadGetCurrentTeacher) return (<Preloader />);
		return children(teacher.isAuth, roleUser);
	}
	if (roleUser === 'student') {
		if (student.loads.isLoadGetCurrentStudent) return (<Preloader />);
		return children(student.isAuth, roleUser);
	}
	console.log(teacher, student);
	return children(false, roleUser);
});

WaitForUser.propTypes ={
	children: pt.func.isRequired,
};
