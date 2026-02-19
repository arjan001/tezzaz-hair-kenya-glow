import { useState } from "react";
import {
  Plus,
  FileText,
  Pencil,
  Trash2,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";

interface Policy {
  id: string;
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  lastUpdated: string;
}

const initialPolicies: Policy[] = [
  {
    id: "1",
    title: "Return & Refund Policy",
    slug: "return-refund",
    content: "At Tezzaz Hair, we want you to be completely satisfied with your purchase. If you are not satisfied, you may return unused products in their original packaging within 7 days of purchase for a full refund. Products that have been opened or used cannot be returned for hygiene reasons. Refunds will be processed via M-Pesa within 3-5 business days. For service-related issues, please contact us within 24 hours of your appointment.",
    isPublished: true,
    lastUpdated: "15 Feb 2026",
  },
  {
    id: "2",
    title: "Shipping & Delivery Policy",
    slug: "shipping-delivery",
    content: "We offer delivery within Nairobi and surrounding areas. Standard delivery takes 1-3 business days. Same-day delivery is available for Nairobi CBD orders placed before 12pm. Free delivery on orders above KSh 2,000 within Nairobi CBD. Delivery fees vary by location. All orders are carefully packaged to ensure products arrive in perfect condition.",
    isPublished: true,
    lastUpdated: "10 Feb 2026",
  },
  {
    id: "3",
    title: "Privacy Policy",
    slug: "privacy",
    content: "Tezzaz Hair respects your privacy. We collect personal information only as needed to process orders and improve our services. Your data is never sold to third parties. We use secure payment processing through M-Pesa. You may request deletion of your personal data at any time by contacting us at admin@tezzazhair.com.",
    isPublished: true,
    lastUpdated: "01 Feb 2026",
  },
  {
    id: "4",
    title: "Terms of Service",
    slug: "terms",
    content: "By using the Tezzaz Hair website and services, you agree to these terms. All services must be booked in advance. Cancellations must be made at least 2 hours before the appointment. No-shows may be charged a cancellation fee. Prices are subject to change without notice. All product images are for illustration purposes.",
    isPublished: true,
    lastUpdated: "01 Feb 2026",
  },
];

const ITEMS_PER_PAGE = 5;

const AdminPolicies = () => {
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selected, setSelected] = useState<Policy | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", content: "" });

  const filtered = policies.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleAdd = () => {
    setPolicies((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: form.title,
        slug: form.slug || generateSlug(form.title),
        content: form.content,
        isPublished: false,
        lastUpdated: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      },
    ]);
    setShowAdd(false);
    setForm({ title: "", slug: "", content: "" });
  };

  const handleEdit = () => {
    if (!selected) return;
    setPolicies((prev) =>
      prev.map((p) =>
        p.id === selected.id
          ? {
              ...p,
              title: form.title,
              slug: form.slug || generateSlug(form.title),
              content: form.content,
              lastUpdated: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
            }
          : p
      )
    );
    setShowEdit(false);
    setSelected(null);
    setForm({ title: "", slug: "", content: "" });
  };

  const handleDelete = () => {
    if (!selected) return;
    setPolicies((prev) => prev.filter((p) => p.id !== selected.id));
    setShowDelete(false);
    setSelected(null);
  };

  const togglePublish = (id: string) => {
    setPolicies((prev) => prev.map((p) => (p.id === id ? { ...p, isPublished: !p.isPublished } : p)));
  };

  const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Policies</h1>
          <p className="font-body text-sm text-gray-400">{policies.length} policies &middot; {policies.filter((p) => p.isPublished).length} published</p>
        </div>
        <button
          onClick={() => { setForm({ title: "", slug: "", content: "" }); setShowAdd(true); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Policy
        </button>
      </div>

      {/* Search */}
      <div className="flex w-full sm:w-72 border border-gray-200 rounded mb-6">
        <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} placeholder="Search policies..." className="flex-1 font-body text-sm px-3 py-2 focus:outline-none" />
        <div className="px-3 flex items-center text-gray-400"><Search className="w-4 h-4" /></div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Policy</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Slug</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Updated</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((policy) => (
                <tr key={policy.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <p className="font-body text-sm text-black font-medium">{policy.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-body text-xs text-gray-500 font-mono">/{policy.slug}</td>
                  <td className="px-4 py-3 font-body text-sm text-gray-500">{policy.lastUpdated}</td>
                  <td className="px-4 py-3">
                    <div
                      className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${policy.isPublished ? "bg-black" : "bg-gray-200"}`}
                      onClick={() => togglePublish(policy.id)}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${policy.isPublished ? "left-[18px]" : "left-0.5"}`} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => { setSelected(policy); setShowPreview(true); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { setSelected(policy); setForm({ title: policy.title, slug: policy.slug, content: policy.content }); setShowEdit(true); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { setSelected(policy); setShowDelete(true); }} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="font-body text-xs text-gray-400">Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`w-7 h-7 rounded font-body text-xs ${page === currentPage ? "bg-black text-white" : "hover:bg-gray-100 text-gray-600"}`}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <Modal title="Add Policy" onClose={() => { setShowAdd(false); setForm({ title: "", slug: "", content: "" }); }}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} placeholder="e.g. Cookie Policy" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">URL Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black font-mono" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Content *</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} placeholder="Write the policy content..." className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black resize-none" />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => setShowAdd(false)} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleAdd} disabled={!form.title || !form.content} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Add Policy</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Modal */}
      {showEdit && (
        <Modal title="Edit Policy" onClose={() => { setShowEdit(false); setSelected(null); setForm({ title: "", slug: "", content: "" }); }}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Title *</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">URL Slug</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black font-mono" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Content *</label>
              <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black resize-none" />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => { setShowEdit(false); setSelected(null); }} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleEdit} disabled={!form.title || !form.content} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Save Changes</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {showDelete && selected && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h2 className="font-display text-lg font-bold text-black mb-2">Delete Policy?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">Delete "{selected.title}"? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDelete(false); setSelected(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selected && (
        <Modal title={selected.title} onClose={() => { setShowPreview(false); setSelected(null); }}>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-body text-xs text-gray-400 font-mono">/{selected.slug}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase ${selected.isPublished ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                {selected.isPublished ? "Published" : "Draft"}
              </span>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded p-4">
              <p className="font-body text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{selected.content}</p>
            </div>
            <p className="font-body text-[11px] text-gray-400 mt-3">Last updated: {selected.lastUpdated}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminPolicies;
