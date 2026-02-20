import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Scissors, Loader2, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const { user, isAdmin, loading: authLoading, adminLoading } = useAuth();
  const { signIn: adminSignIn } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (!authLoading && !adminLoading && user && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [user, isAdmin, authLoading, adminLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setError("");
    setLoading(true);
    try {
      // Use adminSignIn which validates the user has admin/manager/staff role
      await adminSignIn(email, password);
      // Force a small delay to let the auth context pick up the session
      setTimeout(() => {
        navigate("/admin");
      }, 100);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-black p-2 rounded">
              <Scissors className="w-5 h-5 text-white rotate-[-30deg]" />
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold text-black">Admin Login</h1>
          <p className="font-body text-sm text-gray-400 mt-1">Sign in to manage your store</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded px-3 py-2">
              <p className="font-body text-xs text-red-600">{error}</p>
            </div>
          )}
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full border border-gray-200 rounded px-3 py-2.5 pr-10 font-body text-sm focus:outline-none focus:border-black"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!email || !password || loading}
            className="w-full bg-black text-white rounded py-2.5 font-body text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign In
          </button>
        </form>
        <p className="text-center font-body text-xs text-gray-400 mt-4">
          <a href="/" className="hover:text-black transition-colors">Back to store</a>
        </p>
        <p className="text-center font-body text-xs text-gray-400 mt-2">
          <a href="/admin/register" className="hover:text-black transition-colors">First time? Create Super Admin account</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
