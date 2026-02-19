import { useState } from "react";
import {
  Plus,
  Shield,
  Pencil,
  Eye,
  Users,
  MoreHorizontal,
  X,
  Trash2,
} from "lucide-react";

interface Role {
  name: string;
  description: string;
  icon: typeof Shield;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

const roles: Role[] = [
  { name: "Super Admin", description: "Full system access, user management", icon: Shield },
  { name: "Admin", description: "Manage products, orders, settings", icon: Users },
  { name: "Editor", description: "Add and edit products, banners", icon: Pencil },
  { name: "Viewer", description: "View-only access to dashboard", icon: Eye },
];

const initialUsers: User[] = [
  { id: "1", name: "Tezzaz Hair", email: "admin@tezzazhair.com", role: "Super Admin", status: "active", lastLogin: "19 Feb 2026" },
];

const AdminUsersRoles = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Viewer",
  });

  const resetForm = () => {
    setFormData({ name: "", email: "", role: "Viewer" });
  };

  const handleAdd = () => {
    const newUser: User = {
      id: String(Date.now()),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: "active",
      lastLogin: "Never",
    };
    setUsers((prev) => [...prev, newUser]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedUser) return;
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUser.id
          ? { ...u, name: formData.name, email: formData.email, role: formData.role }
          : u
      )
    );
    setShowEditModal(false);
    setSelectedUser(null);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const toggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  const UserFormModal = ({
    title,
    onSubmit,
    submitLabel,
    onClose,
  }: {
    title: string;
    onSubmit: () => void;
    submitLabel: string;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Full Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Jane Doe"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. jane@example.com"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Role *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white"
            >
              {roles.map((r) => (
                <option key={r.name} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!formData.name || !formData.email}
              className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors disabled:bg-gray-300"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Users & Roles</h1>
          <p className="font-body text-sm text-gray-400">{users.length} team members</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Team Member
        </button>
      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <div key={role.name} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-body text-sm font-bold text-black">{role.name}</p>
                  <p className="font-body text-xs text-gray-400 mt-0.5">{role.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Users Table */}
      <div className="flex items-center gap-2 mb-4">
        <p className="font-body text-sm font-bold text-black">Active Users</p>
        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-body text-[11px] font-medium">
          {users.length}
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">User</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Role</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Last Login</th>
                <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-body text-sm font-bold text-black">{user.name}</p>
                        <p className="font-body text-[11px] text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide bg-black text-white">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide cursor-pointer ${
                        user.status === "active"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-body text-sm text-gray-500">{user.lastLogin}</span>
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
                                setFormData({ name: user.name, email: user.email, role: user.role });
                                setShowEditModal(true);
                                setOpenMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 font-body text-xs text-gray-600 hover:bg-gray-50 flex items-center gap-2"
                            >
                              <Pencil className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDeleteModal(true);
                                setOpenMenu(null);
                              }}
                              className="w-full text-left px-3 py-2 font-body text-xs text-red-500 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="font-body text-xs text-gray-400">Showing 1-{users.length} of {users.length}</p>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-gray-400">Per page</span>
            <select className="border border-gray-200 rounded px-2 py-1 font-body text-xs bg-white">
              <option>10</option>
              <option>25</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <UserFormModal
          title="Add Team Member"
          onSubmit={handleAdd}
          submitLabel="Add Team Member"
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <UserFormModal
          title="Edit Team Member"
          onSubmit={handleEdit}
          submitLabel="Save Changes"
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
            resetForm();
          }}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="font-display text-lg font-bold text-black mb-2">Remove Team Member?</h2>
              <p className="font-body text-sm text-gray-500 mb-6">
                Are you sure you want to remove "{selectedUser.name}"? They will lose all access.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowDeleteModal(false); setSelectedUser(null); }}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersRoles;
