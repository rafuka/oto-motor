import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicit allow for major search + AI engines. Default behavior is "allow",
      // but listing them removes ambiguity for engines that look for explicit policy.
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "DuckDuckBot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
