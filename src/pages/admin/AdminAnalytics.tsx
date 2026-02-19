import { useState } from "react";
import {
  Users,
  Eye,
  ShoppingCart,
  TrendingUp,
  Globe,
  Clock,
  Monitor,
  Smartphone,
  MousePointer,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
} from "lucide-react";

type Period = "today" | "7days" | "30days" | "90days";

const generateData = (period: Period) => {
  const multiplier = period === "today" ? 1 : period === "7days" ? 7 : period === "30days" ? 30 : 90;
  return {
    visitors: Math.round(45 * multiplier + Math.random() * 20 * multiplier),
    pageViews: Math.round(120 * multiplier + Math.random() * 50 * multiplier),
    orders: Math.round(3 * multiplier + Math.random() * 2 * multiplier),
    revenue: Math.round(4500 * multiplier + Math.random() * 2000 * multiplier),
    bounceRate: Math.round(35 + Math.random() * 15),
    avgSessionDuration: `${Math.round(2 + Math.random() * 3)}m ${Math.round(Math.random() * 59)}s`,
    conversionRate: (2 + Math.random() * 3).toFixed(1),
    returningVisitors: Math.round(30 + Math.random() * 20),
  };
};

const topPages = [
  { path: "/", name: "Home Page", views: 4520, percentage: 35 },
  { path: "/shop", name: "Shop", views: 2890, percentage: 22 },
  { path: "/product/1", name: "Castor Oil Hair Serum", views: 1240, percentage: 10 },
  { path: "/product/2", name: "Gel Nail Polish Set", views: 980, percentage: 8 },
  { path: "/product/5", name: "Edge Control Gel", views: 870, percentage: 7 },
  { path: "/#services", name: "Services Section", views: 760, percentage: 6 },
  { path: "/#about", name: "About Section", views: 650, percentage: 5 },
  { path: "/checkout", name: "Checkout", views: 420, percentage: 3 },
  { path: "/wishlist", name: "Wishlist", views: 310, percentage: 2 },
  { path: "/#contact", name: "Contact Section", views: 260, percentage: 2 },
];

const trafficSources = [
  { name: "Organic Search", visits: 3200, percentage: 40, color: "bg-black" },
  { name: "Direct", visits: 1800, percentage: 22, color: "bg-gray-600" },
  { name: "Social Media", visits: 1500, percentage: 19, color: "bg-[hsl(var(--gold))]" },
  { name: "Instagram", visits: 900, percentage: 11, color: "bg-pink-500" },
  { name: "WhatsApp", visits: 400, percentage: 5, color: "bg-green-500" },
  { name: "TikTok", visits: 200, percentage: 3, color: "bg-gray-400" },
];

const deviceBreakdown = [
  { name: "Mobile", percentage: 68, icon: Smartphone },
  { name: "Desktop", percentage: 25, icon: Monitor },
  { name: "Tablet", percentage: 7, icon: Monitor },
];

const recentActivity = [
  { type: "visit", message: "New visitor from Nairobi, Kenya", time: "2 mins ago" },
  { type: "order", message: "Order #TZ-2026-089 placed — KSh 2,050", time: "15 mins ago" },
  { type: "visit", message: "3 visitors browsing Shop page", time: "20 mins ago" },
  { type: "signup", message: "New newsletter subscriber — mary@gmail.com", time: "35 mins ago" },
  { type: "order", message: "Order #TZ-2026-088 payment confirmed", time: "1 hour ago" },
  { type: "visit", message: "Visitor from Mombasa viewing services", time: "1.5 hours ago" },
  { type: "order", message: "Order #TZ-2026-087 dispatched", time: "2 hours ago" },
  { type: "visit", message: "12 visitors on site right now", time: "Live" },
];

const AdminAnalytics = () => {
  const [period, setPeriod] = useState<Period>("30days");
  const data = generateData(period);

  const statCards = [
    { label: "Total Visitors", value: data.visitors.toLocaleString(), change: "+12.5%", up: true, icon: Users },
    { label: "Page Views", value: data.pageViews.toLocaleString(), change: "+8.3%", up: true, icon: Eye },
    { label: "Total Orders", value: data.orders.toLocaleString(), change: "+15.2%", up: true, icon: ShoppingCart },
    { label: "Revenue", value: `KSh ${data.revenue.toLocaleString()}`, change: "+18.7%", up: true, icon: TrendingUp },
    { label: "Bounce Rate", value: `${data.bounceRate}%`, change: "-3.2%", up: false, icon: MousePointer },
    { label: "Avg Session", value: data.avgSessionDuration, change: "+5.1%", up: true, icon: Clock },
    { label: "Conversion Rate", value: `${data.conversionRate}%`, change: "+1.8%", up: true, icon: BarChart3 },
    { label: "Returning Visitors", value: `${data.returningVisitors}%`, change: "+4.6%", up: true, icon: Globe },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Analytics</h1>
          <p className="font-body text-sm text-gray-400">Track website visitors, orders & performance</p>
        </div>
        <div className="flex border border-gray-200 rounded overflow-hidden">
          {(["today", "7days", "30days", "90days"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-2 font-body text-xs transition-colors ${
                period === p ? "bg-black text-white" : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {p === "today" ? "Today" : p === "7days" ? "7 Days" : p === "30days" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className={`flex items-center gap-0.5 font-body text-[11px] font-bold ${stat.up ? "text-green-600" : "text-red-500"}`}>
                  {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="font-display text-xl font-bold text-black">{stat.value}</p>
              <p className="font-body text-[11px] text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Top Pages */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-400" />
            <h2 className="font-display text-sm font-bold text-black">Top Pages</h2>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {topPages.map((page, idx) => (
                <div key={page.path} className="flex items-center gap-3">
                  <span className="font-body text-xs text-gray-400 w-5 text-right">{idx + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-body text-sm text-black font-medium">{page.name}</p>
                      <p className="font-body text-xs text-gray-500">{page.views.toLocaleString()} views</p>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-black rounded-full transition-all" style={{ width: `${page.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-gray-400" />
            <h2 className="font-display text-sm font-bold text-black">Traffic Sources</h2>
          </div>
          <div className="p-5 space-y-4">
            {trafficSources.map((source) => (
              <div key={source.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${source.color}`} />
                    <p className="font-body text-sm text-black">{source.name}</p>
                  </div>
                  <p className="font-body text-xs text-gray-500">{source.percentage}%</p>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden ml-4">
                  <div className={`h-full rounded-full ${source.color}`} style={{ width: `${source.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-display text-sm font-bold text-black">Devices</h2>
          </div>
          <div className="p-5 space-y-4">
            {deviceBreakdown.map((device) => {
              const Icon = device.icon;
              return (
                <div key={device.name} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-body text-sm text-black font-medium">{device.name}</p>
                      <p className="font-body text-sm font-bold text-black">{device.percentage}%</p>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-black rounded-full" style={{ width: `${device.percentage}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-black">Recent Activity</h2>
            <span className="flex items-center gap-1.5 font-body text-[11px] text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Live
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="px-5 py-3 flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === "order"
                      ? "bg-green-50"
                      : activity.type === "signup"
                      ? "bg-blue-50"
                      : "bg-gray-100"
                  }`}
                >
                  {activity.type === "order" ? (
                    <ShoppingCart className="w-3.5 h-3.5 text-green-600" />
                  ) : activity.type === "signup" ? (
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm text-black">{activity.message}</p>
                </div>
                <span className={`font-body text-[11px] flex-shrink-0 ${activity.time === "Live" ? "text-green-600 font-bold" : "text-gray-400"}`}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
