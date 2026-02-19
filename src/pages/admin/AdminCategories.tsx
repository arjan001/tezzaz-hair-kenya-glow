import { useState } from "react";
import { Plus, Search, Pencil, Trash2, X, Tag } from "lucide-react";
import { categories as initialCategories } from "@/data/products";

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

const defaultCategories: Category[] = initialCategories
  .filter((c) => c.id !== "all")
  .map((c) => ({
    id: c.id,
    name: c.name,
    slug: `/${c.id}`,
    image: "",
    productCount: 0,
  }));

const AdminCategories = () => {
  const [categoryList, setCategoryList] = useState<Category[]>(defaultCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image: "",
  });

  const filteredCategories = categoryList.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({ name: "", slug: "", image: "" });
  };

  const handleAdd = () => {
    const newCategory: Category = {
      id: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      name: formData.name,
      slug: "/" + (formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-")),
      image: formData.image,
      productCount: 0,
    };
    setCategoryList((prev) => [...prev, newCategory]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedCategory) return;
    setCategoryList((prev) =>
      prev.map((c) =>
        c.id === selectedCategory.id
          ? {
              ...c,
              name: formData.name,
              slug: "/" + (formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-")),
              image: formData.image,
            }
          : c
      )
    );
    setShowEditModal(false);
    setSelectedCategory(null);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedCategory) return;
    setCategoryList((prev) => prev.filter((c) => c.id !== selectedCategory.id));
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  const CategoryFormModal = ({
    title,
    onSubmit,
    submitLabel,
    onClose,
  }: {
    title: string;
    onSubmit: () => void;
    submitLabel: string;
    onClose: () => void;
  }) => (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Category Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                })
              }
              placeholder="e.g. Skinny Jeans"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="Auto-generated from name"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!formData.name}
              className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors disabled:bg-gray-300"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Categories</h1>
          <p className="font-body text-sm text-gray-400">{categoryList.length} categories</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Category
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center border border-gray-200 rounded px-3 bg-white mb-6 max-w-md">
        <Search className="w-4 h-4 text-gray-300" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories..."
          className="flex-1 px-3 py-2.5 font-body text-sm focus:outline-none"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden group">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Tag className="w-10 h-10 text-gray-200" />
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-body text-sm font-bold text-black">{category.name}</h3>
                  <p className="font-body text-xs text-gray-400">
                    {category.productCount} products
                  </p>
                  <p className="font-body text-[11px] text-gray-300">{category.slug}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setFormData({
                        name: category.name,
                        slug: category.slug.replace("/", ""),
                        image: category.image,
                      });
                      setShowEditModal(true);
                    }}
                    className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-black"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowDeleteModal(true);
                    }}
                    className="p-1.5 hover:bg-red-50 rounded transition-colors text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16">
          <Tag className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="font-body text-sm text-gray-400">No categories found</p>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <CategoryFormModal
          title="Add Category"
          onSubmit={handleAdd}
          submitLabel="Add Category"
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <CategoryFormModal
          title="Edit Category"
          onSubmit={handleEdit}
          submitLabel="Save Changes"
          onClose={() => {
            setShowEditModal(false);
            setSelectedCategory(null);
            resetForm();
          }}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="font-display text-lg font-bold text-black mb-2">Delete Category?</h2>
              <p className="font-body text-sm text-gray-500 mb-6">
                Are you sure you want to delete "{selectedCategory.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCategory(null);
                  }}
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

export default AdminCategories;
