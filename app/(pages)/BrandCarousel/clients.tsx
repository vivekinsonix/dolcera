'use client';

import Link from 'next/link';
import CardSlider from './BrandCarousel';

export default function Clients() {
  return (
    <>
      <>
        0
        <section id="clients" className="py-16 md:py-24  bg-primary-50">
          <div className="px-6 mx-auto text-center ">
            <p className="text-sm font-medium  mb-2 uppercase tracking-wider">clients</p>
            <h1 className="text-3xl md:text-5xl   font-extrabold leading-tight">Our Esteemed Clients</h1>
            <CardSlider />
          </div>
          <Link
            href="/clients"
            className="mt-10 mx-auto text-center text-primary  w-full inline-block  hover:underline"
          >
            View All Clients →
          </Link>
        </section>
      </>
    </>
  );
}
