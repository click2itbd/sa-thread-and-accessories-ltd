import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  metadataBase: new URL("https://www.S.A..com"),
  title: {
    template: "%s | S.A. Thread & Accessories Ltd.",
    default:
      "S.A. Thread & Accessories Ltd. | Sewing Thread, Elastic & Drawstring Manufacturer, Bangladesh",
  },
  description:
    "Oeko-Tex certified manufacturer of sewing thread, elastic, twill tape, drawstring & draw cord for garments. Supplying 20+ RMG factories from our Gazipur, Bangladesh facility since 2003.",
  keywords: [
    "sewing thread manufacturer Bangladesh",
    "elastic tape supplier",
    "twill tape manufacturer",
    "drawstring manufacturer",
    "draw cord supplier Bangladesh",
    "garments accessories Bangladesh",
    "Oeko-Tex certified thread",
    "RMG accessories supplier",
    "S.A. Thread Gazipur",
    "SA Thread Gazipur",
    "BGAPMEA member",
  ],
  authors: [
    { name: "S.A. Thread & Accessories Ltd.", url: "https://www.S.A..com" },
  ],
  creator: "S.A. Thread & Accessories Ltd.",
  publisher: "S.A Thread & Accessories Ltd.",
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
    title: "S.A. Thread & Accessories Ltd. | Premium Garments Accessories Manufacturer",
    description: "Oeko-Tex certified sewing thread, elastic, twill tape & drawstring manufacturer based in Gazipur, Bangladesh. Trusted by 20+ garment factories since 2003.",
    url: "https://www.S.A..com",
    siteName: "S.A. Thread & Accessories Ltd.",
    images: [
      {
        url: "/factory.jpg",
        width: 1200,
        height: 630,
        alt: "S.A. Thread & Accessories Ltd. factory in Gazipur, Bangladesh",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "S.A. Thread & Accessories Ltd.",
    description: "Oeko-Tex certified manufacturer of sewing thread, elastic, twill tape & drawstring for the global garment industry.",
    images: ["/factory.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "your-google-search-console-verification-code",
  },
};

// JSON-LD structured data — helps Google understand this is a manufacturing

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type0": "Organization",
  name: "S.A. Thread & Accessories Ltd.",
  alternatename: "S.A. Thread",
  url: "https://www.S.A.thread.com.bd",
  logo: "https://www.S.A.thread.com.bd/logo.png",
  image: "https://www.S.A.thread.com.bd/factory.jpg",
  description: "Oeko-Tex certified manufacturer of sewing thread, elastic, twill tape, drawstring and draw cord for the global garments industry, based in Gazipur, Bangladesh since 2003.",
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
    // Add your live social profiles here, e.g.:
    // "https://www.facebook.com/sathread",
    // "https://www.linkedin.com/company/sathread",
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd) }}/>
      </head>
      <body className={`${poppins.variable} font-sans flex flex-col min-h-screen`}>
        <Navbar/>
        <PageTransition>
          <div className="flex-1">{children}</div>
        </PageTransition>
        <Footer/>
      </body>
    </html>
  )
}
