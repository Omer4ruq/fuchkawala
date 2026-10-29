import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight, Tiro_Bangla } from "next/font/google";
import { site, streetFood, beverages } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const tiroBangla = Tiro_Bangla({
  variable: "--font-tiro-bangla",
  subsets: ["bengali"],
  weight: "400",
});

const title = "Fuchkawala — Authentic Bangladeshi Fuchka in Upper Darby, Philadelphia";
const description =
  "Philadelphia's most addictive fuchka. Handmade crispy shells, fresh tamarind water, haleem, chotpoti and jhal muri — 100% halal, made fresh daily at 303 S 69th St, Upper Darby, PA.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s · Fuchkawala" },
  description,
  keywords: [
    "fuchka Philadelphia",
    "pani puri Upper Darby",
    "Bangladeshi street food",
    "halal food Upper Darby",
    "haleem Philadelphia",
    "chotpoti",
    "jhal muri",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title,
    description,
    images: [{ url: "/img/hero-img.webp", width: 768, height: 512, alt: "A platter of fuchka with tamarind water" }],
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description, images: ["/img/hero-img.webp"] },
  icons: { icon: "/img/fuchkawala-logo.webp", apple: "/img/fuchkawala-logo.webp" },
};

export const viewport: Viewport = {
  themeColor: "#0b1615",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  url: site.url,
  image: `${site.url}/img/hero-img.webp`,
  logo: `${site.url}/img/fuchkawala-logo.webp`,
  telephone: "+1-610-835-3074",
  email: site.email,
  servesCuisine: ["Bangladeshi", "South Asian", "Street Food"],
  priceRange: "$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.zip,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "12:00",
    closes: "22:00",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating, reviewCount: site.reviewCount },
  sameAs: [site.facebook, site.instagram],
  hasMenu: {
    "@type": "Menu",
    hasMenuSection: [
      { name: "Street Food", items: streetFood },
      { name: "Beverages", items: beverages },
    ].map((s) => ({
      "@type": "MenuSection",
      name: s.name,
      hasMenuItem: s.items.map((d) => ({
        "@type": "MenuItem",
        name: d.name,
        description: d.desc,
        offers: { "@type": "Offer", price: d.price.toFixed(2), priceCurrency: "USD" },
      })),
    })),
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${interTight.variable} ${tiroBangla.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
