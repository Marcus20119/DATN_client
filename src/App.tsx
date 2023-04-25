import { Suspense, useEffect } from 'react';
import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Cookie } from './helpers';
import {
  AuthLayout,
  MainLayout,
  ProtectedAdmin,
  ProtectedManager,
} from './layouts';
import SignInPage from './pages/Auth/SignInPage';
import SignUpPage from './pages/Auth/SignUpPage';

import LoadingPage from './pages/LoadingPage';
import NotFoundPage from './pages/NotFoundPage';
import { actionGetThisUserData } from './store/auth/auth.action';
import { IRootState } from './store/rootReducer';

const ProjectInfoPage = lazy(() => import('./pages/Client/ProjectInfoPage'));
const ProcessPage = lazy(() => import('./pages/Client/ProcessPage'));
const CalenderPage = lazy(() => import('./pages/Client/CalenderPage'));
const MonitorPage = lazy(() => import('./pages/Client/Monitor/MonitorPage'));
const AdminManageUserPage = lazy(
  () => import('./pages/Admin/ManageUserPage/AdminManageUserPage')
);
const ManagerManageUserPage = lazy(
  () => import('./pages/Manager/ManageUserPage/ManagerManageUserPage')
);
const TestPage = lazy(() => import('./pages/TestPage'));

function App() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: IRootState) => state.auth);
  useEffect(() => {
    const userId = Cookie.get('user_id');
    if (userId) {
      dispatch(actionGetThisUserData(userId));
    }
  }, []);
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route
            path=""
            element={
              <Navigate
                replace
                to={
                  userData.role_id === 3
                    ? '/client/process'
                    : '/client/project-info'
                }
              />
            }
          />
          <Route path="client">
            <Route path="project-info" element={<ProjectInfoPage />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="calender" element={<CalenderPage />} />
            <Route path="monitor" element={<MonitorPage />} />
          </Route>
          <Route path="admin" element={<ProtectedAdmin />}>
            <Route path="manage-user" element={<AdminManageUserPage />} />
          </Route>
          <Route path="manager" element={<ProtectedManager />}>
            <Route path="manage-user" element={<ManagerManageUserPage />} />
          </Route>
          <Route path="test" element={<TestPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
