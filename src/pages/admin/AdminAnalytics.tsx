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

const generateData = (_period: Period) => {
  return {
    visitors: 0,
    pageViews: 0,
    orders: 0,
    revenue: 0,
    bounceRate: 0,
    avgSessionDuration: "0m 0s",
    conversionRate: "0.0",
    returningVisitors: 0,
  };
};

const topPages: { path: string; name: string; views: number; percentage: number }[] = [];

const trafficSources: { name: string; visits: number; percentage: number; color: string }[] = [];

const deviceBreakdown: { name: string; percentage: number; icon: typeof Smartphone }[] = [];

const recentActivity: { type: string; message: string; time: string }[] = [];

const AdminAnalytics = () => {
  const [period, setPeriod] = useState<Period>("30days");
  const data = generateData(period);

  const statCards = [
    { label: "Total Visitors", value: data.visitors.toLocaleString(), change: "—", up: true, icon: Users },
    { label: "Page Views", value: data.pageViews.toLocaleString(), change: "—", up: true, icon: Eye },
    { label: "Total Orders", value: data.orders.toLocaleString(), change: "—", up: true, icon: ShoppingCart },
    { label: "Revenue", value: `KSh ${data.revenue.toLocaleString()}`, change: "—", up: true, icon: TrendingUp },
    { label: "Bounce Rate", value: `${data.bounceRate}%`, change: "—", up: true, icon: MousePointer },
    { label: "Avg Session", value: data.avgSessionDuration, change: "—", up: true, icon: Clock },
    { label: "Conversion Rate", value: `${data.conversionRate}%`, change: "—", up: true, icon: BarChart3 },
    { label: "Returning Visitors", value: `${data.returningVisitors}%`, change: "—", up: true, icon: Globe },
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
