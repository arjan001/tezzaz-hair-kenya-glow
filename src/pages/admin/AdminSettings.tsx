import { useState } from "react";
import { Save, Store, Bell, Truck, CreditCard, Shield } from "lucide-react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [storeName, setStoreName] = useState("Tezzaz Hair");
  const [storeEmail, setStoreEmail] = useState("admin@tezzazhair.com");
  const [storePhone, setStorePhone] = useState("+254 711 135 090");
  const [currency, setCurrency] = useState("KSh");
  const [deliveryFee, setDeliveryFee] = useState("200");
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState("2000");
  const [paybillNumber, setPaybillNumber] = useState("899890");
  const [accountName, setAccountName] = useState("TEZZAZ_HAIR");
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Store },
    { id: "delivery", label: "Delivery", icon: Truck },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Settings</h1>
          <p className="font-body text-sm text-gray-400">Manage your store configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
        >
          <Save className="w-3.5 h-3.5" /> {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 font-body text-xs border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-black text-black font-medium"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
        {activeTab === "general" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Store Information</h2>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Email</label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Phone</label>
              <input
                type="tel"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Currency</label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Delivery Settings</h2>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Delivery Fee (KSh)</label>
              <input
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Free Delivery Threshold (KSh)</label>
              <input
                type="number"
                value={freeDeliveryThreshold}
                onChange={(e) => setFreeDeliveryThreshold(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
              />
              <p className="font-body text-[11px] text-gray-400 mt-1">Orders above this amount get free delivery</p>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">M-Pesa Payment Settings</h2>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Paybill Number</label>
              <input
                type="text"
                value={paybillNumber}
                onChange={(e) => setPaybillNumber(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Account Name</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Notification Preferences</h2>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-body text-sm font-medium text-black">New Order Notifications</p>
                <p className="font-body text-xs text-gray-400">Get notified when a new order is placed</p>
              </div>
              <div
                className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${notifyOrders ? "bg-black" : "bg-gray-200"}`}
                onClick={() => setNotifyOrders(!notifyOrders)}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifyOrders ? "left-[18px]" : "left-0.5"}`}
                />
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-body text-sm font-medium text-black">Low Stock Alerts</p>
                <p className="font-body text-xs text-gray-400">Get notified when product stock is low</p>
              </div>
              <div
                className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${notifyLowStock ? "bg-black" : "bg-gray-200"}`}
                onClick={() => setNotifyLowStock(!notifyLowStock)}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${notifyLowStock ? "left-[18px]" : "left-0.5"}`}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Security Settings</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <p className="font-body text-sm text-gray-500">
                Security settings will be available after Supabase integration. This will include authentication, role-based access control, and session management.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
