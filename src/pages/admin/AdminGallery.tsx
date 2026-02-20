import { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, X, Image, ChevronLeft, ChevronRight, Upload, Loader2 } from "lucide-react";
import { useGallery, useCreateGalleryItem, useUpdateGalleryItem, useDeleteGalleryItem, uploadGalleryImage } from "@/integrations/supabase/hooks/useGallery";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 8;

interface GalleryFormData {
  styleName: string;
  description: string;
  price: string;
  image: string;
}

interface GalleryFormModalProps {
  title: string;
  onSubmit: () => void;
  submitLabel: string;
  onClose: () => void;
  formData: GalleryFormData;
  setFormData: React.Dispatch<React.SetStateAction<GalleryFormData>>;
  imagePreview: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  isPending: boolean;
}

const GalleryFormModal = ({ title, onSubmit, submitLabel, onClose, formData, setFormData, imagePreview, setImagePreview, isPending }: GalleryFormModalProps) => {
  const [uploading, setUploading] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState(formData.image || "");
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadGalleryImage(file);
      setFormData((f) => ({ ...f, image: url }));
      setImagePreview(url);
      setImageUrlInput("");
      toast({ title: "Image uploaded!" });
    } catch (err: unknown) {
      toast({ title: "Upload failed", description: err instanceof Error ? err.message : "Unknown", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImageUrlInput(value);
    setFormData((f) => ({ ...f, image: value }));
    if (value) {
      setImagePreview(value);
    } else {
      setImagePreview("");
    }
  };

  const handleClearImage = () => {
    setImagePreview("");
    setImageUrlInput("");
    setFormData((f) => ({ ...f, image: "" }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="p-6 space-y-4">
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Hair Style Name *</label>
            <input type="text" value={formData.styleName} onChange={(e) => setFormData((f) => ({ ...f, styleName: e.target.value }))}
              placeholder="e.g. Goddess Locs, Box Braids"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
              rows={3} placeholder="Describe the style..." className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black resize-none" />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Price (KSh)</label>
            <input type="number" value={formData.price} onChange={(e) => setFormData((f) => ({ ...f, price: e.target.value }))}
              placeholder="e.g. 3500"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Upload Image *</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded" />
                  <button type="button" onClick={handleClearImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  {uploading ? <Loader2 className="w-8 h-8 text-gray-300 mx-auto animate-spin" /> : <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />}
                  <p className="font-body text-sm text-gray-500">{uploading ? "Uploading..." : "Click to upload image"}</p>
                  <p className="font-body text-xs text-gray-400 mt-1">JPG, PNG, WebP up to 5MB</p>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                </label>
              )}
            </div>
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Or paste Image URL</label>
            <input type="text" value={imageUrlInput}
              onChange={handleUrlChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
            <button type="submit" disabled={!formData.styleName || !formData.image || isPending}
              className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300 flex items-center gap-2">
              {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminGallery = () => {
  const { data: galleryItems = [], isLoading } = useGallery();
  const createItem = useCreateGalleryItem();
  const updateItem = useUpdateGalleryItem();
  const deleteItem = useDeleteGalleryItem();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState<GalleryFormData>({ styleName: "", description: "", price: "", image: "" });
  const [imagePreview, setImagePreview] = useState("");

  const selectedItem = galleryItems.find((i) => i.id === selectedId) || null;

  const filteredItems = galleryItems.filter(
    (item) => item.style_name.toLowerCase().includes(searchQuery.toLowerCase()) || (item.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const resetForm = () => { setFormData({ styleName: "", description: "", price: "", image: "" }); setImagePreview(""); };

  const handleAdd = () => {
    createItem.mutate({
      style_name: formData.styleName,
      description: formData.description || null,
      price: formData.price ? Number(formData.price) : null,
      image_url: formData.image,
    }, { onSuccess: () => { setShowAddModal(false); resetForm(); } });
  };

  const handleEdit = () => {
    if (!selectedId) return;
    updateItem.mutate({
      id: selectedId,
      style_name: formData.styleName,
      description: formData.description || null,
      price: formData.price ? Number(formData.price) : null,
      image_url: formData.image,
    }, { onSuccess: () => { setShowEditModal(false); setSelectedId(null); resetForm(); } });
  };

  const handleDelete = () => {
    if (!selectedId) return;
    deleteItem.mutate(selectedId, { onSuccess: () => { setShowDeleteModal(false); setSelectedId(null); } });
  };

  const openEdit = (id: string) => {
    const item = galleryItems.find((x) => x.id === id)!;
    setSelectedId(id);
    setFormData({ styleName: item.style_name, description: item.description || "", price: item.price ? String(item.price) : "", image: item.image_url });
    setImagePreview(item.image_url);
    setShowEditModal(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Gallery</h1>
          <p className="font-body text-sm text-gray-400">{galleryItems.length} hair styles</p>
        </div>
        <button onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800">
          <Plus className="w-3.5 h-3.5" /> Add Hair Style
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Styles", val: galleryItems.length },
          { label: "With Pricing", val: galleryItems.filter((i) => i.price).length },
          { label: "With Description", val: galleryItems.filter((i) => i.description).length },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-lg p-4">
            <Image className="w-4 h-4 text-gray-400 mb-2" />
            <p className="font-display text-xl font-bold text-black">{s.val}</p>
            <p className="font-body text-[11px] text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center border border-gray-200 rounded px-3 bg-white mb-6">
        <Search className="w-4 h-4 text-gray-300" />
        <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          placeholder="Search hair styles..." className="flex-1 px-3 py-2.5 font-body text-sm focus:outline-none" />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Image</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Style Name</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Description</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Price</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Date</th>
                <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={6} className="px-4 py-10 text-center"><Loader2 className="w-6 h-6 text-gray-300 mx-auto animate-spin" /></td></tr>}
              {!isLoading && paginatedItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3"><img src={item.image_url} alt={item.style_name} className="w-12 h-12 object-cover rounded border border-gray-100" /></td>
                  <td className="px-4 py-3"><span className="font-body text-sm font-medium text-black">{item.style_name}</span></td>
                  <td className="px-4 py-3"><span className="font-body text-xs text-gray-500 line-clamp-2 max-w-[200px] block">{item.description || "—"}</span></td>
                  <td className="px-4 py-3"><span className="font-body text-sm font-bold text-black">{item.price ? `KSh ${Number(item.price).toLocaleString()}` : "—"}</span></td>
                  <td className="px-4 py-3"><span className="font-body text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setSelectedId(item.id); setShowPreviewModal(true); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(item.id)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => { setSelectedId(item.id); setShowDeleteModal(true); }} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && filteredItems.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center">
                  <Image className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="font-body text-sm text-gray-400">{galleryItems.length === 0 ? "No hair styles yet. Click 'Add Hair Style' to get started." : "No matching items"}</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="font-body text-xs text-gray-400">Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of {filteredItems.length}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`w-7 h-7 rounded font-body text-xs ${p === currentPage ? "bg-black text-white" : "hover:bg-gray-100 text-gray-600"}`}>{p}</button>
              ))}
              <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <GalleryFormModal
          title="Add Hair Style"
          onSubmit={handleAdd}
          submitLabel="Add Style"
          onClose={() => { setShowAddModal(false); resetForm(); }}
          formData={formData}
          setFormData={setFormData}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          isPending={createItem.isPending}
        />
      )}
      {showEditModal && (
        <GalleryFormModal
          title="Edit Hair Style"
          onSubmit={handleEdit}
          submitLabel="Save Changes"
          onClose={() => { setShowEditModal(false); setSelectedId(null); resetForm(); }}
          formData={formData}
          setFormData={setFormData}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          isPending={updateItem.isPending}
        />
      )}

      {showPreviewModal && selectedItem && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4" onClick={() => { setShowPreviewModal(false); setSelectedId(null); }}>
          <div className="bg-white max-w-sm w-full rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img src={selectedItem.image_url} alt={selectedItem.style_name} className="w-full h-64 object-cover" />
            <div className="p-5">
              <h3 className="font-display text-lg font-bold mb-1">{selectedItem.style_name}</h3>
              {selectedItem.description && <p className="font-body text-sm text-gray-500 mb-2">{selectedItem.description}</p>}
              {selectedItem.price && <p className="font-display text-xl font-bold">KSh {Number(selectedItem.price).toLocaleString()}</p>}
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h2 className="font-display text-lg font-bold text-black mb-2">Delete Item?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">"{selectedItem.style_name}" will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteModal(false); setSelectedId(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} disabled={deleteItem.isPending}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600 flex items-center justify-center gap-2">
                {deleteItem.isPending && <Loader2 className="w-3 h-3 animate-spin" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
