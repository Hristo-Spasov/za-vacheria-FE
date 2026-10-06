import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CTASection from "@/components/landing/CTASection";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "За Вечеря",
  alternateName: "Za Vecheria",
  url: "https://zavecheria.com",
  description:
    "Отговорете на няколко въпроса и получите персонализирани предложения какво да сготвите.",
  inLanguage: "bg",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://zavecheria.com/main?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "За Вечеря",
  url: "https://zavecheria.com",
  logo: "https://zavecheria.com/web-app-manifest-512x512.png",
  description:
    "„За Вечеря“ помага да откриете перфектната рецепта бързо и лесно - отговорете на няколко въпроса и получете персонализирани предложения.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <CTASection />
    </main>
  );
}
