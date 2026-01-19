'use client';

import FollowModal from '@/app/components/followmodal/followModal';
import SeoHead from '@/app/components/seo/seoHead';
import { get_case_studies_paginated } from '@/app/services/homePageService';
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

export default function Portfolio() {
  return (
    <>
      <section id="projects" className="py-16 md:px-0 px-4 md:py-24 dark:bg-foreground bg-white">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider"> What We Do</p>
          <h1 className="text-3xl md:text-5xl dark:text-white font-extrabold leading-tight">Our Projects</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4  mt-10">
            <Link href="#" className="group w-[100%] h-[350px] relative overflow-hidden shadow-lg cursor-pointer block">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform blur-none group-hover:blur-none duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(/lte.jpg` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b bg-primary-900/80 dark:to-primary/80 group-hover:bg-black/20 transition-all duration-500" />

              {/* Content */}
              <div className="relative  h-full flex flex-col items-center justify-between text-white group-hover:text-white  p-6 ">
                <div></div>
                <div>
                  <p className="text-lg mb-3">Technology</p>
                  <h1 className="font-bold  hover:text-white dark:text-white"> LTE</h1>
                </div>

                <div className="w-full flex justify-center">
                  <span className="inline-block rounded-full bg-secondary border-secondary   px-5 py-2 text-white dark:text-white hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(33,84,255,0.25),_0_0_20px_rgba(75,201,255,0.22)] transition-all duration-250 ease opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold uppercase text-pr">
                    Explore Projects →
                  </span>
                </div>
              </div>
            </Link>
            <Link href="#" className="group w-[100%] h-[350px] relative overflow-hidden shadow-lg cursor-pointer block">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform blur-none group-hover:blur-none duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(/Phospholipids.jpg` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-primary-900/80 dark:from-primary/0 dark:to-primary/80 group-hover:bg-black/20  transition-all duration-500" />

              {/* Content */}
              <div className="relative  h-full flex flex-col items-center justify-between text-white group-hover:text-white  p-6 ">
                <div></div>
                <div>
                  <p className="text-lg mb-3">Food</p>
                  <h1 className="font-bold  hover:text-white dark:text-white">Phospholipids and Sphingolipids</h1>
                </div>

                <div className="w-full flex justify-center">
                  <span className="inline-block rounded-full bg-secondary border-secondary  px-5 py-2 text-white dark:text-white hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(33,84,255,0.25),_0_0_20px_rgba(75,201,255,0.22)] transition-all duration-250 ease opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold uppercase text-pr">
                    Explore Projects →
                  </span>
                </div>
              </div>
            </Link>
            <Link href="#" className="group w-[100%] h-[350px] relative overflow-hidden shadow-lg cursor-pointer block">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform blur-none group-hover:blur-none duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(/Alopecia.jpg` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-primary-900/80 dark:from-primary/0 dark:to-primary/80 group-hover:bg-black/20 transition-all duration-500" />

              {/* Content */}
              <div className="relative  h-full flex flex-col items-center justify-between text-white group-hover:text-white  p-6 ">
                <div></div>
                <div>
                  <p className="text-lg mb-3">Consumer Products</p>
                  <h1 className="font-bold hover:text-white dark:text-white mb-3">Alopecia</h1>
                </div>

                <div className="w-full flex justify-center">
                  <span className="inline-block rounded-full bg-secondary border-secondary  px-5 py-2 text-white dark:text-white hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(33,84,255,0.25),_0_0_20px_rgba(75,201,255,0.22)] transition-all duration-250 ease opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold uppercase text-pr">
                    Explore Projects →
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href="#"
              className="group md:col-span-2 w-[100%] h-[350px] relative overflow-hidden shadow-lg cursor-pointer block"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform blur-none group-hover:blur-none duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(/Purification.jpg` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-primary-900/80 dark:from-primary/0 dark:to-primary/80 group-hover:bg-black/20 transition-all duration-500" />

              {/* Content */}
              <div className="relative  h-full flex flex-col items-center justify-between text-white group-hover:text-white  p-6 ">
                <div></div>
                <div>
                  <p className="text-lg mb-3">Consumer Products</p>
                  <h1 className="font-bold hover:text-white dark:text-white mb-3">Water Purification Technology</h1>
                </div>

                <div className="w-full flex justify-center">
                  <span className="inline-block rounded-full bg-secondary border-secondary   px-5 py-2 text-white dark:text-white hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(33,84,255,0.25),_0_0_20px_rgba(75,201,255,0.22)] transition-all duration-250 ease opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold uppercase text-pr">
                    Explore Projects →
                  </span>
                </div>
              </div>
            </Link>
            <Link href="#" className="group w-[100%] h-[350px] relative overflow-hidden shadow-lg cursor-pointer block">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform blur-none group-hover:blur-none duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(/Vaccines.jpg` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-primary-900/80 dark:from-primary/0 dark:to-primary/80 group-hover:bg-black/20 transition-all duration-500" />

              {/* Content */}
              <div className="relative  h-full flex flex-col items-center justify-between text-white group-hover:text-white  p-6 ">
                <div></div>
                <div>
                  <p className="text-lg mb-3">Life Sciences</p>
                  <h1 className="font-bold hover:text-white dark:text-white mb-3">Cancer Vaccines</h1>
                </div>

                <div className="w-full flex justify-center">
                  <span className="inline-block rounded-full bg-secondary border-secondary   px-5 py-2 text-white dark:text-white hover:border-primary-100 hover:shadow-[0_8px_30px_rgba(33,84,255,0.25),_0_0_20px_rgba(75,201,255,0.22)] transition-all duration-250 ease opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold uppercase text-pr">
                    Explore Projects →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <Link href="/blogs" className="mt-10 mx-auto text-center w-full inline-block text-blue-500 hover:underline">
          View All Projects →
        </Link>
      </section>
    </>
  );
}
