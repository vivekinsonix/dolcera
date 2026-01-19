'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { getPaginatedOpenings } from '@/app/services/jobService';
import { JobItem, JobsResponse } from '@/app/utils/Interfaces';
import { Badge, Card } from 'flowbite-react';
import { CircleChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

function truncateContent(content: string, maxLength = 120) {
  return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
}

const SkeletonJobCard = () => (
  <div role="status" aria-label="Loading job" className="p-8 rounded-xl bg-gray-800 border-0 shadow-xl animate-pulse">
    <div className="h-8 bg-gray-700 rounded mb-4"></div>
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      <div className="h-6 w-16 bg-gray-700 rounded"></div>
      <div className="h-6 w-16 bg-gray-700 rounded"></div>
    </div>
    <div className="h-4 bg-gray-700 rounded mb-3"></div>
    <div className="h-16 bg-gray-700 rounded mb-6"></div>
    <div className="h-10 bg-blue-600 rounded"></div>
  </div>
);

// In-memory cache for job openings
let cachedJobs: JobItem[] | null = null;

export default function Careers() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    if (cachedJobs) {
      // Use cached data
      setJobs(cachedJobs);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const res: JobsResponse = await getPaginatedOpenings(1, 4);
      const jobsData = res.data || [];
      setJobs(jobsData);

      // Cache in memory
      cachedJobs = jobsData;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const PAGE_SEO = {
    title: 'Careers | Insonix',
    description: 'Apply for AI & Python Developer jobs at Insonix. Browse openings and join our team.',
    keywords: 'careers, AI developer, Python developer, jobs, Insonix',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com'}/careers`,
    image: '/default-og.jpg.png',
  };

  return (
    <section id="careers" className="py-16 md:py-24 dark:bg-primary bg-white dark:text-gray-200">
      <SeoHead {...PAGE_SEO} />

      <div className="container mx-auto text-center">
        {/* Section Header */}
        <header>
          <p className="text-sm font-medium dark:text-gray-400 mb-2 text-gray-800 uppercase tracking-wider">
            We're Hiring
          </p>

          <h2 className="text-3xl md:text-5xl mb-6 font-extrabold">Opportunities at Insonix</h2>
          <p className="text-lg max-w-3xl mx-auto  mb-2   tracking-wider">
            we blend world-class engineering talent from emerging tech hubs to support our mission of transforming
            businesses worldwide. We're hiring skilled engineers in areas like ReactJS, cloud architectures, and AI
            integrations . Explore open roles below
          </p>
        </header>

        {/* Job Cards Grid */}
        <div className="md:mt-16 p-4 md:flex mb-3   justify-center gap-6 mt-10">
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => <SkeletonJobCard key={idx} />)
            : jobs.slice(0, 3).map((job) => (
                <Card
                  key={job.id}
                  className="p-8 rounded-xl mb-4 dark:bg-secondary-dark bg-secondary border-0 shadow-xl transition-transform duration-300 hover:scale-105"
                >
                  <h3 className="text-2xl font-bold mb-3 dark:text-white">{job.title}</h3>
                  <div className="flex flex-wrap justify-center gap-2 mb-3">
                    {job?.skills?.map((tag: any) => (
                      <Badge key={tag?.name} color="info">
                        {tag?.name}
                      </Badge>
                    ))}
                  </div>

                  <p className="dark:text-gray-400 mb-2">
                    {job.location} • {job.experience}
                  </p>

                  <p className="dark:text-gray-300">{truncateContent(job.description)}</p>

                  <div className="mt-6">
                    <Link
                      href={`/careers/careersdetail/${job.slug}`}
                      aria-label={`Apply for ${job.title}`}
                      className="inline-block rounded-lg border-gray-500 bg-transparent px-5 py-2 text-primary-200 dark:text-primary-100 hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(33,84,255,0.25),_0_0_20px_rgba(75,201,255,0.22)] transition-all duration-250 ease"
                    >
                      Apply Now
                    </Link>
                  </div>
                </Card>
              ))}
        </div>

        {/* View All Link */}
        {jobs?.length > 3 && (
          <div className="text-xl flex justify-center w-full items-center pt-10 text-blue-500">
            <Link
              href="/careers/list"
              className="text-sm font-medium text-blue-700 hover:underline flex items-center gap-2"
              aria-label="View all job openings"
            >
              View All
              <CircleChevronRight className="ml-2" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
