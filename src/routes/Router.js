import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import EditCourse from 'src/views/editCourse';
import DetailTest from 'src/views/detailTest';
import EditTest from 'src/views/editTest';
import CourseApprove from 'src/views/courseApprove';
import ListQuestion from 'src/views/listQuestion';
import Tests from 'src/views/tests';
import ReportTest from 'src/views/reportTest';
import ReportCourse from 'src/views/reportCourse';
import Blog from 'src/views/blog';
import DetailBLog from 'src/views/detailBlog';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const UsersPage = Loadable(lazy(() => import('src/views/users')));
const DetailLessonPage = Loadable(lazy(() => import('src/views/detailLesson')));
const DetailUserPage = Loadable(lazy(() => import('src/views/detailUser')));
const DetailCoursePage = Loadable(lazy(() => import('src/views/detailCourse')));
const MyCoursesPage = Loadable(lazy(() => import('src/views/myCourses')));
const CoursesPage = Loadable(lazy(() => import('src/views/courses')));
const CreatedCoursesPage = Loadable(lazy(() => import('src/views/createdCourses')));
const CreatedTestPage = Loadable(lazy(() => import('src/views/createdTest')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/users', exact: true, element: <UsersPage /> },
      { path: '/courses-approve', exact: true, element: <CourseApprove /> },
      { path: '/user/:id', exact: true, element: <DetailUserPage /> },
      { path: '/created-courses', exact: true, element: <CreatedCoursesPage /> },
      { path: '/created-test', exact: true, element: <CreatedTestPage /> },
      { path: '/courses', exact: true, element: <CoursesPage /> },
      { path: '/exam', exact: true, element: <ListQuestion /> },
      { path: '/course/:id', exact: true, element: <DetailCoursePage /> },
      { path: '/tests', exact: true, element: <Tests /> },
      { path: '/blog', exact: true, element: <Blog /> },
      { path: '/blog/:id', exact: true, element: <DetailBLog /> },
      { path: '/report/tests', exact: true, element: <ReportTest /> },
      { path: '/report/courses', exact: true, element: <ReportCourse /> },
      { path: '/test/:id', exact: true, element: <DetailTest /> },
      { path: '/test/:id/edit', exact: true, element: <EditTest /> },
      { path: '/lesson/:id', exact: true, element: <DetailLessonPage /> },
      { path: '/course/:id/edit', exact: true, element: <EditCourse /> },
      { path: '/my-courses', exact: true, element: <MyCoursesPage /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
