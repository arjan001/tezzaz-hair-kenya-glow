import { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  Image,
  ChevronLeft,
  ChevronRight,
  Upload,
} from "lucide-react";

interface GalleryItem {
  id: string;
  styleName: string;
  description: string;
  price: string;
  image: string;
  createdAt: string;
}

interface GalleryFormData {
  styleName: string;
  description: string;
  price: string;
  image: string;
}

const GalleryFormModal = ({
  title,
  onSubmit,
  submitLabel,
  onClose,
  formData,
  setFormData,
  imagePreview,
  setImagePreview,
}: {
  title: string;
  onSubmit: () => void;
  submitLabel: string;
  onClose: () => void;
  formData: GalleryFormData;
  setFormData: React.Dispatch<React.SetStateAction<GalleryFormData>>;
  imagePreview: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData((prev) => ({ ...prev, image: result }));
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
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
            <label className="font-body text-xs font-medium text-black block mb-1">
              Hair Style Name *
            </label>
            <input
              type="text"
              value={formData.styleName}
              onChange={(e) => setFormData((prev) => ({ ...prev, styleName: e.target.value }))}
              placeholder="e.g. Goddess Locs, Box Braids, Cornrows"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              placeholder="Describe the hair style, technique, products used..."
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black resize-none"
            />
          </div>

          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">
              Price (KSh)
            </label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="e.g. 3500"
              className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">
              Upload Image *
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded"
                  />
                  <button
                    onClick={() => {
                      setImagePreview("");
                      setFormData((prev) => ({ ...prev, image: "" }));
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="font-body text-sm text-gray-500">Click to upload image</p>
                  <p className="font-body text-xs text-gray-400 mt-1">JPG, PNG, WebP up to 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Or paste URL */}
          <div>
            <label className="font-body text-xs font-medium text-black block mb-1">
              Or paste Image URL
            </label>
            <input
              type="text"
              value={formData.image.startsWith("data:") ? "" : formData.image}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, image: e.target.value }));
                setImagePreview(e.target.value);
              }}
              placeholder="https://example.com/image.jpg"
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
              disabled={!formData.styleName || !formData.image}
              className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors disabled:bg-gray-300"
            >
              {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ITEMS_PER_PAGE = 8;

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const [formData, setFormData] = useState<GalleryFormData>({
    styleName: "",
    description: "",
    price: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const filteredItems = galleryItems.filter(
    (item) =>
      item.styleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetForm = () => {
    setFormData({ styleName: "", description: "", price: "", image: "" });
    setImagePreview("");
  };

  const handleAdd = () => {
    const newItem: GalleryItem = {
      id: String(Date.now()),
      styleName: formData.styleName,
      description: formData.description,
      price: formData.price ? `KSh ${Number(formData.price).toLocaleString()}` : "",
      image: formData.image || "/placeholder.svg",
      createdAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    setGalleryItems((prev) => [newItem, ...prev]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedItem) return;
    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              styleName: formData.styleName,
              description: formData.description,
              price: formData.price
                ? `KSh ${Number(formData.price.replace(/[^0-9]/g, "")).toLocaleString()}`
                : "",
              image: formData.image || item.image,
            }
          : item
      )
    );
    setShowEditModal(false);
    setSelectedItem(null);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    setGalleryItems((prev) => prev.filter((item) => item.id !== selectedItem.id));
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const openEdit = (item: GalleryItem) => {
    setSelectedItem(item);
    setFormData({
      styleName: item.styleName,
      description: item.description,
      price: item.price.replace(/[^0-9]/g, ""),
      image: item.image,
    });
    setImagePreview(item.image);
    setShowEditModal(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Gallery</h1>
          <p className="font-body text-sm text-gray-400">
            {galleryItems.length} hair style{galleryItems.length !== 1 ? "s" : ""} in gallery
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Hair Style
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <Image className="w-4 h-4 text-gray-400 mb-2" />
          <p className="font-display text-xl font-bold text-black">{galleryItems.length}</p>
          <p className="font-body text-[11px] text-gray-400">Total Styles</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <Image className="w-4 h-4 text-gray-400 mb-2" />
          <p className="font-display text-xl font-bold text-black">
            {galleryItems.filter((i) => i.price).length}
          </p>
          <p className="font-body text-[11px] text-gray-400">With Pricing</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <Image className="w-4 h-4 text-gray-400 mb-2" />
          <p className="font-display text-xl font-bold text-black">
            {galleryItems.filter((i) => i.description).length}
          </p>
          <p className="font-body text-[11px] text-gray-400">With Description</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center border border-gray-200 rounded px-3 flex-1 bg-white">
          <Search className="w-4 h-4 text-gray-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search hair styles..."
            className="flex-1 px-3 py-2.5 font-body text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">
                  Image
                </th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">
                  Style Name
                </th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">
                  Price
                </th>
                <th className="px-4 py-3 text-left font-body text-xs font-bold text-black uppercase tracking-wide">
                  Date Added
                </th>
                <th className="px-4 py-3 text-right font-body text-xs font-bold text-black uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={item.image}
                      alt={item.styleName}
                      className="w-12 h-12 object-cover rounded border border-gray-100"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-body text-sm font-medium text-black">{item.styleName}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-body text-xs text-gray-500 line-clamp-2 max-w-[200px] block">
                      {item.description || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-body text-sm font-bold text-black">
                      {item.price || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-body text-xs text-gray-500">{item.createdAt}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowPreviewModal(true);
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-black"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-black"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
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
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center">
                    <Image className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="font-body text-sm text-gray-400">
                      {galleryItems.length === 0
                        ? "No hair styles yet. Click 'Add Hair Style' to get started."
                        : "No matching hair styles found"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <p className="font-body text-xs text-gray-400">
            {filteredItems.length === 0
              ? "No items"
              : `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredItems.length
                )} of ${filteredItems.length}`}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded font-body text-xs ${
                  page === currentPage
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <GalleryFormModal
          title="Add Hair Style"
          onSubmit={handleAdd}
          submitLabel="Add Hair Style"
          onClose={() => {
            setShowAddModal(false);
            resetForm();
          }}
          formData={formData}
          setFormData={setFormData}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <GalleryFormModal
          title="Edit Hair Style"
          onSubmit={handleEdit}
          submitLabel="Save Changes"
          onClose={() => {
            setShowEditModal(false);
            setSelectedItem(null);
            resetForm();
          }}
          formData={formData}
          setFormData={setFormData}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="font-display text-lg font-bold text-black mb-2">
                Delete Hair Style?
              </h2>
              <p className="font-body text-sm text-gray-500 mb-6">
                Are you sure you want to delete "{selectedItem.styleName}"? This action cannot be
                undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedItem(null);
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
      {showPreviewModal && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.styleName}
                className="w-full h-72 object-cover"
              />
              <button
                onClick={() => {
                  setShowPreviewModal(false);
                  setSelectedItem(null);
                }}
                className="absolute top-3 right-3 bg-white rounded-full p-1 shadow"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-black mb-1">
                {selectedItem.styleName}
              </h3>
              {selectedItem.description && (
                <p className="font-body text-sm text-gray-500 mb-2">{selectedItem.description}</p>
              )}
              {selectedItem.price && (
                <p className="font-display text-xl font-bold text-[hsl(var(--gold-dark))]">
                  {selectedItem.price}
                </p>
              )}
              <p className="font-body text-xs text-gray-400 mt-2">Added: {selectedItem.createdAt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
