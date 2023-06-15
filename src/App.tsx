import { Suspense, useEffect } from 'react';
import { lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { privateAxios } from './axiosConfig';
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
const MonitorPage = lazy(() => import('./pages/Client/MonitorPage'));
const OperatePage = lazy(() => import('./pages/Client/OperatePage'));
const ExportPage = lazy(() => import('./pages/Client/ExportPage'));
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
const AdminEditProjectPage = lazy(
  () => import('./pages/Admin/AdminEditProjectPage')
);
const AdminAddNewUserPage = lazy(
  () => import('./pages/Admin/AdminAddNewUserPage')
);
const AdminAddNewStaffPage = lazy(
  () => import('./pages/Admin/AdminAddNewStaffPage')
);
const AdminAddNewProjectPage = lazy(
  () => import('./pages/Admin/AdminAddNewProjectPage')
);
const AdminDashboardPage = lazy(
  () => import('./pages/Admin/AdminDashboardPage')
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
      privateAxios.request({
        method: 'POST',
        url: '/p/access-history/' + userData.project_id,
      });
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
                  userData.role_id === 3
                    ? '/admin/dashboard'
                    : '/client/general'
                }
              />
            }
          />
          <Route path="client">
            <Route path="project-info" element={<ProjectInfoPage />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="calender" element={<CalenderPage />} />
            <Route path="monitor" element={<MonitorPage />} />
            <Route path="operate" element={<OperatePage />} />
            <Route path="export" element={<ExportPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route path="general" element={<GeneralPage />} />
            <Route path="staff-info/:id" element={<StaffInfoPage />} />
            <Route path="project-info/:id" element={<ProjectInfoPage />} />
          </Route>
          <Route path="admin" element={<ProtectedAdmin />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />

            <Route path="user/manage" element={<AdminManageUserPage />} />
            <Route path="user/edit/:id" element={<AdminEditUserPage />} />
            <Route path="user/add-new" element={<AdminAddNewUserPage />} />

            <Route path="staff/manage" element={<AdminManageStaffPage />} />
            <Route path="staff/edit/:id" element={<AdminEditStaffPage />} />
            <Route path="staff/add-new" element={<AdminAddNewStaffPage />} />

            <Route path="project/manage" element={<AdminManageProjectPage />} />
            <Route path="project/edit/:id" element={<AdminEditProjectPage />} />
            <Route
              path="project/add-new"
              element={<AdminAddNewProjectPage />}
            />
          </Route>
          <Route path="manager" element={<ProtectedManager />}>
            <Route path="user/manage" element={<ManagerManageUserPage />} />
            <Route path="user/edit/:id" element={<ManagerEditUserPage />} />
            <Route path="user/add-new" element={<ManagerAddNewUserPage />} />
          </Route>
          <Route path="test" element={<TestPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
