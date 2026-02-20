import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scissors, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAdminAuth, useAdminExists } from "@/hooks/useAdminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn } = useAdminAuth();
  const { exists: adminExists, loading: checkingAdmin } = useAdminExists();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAdmin) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-black p-3 rounded-lg mb-4">
            <Scissors className="w-6 h-6 text-white rotate-[-30deg]" />
          </div>
          <h1 className="font-display text-2xl font-bold text-black">Admin Login</h1>
          <p className="font-body text-sm text-gray-400 mt-1">Sign in to Tezzaz Hair Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tezzazhair.com"
                className="w-full border border-gray-200 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="font-body text-xs font-medium text-black block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded px-4 py-3">
                <p className="font-body text-xs text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-body text-sm font-medium py-3 rounded hover:bg-gray-800 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign In
            </button>
          </form>

          {adminExists === false && (
            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="font-body text-xs text-gray-400 mb-2">No admin account yet?</p>
              <button
                onClick={() => navigate("/admin/register")}
                className="font-body text-xs font-bold text-black hover:underline"
              >
                Register Super Admin
              </button>
            </div>
          )}
        </div>

        <p className="font-body text-[11px] text-gray-400 text-center mt-6">
          Tezzaz Hair & Beauty Admin Panel
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
