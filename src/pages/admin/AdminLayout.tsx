import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Eye,
  Scissors,
  Menu,
  X,
  Palette,
  Mail,
  Truck,
  BarChart3,
  FileText,
  Image,
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Gallery", href: "/admin/gallery", icon: Image },
  { label: "Categories", href: "/admin/categories", icon: Tag },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Theme", href: "/admin/theme", icon: Palette },
  { label: "Newsletter", href: "/admin/newsletter", icon: Mail },
  { label: "Delivery", href: "/admin/delivery", icon: Truck },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Policies", href: "/admin/policies", icon: FileText },
  { label: "Users & Roles", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(href);
  };

  const currentPage = sidebarLinks.find((l) => isActive(l.href))?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[240px] bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:flex`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-black p-1.5 rounded">
              <Scissors className="w-4 h-4 text-white rotate-[-30deg]" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-black leading-tight">TZ Admin</p>
              <p className="font-body text-[10px] text-gray-400">Tezzaz Hair Admin</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-body transition-colors ${
                  active
                    ? "bg-black text-white font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-gray-200 px-4 py-4">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="font-body text-xs font-bold text-black leading-tight">TEZZAZ HAIR</p>
              <p className="font-body text-[10px] text-gray-400">Super Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 font-body text-[11px] text-gray-500 hover:text-black transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 font-body text-[11px] text-gray-500 hover:text-black transition-colors"
            >
              <Eye className="w-3.5 h-3.5" /> View Store
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 h-14 flex items-center justify-between px-5 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5 text-black" />
            </button>
            <nav className="flex items-center gap-1.5 font-body text-xs text-gray-400">
              <span>Admin</span>
              <span>›</span>
              <span className="text-black font-medium">{currentPage}</span>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="font-body text-xs text-gray-500 hover:text-black transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
