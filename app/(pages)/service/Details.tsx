'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { get_what_we_builds_by_slug } from '@/app/services/homePageService';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { MAIN } from '../../components/views/Main';
import { VIEW_1 } from '../../components/views/View1';
import { VIEW_2 } from '../../components/views/View2';
import { VIEW_3 } from '../../components/views/View3';
import { VIEW_4 } from '../../components/views/View4';
import { VIEW_5 } from '../../components/views/View5';
import { VIEW_6 } from '../../components/views/View6';
import { VIEW_7 } from '../../components/views/View7';
import Link from 'next/link';
import ShareBanner from '@/app/components/shareButton/ShareButton';
import { Card } from 'flowbite-react';
import { FacebookIcon, Share2Icon } from 'lucide-react';

/* -------------------------------
  ✅ Utility: Slugify
------------------------------- */
const slugify = (input?: string) => {
  if (!input) return '';
  return input
    .toString()
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^[-]+|[-]+$/g, '');
};

/* -------------------------------
  ✅ Utility: Extract view keys
------------------------------- */
const extractViewKeys = (data: any) => {
  const result: any[] = [];
  if (!data || typeof data !== 'object') return result;

  Object.keys(data)
    .filter((key) => key.startsWith('view'))
    .forEach((key) => {
      const viewObj = data[key];
      if (!viewObj) return;

      if (Array.isArray(viewObj)) {
        const labeled = viewObj.filter((i: any) => i?.view_name || i?.title);
        if (!labeled.length) return;

        const baseLabel = labeled[0]?.view_name || labeled[0]?.title || key;
        const baseId = slugify(baseLabel);

        labeled.forEach((item: any, idx: number) => {
          const label = item?.view_name || item?.title || '';
          const id = labeled.length > 1 ? `${baseId}-${idx + 1}` : baseId;
          result.push({ id, label });
        });
      } else if (viewObj?.view_name || viewObj?.title) {
        const label = viewObj.view_name || viewObj.title;
        result.push({ id: slugify(label), label });
      }
    });

  return result;
};

/* -------------------------------
  ✅ Page header component
------------------------------- */
const PAGE_HEADER = React.memo(function PageHeader({
  activeSection,
  sections,
  onSelect,
}: {
  activeSection: string;
  sections: { id: string; label: string }[];
  onSelect: (id: string) => void;
}) {
  const handleClick = useCallback((event: React.MouseEvent, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offset - 120, behavior: 'smooth' });
    }
    onSelect(id);
  }, []);

  return (
    <nav
      className="sticky sm:top-14 md:top-14 top-12 border-b list-none border-gray-100 dark:border-gray-800 dark:text-white shadow-lg   bg-gradient-to-t from-secondary via-secondary to-white bg-gradient-to-t dark:from-secondary-dark dark:via-secondary-dark dark:to-primary dark:text-white"
      aria-label="Section Navigation"
      style={{ zIndex: 8 }}
    >
      <div className="container mx-auto  md:px-0 px-4 overflow-auto">
        <ul className="text-md flex gap-3 py-3  font-semibold md:gap-6">
          {sections.map((s) => (
            <li key={s.id}>
              <Link
                href={`#${s.id}`}
                onClick={(e) => handleClick(e, s.id)}
                className={`inline-flex whitespace-nowrap items-center gap-2 rounded-xl pr-3 py-2 transition-all ${activeSection === s.id ? 'font-bold text-blue-500 hover:text-primary-200' : 'dark:text-white/70 hover:text-blue-500'}`}
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
});

/* -------------------------------
  ✅ In-memory cache per ID
------------------------------- */
const cachedDetails: Record<string, any> = {};

/* -------------------------------
  ✅ Details Page
------------------------------- */
export default function Details({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (cachedDetails[id]) {
        setData(cachedDetails[id]);
        return;
      }

      setLoading(true);
      try {
        const res = await get_what_we_builds_by_slug(id);
        const fetchedData = res?.data?.[0] ?? null;
        setData(fetchedData);
        cachedDetails[id] = fetchedData;
      } catch (error) {
        console.error('Failed to fetch service details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const sections = useMemo(() => extractViewKeys(data), [data]);

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { threshold: 0.4 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const seo = useMemo(
    () => ({
      title: data?.seo?.metaTitle || data?.main?.title || 'Service Details – Insonix',
      description: data?.seo?.metaDescription || data?.main?.sub_title || 'Explore Insonix service details.',
      keywords: data?.seo?.keywords || data?.main?.keywords || 'Insonix, services, solutions',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/service/details/${id}`,
      image: data?.seo?.metaImage || data?.main?.image || '/default-og.jpg.png',
    }),
    [data, id]
  );

  return (
    <div className="min-h-screen bg-white dark:bg-primary dark:text-white">
      <SeoHead {...seo} />
      {!loading && <ShareBanner shareUrl={seo?.url} position="center" />}
      <MAIN content={data?.main || {}} loading={loading} />
      {sections.length > 0 && (
        <PAGE_HEADER activeSection={activeSection} sections={sections} onSelect={setActiveSection} />
      )}
      <main className="relative px-4 py-0  mx-auto  ">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 lg:grid-cols-12 container mx-auto">
          <div className="md:col-span-9">
            <VIEW_1 data={data?.view1} loading={loading} />
            <VIEW_2 data={data?.view2} loading={loading} />
            {data?.view3 && <VIEW_3 data={data?.view3} loading={loading} />}
            {data?.view4 && <VIEW_4 data={data?.view4} loading={loading} />}
            <VIEW_5 data={data?.view5} loading={loading} />
            {data?.view6 && <VIEW_6 data={data?.view6} loading={loading} />}
            <VIEW_7 data={data?.view7} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
