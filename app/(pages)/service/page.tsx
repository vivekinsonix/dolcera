'use client';
import SeoHead from '@/app/components/seo/seoHead';
import { get_what_we_builds } from '@/app/services/homePageService';
import { AudienceItem } from '@/app/utils/Interfaces';
import { Card } from 'flowbite-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

let cachedServices: AudienceItem[] | null = null;
export default function Services() {
  const [services, setServices] = useState<AudienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cachedServices) {
      setServices(cachedServices);
      setLoading(false);
      return;
    }

    get_what_we_builds()
      .then((res) => {
        const data = res?.data || [];
        setServices(data);
        cachedServices = data;
      })
      .finally(() => setLoading(false));
  }, []);

  if (!loading && services.length === 0) return null;

  const seoConfig = {
    title: 'Our Services – Insonix',
    description: 'Explore Insonix services – custom solutions for complex business challenges.',
    keywords: 'Insonix, Services, Custom Solutions, Technology, Software',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com'}/services`,
    image: '/default-og.jpg.png',
  };

  return (
    <>
      <SeoHead {...seoConfig} />
      <section id="services" className="py-16 md:py-24 bg-secondary dark:bg-primary dark:text-gray-200">
        <div className="container mx-auto px-4 text-center">
          <header className="mb-4">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Who Should Hire Us </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Businesses that punch above their weight
            </h1>
          </header>
          {loading ? <SkeletonGrid /> : <ServiceGrid services={services} />}
        </div>
      </section>
    </>
  );
}

function SkeletonGrid() {
  return (
    <div
      role="status"
      aria-label="Loading services"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 md:mt-16"
    >
      {[1, 2, 3].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="p-8 rounded-2xl bg-secondary dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 h-120 flex flex-col items-center overflow-hidden animate-pulse">
      <div className="bg-gray-300 dark:bg-gray-700 w-16 h-16 mb-6 rounded-full"></div>
      <div className="bg-gray-300 dark:bg-gray-700 w-3/4 h-6 mb-4 rounded"></div>
      <div className="w-full space-y-2 mb-6">
        <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded"></div>
        <div className="bg-gray-300 dark:bg-gray-700 h-4 w-5/6 mx-auto rounded"></div>
      </div>
      <div className="bg-gray-300 dark:bg-gray-700 w-32 h-8 mt-auto rounded"></div>
    </div>
  );
}

function ServiceGrid({ services }: { services: AudienceItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 md:mt-16">
      {services.map((service) => (
        <Card
          key={service.documentId}
          className="p-8 rounded-2xl bg-white dark:bg-secondary-dark border border-gray-100 dark:border-secondary-dark shadow-lg text-center flex flex-col items-center transition-transform duration-300 hover:scale-[1.03]"
        >
          {service?.icon && (
            <div
              className="h-20 flex items-center justify-center mb-6 [&_svg]:w-16 [&_svg]:h-16 [&_svg]:mx-auto"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: service.icon }}
            />
          )}
          <h2 className="text-xl md:text-2xl font-bold mb-3 leading-snug">{service?.main?.title}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{service?.main?.sub_title}</p>
          <Link
            href={`/service/details/${service?.slug}`}
            aria-label={`Read more about ${service?.main?.title}`}
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            Read More →
          </Link>
        </Card>
      ))}
    </div>
  );
}
