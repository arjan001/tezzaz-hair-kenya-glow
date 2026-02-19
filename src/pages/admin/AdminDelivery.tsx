import { useState } from "react";
import {
  Plus,
  Truck,
  MapPin,
  Pencil,
  Trash2,
  X,
  Store,
  ChevronLeft,
  ChevronRight,
  Search,
  DollarSign,
  Clock,
} from "lucide-react";

interface DeliveryLocation {
  id: string;
  name: string;
  type: "pickup" | "delivery";
  address: string;
  fee: number;
  estimatedTime: string;
  isActive: boolean;
}

interface DeliveryZone {
  id: string;
  name: string;
  areas: string[];
  fee: number;
  freeAbove: number;
  estimatedTime: string;
  isActive: boolean;
}

const initialLocations: DeliveryLocation[] = [
  { id: "1", name: "Tezzaz Hair - The Bazaar", type: "pickup", address: "The Bazaar Plaza, 10th Floor, Wing B, Suite 1025, Nairobi", fee: 0, estimatedTime: "Ready in 30 mins", isActive: true },
  { id: "2", name: "Tezzaz Collection Point - CBD", type: "pickup", address: "Moi Avenue, Opposite Kencom, Nairobi CBD", fee: 0, estimatedTime: "Ready in 1 hour", isActive: true },
];

const initialZones: DeliveryZone[] = [
  { id: "1", name: "Nairobi CBD", areas: ["CBD", "Uhuru Park", "Railway", "River Road"], fee: 150, freeAbove: 2000, estimatedTime: "Same day", isActive: true },
  { id: "2", name: "Westlands & Parklands", areas: ["Westlands", "Parklands", "Highridge", "Ngara"], fee: 200, freeAbove: 2500, estimatedTime: "Same day", isActive: true },
  { id: "3", name: "Eastlands", areas: ["Buruburu", "Umoja", "Donholm", "South B", "South C"], fee: 250, freeAbove: 3000, estimatedTime: "1-2 days", isActive: true },
  { id: "4", name: "Kileleshwa & Kilimani", areas: ["Kileleshwa", "Kilimani", "Lavington", "Hurlingham"], fee: 200, freeAbove: 2500, estimatedTime: "Same day", isActive: true },
  { id: "5", name: "Karen & Langata", areas: ["Karen", "Langata", "Rongai", "Ngong"], fee: 350, freeAbove: 4000, estimatedTime: "1-2 days", isActive: true },
  { id: "6", name: "Thika Road Corridor", areas: ["Roysambu", "Kasarani", "Githurai", "Kahawa"], fee: 300, freeAbove: 3500, estimatedTime: "1-2 days", isActive: true },
];

const ITEMS_PER_PAGE = 5;

const AdminDelivery = () => {
  const [activeTab, setActiveTab] = useState<"locations" | "zones">("locations");
  const [locations, setLocations] = useState<DeliveryLocation[]>(initialLocations);
  const [zones, setZones] = useState<DeliveryZone[]>(initialZones);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Location modals
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [showDeleteLocation, setShowDeleteLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<DeliveryLocation | null>(null);
  const [locForm, setLocForm] = useState({ name: "", type: "pickup" as "pickup" | "delivery", address: "", fee: 0, estimatedTime: "" });

  // Zone modals
  const [showAddZone, setShowAddZone] = useState(false);
  const [showEditZone, setShowEditZone] = useState(false);
  const [showDeleteZone, setShowDeleteZone] = useState(false);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone | null>(null);
  const [zoneForm, setZoneForm] = useState({ name: "", areas: "", fee: 0, freeAbove: 0, estimatedTime: "" });

  const filteredLocations = locations.filter((l) =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredZones = zones.filter((z) =>
    z.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    z.areas.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalLocPages = Math.ceil(filteredLocations.length / ITEMS_PER_PAGE);
  const paginatedLocations = filteredLocations.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const totalZonePages = Math.ceil(filteredZones.length / ITEMS_PER_PAGE);
  const paginatedZones = filteredZones.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Location handlers
  const handleAddLocation = () => {
    setLocations((prev) => [...prev, { id: String(Date.now()), ...locForm, isActive: true }]);
    setShowAddLocation(false);
    setLocForm({ name: "", type: "pickup", address: "", fee: 0, estimatedTime: "" });
  };

  const handleEditLocation = () => {
    if (!selectedLocation) return;
    setLocations((prev) =>
      prev.map((l) => (l.id === selectedLocation.id ? { ...l, ...locForm } : l))
    );
    setShowEditLocation(false);
    setSelectedLocation(null);
  };

  const handleDeleteLocation = () => {
    if (!selectedLocation) return;
    setLocations((prev) => prev.filter((l) => l.id !== selectedLocation.id));
    setShowDeleteLocation(false);
    setSelectedLocation(null);
  };

  // Zone handlers
  const handleAddZone = () => {
    setZones((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: zoneForm.name,
        areas: zoneForm.areas.split(",").map((a) => a.trim()).filter(Boolean),
        fee: zoneForm.fee,
        freeAbove: zoneForm.freeAbove,
        estimatedTime: zoneForm.estimatedTime,
        isActive: true,
      },
    ]);
    setShowAddZone(false);
    setZoneForm({ name: "", areas: "", fee: 0, freeAbove: 0, estimatedTime: "" });
  };

  const handleEditZone = () => {
    if (!selectedZone) return;
    setZones((prev) =>
      prev.map((z) =>
        z.id === selectedZone.id
          ? {
              ...z,
              name: zoneForm.name,
              areas: zoneForm.areas.split(",").map((a) => a.trim()).filter(Boolean),
              fee: zoneForm.fee,
              freeAbove: zoneForm.freeAbove,
              estimatedTime: zoneForm.estimatedTime,
            }
          : z
      )
    );
    setShowEditZone(false);
    setSelectedZone(null);
  };

  const handleDeleteZone = () => {
    if (!selectedZone) return;
    setZones((prev) => prev.filter((z) => z.id !== selectedZone.id));
    setShowDeleteZone(false);
    setSelectedZone(null);
  };

  const toggleLocationActive = (id: string) => {
    setLocations((prev) => prev.map((l) => (l.id === id ? { ...l, isActive: !l.isActive } : l)));
  };

  const toggleZoneActive = (id: string) => {
    setZones((prev) => prev.map((z) => (z.id === id ? { ...z, isActive: !z.isActive } : z)));
  };

  const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  const Pagination = ({ total, totalPages }: { total: number; totalPages: number }) => (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
      <p className="font-body text-xs text-gray-400">
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30">
          <ChevronLeft className="w-4 h-4" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} onClick={() => setCurrentPage(page)} className={`w-7 h-7 rounded font-body text-xs ${page === currentPage ? "bg-black text-white" : "hover:bg-gray-100 text-gray-600"}`}>{page}</button>
        ))}
        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Delivery & Locations</h1>
          <p className="font-body text-sm text-gray-400">{locations.length} pickup points &middot; {zones.length} delivery zones</p>
        </div>
        <button
          onClick={() => {
            if (activeTab === "locations") {
              setLocForm({ name: "", type: "pickup", address: "", fee: 0, estimatedTime: "" });
              setShowAddLocation(true);
            } else {
              setZoneForm({ name: "", areas: "", fee: 0, freeAbove: 0, estimatedTime: "" });
              setShowAddZone(true);
            }
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> {activeTab === "locations" ? "Add Location" : "Add Zone"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Pickup Points", value: locations.filter((l) => l.type === "pickup").length, icon: Store },
          { label: "Delivery Zones", value: zones.length, icon: Truck },
          { label: "Avg Delivery Fee", value: `KSh ${Math.round(zones.reduce((a, z) => a + z.fee, 0) / Math.max(zones.length, 1))}`, icon: DollarSign },
          { label: "Active Zones", value: zones.filter((z) => z.isActive).length, icon: MapPin },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4">
              <Icon className="w-4 h-4 text-gray-400 mb-2" />
              <p className="font-display text-xl font-bold text-black">{stat.value}</p>
              <p className="font-body text-[11px] text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {(["locations", "zones"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setCurrentPage(1); setSearchQuery(""); }}
            className={`flex items-center gap-1.5 px-4 py-2.5 font-body text-xs border-b-2 transition-colors capitalize ${
              activeTab === tab ? "border-black text-black font-medium" : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab === "locations" ? <Store className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
            {tab === "locations" ? "Pickup Locations" : "Delivery Zones"}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex w-full sm:w-72 border border-gray-200 rounded mb-6">
        <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} placeholder="Search..." className="flex-1 font-body text-sm px-3 py-2 focus:outline-none" />
        <div className="px-3 flex items-center text-gray-400"><Search className="w-4 h-4" /></div>
      </div>

      {/* Locations Tab */}
      {activeTab === "locations" && (
        <div className="space-y-4">
          {paginatedLocations.map((loc) => (
            <div key={loc.id} className={`bg-white border border-gray-200 rounded-lg p-5 ${!loc.isActive ? "opacity-50" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${loc.type === "pickup" ? "bg-black" : "bg-[hsl(var(--gold))]"}`}>
                    {loc.type === "pickup" ? <Store className="w-5 h-5 text-white" /> : <Truck className="w-5 h-5 text-white" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-sm font-bold text-black">{loc.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide ${loc.type === "pickup" ? "bg-blue-50 text-blue-600" : "bg-green-50 text-green-600"}`}>{loc.type}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <p className="font-body text-xs text-gray-500">{loc.address}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-gray-400" />
                        <p className="font-body text-xs text-gray-500">{loc.fee === 0 ? "Free" : `KSh ${loc.fee}`}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="font-body text-xs text-gray-500">{loc.estimatedTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${loc.isActive ? "bg-black" : "bg-gray-200"}`}
                    onClick={() => toggleLocationActive(loc.id)}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${loc.isActive ? "left-[18px]" : "left-0.5"}`} />
                  </div>
                  <button
                    onClick={() => { setSelectedLocation(loc); setLocForm({ name: loc.name, type: loc.type, address: loc.address, fee: loc.fee, estimatedTime: loc.estimatedTime }); setShowEditLocation(true); }}
                    className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"
                  ><Pencil className="w-3.5 h-3.5" /></button>
                  <button
                    onClick={() => { setSelectedLocation(loc); setShowDeleteLocation(true); }}
                    className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
                  ><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
          {filteredLocations.length > ITEMS_PER_PAGE && (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <Pagination total={filteredLocations.length} totalPages={totalLocPages} />
            </div>
          )}
        </div>
      )}

      {/* Zones Tab */}
      {activeTab === "zones" && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Zone</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Areas</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Fee</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Free Above</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">ETA</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Active</th>
                  <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedZones.map((zone) => (
                  <tr key={zone.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-body text-sm text-black font-medium">{zone.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {zone.areas.slice(0, 3).map((a) => (
                          <span key={a} className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-body text-gray-600">{a}</span>
                        ))}
                        {zone.areas.length > 3 && <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-body text-gray-400">+{zone.areas.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-gray-500">KSh {zone.fee}</td>
                    <td className="px-4 py-3 font-body text-sm text-gray-500">KSh {zone.freeAbove.toLocaleString()}</td>
                    <td className="px-4 py-3 font-body text-sm text-gray-500">{zone.estimatedTime}</td>
                    <td className="px-4 py-3">
                      <div
                        className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${zone.isActive ? "bg-black" : "bg-gray-200"}`}
                        onClick={() => toggleZoneActive(zone.id)}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${zone.isActive ? "left-[18px]" : "left-0.5"}`} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => { setSelectedZone(zone); setZoneForm({ name: zone.name, areas: zone.areas.join(", "), fee: zone.fee, freeAbove: zone.freeAbove, estimatedTime: zone.estimatedTime }); setShowEditZone(true); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => { setSelectedZone(zone); setShowDeleteZone(true); }} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination total={filteredZones.length} totalPages={totalZonePages} />
        </div>
      )}

      {/* Add Location Modal */}
      {showAddLocation && (
        <Modal title="Add Pickup/Delivery Location" onClose={() => setShowAddLocation(false)}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Location Name *</label>
              <input type="text" value={locForm.name} onChange={(e) => setLocForm({ ...locForm, name: e.target.value })} placeholder="e.g. Tezzaz CBD Collection Point" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Type *</label>
              <select value={locForm.type} onChange={(e) => setLocForm({ ...locForm, type: e.target.value as "pickup" | "delivery" })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                <option value="pickup">Pickup Point</option>
                <option value="delivery">Delivery Hub</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Address *</label>
              <input type="text" value={locForm.address} onChange={(e) => setLocForm({ ...locForm, address: e.target.value })} placeholder="Full address" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Fee (KSh)</label>
                <input type="number" value={locForm.fee} onChange={(e) => setLocForm({ ...locForm, fee: Number(e.target.value) })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Estimated Time</label>
                <input type="text" value={locForm.estimatedTime} onChange={(e) => setLocForm({ ...locForm, estimatedTime: e.target.value })} placeholder="e.g. Ready in 30 mins" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => setShowAddLocation(false)} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddLocation} disabled={!locForm.name || !locForm.address} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Add Location</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Location Modal */}
      {showEditLocation && (
        <Modal title="Edit Location" onClose={() => { setShowEditLocation(false); setSelectedLocation(null); }}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Location Name *</label>
              <input type="text" value={locForm.name} onChange={(e) => setLocForm({ ...locForm, name: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Type *</label>
              <select value={locForm.type} onChange={(e) => setLocForm({ ...locForm, type: e.target.value as "pickup" | "delivery" })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                <option value="pickup">Pickup Point</option>
                <option value="delivery">Delivery Hub</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Address *</label>
              <input type="text" value={locForm.address} onChange={(e) => setLocForm({ ...locForm, address: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Fee (KSh)</label>
                <input type="number" value={locForm.fee} onChange={(e) => setLocForm({ ...locForm, fee: Number(e.target.value) })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Estimated Time</label>
                <input type="text" value={locForm.estimatedTime} onChange={(e) => setLocForm({ ...locForm, estimatedTime: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => { setShowEditLocation(false); setSelectedLocation(null); }} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleEditLocation} disabled={!locForm.name || !locForm.address} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Save Changes</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Location Modal */}
      {showDeleteLocation && selectedLocation && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h2 className="font-display text-lg font-bold text-black mb-2">Remove Location?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">Remove "{selectedLocation.name}"?</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteLocation(false); setSelectedLocation(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleDeleteLocation} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600">Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Zone Modal */}
      {showAddZone && (
        <Modal title="Add Delivery Zone" onClose={() => setShowAddZone(false)}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Zone Name *</label>
              <input type="text" value={zoneForm.name} onChange={(e) => setZoneForm({ ...zoneForm, name: e.target.value })} placeholder="e.g. Westlands" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Areas (comma-separated) *</label>
              <input type="text" value={zoneForm.areas} onChange={(e) => setZoneForm({ ...zoneForm, areas: e.target.value })} placeholder="e.g. Westlands, Parklands, Highridge" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Delivery Fee (KSh) *</label>
                <input type="number" value={zoneForm.fee} onChange={(e) => setZoneForm({ ...zoneForm, fee: Number(e.target.value) })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Free Above (KSh)</label>
                <input type="number" value={zoneForm.freeAbove} onChange={(e) => setZoneForm({ ...zoneForm, freeAbove: Number(e.target.value) })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
              </div>
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Estimated Time</label>
              <input type="text" value={zoneForm.estimatedTime} onChange={(e) => setZoneForm({ ...zoneForm, estimatedTime: e.target.value })} placeholder="e.g. Same day" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => setShowAddZone(false)} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddZone} disabled={!zoneForm.name || !zoneForm.areas} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Add Zone</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Zone Modal */}
      {showEditZone && (
        <Modal title="Edit Delivery Zone" onClose={() => { setShowEditZone(false); setSelectedZone(null); }}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Zone Name *</label>
              <input type="text" value={zoneForm.name} onChange={(e) => setZoneForm({ ...zoneForm, name: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Areas (comma-separated) *</label>
              <input type="text" value={zoneForm.areas} onChange={(e) => setZoneForm({ ...zoneForm, areas: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Delivery Fee (KSh) *</label>
                <input type="number" value={zoneForm.fee} onChange={(e) => setZoneForm({ ...zoneForm, fee: Number(e.target.value) })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Free Above (KSh)</label>
                <input type="number" value={zoneForm.freeAbove} onChange={(e) => setZoneForm({ ...zoneForm, freeAbove: Number(e.target.value) })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
              </div>
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Estimated Time</label>
              <input type="text" value={zoneForm.estimatedTime} onChange={(e) => setZoneForm({ ...zoneForm, estimatedTime: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => { setShowEditZone(false); setSelectedZone(null); }} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleEditZone} disabled={!zoneForm.name || !zoneForm.areas} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Save Changes</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Zone Modal */}
      {showDeleteZone && selectedZone && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h2 className="font-display text-lg font-bold text-black mb-2">Delete Zone?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">Delete "{selectedZone.name}" delivery zone?</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteZone(false); setSelectedZone(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleDeleteZone} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDelivery;
