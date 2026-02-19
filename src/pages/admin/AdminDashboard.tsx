import { Package, Tag, Percent, ShoppingCart, Eye, ArrowRight, Image } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { label: "TOTAL PRODUCTS", value: 0, sub: "No products yet", icon: Package },
  { label: "CATEGORIES", value: 0, sub: "No categories yet", icon: Tag },
  { label: "ACTIVE OFFERS", value: 0, sub: "None running", icon: Percent },
  { label: "TOTAL ORDERS", value: 0, sub: "KSh 0 revenue", icon: ShoppingCart },
];

const quickActions = [
  { label: "Manage Products", desc: "Add, edit or remove products", icon: Package, href: "/admin/products" },
  { label: "Manage Gallery", desc: "Add hair style designs", icon: Image, href: "/admin/gallery" },
  { label: "View Orders", desc: "Manage customer orders", icon: ShoppingCart, href: "/admin/orders" },
  { label: "View Store", desc: "See how customers see it", icon: Eye, href: "/" },
];

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-black mb-1">Dashboard</h1>
      <p className="font-body text-sm text-gray-500 mb-8">Welcome back. Here's an overview of your store.</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 font-medium">{stat.label}</p>
                <Icon className="w-4 h-4 text-gray-300" />
              </div>
              <p className="font-display text-3xl font-bold text-black">{stat.value}</p>
              <p className="font-body text-xs text-gray-400 mt-1">{stat.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={action.href}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                <div>
                  <p className="font-body text-sm font-bold text-black">{action.label}</p>
                  <p className="font-body text-xs text-gray-400">{action.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Products & Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="font-body text-sm font-bold text-black">Recent Products</p>
            <Link to="/admin/products" className="font-body text-xs text-gray-400 hover:text-black transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="px-5 py-10 text-center">
            <p className="font-body text-sm text-gray-400">No products yet</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="font-body text-sm font-bold text-black">Recent Orders</p>
            <Link to="/admin/orders" className="font-body text-xs text-gray-400 hover:text-black transition-colors flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="px-5 py-10 text-center">
            <p className="font-body text-sm text-gray-400">No orders yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
