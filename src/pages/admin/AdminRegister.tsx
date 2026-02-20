import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Scissors, Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { useAdminAuth, useAdminExists } from "@/hooks/useAdminAuth";

const AdminRegister = () => {
  const navigate = useNavigate();
  const { signUp } = useAdminAuth();
  const { exists: adminExists, loading: checkingAdmin } = useAdminExists();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Redirect if admin already exists
  useEffect(() => {
    if (adminExists === true) {
      navigate("/admin/login");
    }
  }, [adminExists, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, fullName);
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
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

  if (success) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center bg-green-500 p-4 rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-black mb-2">Super Admin Created!</h1>
          <p className="font-body text-sm text-gray-500 mb-2">
            Your super admin account has been registered successfully.
          </p>
          <p className="font-body text-xs text-gray-400 mb-8">
            If email confirmation is enabled on your Supabase project, please check your inbox first.
            Otherwise, you can log in immediately.
          </p>
          <button
            onClick={() => navigate("/admin/login")}
            className="bg-black text-white font-body text-sm font-medium px-8 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Go to Login
          </button>
        </div>
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
          <h1 className="font-display text-2xl font-bold text-black">Create Super Admin</h1>
          <p className="font-body text-sm text-gray-400 mt-1">
            Register the first administrator account
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 flex items-start gap-3">
          <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="font-body text-xs text-amber-700">
            This is a one-time setup. The first registered user will automatically become the Super Admin
            with full system access. Additional admins can be added from the dashboard.
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Tezzaz Hair Admin"
                className="w-full border border-gray-200 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>

            <div>
              <label className="font-body text-xs font-medium text-black block mb-1.5">
                Email Address *
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
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
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

            <div>
              <label className="font-body text-xs font-medium text-black block mb-1.5">
                Confirm Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full border border-gray-200 rounded px-4 py-3 font-body text-sm focus:outline-none focus:border-black transition-colors"
              />
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
              Create Super Admin Account
            </button>
          </form>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/admin/login")}
            className="font-body text-xs text-gray-400 hover:text-black"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
