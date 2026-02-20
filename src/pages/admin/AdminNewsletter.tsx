import { useState } from "react";
import {
  Plus,
  Mail,
  Trash2,
  Pencil,
  X,
  Send,
  Users,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  name: string;
  subscribedAt: string;
  status: "active" | "unsubscribed";
}

interface Campaign {
  id: string;
  subject: string;
  content: string;
  sentAt: string | null;
  status: "draft" | "sent" | "scheduled";
  recipients: number;
  openRate: number;
}

const initialSubscribers: Subscriber[] = [];

const initialCampaigns: Campaign[] = [];

const ITEMS_PER_PAGE = 5;

const Modal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-md rounded-lg">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-black">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const AdminNewsletter = () => {
  const [activeTab, setActiveTab] = useState<"subscribers" | "campaigns">("subscribers");
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Subscriber modals
  const [showAddSubscriber, setShowAddSubscriber] = useState(false);
  const [showEditSubscriber, setShowEditSubscriber] = useState(false);
  const [showDeleteSubscriber, setShowDeleteSubscriber] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [subForm, setSubForm] = useState({ name: "", email: "" });

  // Campaign modals
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [showEditCampaign, setShowEditCampaign] = useState(false);
  const [showDeleteCampaign, setShowDeleteCampaign] = useState(false);
  const [showPreviewCampaign, setShowPreviewCampaign] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [campForm, setCampForm] = useState({ subject: "", content: "" });

  // Filtered subscribers
  const filteredSubscribers = subscribers.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSubPages = Math.ceil(filteredSubscribers.length / ITEMS_PER_PAGE);
  const paginatedSubscribers = filteredSubscribers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const filteredCampaigns = campaigns.filter((c) =>
    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalCampPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddSubscriber = () => {
    const newSub: Subscriber = {
      id: String(Date.now()),
      email: subForm.email,
      name: subForm.name,
      subscribedAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "active",
    };
    setSubscribers((prev) => [...prev, newSub]);
    setShowAddSubscriber(false);
    setSubForm({ name: "", email: "" });
  };

  const handleEditSubscriber = () => {
    if (!selectedSubscriber) return;
    setSubscribers((prev) =>
      prev.map((s) =>
        s.id === selectedSubscriber.id ? { ...s, name: subForm.name, email: subForm.email } : s
      )
    );
    setShowEditSubscriber(false);
    setSelectedSubscriber(null);
    setSubForm({ name: "", email: "" });
  };

  const handleDeleteSubscriber = () => {
    if (!selectedSubscriber) return;
    setSubscribers((prev) => prev.filter((s) => s.id !== selectedSubscriber.id));
    setShowDeleteSubscriber(false);
    setSelectedSubscriber(null);
  };

  const handleAddCampaign = () => {
    const newCamp: Campaign = {
      id: String(Date.now()),
      subject: campForm.subject,
      content: campForm.content,
      sentAt: null,
      status: "draft",
      recipients: 0,
      openRate: 0,
    };
    setCampaigns((prev) => [...prev, newCamp]);
    setShowAddCampaign(false);
    setCampForm({ subject: "", content: "" });
  };

  const handleEditCampaign = () => {
    if (!selectedCampaign) return;
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === selectedCampaign.id ? { ...c, subject: campForm.subject, content: campForm.content } : c
      )
    );
    setShowEditCampaign(false);
    setSelectedCampaign(null);
    setCampForm({ subject: "", content: "" });
  };

  const handleDeleteCampaign = () => {
    if (!selectedCampaign) return;
    setCampaigns((prev) => prev.filter((c) => c.id !== selectedCampaign.id));
    setShowDeleteCampaign(false);
    setSelectedCampaign(null);
  };

  const handleSendCampaign = (campaignId: string) => {
    const activeCount = subscribers.filter((s) => s.status === "active").length;
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaignId
          ? {
              ...c,
              status: "sent" as const,
              sentAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
              recipients: activeCount,
            }
          : c
      )
    );
  };

  const activeCount = subscribers.filter((s) => s.status === "active").length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Newsletter</h1>
          <p className="font-body text-sm text-gray-400">
            {activeCount} active subscribers &middot; {campaigns.length} campaigns
          </p>
        </div>
        <button
          onClick={() => {
            if (activeTab === "subscribers") {
              setSubForm({ name: "", email: "" });
              setShowAddSubscriber(true);
            } else {
              setCampForm({ subject: "", content: "" });
              setShowAddCampaign(true);
            }
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          {activeTab === "subscribers" ? "Add Subscriber" : "New Campaign"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Subscribers", value: subscribers.length, icon: Users },
          { label: "Active", value: activeCount, icon: Mail },
          { label: "Campaigns Sent", value: campaigns.filter((c) => c.status === "sent").length, icon: Send },
          { label: "Avg Open Rate", value: `${Math.round(campaigns.filter((c) => c.openRate > 0).reduce((a, c) => a + c.openRate, 0) / Math.max(campaigns.filter((c) => c.openRate > 0).length, 1))}%`, icon: Eye },
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
        {(["subscribers", "campaigns"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
              setSearchQuery("");
            }}
            className={`px-4 py-2.5 font-body text-xs border-b-2 transition-colors capitalize ${
              activeTab === tab
                ? "border-black text-black font-medium"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex w-full sm:w-72 border border-gray-200 rounded mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder={activeTab === "subscribers" ? "Search subscribers..." : "Search campaigns..."}
          className="flex-1 font-body text-sm px-3 py-2 focus:outline-none"
        />
        <div className="px-3 flex items-center text-gray-400">
          <Search className="w-4 h-4" />
        </div>
      </div>

      {/* Subscribers Tab */}
      {activeTab === "subscribers" && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Name</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Email</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Date</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSubscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-body text-sm text-black font-medium">{sub.name}</td>
                    <td className="px-4 py-3 font-body text-sm text-gray-500">{sub.email}</td>
                    <td className="px-4 py-3 font-body text-sm text-gray-500">{sub.subscribedAt}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide ${
                          sub.status === "active" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedSubscriber(sub);
                            setSubForm({ name: sub.name, email: sub.email });
                            setShowEditSubscriber(true);
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSubscriber(sub);
                            setShowDeleteSubscriber(true);
                          }}
                          className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="font-body text-xs text-gray-400">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredSubscribers.length)} of {filteredSubscribers.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalSubPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded font-body text-xs ${
                    page === currentPage ? "bg-black text-white" : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalSubPages, p + 1))}
                disabled={currentPage === totalSubPages}
                className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === "campaigns" && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Subject</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Sent</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Recipients</th>
                  <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Open Rate</th>
                  <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCampaigns.map((camp) => (
                  <tr key={camp.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-body text-sm text-black font-medium">{camp.subject}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide ${
                          camp.status === "sent"
                            ? "bg-green-50 text-green-600"
                            : camp.status === "scheduled"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {camp.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-body text-sm text-gray-500">{camp.sentAt || "—"}</td>
                    <td className="px-4 py-3 font-body text-sm text-gray-500">{camp.recipients || "—"}</td>
                    <td className="px-4 py-3 font-body text-sm text-gray-500">{camp.openRate > 0 ? `${camp.openRate}%` : "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedCampaign(camp);
                            setShowPreviewCampaign(true);
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"
                          title="Preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {camp.status === "draft" && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedCampaign(camp);
                                setCampForm({ subject: camp.subject, content: camp.content });
                                setShowEditCampaign(true);
                              }}
                              className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleSendCampaign(camp.id)}
                              className="p-1.5 hover:bg-green-50 rounded text-gray-400 hover:text-green-600"
                              title="Send Now"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => {
                            setSelectedCampaign(camp);
                            setShowDeleteCampaign(true);
                          }}
                          className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="font-body text-xs text-gray-400">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredCampaigns.length)} of {filteredCampaigns.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalCampPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 rounded font-body text-xs ${
                    page === currentPage ? "bg-black text-white" : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalCampPages, p + 1))}
                disabled={currentPage === totalCampPages}
                className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subscriber Modal */}
      {showAddSubscriber && (
        <Modal title="Add Subscriber" onClose={() => { setShowAddSubscriber(false); setSubForm({ name: "", email: "" }); }}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Full Name *</label>
              <input type="text" value={subForm.name} onChange={(e) => setSubForm({ ...subForm, name: e.target.value })} placeholder="e.g. Jane Wanjiku" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Email *</label>
              <input type="email" value={subForm.email} onChange={(e) => setSubForm({ ...subForm, email: e.target.value })} placeholder="e.g. jane@example.com" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => { setShowAddSubscriber(false); setSubForm({ name: "", email: "" }); }} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddSubscriber} disabled={!subForm.name || !subForm.email} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Add Subscriber</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Subscriber Modal */}
      {showEditSubscriber && (
        <Modal title="Edit Subscriber" onClose={() => { setShowEditSubscriber(false); setSelectedSubscriber(null); setSubForm({ name: "", email: "" }); }}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Full Name *</label>
              <input type="text" value={subForm.name} onChange={(e) => setSubForm({ ...subForm, name: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Email *</label>
              <input type="email" value={subForm.email} onChange={(e) => setSubForm({ ...subForm, email: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => { setShowEditSubscriber(false); setSelectedSubscriber(null); }} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleEditSubscriber} disabled={!subForm.name || !subForm.email} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Save Changes</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Subscriber Modal */}
      {showDeleteSubscriber && selectedSubscriber && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="font-display text-lg font-bold text-black mb-2">Remove Subscriber?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">Remove "{selectedSubscriber.name}" from the newsletter list?</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteSubscriber(false); setSelectedSubscriber(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleDeleteSubscriber} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600">Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Campaign Modal */}
      {showAddCampaign && (
        <Modal title="New Campaign" onClose={() => { setShowAddCampaign(false); setCampForm({ subject: "", content: "" }); }}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Subject *</label>
              <input type="text" value={campForm.subject} onChange={(e) => setCampForm({ ...campForm, subject: e.target.value })} placeholder="e.g. Monthly Newsletter" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Content *</label>
              <textarea value={campForm.content} onChange={(e) => setCampForm({ ...campForm, content: e.target.value })} rows={5} placeholder="Write your newsletter content..." className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black resize-none" />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => { setShowAddCampaign(false); setCampForm({ subject: "", content: "" }); }} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddCampaign} disabled={!campForm.subject || !campForm.content} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Save as Draft</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Campaign Modal */}
      {showEditCampaign && (
        <Modal title="Edit Campaign" onClose={() => { setShowEditCampaign(false); setSelectedCampaign(null); setCampForm({ subject: "", content: "" }); }}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Subject *</label>
              <input type="text" value={campForm.subject} onChange={(e) => setCampForm({ ...campForm, subject: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Content *</label>
              <textarea value={campForm.content} onChange={(e) => setCampForm({ ...campForm, content: e.target.value })} rows={5} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black resize-none" />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => { setShowEditCampaign(false); setSelectedCampaign(null); }} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleEditCampaign} disabled={!campForm.subject || !campForm.content} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Save Changes</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Campaign Modal */}
      {showDeleteCampaign && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="font-display text-lg font-bold text-black mb-2">Delete Campaign?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">Delete "{selectedCampaign.subject}"? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteCampaign(false); setSelectedCampaign(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleDeleteCampaign} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Campaign Modal */}
      {showPreviewCampaign && selectedCampaign && (
        <Modal title="Preview Campaign" onClose={() => { setShowPreviewCampaign(false); setSelectedCampaign(null); }}>
          <div>
            <h3 className="font-display text-base font-bold text-black mb-3">{selectedCampaign.subject}</h3>
            <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-4">
              <p className="font-body text-sm text-gray-700 whitespace-pre-wrap">{selectedCampaign.content}</p>
            </div>
            {selectedCampaign.status === "sent" && (
              <div className="flex gap-4 text-center">
                <div className="flex-1 bg-green-50 rounded p-3">
                  <p className="font-display text-lg font-bold text-green-600">{selectedCampaign.recipients}</p>
                  <p className="font-body text-[11px] text-gray-500">Recipients</p>
                </div>
                <div className="flex-1 bg-blue-50 rounded p-3">
                  <p className="font-display text-lg font-bold text-blue-600">{selectedCampaign.openRate}%</p>
                  <p className="font-body text-[11px] text-gray-500">Open Rate</p>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminNewsletter;
