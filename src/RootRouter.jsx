import {memo} from 'react';
import {
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import {MyLessons} from '@src/pages/MyLessons';
import {OneLesson} from '@src/pages/OneLesson';
import {MyClasses} from '@src/pages/MyClasses';
import {StudentList} from '@src/pages/StudentList';
import {OneStudent} from '@src/pages/OneStudent';
import {NotFoundView} from '@src/pages/NotFoundView';
import {ProfileTeacher} from '@src/pages/ProfileTeacher';

import {OneStudentForStudent} from '@src/pages/OneStudentForStudent';

import {Signup} from '@src/pages/Signup';
import {Login} from '@src/pages/Login';
import {WaitForUser} from '@src/layouts/WaitForUser';
import {MainLayout} from '@src/layouts/MainLayout';
import {TeacherMenuLayout} from '@src/layouts/TeacherMenuLayout';
import {StudentMenuLayout} from '@src/layouts/StudentMenuLayout';


const RootRouter = () => {
    return (
        <MainLayout>
            <WaitForUser>
                {(userIsAuth, roleUser) => (
                    <Switch>
                        <Route path={[
                            '/login',
                            '/signup',
                        ]} >
                            <Switch>
                                {userIsAuth && roleUser === 'teacher' && (
                                    <Redirect to="/classes"/>
                                )}
                                {userIsAuth && roleUser === 'student' && (
                                    <Redirect to="/student/lessons"/>
                                )}
                                <Route path={'/login'} component={Login} exact/>
                                <Route path={'/signup'} component={Signup} exact/>
                            </Switch>
                        </Route>
                        <Route path={[
                            '/',
                        ]} >
                            {(!userIsAuth || !roleUser) && (
                                <Redirect to="/login"/>
                            )}
                            {roleUser === 'teacher' && (
                                <TeacherMenuLayout>
                                    <Switch>
                                        <Route path={'/classes'} component={MyClasses} exact/>
                                        <Route path={'/class/:mongoClassId'} component={StudentList} exact/>
                                        <Route path={'/student/:idBracelet'} component={OneStudent} exact/>
                                        <Route path={'/lessons'} component={MyLessons} exact/>
                                        <Route path={'/profile/teacher'} component={ProfileTeacher} exact/>
                                        <Route path={'/lesson/:mongoLessonId'} component={OneLesson} exact/>
                                        <Route path='*' component={NotFoundView}/>
                                    </Switch>
                                </TeacherMenuLayout>
                            )}
                            {roleUser === 'student' && (
                                <StudentMenuLayout>
                                    <Switch>
                                        <Route path={'/student/lessons'} component={OneStudentForStudent} exact/>
                                    </Switch>
                                </StudentMenuLayout>
                            )}
                        </Route>
                    </Switch>
                )}
            </WaitForUser>
        </MainLayout>
)};

RootRouter.propTypes = {
};

export default memo(RootRouter);


