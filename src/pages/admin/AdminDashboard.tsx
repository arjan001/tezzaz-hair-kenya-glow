import { Link } from "react-router-dom";
import { Package, ShoppingCart, ArrowRight, Image, Loader2, Mail, TrendingUp } from "lucide-react";
import { useProducts } from "@/integrations/supabase/hooks/useProducts";
import { useOrders } from "@/integrations/supabase/hooks/useOrders";
import { useSubscribers } from "@/integrations/supabase/hooks/useNewsletter";
import { useGallery } from "@/integrations/supabase/hooks/useGallery";

const AdminDashboard = () => {
  const { data: products = [], isLoading: pLoading } = useProducts(false);
  const { data: orders = [], isLoading: oLoading } = useOrders();
  const { data: subscribers = [] } = useSubscribers();
  const { data: gallery = [] } = useGallery();

  const totalRevenue = orders.filter((o) => o.status === "delivered").reduce((s, o) => s + Number(o.total), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const activeSubscribers = subscribers.filter((s) => s.subscribed).length;

  const stats = [
    { label: "TOTAL PRODUCTS", value: products.length, sub: `${products.filter(p => p.in_stock).length} in stock`, icon: Package },
    { label: "TOTAL ORDERS", value: orders.length, sub: `${pendingOrders} pending`, icon: ShoppingCart },
    { label: "REVENUE", value: `KSh ${totalRevenue.toLocaleString()}`, sub: "From delivered orders", icon: TrendingUp },
    { label: "SUBSCRIBERS", value: activeSubscribers, sub: "Newsletter", icon: Mail },
  ];

  const quickActions = [
    { label: "Manage Products", desc: "Add, edit or remove products", icon: Package, href: "/admin/products" },
    { label: "Manage Gallery", desc: "Add hair style designs", icon: Image, href: "/admin/gallery" },
    { label: "View Orders", desc: "Manage customer orders", icon: ShoppingCart, href: "/admin/orders" },
    { label: "View Store", desc: "See how customers see it", icon: TrendingUp, href: "/" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-black mb-1">Dashboard</h1>
      <p className="font-body text-sm text-gray-500 mb-8">Welcome back. Here's an overview of your store.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="font-body text-[10px] uppercase tracking-widest text-gray-400 font-medium">{stat.label}</p>
                <Icon className="w-4 h-4 text-gray-300" />
              </div>
              {(pLoading || oLoading) ? <Loader2 className="w-5 h-5 text-gray-300 animate-spin" /> : (
                <>
                  <p className="font-display text-2xl font-bold text-black">{stat.value}</p>
                  <p className="font-body text-xs text-gray-400 mt-1">{stat.sub}</p>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} to={action.href}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-colors group">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="font-body text-sm font-bold text-black">Recent Products</p>
            <Link to="/admin/products" className="font-body text-xs text-gray-400 hover:text-black flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
          </div>
          {pLoading ? (
            <div className="px-5 py-10 flex justify-center"><Loader2 className="w-5 h-5 text-gray-300 animate-spin" /></div>
          ) : products.length === 0 ? (
            <div className="px-5 py-10 text-center"><p className="font-body text-sm text-gray-400">No products yet</p></div>
          ) : (
            <div className="divide-y divide-gray-50">
              {products.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                  <img src={p.img_url || "/placeholder.svg"} alt={p.name} className="w-10 h-10 object-cover rounded border border-gray-100" />
                  <div className="flex-1">
                    <p className="font-body text-sm font-medium text-black">{p.name}</p>
                    <p className="font-body text-xs text-gray-400">{p.category_name}</p>
                  </div>
                  <span className="font-body text-sm font-bold text-black">KSh {Number(p.price_num).toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="font-body text-sm font-bold text-black">Recent Orders</p>
            <Link to="/admin/orders" className="font-body text-xs text-gray-400 hover:text-black flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
          </div>
          {oLoading ? (
            <div className="px-5 py-10 flex justify-center"><Loader2 className="w-5 h-5 text-gray-300 animate-spin" /></div>
          ) : orders.length === 0 ? (
            <div className="px-5 py-10 text-center"><p className="font-body text-sm text-gray-400">No orders yet</p></div>
          ) : (
            <div className="divide-y divide-gray-50">
              {orders.slice(0, 5).map((o) => (
                <div key={o.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="font-body text-sm font-bold text-black">{o.order_code}</p>
                    <p className="font-body text-xs text-gray-400">{o.customer_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-sm font-bold">KSh {Number(o.total).toLocaleString()}</p>
                    <span className="font-body text-[10px] uppercase text-gray-500">{o.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gallery Preview */}
      {gallery.length > 0 && (
        <div className="mt-6 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="font-body text-sm font-bold text-black">Recent Gallery ({gallery.length} styles)</p>
            <Link to="/admin/gallery" className="font-body text-xs text-gray-400 hover:text-black flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="flex gap-3 p-5 overflow-x-auto">
            {gallery.slice(0, 8).map((item) => (
              <div key={item.id} className="flex-shrink-0">
                <img src={item.image_url} alt={item.style_name} className="w-20 h-20 object-cover rounded border border-gray-100" />
                <p className="font-body text-[10px] text-gray-500 mt-1 text-center truncate w-20">{item.style_name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
