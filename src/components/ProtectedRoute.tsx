
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Beaker } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mezcal-50 to-agave-50">
        <div className="text-center">
          <Beaker className="w-8 h-8 animate-spin mx-auto mb-4 text-mezcal-600" />
          <p className="text-mezcal-700">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
