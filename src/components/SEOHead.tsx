import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object;
}

const SITE_URL = "https://tezzaz-hair.com";
const SITE_NAME = "Tezzaz Hair & Beauty Studio";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

const SEOHead = ({
  title,
  description,
  canonicalPath,
  keywords,
  ogType = "website",
  ogImage,
  structuredData,
}: SEOHeadProps) => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_KE" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tezzaz_hair" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
