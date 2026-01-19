'use client';

import Head from 'next/head';
import Image from 'next/image';
import { memo } from 'react';

interface Props {
  ourLegacy?: any;
  coreDifferentiars: any;
  loading: boolean;
}

/* ----------------------------------------------
   Skeleton Loader (Memoized for Performance)
----------------------------------------------- */
const Skeleton = memo(() => (
  <section className="dark:bg-primary py-16 md:py-24 animate-pulse" aria-busy="true" aria-label="Loading About Section">
    <div className="container mx-auto px-4 text-center">
      {/* Section Header */}
      <div className="mb-12">
        <div className="mx-auto mb-3 h-4 w-32 bg-gray-700 rounded"></div>
        <div className="mx-auto h-8 w-64 bg-gray-700 rounded"></div>
      </div>

      {/* Main Grid */}
      <div className="mt-12 grid grid-cols-1 items-center gap-12 md:mt-16 md:grid-cols-2">
        <div className="order-2 max-w-xl space-y-6 md:order-1">
          <div className="h-4 w-full bg-gray-700 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-700 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-700 rounded"></div>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <div className="h-72 w-full max-w-md bg-gray-700 rounded-xl"></div>
        </div>
      </div>

      {/* Differentiators */}
      <div className="mt-16 md:mt-24">
        <div className="mx-auto mb-8 h-6 w-60 bg-gray-700 rounded"></div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <article key={i} className="rounded-xl bg-gray-800 p-6 shadow-lg" aria-label="Metric placeholder">
              <div className="h-6 w-32 mx-auto bg-gray-600 rounded mb-3"></div>
              <div className="h-4 w-20 mx-auto bg-gray-600 rounded"></div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
));
Skeleton.displayName = 'Skeleton';

/* ----------------------------------------------
                 MAIN COMPONENT
----------------------------------------------- */
export default function About({ ourLegacy, coreDifferentiars, loading }: Props) {
  if (loading) return <Skeleton />;

  const teamImageUrl = ourLegacy?.our_team?.url || '/team.svg';
  const teamAltText = ourLegacy?.our_team?.alternativeText || 'Insonix team image';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: ourLegacy?.heading,
    description: `${ourLegacy?.paragraph_1 ?? ''} ${ourLegacy?.paragraph_2 ?? ''}`,
    image: teamImageUrl,
  };

  return (
    <>
      <Head>
        <title>{ourLegacy?.heading || 'About Us'}</title>
        <meta name="description" content={`${ourLegacy?.paragraph_1 ?? ''} ${ourLegacy?.paragraph_2 ?? ''}`} />

        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={ourLegacy?.heading} />
        <meta property="og:description" content={ourLegacy?.paragraph_1} />
        <meta property="og:image" content={teamImageUrl} />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <main id="about" className=" py-16 dark:bg-foreground  md:pt-38 md:pb-24" aria-labelledby="about-heading">
        <div className="container mx-auto px-4 text-center">
          {/* Header */}
          <header className="mb-12">
            <p className="mb-2 text-sm font-medium tracking-wider  text-gray-400 uppercase" aria-label="Section name">
              {ourLegacy?.section_name}
            </p>

            <h1
              id="about-heading"
              className="text-3xl leading-tight font-extrabold md:text-5xl"
              aria-describedby="about-description"
            >
              Dolcera is one of world’s largest patent analytics companies.
            </h1>
          </header>

          {/* Grid */}
          <div className="mt-12 grid grid-cols-1 items-center gap-12 md:mt-16 md:grid-cols-2">
            {/* Text */}
            <article className="order-2  space-y-6 text-left md:order-1" id="about-description">
              <p className="text-base  md:text-lg lg:text-lg ">
                Dolcera is one of world’s largest patent analytics companies. Our team of in-house subject-matter
                experts analyze several million patents a year using our machine-learning platform.
              </p>
              <p className="text-base  md:text-lg lg:text-lg ">
                We offer industry-leading software platforms, and a suite of services in the intellectual property space
                for dozens of world’s leading corporations.
              </p>
              <p className="text-base  md:text-lg lg:text-lg ">
                Dolcera is one of world’s largest patent analytics companies. Our team of in-house subject-matter
                experts analyze several million patents a year using our machine-learning platform.
              </p>
            </article>

            {/* Image */}
            <figure className="order-1 flex justify-center md:order-2">
              <Image
                src="/about1.jpg"
                alt={teamAltText}
                width={600}
                height={400}
                className="w-full h-auto rounded-xl object-cover"
                priority={false}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onContextMenu={(e) => e.preventDefault()}
              />
            </figure>
          </div>

          {/* Differentiators */}
          {/* <section className="mt-16 md:mt-24" aria-labelledby="diff-heading">
            <h2 id="diff-heading" className="mb-8 text-2xl font-bold md:text-3xl">
              Software Solutions Regularly Demanded
            </h2>
            <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {coreDifferentiars?.counts?.map(
                (
                  {
                    count,
                    label,
                    id,
                    description,
                    icon,
                  }: { count: string; label: string; id: string; description: string; icon: string },
                  index: number
                ) => (
                  <article
                    key={id || index}
                    className="rounded-xl dark:bg-secondary-dark bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <h3 className="text-accent text-xl font-extrabold">{label}</h3>
                    {icon && !count && !description && (
                      <div className="[&_svg]:w-6 [&_svg]:h-6" dangerouslySetInnerHTML={{ __html: icon }} />
                    )}
                    {!icon && count && !description && (
                      <p className="mt-2 md:text-2xl font-bold dark:text-gray-300">{count}</p>
                    )}
                    {!icon && !count && description && <p className="mt-4 text-sm dark:text-gray-400">{description}</p>}
                  </article>
                )
              )}
            </div>
          </section> */}
        </div>
      </main>
    </>
  );
}
