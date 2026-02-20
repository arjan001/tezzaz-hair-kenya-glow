import { useState } from "react";
import { Plus, Search, Pencil, Trash2, X, Tag, Loader2 } from "lucide-react";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/integrations/supabase/hooks/useCategories";

const CategoryFormModal = ({ title, onSubmit, submitLabel, onClose, formData, setFormData, isSubmitting }: {
  title: string; onSubmit: () => void; submitLabel: string; onClose: () => void;
  formData: { name: string; slug: string; image: string }; setFormData: (data: { name: string; slug: string; image: string }) => void;
  isSubmitting: boolean;
}) => (
  <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-md rounded-lg">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="font-body text-xs font-medium text-black block mb-1">Category Name *</label>
          <input type="text" value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
            placeholder="e.g. Hair Care"
            className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
        </div>
        <div>
          <label className="font-body text-xs font-medium text-black block mb-1">Slug</label>
          <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="auto-generated"
            className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
        </div>
        <div>
          <label className="font-body text-xs font-medium text-black block mb-1">Image URL</label>
          <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://..."
            className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
        </div>
        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
          <button onClick={onSubmit} disabled={!formData.name || isSubmitting}
            className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300 flex items-center gap-2">
            {isSubmitting && <Loader2 className="w-3 h-3 animate-spin" />}
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AdminCategories = () => {
  const { data: categoryList = [], isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", image: "" });

  const selectedCategory = categoryList.find((c) => c.id === selectedId) || null;

  const filteredCategories = categoryList.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => setFormData({ name: "", slug: "", image: "" });

  const handleAdd = () => {
    createCategory.mutate({
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      image_url: formData.image || null,
    }, { onSuccess: () => { setShowAddModal(false); resetForm(); } });
  };

  const handleEdit = () => {
    if (!selectedId) return;
    updateCategory.mutate({
      id: selectedId,
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      image_url: formData.image || null,
    }, { onSuccess: () => { setShowEditModal(false); setSelectedId(null); resetForm(); } });
  };

  const handleDelete = () => {
    if (!selectedId) return;
    deleteCategory.mutate(selectedId, { onSuccess: () => { setShowDeleteModal(false); setSelectedId(null); } });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Categories</h1>
          <p className="font-body text-sm text-gray-400">{categoryList.length} categories</p>
        </div>
        <button onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800">
          <Plus className="w-3.5 h-3.5" /> Add Category
        </button>
      </div>

      <div className="flex items-center border border-gray-200 rounded px-3 bg-white mb-6 max-w-md">
        <Search className="w-4 h-4 text-gray-300" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories..." className="flex-1 px-3 py-2.5 font-body text-sm focus:outline-none" />
      </div>

      {isLoading && <div className="text-center py-10"><Loader2 className="w-6 h-6 text-gray-300 mx-auto animate-spin" /></div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              {category.image_url ? (
                <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" />
              ) : (
                <Tag className="w-10 h-10 text-gray-200" />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-body text-sm font-bold text-black">{category.name}</h3>
                  <p className="font-body text-[11px] text-gray-400">{category.slug}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  <button onClick={() => {
                    setSelectedId(category.id);
                    setFormData({ name: category.name, slug: category.slug, image: category.image_url || "" });
                    setShowEditModal(true);
                  }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => { setSelectedId(category.id); setShowDeleteModal(true); }}
                    className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <Tag className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="font-body text-sm text-gray-400">No categories found</p>
        </div>
      )}

      {showAddModal && <CategoryFormModal title="Add Category" onSubmit={handleAdd} submitLabel="Add Category" onClose={() => { setShowAddModal(false); resetForm(); }} formData={formData} setFormData={setFormData} isSubmitting={createCategory.isPending || updateCategory.isPending} />}
      {showEditModal && <CategoryFormModal title="Edit Category" onSubmit={handleEdit} submitLabel="Save Changes" onClose={() => { setShowEditModal(false); setSelectedId(null); resetForm(); }} formData={formData} setFormData={setFormData} isSubmitting={createCategory.isPending || updateCategory.isPending} />}

      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h2 className="font-display text-lg font-bold text-black mb-2">Delete Category?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">"{selectedCategory.name}" will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteModal(false); setSelectedId(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs">Cancel</button>
              <button onClick={handleDelete} disabled={deleteCategory.isPending}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600 flex items-center justify-center gap-2">
                {deleteCategory.isPending && <Loader2 className="w-3 h-3 animate-spin" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
