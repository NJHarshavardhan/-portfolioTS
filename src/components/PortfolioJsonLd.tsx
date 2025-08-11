import { Helmet } from "react-helmet-async";

const PortfolioJsonLd = () => {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Harsha Vardhan",
    alternateName: "Harsha",
    jobTitle: "Software Engineer | AI Enthusiast | Full Stack Developer",
    url: "https://harsha-pro.vercel.app",
    sameAs: [
      "https://github.com/NJHarshavardhan",
      "https://www.linkedin.com/in/harshavardhannj/",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Binarychakra",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "harshavardhannj@gmail.com",
      contactType: "Personal",
    },
    knowsAbout: [
      "React",
      "TypeScript",
      "Node.js",
      "Shopify Development",
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "Flutter",
      "Android Development",
      "iOS Development",
      "Mac Development",
      "LLM (Large Language Models)",
      "Prompt Engineering",
      "Software Engineering",
      "AI Powered",
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
    </Helmet>
  );
};

export default PortfolioJsonLd;
