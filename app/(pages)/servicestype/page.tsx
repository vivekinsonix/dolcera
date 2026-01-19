'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type CaseStudy = {
  documentId: string;
  main?: {
    title?: string;
    sub_title?: string;
  };
  slug: string;
  view1: Array<{ image: { url: string } }>;
  cover_image?: string;
};

// In-memory cache for case studies
let cachedCaseStudies: CaseStudy[] | null = null;

export default function ServicesType() {
  return (
    <>
      <section id="services" className="py-16 md:px-0 px-4 md:py-24 dark:bg-primary-900 bg-primary-900">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium text-white mb-2 uppercase tracking-wider"> What We Do</p>
          <h1 className="text-3xl md:text-5xl text-white dark:text-white font-extrabold leading-tight">Our Services</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4  mt-10">
            <Link href="#" className="group w-[100%] h-[350px] relative overflow-hidden shadow-lg cursor-pointer block">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform blur-none group-hover:blur-none duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(/services/patent-landscape1.png` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-primary/0 to-black  dark:to-black/90 group-hover:bg-black/20 transition-all duration-500" />

              {/* Content */}
              <div className="relative text-left  h-full flex flex-col items-center justify-end text-white group-hover:text-white  p-6 ">
                <div></div>
                <div>
                  <h1 className="font-bold  hover:text-white dark:text-white">Patent Landscaping</h1>
                  <p className="text-lg mb-3">
                    Dolcera provides comprehensive patent landscapes to many of world’s largest corporations.
                  </p>
                </div>

                <div className="w-full flex justify-start mb-3">
                  <span className="inline-block  bg-secondary rounded-full border-gray-500  px-5 py-2 text-white dark:text-white hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(33,84,255,0.25),_0_0_20px_rgba(75,201,255,0.22)] transition-all duration-250 ease  translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold uppercase text-pr">
                    Explore Service →
                  </span>
                </div>
              </div>
            </Link>
            <Link href="#" className="group w-[100%] h-[350px] relative overflow-hidden shadow-lg cursor-pointer block">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform blur-none group-hover:blur-none duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(/services/patent-search.jpg` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-b from-primary/0 to-black dark:from-primary/0 dark:to-primary/80 group-hover:bg-black/20  transition-all duration-500" />

              {/* Content */}
              <div className="relative text-left  h-full flex flex-col items-center justify-end text-white group-hover:text-white  p-6 ">
                <div></div>
                <div>
                  <h1 className="font-bold  hover:text-white dark:text-white">Patent Search</h1>
                  <p className="text-lg mb-3">
                    Dolcera provides detailed and cost-effective novelty, validity, and freedom-to-operate searches.
                  </p>
                </div>

                <div className="w-full flex justify-sart mb-3">
                  <span className="inline-block rounded-full bg-secondary border-secondary  px-5 py-2 text-white dark:text-white hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(33,84,255,0.25),_0_0_20px_rgba(75,201,255,0.22)] transition-all duration-250 ease  translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold uppercase text-pr">
                    Explore Service →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <Link href="/#services" className="mt-10 mx-auto text-center w-full inline-block text-white hover:underline">
          View All Services →
        </Link>
      </section>
    </>
  );
}
