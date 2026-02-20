import { useState } from "react";
import { Search, Eye, Pencil, Trash2, X, Clock, CheckCircle, Truck, Package, Loader2 } from "lucide-react";
import { useOrders, useUpdateOrderStatus, useDeleteOrder, DbOrder } from "@/integrations/supabase/hooks/useOrders";

const statusConfig = {
  pending: { label: "PENDING", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
  confirmed: { label: "CONFIRMED", icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-50" },
  dispatched: { label: "DISPATCHED", icon: Truck, color: "text-purple-600", bg: "bg-purple-50" },
  delivered: { label: "DELIVERED", icon: Package, color: "text-green-600", bg: "bg-green-50" },
  cancelled: { label: "CANCELLED", icon: X, color: "text-red-600", bg: "bg-red-50" },
};

const AdminOrders = () => {
  const { data: orders = [], isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<DbOrder | null>(null);
  const [editStatus, setEditStatus] = useState<DbOrder["status"]>("pending");

  const filteredOrders = orders.filter((o) => {
    const matchSearch = o.order_code.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusCounts = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    dispatched: orders.filter((o) => o.status === "dispatched").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  const handleUpdateStatus = () => {
    if (!selectedOrder) return;
    updateStatus.mutate({ id: selectedOrder.id, status: editStatus }, { onSuccess: () => { setShowEditModal(false); setSelectedOrder(null); } });
  };

  const handleDelete = () => {
    if (!selectedOrder) return;
    deleteOrder.mutate(selectedOrder.id, { onSuccess: () => { setShowDeleteModal(false); setSelectedOrder(null); } });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-black">Orders</h1>
        <p className="font-body text-sm text-gray-400">{orders.length} total orders</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {(Object.entries(statusCounts) as [keyof typeof statusConfig, number][]).map(([key, count]) => {
          const config = statusConfig[key];
          const Icon = config.icon;
          return (
            <div key={key} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-start justify-between mb-2">
                <p className={`font-body text-[10px] uppercase tracking-widest font-bold ${config.color}`}>{config.label}</p>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <p className="font-display text-3xl font-bold text-black">{count}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center border border-gray-200 rounded px-3 flex-1 bg-white">
          <Search className="w-4 h-4 text-gray-300" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order code or customer..." className="flex-1 px-3 py-2.5 font-body text-sm focus:outline-none" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none bg-white min-w-[140px]">
          <option value="all">All Status</option>
          {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Order</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Customer</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Total</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={6} className="px-4 py-10 text-center"><Loader2 className="w-6 h-6 text-gray-300 mx-auto animate-spin" /></td></tr>}
              {!isLoading && filteredOrders.map((order) => {
                const config = statusConfig[order.status] || statusConfig.pending;
                return (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3"><span className="font-body text-sm font-bold text-black">{order.order_code}</span></td>
                    <td className="px-4 py-3">
                      <p className="font-body text-sm text-black">{order.customer_name}</p>
                      <p className="font-body text-xs text-gray-400">{order.customer_phone}</p>
                    </td>
                    <td className="px-4 py-3"><span className="font-body text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString("en-GB")}</span></td>
                    <td className="px-4 py-3"><span className="font-body text-sm font-bold text-black">KSh {Number(order.total).toLocaleString()}</span></td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => { setSelectedOrder(order); setShowViewModal(true); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => { setSelectedOrder(order); setEditStatus(order.status); setShowEditModal(true); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => { setSelectedOrder(order); setShowDeleteModal(true); }} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {!isLoading && filteredOrders.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center">
                  <Package className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="font-body text-sm text-gray-400">{orders.length === 0 ? "No orders yet" : "No orders match your search"}</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Order Modal */}
      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-display text-lg font-bold">Order {selectedOrder.order_code}</h2>
              <button onClick={() => { setShowViewModal(false); setSelectedOrder(null); }} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { l: "Customer", v: selectedOrder.customer_name },
                  { l: "Phone", v: selectedOrder.customer_phone },
                  { l: "Email", v: selectedOrder.customer_email },
                  { l: "City", v: selectedOrder.city },
                  { l: "Date", v: new Date(selectedOrder.created_at).toLocaleDateString("en-GB") },
                  { l: "Status", v: (statusConfig[selectedOrder.status] || statusConfig.pending).label },
                ].map((row) => (
                  <div key={row.l}>
                    <p className="font-body text-[10px] uppercase tracking-widest text-gray-400">{row.l}</p>
                    <p className="font-body text-sm font-bold text-black">{row.v}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-body text-xs font-bold text-black mb-2">Delivery Address</p>
                <p className="font-body text-sm text-gray-600">{selectedOrder.delivery_address}</p>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-body text-xs font-bold text-black mb-3">Order Items</p>
                {(Array.isArray(selectedOrder.items) ? selectedOrder.items : []).map((item: {name: string; qty: number; price: number}, i: number) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="font-body text-sm text-gray-600">{item.name} x{item.qty}</span>
                    <span className="font-body text-sm font-bold text-black">KSh {Number(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 mt-2 border-t border-gray-200">
                  <span className="font-body text-xs text-gray-500">Delivery Fee</span>
                  <span className="font-body text-sm font-bold">KSh {Number(selectedOrder.delivery_fee).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-display text-sm font-bold">Total</span>
                  <span className="font-display text-sm font-bold">KSh {Number(selectedOrder.total).toLocaleString()}</span>
                </div>
              </div>
              {selectedOrder.mpesa_message && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-body text-xs font-bold text-black mb-2">M-Pesa Confirmation</p>
                  <p className="font-body text-sm text-gray-500 bg-gray-50 p-3 rounded">{selectedOrder.mpesa_message}</p>
                </div>
              )}
              {selectedOrder.notes && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-body text-xs font-bold text-black mb-2">Notes</p>
                  <p className="font-body text-sm text-gray-500">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Status */}
      {showEditModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-display text-lg font-bold">Update Order Status</h2>
              <button onClick={() => { setShowEditModal(false); setSelectedOrder(null); }} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <p className="font-body text-sm text-gray-500">Order: <span className="font-bold text-black">{selectedOrder.order_code}</span></p>
              <select value={editStatus} onChange={(e) => setEditStatus(e.target.value as DbOrder["status"])}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none bg-white">
                {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
              <div className="flex gap-3">
                <button onClick={() => { setShowEditModal(false); setSelectedOrder(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
                <button onClick={handleUpdateStatus} disabled={updateStatus.isPending}
                  className="flex-1 px-4 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 flex items-center justify-center gap-2">
                  {updateStatus.isPending && <Loader2 className="w-3 h-3 animate-spin" />} Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete */}
      {showDeleteModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h2 className="font-display text-lg font-bold mb-2">Delete Order?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">Order "{selectedOrder.order_code}" will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteModal(false); setSelectedOrder(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs">Cancel</button>
              <button onClick={handleDelete} disabled={deleteOrder.isPending}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600 flex items-center justify-center gap-2">
                {deleteOrder.isPending && <Loader2 className="w-3 h-3 animate-spin" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
