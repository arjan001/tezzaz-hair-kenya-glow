import { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, X, Download, Package, Upload, Loader2 } from "lucide-react";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/integrations/supabase/hooks/useProducts";
import { useCategories } from "@/integrations/supabase/hooks/useCategories";
import { uploadProductImage } from "@/integrations/supabase/hooks/useGallery";
import { useToast } from "@/hooks/use-toast";

const emptyForm = {
  name: "", price: "", originalPrice: "", category_name: "", description: "",
  img_url: "", tags: "", in_stock: true, badge: "", is_active: true, details: "", shipping_info: "",
};

type ProductFormData = typeof emptyForm;

const ProductFormModal = ({ title, onSubmit, submitLabel, onClose, initialData, categories, isSubmitting }: {
  title: string; onSubmit: (data: ProductFormData) => void; submitLabel: string; onClose: () => void;
  initialData: ProductFormData; categories: any[]; isSubmitting: boolean;
}) => {
  const [formData, setFormData] = useState<ProductFormData>({ ...initialData });
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleChange = (field: keyof ProductFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadProductImage(file);
      setFormData(prev => ({ ...prev, img_url: url }));
      toast({ title: "Image uploaded!" });
    } catch (err: unknown) {
      toast({ title: "Upload failed", description: err instanceof Error ? err.message : "Unknown error", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-6 space-y-4">
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Product Name *</label>
            <input type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Castor Oil Hair Serum"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Price (KSh) *</label>
              <input type="number" value={formData.price} onChange={(e) => handleChange("price", e.target.value)}
                placeholder="1200"
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Original Price</label>
              <input type="number" value={formData.originalPrice} onChange={(e) => handleChange("originalPrice", e.target.value)}
                placeholder="2000"
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Category</label>
              <select value={formData.category_name} onChange={(e) => handleChange("category_name", e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                <option value="">Select...</option>
                {categories.filter(c => c.slug !== "all").map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Description</label>
            <textarea value={formData.description} onChange={(e) => handleChange("description", e.target.value)}
              rows={2} placeholder="Short product description..."
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black resize-none" />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Full Details</label>
            <textarea value={formData.details} onChange={(e) => handleChange("details", e.target.value)}
              rows={3} placeholder="Full product description shown on product page..."
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black resize-none" />
          </div>
          {/* Image Upload */}
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Product Image</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center hover:border-gray-400 transition-colors">
              {formData.img_url ? (
                <div className="relative">
                  <img src={formData.img_url} alt="Preview" className="w-full h-40 object-cover rounded" />
                  <button type="button" onClick={() => handleChange("img_url", "")} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  {uploading ? <Loader2 className="w-6 h-6 text-gray-300 mx-auto animate-spin" /> : <Upload className="w-6 h-6 text-gray-300 mx-auto mb-1" />}
                  <p className="font-body text-xs text-gray-500 mt-1">{uploading ? "Uploading..." : "Click to upload"}</p>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
                </label>
              )}
            </div>
            <input type="text" value={formData.img_url.startsWith("http") ? formData.img_url : ""} onChange={(e) => handleChange("img_url", e.target.value)}
              placeholder="Or paste image URL..."
              className="mt-2 w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Badge</label>
              <select value={formData.badge} onChange={(e) => handleChange("badge", e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                <option value="">None</option>
                <option value="New In">New In</option>
                <option value="Best Seller">Best Seller</option>
                <option value="On Offer">On Offer</option>
                <option value="Limited">Limited</option>
              </select>
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Tags (comma separated)</label>
              <input type="text" value={formData.tags} onChange={(e) => handleChange("tags", e.target.value)}
                placeholder="hair, serum, natural"
                className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className={`w-9 h-5 rounded-full relative transition-colors ${formData.in_stock ? "bg-black" : "bg-gray-200"}`}
                onClick={() => handleChange("in_stock", !formData.in_stock)}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${formData.in_stock ? "left-[18px]" : "left-0.5"}`} />
              </div>
              <span className="font-body text-xs text-black">In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className={`w-9 h-5 rounded-full relative transition-colors ${formData.is_active ? "bg-black" : "bg-gray-200"}`}
                onClick={() => handleChange("is_active", !formData.is_active)}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${formData.is_active ? "left-[18px]" : "left-0.5"}`} />
              </div>
              <span className="font-body text-xs text-black">Active</span>
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" disabled={!formData.name || !formData.price || isSubmitting}
              className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors disabled:bg-gray-300 flex items-center gap-2">
              {isSubmitting && <Loader2 className="w-3 h-3 animate-spin" />}
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const { data: products = [], isLoading } = useProducts(false);
  const { data: categories = [] } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editInitialData, setEditInitialData] = useState<ProductFormData | null>(null);

  const selectedProduct = products.find((p) => p.id === selectedId) || null;

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCategory === "all" || (p.category_name || "").toLowerCase() === filterCategory.toLowerCase();
    return matchSearch && matchCat;
  });

  const openEdit = (id: string) => {
    const p = products.find((x) => x.id === id)!;
    setSelectedId(id);
    setEditInitialData({
      name: p.name, price: String(p.price_num), originalPrice: p.original_price ? String(p.original_price) : "",
      category_name: p.category_name || "", description: p.description, img_url: p.img_url || "",
      tags: (p.tags || []).join(", "), in_stock: p.in_stock, badge: p.badge || "",
      is_active: p.is_active, details: p.details || "", shipping_info: p.shipping_info || "",
    });
    setShowEditModal(true);
  };

  const handleAdd = (formData: ProductFormData) => {
    if (!formData.name || !formData.price) return;
    const matchedCategory = categories.find(c => c.name === formData.category_name);
    createProduct.mutate({
      name: formData.name,
      description: formData.description,
      category_name: formData.category_name || null,
      category_id: matchedCategory?.id || null,
      price_num: Number(formData.price),
      original_price: formData.originalPrice ? Number(formData.originalPrice) : null,
      badge: formData.badge || null,
      img_url: formData.img_url || null,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : null,
      in_stock: formData.in_stock,
      is_active: formData.is_active,
      details: formData.details || null,
      shipping_info: formData.shipping_info || null,
    }, { onSuccess: () => { setShowAddModal(false); } });
  };

  const handleEdit = (formData: ProductFormData) => {
    if (!selectedId) return;
    const matchedCategory = categories.find(c => c.name === formData.category_name);
    updateProduct.mutate({
      id: selectedId,
      name: formData.name,
      description: formData.description,
      category_name: formData.category_name || null,
      category_id: matchedCategory?.id || null,
      price_num: Number(formData.price),
      original_price: formData.originalPrice ? Number(formData.originalPrice) : null,
      badge: formData.badge || null,
      img_url: formData.img_url || null,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : null,
      in_stock: formData.in_stock,
      is_active: formData.is_active,
      details: formData.details || null,
      shipping_info: formData.shipping_info || null,
    }, { onSuccess: () => { setShowEditModal(false); setSelectedId(null); setEditInitialData(null); } });
  };

  const handleDelete = () => {
    if (!selectedId) return;
    deleteProduct.mutate(selectedId, { onSuccess: () => { setShowDeleteModal(false); setSelectedId(null); } });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Products</h1>
          <p className="font-body text-sm text-gray-400">{products.length} products</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors">
            <Plus className="w-3.5 h-3.5" /> Add Product
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center border border-gray-200 rounded px-3 flex-1 bg-white">
          <Search className="w-4 h-4 text-gray-300" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..." className="flex-1 px-3 py-2.5 font-body text-sm focus:outline-none" />
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none bg-white min-w-[160px]">
          <option value="all">All Categories</option>
          {categories.filter(c => c.slug !== "all").map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Product</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Category</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Price</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Stock</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td colSpan={6} className="px-4 py-10 text-center">
                  <Loader2 className="w-6 h-6 text-gray-300 mx-auto animate-spin mb-2" />
                  <p className="font-body text-sm text-gray-400">Loading products...</p>
                </td></tr>
              )}
              {!isLoading && filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={product.img_url || "/placeholder.svg"} alt={product.name}
                        className="w-10 h-10 object-cover rounded border border-gray-100" />
                      <div>
                        <span className="font-body text-sm text-black font-medium">{product.name}</span>
                        {product.badge && <span className="block font-body text-[10px] text-gray-400">{product.badge}</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="font-body text-sm text-gray-500">{product.category_name || "\u2014"}</span></td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="font-body text-sm font-bold text-black">KSh {Number(product.price_num).toLocaleString()}</span>
                      {product.original_price && <span className="block font-body text-xs text-gray-400 line-through">KSh {Number(product.original_price).toLocaleString()}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide ${product.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {product.in_stock ? "In Stock" : "Out"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide ${product.is_active ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
                      {product.is_active ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setSelectedId(product.id); setShowPreviewModal(true); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => openEdit(product.id)} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => { setSelectedId(product.id); setShowDeleteModal(true); }} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!isLoading && filteredProducts.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-10 text-center">
                  <Package className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="font-body text-sm text-gray-400">{products.length === 0 ? "No products yet. Click 'Add Product' to get started." : "No products match your search"}</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <ProductFormModal title="Add Product" onSubmit={handleAdd} submitLabel="Add Product" onClose={() => setShowAddModal(false)} initialData={emptyForm} categories={categories} isSubmitting={createProduct.isPending} />}
      {showEditModal && editInitialData && <ProductFormModal title="Edit Product" onSubmit={handleEdit} submitLabel="Save Changes" onClose={() => { setShowEditModal(false); setSelectedId(null); setEditInitialData(null); }} initialData={editInitialData} categories={categories} isSubmitting={updateProduct.isPending} />}

      {/* Preview Modal */}
      {showPreviewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-display text-lg font-bold">Product Preview</h2>
              <button onClick={() => { setShowPreviewModal(false); setSelectedId(null); }} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
            </div>
            <img src={selectedProduct.img_url || "/placeholder.svg"} alt={selectedProduct.name} className="w-full h-48 object-cover" />
            <div className="p-5">
              <p className="font-display text-lg font-bold mb-1">{selectedProduct.name}</p>
              <p className="font-body text-xs text-gray-500 mb-2">{selectedProduct.description}</p>
              <p className="font-display text-xl font-bold">KSh {Number(selectedProduct.price_num).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="font-display text-lg font-bold text-black mb-2">Delete Product?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">"{selectedProduct.name}" will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteModal(false); setSelectedId(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleDelete} disabled={deleteProduct.isPending}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600 flex items-center justify-center gap-2">
                {deleteProduct.isPending && <Loader2 className="w-3 h-3 animate-spin" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
