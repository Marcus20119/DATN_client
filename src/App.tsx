import { Suspense } from 'react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import SignInPage from './pages/Auth/SignInPage';
import SignUpPage from './pages/Auth/SignUpPage';

import LoadingPage from './pages/LoadingPage';
import NotFoundPage from './pages/NotFoundPage';

const ProjectInfoPage = lazy(() => import('./pages/Client/ProjectInfoPage'));
const ProcessPage = lazy(() => import('./pages/Client/ProcessPage'));
const CalenderPage = lazy(() => import('./pages/Client/CalenderPage'));
const MonitorPage = lazy(() => import('./pages/Client/Monitor/MonitorPage'));
const ManageUserPage = lazy(
  () => import('./pages/Admin/ManageUserPage/ManageUserPage')
);
const TestPage = lazy(() => import('./pages/TestPage'));

function App() {
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
            element={<Navigate replace to="/client/project-info" />}
          />
          <Route path="client/project-info" element={<ProjectInfoPage />} />
          <Route path="client/process" element={<ProcessPage />} />
          <Route path="client/calender" element={<CalenderPage />} />
          <Route path="client/monitor" element={<MonitorPage />} />
          <Route path="admin/manage-user" element={<ManageUserPage />} />
          <Route path="test" element={<TestPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
