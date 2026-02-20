import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isAdmin, adminLoading } = useAuth();

  if (loading || adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <Loader2 className="w-6 h-6 text-gray-400 mx-auto animate-spin mb-2" />
          <p className="font-body text-sm text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
        <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-sm w-full text-center">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-xl font-bold">!</span>
          </div>
          <h2 className="font-display text-lg font-bold text-black mb-2">Access Denied</h2>
          <p className="font-body text-sm text-gray-500 mb-4">
            Your account does not have admin privileges. Contact the store owner to get access.
          </p>
          <a href="/" className="inline-block px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors">
            Back to Store
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
