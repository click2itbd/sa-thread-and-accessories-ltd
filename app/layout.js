import { Poppins } from "next/font/google";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});

export const metadata = {
  metadataBase: new URL("https://www.sathread.com.bd"),
  title: {
    template: "%s | SA Thread & Accessories Ltd.",
    default:
      "SA Thread & Accessories Ltd. | Sewing Thread, Elastic & Drawstring Manufacturer Bangladesh",
  },
  description:
    "Oeko-Tex certified manufacturer of sewing thread, elastic tape, twill tape, drawstring, and draw cord for garments. Supplying 20+ RMG factories from Gazipur, Bangladesh since 2003.",
  keywords: [
    "sewing thread manufacturer Bangladesh",
    "elastic tape supplier",
    "twill tape manufacturer",
    "drawstring manufacturer",
    "draw cord supplier Bangladesh",
    "garments accessories Bangladesh",
    "Oeko-Tex certified thread",
    "RMG accessories supplier",
    "SA Thread Gazipur",
    "BGAPMEA member",
  ],
  authors: [
    { name: "SA Thread & Accessories Ltd.", url: "https://www.sathread.com.bd" },
  ],
  creator: "SA Thread & Accessories Ltd.",
  publisher: "SA Thread & Accessories Ltd.",
  category: "Manufacturing",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title:
      "SA Thread & Accessories Ltd. | Premium Garments Accessories Manufacturer",
    description:
      "Oeko-Tex certified sewing thread, elastic, twill tape & drawstring manufacturer based in Gazipur, Bangladesh. Trusted by 20+ garment factories since 2003.",
    url: "https://www.sathread.com.bd",
    siteName: "SA Thread & Accessories Ltd.",
    images: [
      {
        url: "/sathread.webp",
        width: 1200,
        height: 630,
        alt: "SA Thread & Accessories Ltd. factory in Gazipur, Bangladesh",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SA Thread & Accessories Ltd.",
    description:
      "Oeko-Tex certified manufacturer of sewing thread, elastic, twill tape, drawstring and draw cord for the global garments industry, based in Gazipur, Bangladesh since 2003.",
    images: ["/sathread.webp"],
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  verification: {
    google: "your-google-search-console-verification-code",
  },
};

// JSON-LD structured data for Google Rich Results
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SA Thread & Accessories Ltd.",
  alternateName: "SA Thread",
  url: "https://www.sathread.com.bd",
  logo: "https://www.sathread.com.bd/logo.jpg",
  image: "https://www.sathread.com.bd/sathread.webp",
  description:
    "Oeko-Tex certified manufacturer of sewing thread, elastic, twill tape, drawstring and draw cord for the global garments industry, based in Gazipur, Bangladesh since 2003.",
  foundingDate: "2003",
  address: {
    "@type": "PostalAddress",
    streetAddress: "271/1, Gacha Road, Gacha",
    addressLocality: "Gazipur",
    postalCode: "1704",
    addressCountry: "Bangladesh",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+880-1971-170961",
    contactType: "sales",
    email: "sathread@gmail.com",
    areaServed: "BD",
    availableLanguage: ["English", "Bengali"],
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61577206238228",
  ],
  memberOf: {
    "@type": "Organization",
    name: "BGAPMEA",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${poppins.variable} font-sans flex flex-col min-h-screen`}
      >
        <SiteHeader>
          {children}
        </SiteHeader>
      </body>
    </html>
  );
}
