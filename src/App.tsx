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
const AccountPage = lazy(() => import('./pages/Client/AccountPage'));
const StaffInfoPage = lazy(() => import('./pages/Client/StaffInfoPage'));
const GeneralPage = lazy(() => import('./pages/Client/GeneralPage'));

const AdminManageUserPage = lazy(
  () => import('./pages/Admin/ManageUserPage/AdminManageUserPage')
);
const AdminManageStaffPage = lazy(
  () => import('./pages/Admin/ManageStaffPage/AdminManageStaffPage')
);
const AdminManageProjectPage = lazy(
  () => import('./pages/Admin/ManageProjectPage/AdminManageProjectPage')
);
const AdminEditUserPage = lazy(() => import('./pages/Admin/AdminEditUserPage'));
const AdminEditStaffPage = lazy(
  () => import('./pages/Admin/AdminEditStaffPage')
);
const AdminAddNewUserPage = lazy(
  () => import('./pages/Admin/AdminAddNewUserPage')
);
const AdminAddNewStaffPage = lazy(
  () => import('./pages/Admin/AdminAddNewStaffPage')
);

const ManagerManageUserPage = lazy(
  () => import('./pages/Manager/ManageUserPage/ManagerManageUserPage')
);
const ManagerEditUserPage = lazy(
  () => import('./pages/Manager/ManagerEditUserPage')
);
const ManagerAddNewUserPage = lazy(
  () => import('./pages/Manager/ManagerAddNewUserPage')
);

const TestPage = lazy(() => import('./pages/TestPage'));

function App() {
  const dispatch = useDispatch();
  const { userData, toggleForceRefetchThisUserData } = useSelector(
    (state: IRootState) => state.auth
  );
  useEffect(() => {
    const userId = Cookie.get('user_id');
    if (userId) {
      dispatch(actionGetThisUserData(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleForceRefetchThisUserData]);
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
                  userData.role_id === 3 ? '/client/process' : '/client/general'
                }
              />
            }
          />
          <Route path="client">
            <Route path="project-info" element={<ProjectInfoPage />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="calender" element={<CalenderPage />} />
            <Route path="monitor" element={<MonitorPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="general" element={<GeneralPage />} />
            <Route path="staff-info/:id" element={<StaffInfoPage />} />
            <Route path="project-info/:id" element={<ProjectInfoPage />} />
          </Route>
          <Route path="admin" element={<ProtectedAdmin />}>
            <Route path="manage-user" element={<AdminManageUserPage />} />
            <Route path="manage-staff" element={<AdminManageStaffPage />} />
            <Route path="manage-project" element={<AdminManageProjectPage />} />
            <Route path="edit-user/:id" element={<AdminEditUserPage />} />
            <Route path="edit-staff/:id" element={<AdminEditStaffPage />} />
            <Route path="add-new-user" element={<AdminAddNewUserPage />} />
            <Route path="add-new-staff" element={<AdminAddNewStaffPage />} />
          </Route>
          <Route path="manager" element={<ProtectedManager />}>
            <Route path="manage-user" element={<ManagerManageUserPage />} />
            <Route path="edit-user/:id" element={<ManagerEditUserPage />} />
            <Route path="add-new-user" element={<ManagerAddNewUserPage />} />
          </Route>
          <Route path="test" element={<TestPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
