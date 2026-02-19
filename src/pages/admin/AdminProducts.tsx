import { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  Download,
  Upload,
  Package,
} from "lucide-react";
import type { Product } from "@/context/CartContext";

interface ProductFormData {
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  collection: string;
  desc: string;
  img: string;
  tags: string;
  inStock: boolean;
  isNew: boolean;
  onOffer: boolean;
}

const ProductFormModal = ({
  title,
  onSubmit,
  submitLabel,
  onClose,
  formData,
  setFormData,
}: {
  title: string;
  onSubmit: () => void;
  submitLabel: string;
  onClose: () => void;
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}) => (
  <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
    <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-black">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label className="font-body text-xs font-medium text-black block mb-1">Product Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Castor Oil Hair Serum"
            className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Price (KSh) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="3500"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Original Price (KSh)</label>
            <input
              type="number"
              value={formData.originalPrice}
              onChange={(e) => setFormData((prev) => ({ ...prev, originalPrice: e.target.value }))}
              placeholder="5500"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">Category *</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="e.g. Hair Care"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div>
          <label className="font-body text-xs font-medium text-black block mb-1">Description *</label>
          <textarea
            value={formData.desc}
            onChange={(e) => setFormData((prev) => ({ ...prev, desc: e.target.value }))}
            rows={3}
            placeholder="Describe the product..."
            className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black resize-none"
          />
        </div>

        <div>
          <label className="font-body text-xs font-medium text-black block mb-1">Image URL</label>
          <input
            type="text"
            value={formData.img}
            onChange={(e) => setFormData((prev) => ({ ...prev, img: e.target.value }))}
            placeholder="Or paste image URL..."
            className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="font-body text-xs font-medium text-black block mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
            placeholder="hair care, serum, natural"
            className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-9 h-5 rounded-full relative transition-colors ${formData.inStock ? "bg-black" : "bg-gray-200"}`}
              onClick={() => setFormData((prev) => ({ ...prev, inStock: !prev.inStock }))}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${formData.inStock ? "left-[18px]" : "left-0.5"}`}
              />
            </div>
            <span className="font-body text-xs text-black">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-9 h-5 rounded-full relative transition-colors ${formData.isNew ? "bg-black" : "bg-gray-200"}`}
              onClick={() => setFormData((prev) => ({ ...prev, isNew: !prev.isNew }))}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${formData.isNew ? "left-[18px]" : "left-0.5"}`}
              />
            </div>
            <span className="font-body text-xs text-black">New</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-9 h-5 rounded-full relative transition-colors ${formData.onOffer ? "bg-black" : "bg-gray-200"}`}
              onClick={() => setFormData((prev) => ({ ...prev, onOffer: !prev.onOffer }))}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${formData.onOffer ? "left-[18px]" : "left-0.5"}`}
              />
            </div>
            <span className="font-body text-xs text-black">On Offer</span>
          </label>
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
            disabled={!formData.name || !formData.price}
            className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors disabled:bg-gray-300"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const AdminProducts = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    collection: "",
    desc: "",
    img: "",
    tags: "",
    inStock: true,
    isNew: false,
    onOffer: false,
  });

  const filteredProducts = productList.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      category: "",
      collection: "",
      desc: "",
      img: "",
      tags: "",
      inStock: true,
      isNew: false,
      onOffer: false,
    });
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: String(product.priceNum),
      originalPrice: "",
      category: product.category,
      collection: "",
      desc: product.desc,
      img: product.img,
      tags: "",
      inStock: true,
      isNew: product.badge === "New In",
      onOffer: product.badge === "On Offer",
    });
    setShowEditModal(true);
  };

  const handleAdd = () => {
    const newProduct: Product = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      price: `KSh ${Number(formData.price).toLocaleString()}`,
      priceNum: Number(formData.price),
      badge: formData.isNew ? "New In" : formData.onOffer ? "On Offer" : null,
      img: formData.img || "/placeholder.svg",
      desc: formData.desc,
    };
    setProductList((prev) => [newProduct, ...prev]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedProduct) return;
    setProductList((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id
          ? {
              ...p,
              name: formData.name,
              category: formData.category,
              price: `KSh ${Number(formData.price).toLocaleString()}`,
              priceNum: Number(formData.price),
              badge: formData.isNew ? "New In" : formData.onOffer ? "On Offer" : null,
              desc: formData.desc,
              img: formData.img || p.img,
            }
          : p
      )
    );
    setShowEditModal(false);
    setSelectedProduct(null);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedProduct) return;
    setProductList((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Products</h1>
          <p className="font-body text-sm text-gray-400">{productList.length} products</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors">
            <Upload className="w-3.5 h-3.5" /> Import
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Product
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center border border-gray-200 rounded px-3 flex-1 bg-white">
          <Search className="w-4 h-4 text-gray-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 px-3 py-2.5 font-body text-sm focus:outline-none"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none bg-white min-w-[160px]"
        >
          <option value="all">All Categories</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Product</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Category</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Price</th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded border border-gray-100"
                      />
                      <span className="font-body text-sm text-black">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-body text-sm text-gray-500">{product.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-body text-sm font-bold text-black">{product.price}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {product.badge && (
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide ${
                            product.badge === "New In"
                              ? "bg-blue-100 text-blue-700"
                              : product.badge === "On Offer"
                              ? "bg-green-100 text-green-700"
                              : product.badge === "Best Seller"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowPreviewModal(true);
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-black"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEdit(product)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-black"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowDeleteModal(true);
                        }}
                        className="p-1.5 hover:bg-red-50 rounded transition-colors text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center">
                    <Package className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="font-body text-sm text-gray-400">
                      {productList.length === 0 ? "No products yet. Click 'Add Product' to get started." : "No products found"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <ProductFormModal
          title="Add Product"
          onSubmit={handleAdd}
          submitLabel="Add Product"
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <ProductFormModal
          title="Edit Product"
          onSubmit={handleEdit}
          submitLabel="Save Changes"
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
            resetForm();
          }}
          formData={formData}
          setFormData={setFormData}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="font-display text-lg font-bold text-black mb-2">Delete Product?</h2>
              <p className="font-body text-sm text-gray-500 mb-6">
                Are you sure you want to delete "{selectedProduct.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedProduct(null);
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

      {/* Preview Modal */}
      {showPreviewModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  setSelectedProduct(null);
                }}
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow"
              >
                <X className="w-4 h-4" />
              </button>
              {selectedProduct.badge && (
                <span className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-[10px] font-body uppercase tracking-wide">
                  {selectedProduct.badge}
                </span>
              )}
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-black mb-1">{selectedProduct.name}</h3>
              <p className="font-body text-xs text-gray-400 mb-2">{selectedProduct.category}</p>
              <p className="font-display text-xl font-bold text-black mb-3">{selectedProduct.price}</p>
              <p className="font-body text-sm text-gray-500">{selectedProduct.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
