import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bamjiye.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://bamjiye.com/auth/rider",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://bamjiye.com/auth/driver",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ];
}
