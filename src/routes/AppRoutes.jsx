import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Upgrade from '@/pages/Upgrade';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/app" element={<Index />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/upgrade" element={<Upgrade />} />
    </Routes>
  );
}
