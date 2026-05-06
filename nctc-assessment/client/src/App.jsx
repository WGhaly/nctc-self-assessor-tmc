import { Routes, Route, Navigate } from 'react-router-dom';
import { AssessmentProvider, useAssessment } from './context/AssessmentContext';
import Landing from './pages/Landing';
import InventorForm from './pages/InventorForm';
import MatrixAssessment from './pages/MatrixAssessment';
import Review from './pages/Review';
import Confirmation from './pages/Confirmation';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import SubmissionDetail from './pages/admin/SubmissionDetail';

// Guard: redirect to /assessment/info if required data is missing
function GuardedRoute({ children, requires }) {
  const { data } = useAssessment();
  for (const key of requires) {
    if (!data[key]) return <Navigate to="/assessment/info" replace />;
  }
  return children;
}

export default function App() {
  return (
    <AssessmentProvider>
      <Routes>
        {/* Public app */}
        <Route path="/" element={<Landing />} />
        <Route path="/assessment/info" element={<InventorForm />} />
        <Route
          path="/assessment/trl"
          element={
            <GuardedRoute requires={['fullName', 'phone', 'affiliation', 'inventionTitle', 'sector']}>
              <MatrixAssessment key="trl" type="trl" />
            </GuardedRoute>
          }
        />
        <Route
          path="/assessment/mrl"
          element={
            <GuardedRoute requires={['trl']}>
              <MatrixAssessment key="mrl" type="mrl" />
            </GuardedRoute>
          }
        />
        <Route
          path="/assessment/crl"
          element={
            <GuardedRoute requires={['mrl']}>
              <MatrixAssessment key="crl" type="crl" />
            </GuardedRoute>
          }
        />
        <Route
          path="/assessment/review"
          element={
            <GuardedRoute requires={['crl']}>
              <Review />
            </GuardedRoute>
          }
        />
        <Route path="/assessment/confirmation" element={<Confirmation />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/submissions/:id" element={<SubmissionDetail />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AssessmentProvider>
  );
}
