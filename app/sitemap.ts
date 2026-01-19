import { MetadataRoute } from 'next';
import { getBlogsIds } from './services';
import { get_case_studies_Ids, get_what_we_builds_Ids } from './services/homePageService';
import { getOpenings_Ids } from './services/jobService';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com';
  const now = new Date();

  const [blogs, careers, services, caseStudies] = await Promise.all([
    getBlogsIds(),
    getOpenings_Ids(),
    get_what_we_builds_Ids(),
    get_case_studies_Ids(),
  ]);

  return [
    /** ---------- STATIC ROUTES ---------- */
    { url: baseUrl, lastModified: now, priority: 1 },
    { url: `${baseUrl}/blogs`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/careers`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/careers/list`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/contacts`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/portfolio/allcasestudy`, lastModified: now, priority: 0.8 },
    { url: `${baseUrl}/privacypolicy`, lastModified: now, priority: 0.5 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: now, priority: 0.5 },
    { url: `${baseUrl}/service`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/solutions/list`, lastModified: now, priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, priority: 0.9 },

    /** ---------- DYNAMIC ROUTES ---------- */
    ...blogs.map((id: string) => ({
      url: `${baseUrl}/blogs/detail/${id}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),

    ...careers.map((id: string) => ({
      url: `${baseUrl}/careers/careersdetail/${id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),

    ...services.map((id: string) => ({
      url: `${baseUrl}/service/details/${id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),

    ...caseStudies.map((id: string) => ({
      url: `${baseUrl}/solutions/startup/${id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
