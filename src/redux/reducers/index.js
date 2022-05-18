import teacher from './teacherReducer';
import student from './studentReducer';
import classList from './classReducer';
import classOne from './classOneReducer';
import lessonList from './lessonReducer';
import lessonOne from './lessonOneReducer';
import statistic from './statisticReducer';
import studentLessons from './studentLessonsReducer';

const rootReducer = {
    teacher,
    student,
    classList,
    classOne,
    lessonList,
    lessonOne,
    statistic,
    studentLessons,
};

export default rootReducer;
