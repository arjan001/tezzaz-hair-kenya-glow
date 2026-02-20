import { useState } from "react";
import {
  Shield,
  Users,
  MoreHorizontal,
  X,
  Loader2,
  UserPlus,
  Trash2,
} from "lucide-react";
import { useUsers, DbProfile } from "@/integrations/supabase/hooks/useUsers";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

const AddUserModal = ({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      // Sign up the new user via Supabase Auth
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (signUpErr) throw signUpErr;
      if (!data.user) throw new Error("Failed to create user");

      // The handle_new_user trigger should auto-assign admin role.
      // As a safety measure, ensure admin role is set:
      // Remove any non-admin role first
      await supabase.from("user_roles").delete().eq("user_id", data.user.id).neq("role", "admin");

      // Ensure admin role exists
      const { error: roleErr } = await supabase
        .from("user_roles")
        .upsert(
          [{ user_id: data.user.id, role: "admin" as const }],
          { onConflict: "user_id,role" }
        );
      if (roleErr) {
        console.error("Role upsert error:", roleErr.message);
      }

      toast({ title: "Team member added!", description: `${fullName} has been registered as an admin.` });
      onSuccess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to add user";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold">Add Team Member</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded px-3 py-2">
            <p className="font-body text-xs text-blue-700">
              New team members get full admin access to manage the store.
            </p>
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Full Name *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Jane Doe"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. jane@example.com"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded px-3 py-2">
              <p className="font-body text-xs text-red-600">{error}</p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !fullName || !email || !password}
              className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors disabled:bg-gray-300 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-3 h-3 animate-spin" />}
              Add Team Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteUserModal = ({
  user,
  onClose,
  onSuccess,
}: {
  user: DbProfile;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Delete user role
      await supabase.from("user_roles").delete().eq("user_id", user.id);
      // Delete profile
      await supabase.from("profiles").delete().eq("id", user.id);

      toast({ title: "User removed", description: `${user.full_name || user.email} has been removed.` });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to remove user";
      toast({ title: "Error", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold text-red-600">Remove User</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <p className="font-body text-sm text-gray-600">
            Are you sure you want to remove <strong>{user.full_name || user.email}</strong>?
            This will remove their admin access.
          </p>
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="px-5 py-2.5 bg-red-600 text-white rounded font-body text-xs hover:bg-red-700 transition-colors disabled:bg-gray-300 flex items-center gap-2"
            >
              {loading && <Loader2 className="w-3 h-3 animate-spin" />}
              Remove User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminUsersRoles = () => {
  const { data: users = [], isLoading } = useUsers();
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DbProfile | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleAddSuccess = () => {
    setShowAddModal(false);
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  const handleDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  };

  // All users in the system are admins
  const adminUsers = users;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Team Members</h1>
          <p className="font-body text-sm text-gray-400">
            {adminUsers.length} team {adminUsers.length === 1 ? "member" : "members"} &middot; All members have full admin access
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5" /> Add Team Member
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 mb-8">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="font-body text-sm font-bold text-black">Full Access for All Members</p>
            <p className="font-body text-xs text-gray-400 mt-0.5">
              Every team member has full admin access to manage products, orders, gallery, settings, and all other features.
            </p>
          </div>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="flex items-center gap-2 mb-4">
        <p className="font-body text-sm font-bold text-black">Team Members</p>
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-body text-[11px] font-medium">
          {adminUsers.length}
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">User</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Access</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Joined</th>
                <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center">
                    <Loader2 className="w-6 h-6 text-gray-300 mx-auto animate-spin" />
                  </td>
                </tr>
              )}
              {!isLoading && adminUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-body text-sm font-bold text-black">{user.full_name || "—"}</p>
                        <p className="font-body text-[11px] text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide bg-black text-white">
                      Admin
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-body text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end relative">
                      <button
                        onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-black"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      {openMenu === user.id && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px] py-1">
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDeleteModal(true);
                                setOpenMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 font-body text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove User
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && adminUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center">
                    <Users className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="font-body text-sm text-gray-400">No team members yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      {/* Delete User Modal */}
      {showDeleteModal && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={() => { setShowDeleteModal(false); setSelectedUser(null); }}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default AdminUsersRoles;
