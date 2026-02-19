import { useState } from "react";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  Clock,
  CheckCircle,
  Truck,
  Package,
} from "lucide-react";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  payment: string;
  status: "pending" | "confirmed" | "dispatched" | "delivered";
  items: { name: string; qty: number; price: number }[];
  mpesaMessage?: string;
}

const sampleOrders: Order[] = [];

const statusConfig = {
  pending: { label: "PENDING", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
  confirmed: { label: "CONFIRMED", icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-50" },
  dispatched: { label: "DISPATCHED", icon: Truck, color: "text-purple-600", bg: "bg-purple-50" },
  delivered: { label: "DELIVERED", icon: Package, color: "text-green-600", bg: "bg-green-50" },
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editStatus, setEditStatus] = useState<Order["status"]>("pending");

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    pending: orders.filter((o) => o.status === "pending").length,
    confirmed: orders.filter((o) => o.status === "confirmed").length,
    dispatched: orders.filter((o) => o.status === "dispatched").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
  };

  const handleUpdateStatus = () => {
    if (!selectedOrder) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id ? { ...o, status: editStatus } : o
      )
    );
    setShowEditModal(false);
    setSelectedOrder(null);
  };

  const handleDelete = () => {
    if (!selectedOrder) return;
    setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
    setShowDeleteModal(false);
    setSelectedOrder(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-black">Orders</h1>
        <p className="font-body text-sm text-gray-400">{orders.length} total orders</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((key) => {
          const config = statusConfig[key];
          const Icon = config.icon;
          return (
            <div key={key} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-start justify-between mb-2">
                <p className={`font-body text-[10px] uppercase tracking-widest font-bold ${config.color}`}>
                  {config.label}
                </p>
                <Icon className={`w-4 h-4 ${config.color}`} />
              </div>
              <p className="font-display text-3xl font-bold text-black">{statusCounts[key]}</p>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center border border-gray-200 rounded px-3 flex-1 bg-white">
          <Search className="w-4 h-4 text-gray-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders..."
            className="flex-1 px-3 py-2.5 font-body text-sm focus:outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none bg-white min-w-[140px]"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="dispatched">Dispatched</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Order</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Customer</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Total</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Payment</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const config = statusConfig[order.status];
                return (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-body text-sm font-bold text-black">{order.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-body text-sm text-gray-600">{order.customer}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-body text-sm text-gray-500">{order.date}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-body text-sm font-bold text-black">
                        KSh {order.total.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-body text-xs text-gray-500">{order.payment}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowViewModal(true);
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-black"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setEditStatus(order.status);
                            setShowEditModal(true);
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-black"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDeleteModal(true);
                          }}
                          className="p-1.5 hover:bg-red-50 rounded transition-colors text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-10 text-center">
                    <Package className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="font-body text-sm text-gray-400">No orders found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="font-body text-xs text-gray-400">
            {filteredOrders.length === 0 ? "No items" : `Showing 1-${filteredOrders.length} of ${filteredOrders.length}`}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-body text-xs text-gray-400">Per page</span>
            <select className="border border-gray-200 rounded px-2 py-1 font-body text-xs bg-white">
              <option>15</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>

      {/* View Order Modal */}
      {showViewModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-display text-lg font-bold">Order {selectedOrder.id}</h2>
              <button onClick={() => { setShowViewModal(false); setSelectedOrder(null); }} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-widest text-gray-400">Customer</p>
                  <p className="font-body text-sm font-bold text-black">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-widest text-gray-400">Email</p>
                  <p className="font-body text-sm text-gray-600">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-widest text-gray-400">Date</p>
                  <p className="font-body text-sm text-black">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-widest text-gray-400">Status</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase ${statusConfig[selectedOrder.status].bg} ${statusConfig[selectedOrder.status].color}`}>
                    {statusConfig[selectedOrder.status].label}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="font-body text-xs font-bold text-black mb-3">Order Items</p>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-1.5">
                    <span className="font-body text-sm text-gray-600">{item.name} x{item.qty}</span>
                    <span className="font-body text-sm font-bold text-black">KSh {item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span className="font-display text-sm font-bold">Total</span>
                  <span className="font-display text-sm font-bold">KSh {selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              {selectedOrder.mpesaMessage && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-body text-xs font-bold text-black mb-2">M-Pesa Message</p>
                  <p className="font-body text-sm text-gray-500 bg-gray-50 p-3 rounded">{selectedOrder.mpesaMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {showEditModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-display text-lg font-bold">Update Order Status</h2>
              <button onClick={() => { setShowEditModal(false); setSelectedOrder(null); }} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="font-body text-sm text-gray-500">Order: <span className="font-bold text-black">{selectedOrder.id}</span></p>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as Order["status"])}
                  className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setShowEditModal(false); setSelectedOrder(null); }}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="flex-1 px-4 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="font-display text-lg font-bold text-black mb-2">Delete Order?</h2>
              <p className="font-body text-sm text-gray-500 mb-6">
                Are you sure you want to delete order "{selectedOrder.id}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowDeleteModal(false); setSelectedOrder(null); }}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
