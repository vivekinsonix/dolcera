'use client';
import SeoHead from '@/app/components/seo/seoHead';
import { get_case_studies } from '@/app/services/homePageService';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Solutions = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        const response = await get_case_studies();
        setData(response?.data || []);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const seoTitle = 'Case Studies – Insonix';
  const seoDescription =
    'Explore Insonix case studies showcasing our innovative solutions and custom services for businesses.';
  const seoKeywords = 'Insonix, Case Studies, Services, Solutions, Technology';
  const seoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com'}`;
  const seoImage = data?.[0]?.cover_image || '/default-og.jpg.png';

  return (
    <>
      <SeoHead title={seoTitle} description={seoDescription} keywords={seoKeywords} url={seoUrl} image={seoImage} />
      <section className="py-16 md:py-24 bg-secondary dark:bg-gray-950 dark:text-gray-200">
        <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Previous Work</p>
        <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">Case Studies</h2>

        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-[276px] h-[424px] bg-gray-200 rounded-xl animate-pulse">
                <div className="h-full w-full bg-gray-300"></div>
              </div>
            ))}
          {!loading &&
            data.map((item: any, idx: number) => (
              <Link
                key={idx}
                href={`/solutions/startup/${item?.documentId}`}
                className="group w-[276px] h-[424px] relative overflow-hidden shadow-lg cursor-pointer block"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item?.cover_image || '/tech.jpg'})` }}
                ></div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-500"></div>
                <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
                  <h1 className="text-3xl font-bold">{item?.main?.title || ''}</h1>
                  <div className="w-full flex justify-end">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold uppercase">
                      View Case Study →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
};

export default Solutions;
