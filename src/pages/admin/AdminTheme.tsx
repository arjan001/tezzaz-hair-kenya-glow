import { useState } from "react";
import {
  Plus,
  Palette,
  Pencil,
  Trash2,
  X,
  Eye,
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  Type,
  Image,
  Layout,
} from "lucide-react";

interface ThemePreset {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
  isActive: boolean;
}

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  isActive: boolean;
  position: "hero" | "shop" | "promo";
}

const initialThemes: ThemePreset[] = [
  {
    id: "1",
    name: "Tezzaz Default",
    primaryColor: "#C2185B",
    secondaryColor: "#1A1A1A",
    backgroundColor: "#FAFAFA",
    textColor: "#1A1A1A",
    accentColor: "#E91E63",
    fontHeading: "Playfair Display",
    fontBody: "Lato",
    isActive: true,
  },
];

const initialBanners: Banner[] = [];

const ITEMS_PER_PAGE = 5;

const AdminTheme = () => {
  const [activeTab, setActiveTab] = useState<"themes" | "banners" | "typography">("themes");
  const [themes, setThemes] = useState<ThemePreset[]>(initialThemes);
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Theme modals
  const [showAddTheme, setShowAddTheme] = useState(false);
  const [showEditTheme, setShowEditTheme] = useState(false);
  const [showDeleteTheme, setShowDeleteTheme] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemePreset | null>(null);
  const [themeForm, setThemeForm] = useState({
    name: "",
    primaryColor: "#C2185B",
    secondaryColor: "#1A1A1A",
    backgroundColor: "#FAFAFA",
    textColor: "#1A1A1A",
    accentColor: "#E91E63",
    fontHeading: "Playfair Display",
    fontBody: "Lato",
  });

  // Banner modals
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [showEditBanner, setShowEditBanner] = useState(false);
  const [showDeleteBanner, setShowDeleteBanner] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    image: "",
    link: "",
    position: "hero" as "hero" | "shop" | "promo",
  });

  const fontOptions = ["Playfair Display", "Inter", "Lato", "Lora", "Space Mono"];

  const handleAddTheme = () => {
    setThemes((prev) => [...prev, { id: String(Date.now()), ...themeForm, isActive: false }]);
    setShowAddTheme(false);
  };

  const handleEditTheme = () => {
    if (!selectedTheme) return;
    setThemes((prev) => prev.map((t) => (t.id === selectedTheme.id ? { ...t, ...themeForm } : t)));
    setShowEditTheme(false);
    setSelectedTheme(null);
  };

  const handleDeleteTheme = () => {
    if (!selectedTheme) return;
    setThemes((prev) => prev.filter((t) => t.id !== selectedTheme.id));
    setShowDeleteTheme(false);
    setSelectedTheme(null);
  };

  const activateTheme = (id: string) => {
    setThemes((prev) => prev.map((t) => ({ ...t, isActive: t.id === id })));
  };

  const handleAddBanner = () => {
    setBanners((prev) => [...prev, { id: String(Date.now()), ...bannerForm, isActive: true }]);
    setShowAddBanner(false);
    setBannerForm({ title: "", subtitle: "", image: "", link: "", position: "hero" });
  };

  const handleEditBanner = () => {
    if (!selectedBanner) return;
    setBanners((prev) => prev.map((b) => (b.id === selectedBanner.id ? { ...b, ...bannerForm } : b)));
    setShowEditBanner(false);
    setSelectedBanner(null);
  };

  const handleDeleteBanner = () => {
    if (!selectedBanner) return;
    setBanners((prev) => prev.filter((b) => b.id !== selectedBanner.id));
    setShowDeleteBanner(false);
    setSelectedBanner(null);
  };

  const toggleBannerActive = (id: string) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b)));
  };

  const filteredThemes = themes.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredBanners = banners.filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const Modal = ({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) => (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className={`bg-white w-full rounded-lg ${wide ? "max-w-xl" : "max-w-md"}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Theme</h1>
          <p className="font-body text-sm text-gray-400">Customize your store appearance</p>
        </div>
        <button
          onClick={() => {
            if (activeTab === "themes") {
              setThemeForm({ name: "", primaryColor: "#C2185B", secondaryColor: "#1A1A1A", backgroundColor: "#FAFAFA", textColor: "#1A1A1A", accentColor: "#E91E63", fontHeading: "Playfair Display", fontBody: "Lato" });
              setShowAddTheme(true);
            } else if (activeTab === "banners") {
              setBannerForm({ title: "", subtitle: "", image: "", link: "", position: "hero" });
              setShowAddBanner(true);
            }
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> {activeTab === "themes" ? "Add Theme" : activeTab === "banners" ? "Add Banner" : ""}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {([
          { id: "themes", label: "Color Themes", icon: Palette },
          { id: "banners", label: "Banners", icon: Image },
          { id: "typography", label: "Typography", icon: Type },
        ] as const).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setCurrentPage(1); setSearchQuery(""); }}
              className={`flex items-center gap-1.5 px-4 py-2.5 font-body text-xs border-b-2 transition-colors ${
                activeTab === tab.id ? "border-black text-black font-medium" : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search */}
      {activeTab !== "typography" && (
        <div className="flex w-full sm:w-72 border border-gray-200 rounded mb-6">
          <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} placeholder="Search..." className="flex-1 font-body text-sm px-3 py-2 focus:outline-none" />
          <div className="px-3 flex items-center text-gray-400"><Search className="w-4 h-4" /></div>
        </div>
      )}

      {/* Themes Tab */}
      {activeTab === "themes" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredThemes.map((theme) => (
            <div key={theme.id} className={`bg-white border-2 rounded-lg p-5 transition-all ${theme.isActive ? "border-black" : "border-gray-200"}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-bold text-black">{theme.name}</h3>
                    {theme.isActive && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded text-[10px] font-body font-bold text-green-600">
                        <Check className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                  <p className="font-body text-[11px] text-gray-400 mt-0.5">{theme.fontHeading} / {theme.fontBody}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setSelectedTheme(theme); setThemeForm({ name: theme.name, primaryColor: theme.primaryColor, secondaryColor: theme.secondaryColor, backgroundColor: theme.backgroundColor, textColor: theme.textColor, accentColor: theme.accentColor, fontHeading: theme.fontHeading, fontBody: theme.fontBody }); setShowEditTheme(true); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"><Pencil className="w-3.5 h-3.5" /></button>
                  {!theme.isActive && <button onClick={() => { setSelectedTheme(theme); setShowDeleteTheme(true); }} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>}
                </div>
              </div>

              {/* Color swatches */}
              <div className="flex gap-2 mb-4">
                {[
                  { color: theme.primaryColor, label: "Primary" },
                  { color: theme.secondaryColor, label: "Secondary" },
                  { color: theme.accentColor, label: "Accent" },
                  { color: theme.backgroundColor, label: "BG" },
                  { color: theme.textColor, label: "Text" },
                ].map((swatch) => (
                  <div key={swatch.label} className="text-center">
                    <div className="w-8 h-8 rounded border border-gray-200" style={{ backgroundColor: swatch.color }} />
                    <p className="font-body text-[9px] text-gray-400 mt-1">{swatch.label}</p>
                  </div>
                ))}
              </div>

              {/* Preview bar */}
              <div className="h-8 rounded overflow-hidden flex">
                <div className="flex-1" style={{ backgroundColor: theme.primaryColor }} />
                <div className="flex-1" style={{ backgroundColor: theme.secondaryColor }} />
                <div className="flex-1" style={{ backgroundColor: theme.accentColor }} />
                <div className="flex-1 border border-gray-200" style={{ backgroundColor: theme.backgroundColor }} />
              </div>

              {!theme.isActive && (
                <button
                  onClick={() => activateTheme(theme.id)}
                  className="mt-4 w-full py-2 border border-gray-200 rounded font-body text-xs hover:bg-gray-50 transition-colors"
                >
                  Activate Theme
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Banners Tab */}
      {activeTab === "banners" && (
        <div className="space-y-4">
          {filteredBanners.map((banner) => (
            <div key={banner.id} className={`bg-white border border-gray-200 rounded-lg p-5 ${!banner.isActive ? "opacity-50" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <Layout className="w-6 h-6 text-gray-400 m-auto mt-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-sm font-bold text-black">{banner.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-body font-bold uppercase tracking-wide ${
                        banner.position === "hero" ? "bg-black text-white" : banner.position === "shop" ? "bg-blue-50 text-blue-600" : "bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold-dark))]"
                      }`}>{banner.position}</span>
                    </div>
                    <p className="font-body text-xs text-gray-500">{banner.subtitle}</p>
                    {banner.link && <p className="font-body text-[11px] text-gray-400 mt-1">Link: {banner.link}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${banner.isActive ? "bg-black" : "bg-gray-200"}`}
                    onClick={() => toggleBannerActive(banner.id)}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${banner.isActive ? "left-[18px]" : "left-0.5"}`} />
                  </div>
                  <button onClick={() => { setSelectedBanner(banner); setBannerForm({ title: banner.title, subtitle: banner.subtitle, image: banner.image, link: banner.link, position: banner.position }); setShowEditBanner(true); }} className="p-1.5 hover:bg-gray-100 rounded text-gray-400 hover:text-black"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => { setSelectedBanner(banner); setShowDeleteBanner(true); }} className="p-1.5 hover:bg-red-50 rounded text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Typography Tab */}
      {activeTab === "typography" && (
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-display text-base font-bold text-black mb-4">Font Preview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fontOptions.map((font) => (
                <div key={font} className="border border-gray-200 rounded-lg p-4">
                  <p className="font-body text-xs text-gray-400 mb-2 uppercase tracking-wide">{font}</p>
                  <p style={{ fontFamily: font }} className="text-2xl font-bold text-black mb-1">Tezzaz Hair & Beauty</p>
                  <p style={{ fontFamily: font }} className="text-sm text-gray-600">The quick brown fox jumps over the lazy dog. 0123456789</p>
                  <p style={{ fontFamily: font }} className="text-sm text-gray-600 mt-1">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-display text-base font-bold text-black mb-4">Active Font Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Heading Font</label>
                <div className="border border-gray-200 rounded px-3 py-2.5 font-body text-sm bg-gray-50">{themes.find((t) => t.isActive)?.fontHeading || "Playfair Display"}</div>
              </div>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Body Font</label>
                <div className="border border-gray-200 rounded px-3 py-2.5 font-body text-sm bg-gray-50">{themes.find((t) => t.isActive)?.fontBody || "Lato"}</div>
              </div>
            </div>
            <p className="font-body text-[11px] text-gray-400 mt-3">Fonts are managed through the active theme. Edit the active theme to change fonts.</p>
          </div>
        </div>
      )}

      {/* Add Theme Modal */}
      {showAddTheme && (
        <Modal title="Add Theme Preset" onClose={() => setShowAddTheme(false)} wide>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Theme Name *</label>
              <input type="text" value={themeForm.name} onChange={(e) => setThemeForm({ ...themeForm, name: e.target.value })} placeholder="e.g. Dark Mode" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: "primaryColor" as const, label: "Primary" },
                { key: "secondaryColor" as const, label: "Secondary" },
                { key: "accentColor" as const, label: "Accent" },
                { key: "backgroundColor" as const, label: "Background" },
                { key: "textColor" as const, label: "Text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="font-body text-xs font-medium text-black block mb-1">{field.label}</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1.5">
                    <input type="color" value={themeForm[field.key]} onChange={(e) => setThemeForm({ ...themeForm, [field.key]: e.target.value })} className="w-6 h-6 border-0 p-0 cursor-pointer" />
                    <input type="text" value={themeForm[field.key]} onChange={(e) => setThemeForm({ ...themeForm, [field.key]: e.target.value })} className="flex-1 font-body text-xs font-mono focus:outline-none" />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Heading Font</label>
                <select value={themeForm.fontHeading} onChange={(e) => setThemeForm({ ...themeForm, fontHeading: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                  {fontOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Body Font</label>
                <select value={themeForm.fontBody} onChange={(e) => setThemeForm({ ...themeForm, fontBody: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                  {fontOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => setShowAddTheme(false)} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddTheme} disabled={!themeForm.name} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Add Theme</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Theme Modal */}
      {showEditTheme && (
        <Modal title="Edit Theme" onClose={() => { setShowEditTheme(false); setSelectedTheme(null); }} wide>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Theme Name *</label>
              <input type="text" value={themeForm.name} onChange={(e) => setThemeForm({ ...themeForm, name: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: "primaryColor" as const, label: "Primary" },
                { key: "secondaryColor" as const, label: "Secondary" },
                { key: "accentColor" as const, label: "Accent" },
                { key: "backgroundColor" as const, label: "Background" },
                { key: "textColor" as const, label: "Text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="font-body text-xs font-medium text-black block mb-1">{field.label}</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1.5">
                    <input type="color" value={themeForm[field.key]} onChange={(e) => setThemeForm({ ...themeForm, [field.key]: e.target.value })} className="w-6 h-6 border-0 p-0 cursor-pointer" />
                    <input type="text" value={themeForm[field.key]} onChange={(e) => setThemeForm({ ...themeForm, [field.key]: e.target.value })} className="flex-1 font-body text-xs font-mono focus:outline-none" />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Heading Font</label>
                <select value={themeForm.fontHeading} onChange={(e) => setThemeForm({ ...themeForm, fontHeading: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                  {fontOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Body Font</label>
                <select value={themeForm.fontBody} onChange={(e) => setThemeForm({ ...themeForm, fontBody: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                  {fontOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => { setShowEditTheme(false); setSelectedTheme(null); }} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleEditTheme} disabled={!themeForm.name} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Save Changes</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Theme Modal */}
      {showDeleteTheme && selectedTheme && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h2 className="font-display text-lg font-bold text-black mb-2">Delete Theme?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">Delete "{selectedTheme.name}"?</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteTheme(false); setSelectedTheme(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleDeleteTheme} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Banner Modal */}
      {showAddBanner && (
        <Modal title="Add Banner" onClose={() => setShowAddBanner(false)}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Title *</label>
              <input type="text" value={bannerForm.title} onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })} placeholder="Banner headline" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Subtitle</label>
              <input type="text" value={bannerForm.subtitle} onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })} placeholder="Banner subtitle" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Image URL</label>
              <input type="text" value={bannerForm.image} onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })} placeholder="/assets/banner.jpg" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Link</label>
                <input type="text" value={bannerForm.link} onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })} placeholder="/shop" className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Position</label>
                <select value={bannerForm.position} onChange={(e) => setBannerForm({ ...bannerForm, position: e.target.value as "hero" | "shop" | "promo" })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                  <option value="hero">Hero</option>
                  <option value="shop">Shop</option>
                  <option value="promo">Promo</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => setShowAddBanner(false)} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleAddBanner} disabled={!bannerForm.title} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Add Banner</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Banner Modal */}
      {showEditBanner && (
        <Modal title="Edit Banner" onClose={() => { setShowEditBanner(false); setSelectedBanner(null); }}>
          <div className="space-y-4">
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Title *</label>
              <input type="text" value={bannerForm.title} onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Subtitle</label>
              <input type="text" value={bannerForm.subtitle} onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div>
              <label className="font-body text-xs font-medium text-black block mb-1">Image URL</label>
              <input type="text" value={bannerForm.image} onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Link</label>
                <input type="text" value={bannerForm.link} onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black" />
              </div>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Position</label>
                <select value={bannerForm.position} onChange={(e) => setBannerForm({ ...bannerForm, position: e.target.value as "hero" | "shop" | "promo" })} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                  <option value="hero">Hero</option>
                  <option value="shop">Shop</option>
                  <option value="promo">Promo</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button onClick={() => { setShowEditBanner(false); setSelectedBanner(null); }} className="px-5 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleEditBanner} disabled={!bannerForm.title} className="px-5 py-2.5 bg-black text-white rounded font-body text-xs hover:bg-gray-800 disabled:bg-gray-300">Save Changes</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Banner Modal */}
      {showDeleteBanner && selectedBanner && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
            <h2 className="font-display text-lg font-bold text-black mb-2">Delete Banner?</h2>
            <p className="font-body text-sm text-gray-500 mb-6">Delete "{selectedBanner.title}"?</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteBanner(false); setSelectedBanner(null); }} className="flex-1 px-4 py-2.5 border border-gray-200 rounded font-body text-xs hover:bg-gray-50">Cancel</button>
              <button onClick={handleDeleteBanner} className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded font-body text-xs hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTheme;
