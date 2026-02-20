import { useState } from "react";
import {
  Save,
  Store,
  Bell,
  Truck,
  CreditCard,
  Shield,
  Search as SearchIcon,
  Globe,
  LayoutGrid,
  Megaphone,
  Palette,
  Navigation,
} from "lucide-react";

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <div
    className={`w-9 h-5 rounded-full relative cursor-pointer transition-colors ${checked ? "bg-black" : "bg-gray-200"}`}
    onClick={onChange}
  >
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "left-[18px]" : "left-0.5"}`} />
  </div>
);

const InputField = ({ label, value, onChange, type = "text", placeholder = "", note = "" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; note?: string;
}) => (
  <div>
    <label className="font-body text-xs font-medium text-black block mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black"
    />
    {note && <p className="font-body text-[11px] text-gray-400 mt-1">{note}</p>}
  </div>
);

const TextareaField = ({ label, value, onChange, rows = 3, note = "" }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number; note?: string;
}) => (
  <div>
    <label className="font-body text-xs font-medium text-black block mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black resize-none"
    />
    {note && <p className="font-body text-[11px] text-gray-400 mt-1">{note}</p>}
  </div>
);

const ToggleRow = ({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: () => void;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100">
    <div>
      <p className="font-body text-sm font-medium text-black">{label}</p>
      <p className="font-body text-xs text-gray-400">{description}</p>
    </div>
    <Toggle checked={checked} onChange={onChange} />
  </div>
);

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  // General
  const [storeName, setStoreName] = useState("Tezzaz Hair");
  const [storeEmail, setStoreEmail] = useState("admin@tezzazhair.com");
  const [storePhone, setStorePhone] = useState("+254 711 135 090");
  const [currency, setCurrency] = useState("KSh");
  const [storeAddress, setStoreAddress] = useState("The Bazaar Plaza, 10th Floor, Wing B, Suite 1025, Nairobi");
  const [storeTagline, setStoreTagline] = useState("Nairobi's Premier Hair & Beauty Studio");

  // Delivery
  const [deliveryFee, setDeliveryFee] = useState("200");
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState("2000");
  const [deliveryNotes, setDeliveryNotes] = useState("Free delivery within Nairobi for orders above KSh 2,000. Standard delivery 1-3 business days.");

  // Payments
  const [paybillNumber, setPaybillNumber] = useState("899890");
  const [accountName, setAccountName] = useState("TEZZAZ_HAIR");

  // Notifications
  const [notifyOrders, setNotifyOrders] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(true);
  const [notifyNewsletter, setNotifyNewsletter] = useState(false);
  const [notifyReviews, setNotifyReviews] = useState(true);

  // SEO
  const [seoTitle, setSeoTitle] = useState("Tezzaz Hair & Beauty Studio Nairobi | Hair, Locs & Nail Art");
  const [seoDescription, setSeoDescription] = useState("Welcome to Tezzaz Hair, Nairobi's top beauty studio located at The Bazaar Plaza. Specializing in professional hairdressing, sisterlocks, dreadlocks, nail art, and quality hair products.");
  const [seoKeywords, setSeoKeywords] = useState("Tezzaz Hair Nairobi, Best hair salon in Nairobi CBD, Professional locs stylist Kenya, Nail art studio Nairobi, Silk sleepwear Kenya");
  const [ogImage, setOgImage] = useState("https://tezzaz-hair.com/images/og-image.jpg");
  const [canonicalUrl, setCanonicalUrl] = useState("https://tezzaz-hair.com");
  const [twitterHandle, setTwitterHandle] = useState("@tezzaz_hair");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");

  // Footer
  const [footerCopyright, setFooterCopyright] = useState("© 2025 Tezzaz Hair. All Rights Reserved.");
  const [footerAddress, setFooterAddress] = useState("The Bazaar, 10th Floor, Suite 1025, Nairobi, Kenya");
  const [footerEmail, setFooterEmail] = useState("booking@tezzaz-hair.com");
  const [footerPhone, setFooterPhone] = useState("+254 711 135090");
  const [footerInstagram, setFooterInstagram] = useState("https://www.instagram.com/tezzaz_hair.ke/");
  const [footerTiktok, setFooterTiktok] = useState("https://www.tiktok.com/@tezzaz1");
  const [footerWhatsapp, setFooterWhatsapp] = useState("254711135090");
  const [showFooterMap, setShowFooterMap] = useState(true);
  const [showFooterNewsletter, setShowFooterNewsletter] = useState(true);

  // Navbar
  const [navbarLogoText, setNavbarLogoText] = useState("Tezzaz");
  const [navbarLogoSubtext, setNavbarLogoSubtext] = useState("Hair");
  const [showNavOffers, setShowNavOffers] = useState(true);
  const [navBookingText, setNavBookingText] = useState("Book Now");
  const [showNavWishlist, setShowNavWishlist] = useState(true);
  const [showNavCart, setShowNavCart] = useState(true);
  const [navOffer1, setNavOffer1] = useState("FREE BROW SHAPING with any Hair Service this Month");
  const [navOffer2, setNavOffer2] = useState("Buy 2 Nail Services, Get 1 FREE — Limited Time Offer");
  const [navOffer3, setNavOffer3] = useState("Refer a Friend & Both Get 15% OFF Your Next Visit");

  // Offers
  const [offersEnabled, setOffersEnabled] = useState(true);
  const [offerBannerText, setOfferBannerText] = useState("Valentine's Special — 20% Off All Services");
  const [offerStartDate, setOfferStartDate] = useState("2026-02-14");
  const [offerEndDate, setOfferEndDate] = useState("2026-02-28");
  const [offerBadgeText, setOfferBadgeText] = useState("On Offer");
  const [offerDiscountPercent, setOfferDiscountPercent] = useState("20");
  const [showOfferCountdown, setShowOfferCountdown] = useState(true);

  // Theme
  const [primaryColor, setPrimaryColor] = useState("#C2185B");
  const [secondaryColor, setSecondaryColor] = useState("#1A1A1A");
  const [accentColor, setAccentColor] = useState("#E91E63");
  const [bgColor, setBgColor] = useState("#FAFAFA");
  const [headingFont, setHeadingFont] = useState("Playfair Display");
  const [bodyFont, setBodyFont] = useState("Lato");
  const [borderRadius, setBorderRadius] = useState("0");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Store },
    { id: "seo", label: "SEO", icon: SearchIcon },
    { id: "navbar", label: "Navbar", icon: Navigation },
    { id: "footer", label: "Footer", icon: LayoutGrid },
    { id: "offers", label: "Offers", icon: Megaphone },
    { id: "delivery", label: "Delivery", icon: Truck },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "theme", label: "Theme", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-black">Settings</h1>
          <p className="font-body text-sm text-gray-400">Manage your store configuration</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 bg-black text-white rounded font-body text-xs hover:bg-gray-800 transition-colors"
        >
          <Save className="w-3.5 h-3.5" /> {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 font-body text-xs border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-black text-black font-medium"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
        {/* General */}
        {activeTab === "general" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Store Information</h2>
            <InputField label="Store Name" value={storeName} onChange={setStoreName} />
            <InputField label="Tagline" value={storeTagline} onChange={setStoreTagline} />
            <InputField label="Email" value={storeEmail} onChange={setStoreEmail} type="email" />
            <InputField label="Phone" value={storePhone} onChange={setStorePhone} type="tel" />
            <InputField label="Address" value={storeAddress} onChange={setStoreAddress} />
            <InputField label="Currency" value={currency} onChange={setCurrency} />
          </div>
        )}

        {/* SEO */}
        {activeTab === "seo" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Search Engine Optimization</h2>
            <InputField label="SEO Title" value={seoTitle} onChange={setSeoTitle} note="Recommended: 50-60 characters" />
            <TextareaField label="Meta Description" value={seoDescription} onChange={setSeoDescription} note="Recommended: 150-160 characters" />
            <TextareaField label="Keywords" value={seoKeywords} onChange={setSeoKeywords} rows={2} note="Comma-separated keywords" />
            <InputField label="OG Image URL" value={ogImage} onChange={setOgImage} placeholder="https://tezzaz-hair.com/images/og-image.jpg" />
            <InputField label="Canonical URL" value={canonicalUrl} onChange={setCanonicalUrl} />
            <InputField label="Twitter Handle" value={twitterHandle} onChange={setTwitterHandle} placeholder="@tezzaz_hair" />
            <InputField label="Google Analytics ID" value={googleAnalyticsId} onChange={setGoogleAnalyticsId} placeholder="G-XXXXXXXXXX" note="Leave empty to disable tracking" />

            <div className="bg-gray-50 border border-gray-200 rounded p-4 mt-4">
              <p className="font-body text-xs font-bold text-black mb-2">SEO Preview</p>
              <div className="space-y-1">
                <p className="font-body text-sm text-blue-700 font-medium truncate">{seoTitle}</p>
                <p className="font-body text-xs text-green-700 truncate">{canonicalUrl}</p>
                <p className="font-body text-xs text-gray-600 line-clamp-2">{seoDescription}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navbar */}
        {activeTab === "navbar" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Navbar Settings</h2>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Logo Text" value={navbarLogoText} onChange={setNavbarLogoText} />
              <InputField label="Logo Subtext" value={navbarLogoSubtext} onChange={setNavbarLogoSubtext} />
            </div>
            <InputField label="Booking Button Text" value={navBookingText} onChange={setNavBookingText} />
            <ToggleRow label="Show Offers Banner" description="Display rotating offers in the top bar" checked={showNavOffers} onChange={() => setShowNavOffers(!showNavOffers)} />
            <ToggleRow label="Show Wishlist Icon" description="Show wishlist heart icon in navbar" checked={showNavWishlist} onChange={() => setShowNavWishlist(!showNavWishlist)} />
            <ToggleRow label="Show Cart Icon" description="Show shopping bag icon in navbar" checked={showNavCart} onChange={() => setShowNavCart(!showNavCart)} />

            {showNavOffers && (
              <div className="space-y-3 pt-3 border-t border-gray-100">
                <p className="font-body text-xs font-bold text-black">Offer Texts (rotate in the top bar)</p>
                <InputField label="Offer 1" value={navOffer1} onChange={setNavOffer1} />
                <InputField label="Offer 2" value={navOffer2} onChange={setNavOffer2} />
                <InputField label="Offer 3" value={navOffer3} onChange={setNavOffer3} />
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        {activeTab === "footer" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Footer Settings</h2>
            <InputField label="Copyright Text" value={footerCopyright} onChange={setFooterCopyright} />
            <InputField label="Address" value={footerAddress} onChange={setFooterAddress} />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Email" value={footerEmail} onChange={setFooterEmail} type="email" />
              <InputField label="Phone" value={footerPhone} onChange={setFooterPhone} type="tel" />
            </div>

            <h3 className="font-body text-xs font-bold text-black pt-3 border-t border-gray-100">Social Links</h3>
            <InputField label="Instagram URL" value={footerInstagram} onChange={setFooterInstagram} />
            <InputField label="TikTok URL" value={footerTiktok} onChange={setFooterTiktok} />
            <InputField label="WhatsApp Number" value={footerWhatsapp} onChange={setFooterWhatsapp} note="Without + sign, e.g. 254711135090" />

            <ToggleRow label="Show Map" description="Display Google Maps embed in footer" checked={showFooterMap} onChange={() => setShowFooterMap(!showFooterMap)} />
            <ToggleRow label="Show Newsletter Form" description="Display email subscription form in footer" checked={showFooterNewsletter} onChange={() => setShowFooterNewsletter(!showFooterNewsletter)} />
          </div>
        )}

        {/* Offers */}
        {activeTab === "offers" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Offer & Promotion Settings</h2>
            <ToggleRow label="Enable Offers" description="Show offer badges and banners on the store" checked={offersEnabled} onChange={() => setOffersEnabled(!offersEnabled)} />

            {offersEnabled && (
              <>
                <InputField label="Banner Text" value={offerBannerText} onChange={setOfferBannerText} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Start Date" value={offerStartDate} onChange={setOfferStartDate} type="date" />
                  <InputField label="End Date" value={offerEndDate} onChange={setOfferEndDate} type="date" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Badge Text" value={offerBadgeText} onChange={setOfferBadgeText} placeholder="e.g. On Offer, Sale, Limited" />
                  <InputField label="Discount %" value={offerDiscountPercent} onChange={setOfferDiscountPercent} type="number" />
                </div>
                <ToggleRow label="Show Countdown" description="Display a countdown timer on offers" checked={showOfferCountdown} onChange={() => setShowOfferCountdown(!showOfferCountdown)} />
              </>
            )}
          </div>
        )}

        {/* Delivery */}
        {activeTab === "delivery" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Delivery Settings</h2>
            <InputField label="Default Delivery Fee (KSh)" value={deliveryFee} onChange={setDeliveryFee} type="number" />
            <InputField label="Free Delivery Threshold (KSh)" value={freeDeliveryThreshold} onChange={setFreeDeliveryThreshold} type="number" note="Orders above this amount get free delivery" />
            <TextareaField label="Delivery Notes" value={deliveryNotes} onChange={setDeliveryNotes} note="Shown to customers at checkout" />
          </div>
        )}

        {/* Payments */}
        {activeTab === "payments" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">M-Pesa Payment Settings</h2>
            <InputField label="Paybill Number" value={paybillNumber} onChange={setPaybillNumber} />
            <InputField label="Account Name" value={accountName} onChange={setAccountName} />
          </div>
        )}

        {/* Notifications */}
        {activeTab === "notifications" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Notification Preferences</h2>
            <ToggleRow label="New Order Notifications" description="Get notified when a new order is placed" checked={notifyOrders} onChange={() => setNotifyOrders(!notifyOrders)} />
            <ToggleRow label="Low Stock Alerts" description="Get notified when product stock is low" checked={notifyLowStock} onChange={() => setNotifyLowStock(!notifyLowStock)} />
            <ToggleRow label="Newsletter Signups" description="Get notified when someone subscribes" checked={notifyNewsletter} onChange={() => setNotifyNewsletter(!notifyNewsletter)} />
            <ToggleRow label="Product Reviews" description="Get notified on new customer reviews" checked={notifyReviews} onChange={() => setNotifyReviews(!notifyReviews)} />
          </div>
        )}

        {/* Theme */}
        {activeTab === "theme" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Theme & Appearance</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Primary Color", value: primaryColor, onChange: setPrimaryColor },
                { label: "Secondary Color", value: secondaryColor, onChange: setSecondaryColor },
                { label: "Accent Color", value: accentColor, onChange: setAccentColor },
                { label: "Background", value: bgColor, onChange: setBgColor },
              ].map((field) => (
                <div key={field.label}>
                  <label className="font-body text-xs font-medium text-black block mb-1">{field.label}</label>
                  <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1.5">
                    <input type="color" value={field.value} onChange={(e) => field.onChange(e.target.value)} className="w-6 h-6 border-0 p-0 cursor-pointer" />
                    <input type="text" value={field.value} onChange={(e) => field.onChange(e.target.value)} className="flex-1 font-body text-xs font-mono focus:outline-none" />
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-body text-xs font-bold text-black pt-3 border-t border-gray-100">Typography</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Heading Font</label>
                <select value={headingFont} onChange={(e) => setHeadingFont(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                  {["Playfair Display", "Inter", "Lato", "Lora", "Space Mono"].map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="font-body text-xs font-medium text-black block mb-1">Body Font</label>
                <select value={bodyFont} onChange={(e) => setBodyFont(e.target.value)} className="w-full border border-gray-200 rounded px-3 py-2.5 font-body text-sm focus:outline-none focus:border-black bg-white">
                  {["Lato", "Inter", "Playfair Display", "Lora", "Space Mono"].map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            <InputField label="Border Radius (px)" value={borderRadius} onChange={setBorderRadius} type="number" note="0 for sharp corners (neo-brutalism), higher for rounded" />

            {/* Live Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded p-4 mt-4">
              <p className="font-body text-xs font-bold text-black mb-3">Live Preview</p>
              <div className="p-4 rounded" style={{ backgroundColor: bgColor, borderRadius: `${borderRadius}px` }}>
                <p style={{ fontFamily: headingFont, color: secondaryColor }} className="text-lg font-bold mb-1">Tezzaz Hair</p>
                <p style={{ fontFamily: bodyFont, color: secondaryColor }} className="text-sm mb-3 opacity-70">Nairobi's Premier Beauty Studio</p>
                <button style={{ backgroundColor: primaryColor, borderRadius: `${borderRadius}px` }} className="text-white text-xs px-4 py-2 font-bold">Book Now</button>
              </div>
            </div>
          </div>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <div className="space-y-5">
            <h2 className="font-display text-base font-bold text-black mb-4">Security Settings</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <p className="font-body text-sm text-gray-500">
                Security settings will be available after Supabase integration. This will include authentication, role-based access control, and session management.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;
