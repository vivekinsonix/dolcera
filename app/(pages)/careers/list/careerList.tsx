'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { getOpenings } from '@/app/services/jobService';
import SpinnerService from '@/app/services/SpinnerService';
import { JobItem, JobsResponse } from '@/app/utils/Interfaces';
import { truncateContent } from '@/app/utils/utility';
import { Badge, Card } from 'flowbite-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export const CareersList = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  // --------------------------
  // FETCH JOBS (IMPROVED)
  // --------------------------
  useEffect(() => {
    SpinnerService.showSpinner();

    getOpenings()
      .then((res: JobsResponse) => {
        setJobs(res.data || []);
      })
      .finally(() => {
        SpinnerService.hideSpinner();
        setLoading(false);
      });
  }, []);

  // --------------------------
  // SEO FOR PAGE (not per card)
  // --------------------------
  const seoData = useMemo(() => {
    return {
      title: 'Careers | Insonix',
      description: 'Explore AI & Python developer job openings at Insonix.',
      keywords: 'careers, jobs, AI jobs, Python jobs, Insonix',
      image: '/default-og.jpg.png',
      url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com'}/careers`,
    };
  }, []);

  const skeletonCards = Array(6).fill(0);

  return (
    <section
      id="careers"
      className="dark:bg-primary min-h-screen py-16 dark:text-white md:py-20"
      aria-labelledby="careers-heading"
      role="region"
    >
      {/* PAGE SEO */}
      <SeoHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        image={seoData.image}
        url={seoData.url}
      />

      <main className="container mx-auto max-w-7xl px-4 py-10">
        <div className="text-center">
          <h2 id="careers-heading" className="text-3xl md:text-5xl font-extrabold">
            Careers - Experienced <br className="sm:hidden" />
            AI & Python Developers
          </h2>

          {/* JOB LIST GRID */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 md:mt-16"
            aria-busy={loading}
            aria-live="polite"
          >
            {/* --------------------
                SKELETON LOADING
               -------------------- */}
            {loading &&
              skeletonCards.map((_, i) => (
                <div
                  key={i}
                  className="p-8 rounded-xl bg-gray-800 shadow-xl border-0 animate-pulse"
                  role="status"
                  aria-label="Loading job card"
                >
                  <div className="h-6 bg-gray-700 rounded w-2/3 mb-4"></div>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <div className="h-5 w-16 bg-gray-700 rounded"></div>
                    <div className="h-5 w-20 bg-gray-700 rounded"></div>
                    <div className="h-5 w-14 bg-gray-700 rounded"></div>
                  </div>

                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-5"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>

                  <div className="mt-6 h-9 w-32 bg-gray-700 rounded"></div>
                </div>
              ))}

            {/* --------------------
                NO DATA
               -------------------- */}
            {!loading && jobs.length === 0 && (
              <div
                className="col-span-3 flex items-center justify-center py-20"
                role="alert"
                aria-label="No jobs available"
              >
                <p className="text-gray-400 text-lg">No active jobs available right now.</p>
              </div>
            )}

            {/* --------------------
                JOB CARDS
               -------------------- */}
            {!loading &&
              jobs.length > 0 &&
              jobs.map((j) => {
                const seoTitle = j.Seo?.metaTitle || j.title;
                const seoDescription = j.Seo?.metaDescription || truncateContent(j.description, 160);
                const seoKeywords =
                  j.Seo?.keywords || j?.skills?.map((e: any) => e.name).join(', ') || 'job, career, Insonix';
                const seoCanonical =
                  j.Seo?.canonicalURL ||
                  `${process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com'}/careers/careersdetail/${j.slug}`;

                return (
                  <Card
                    key={j.id}
                    className="p-8 rounded-xl dark:bg-secondary-dark dark:text-white bg-secondary border-0 shadow-xl transition-transform duration-300 hover:scale-105"
                    aria-label={`Job opening: ${j.title}`}
                  >
                    <h3 className="text-2xl font-bold mb-3" aria-label="Job title">
                      {j.title}
                    </h3>

                    <div className="flex flex-wrap justify-center gap-2 mb-3">
                      {j?.skills?.map((t: any) => (
                        <Badge key={t?.name} color="info" aria-label={`tag ${t}`}>
                          {t?.name}
                        </Badge>
                      ))}
                    </div>

                    <p className="mb-2" aria-label="Job location and experience">
                      {j.location} • {j.experience}
                    </p>

                    <p aria-label="Job description summary">{truncateContent(j.description)}</p>

                    <div className="mt-6">
                      <Link
                        href={`/careers/careersdetail/${j?.slug}`}
                        className="inline-block rounded-lg bg-blue-100 px-5 py-2 text-black font-medium hover:bg-blue-600 transition"
                        aria-label={`Apply now for ${j.title}`}
                      >
                        Apply Now
                      </Link>
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
      </main>
    </section>
  );
};
