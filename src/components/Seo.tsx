import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageSeo } from "@/lib/seo";

/** Keep metadata current after client-side navigation as well as direct visits. */
export default function Seo() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getPageSeo(pathname);
    document.title = seo.title;
    document.documentElement.lang = "ko";
    const tags = [
      ["name", "description", seo.description],
      ["name", "robots", seo.robots],
      ["property", "og:title", seo.title],
      ["property", "og:description", seo.description],
      ["property", "og:url", seo.canonical],
      ["property", "og:type", "website"],
      ["property", "og:site_name", "솔라캄"],
      ["property", "og:locale", "ko_KR"],
    ];
    for (const [attribute, name, content] of tags) {
      let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.append(meta);
      }
      meta.content = content;
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = seo.canonical;
  }, [pathname]);
  return null;
}
