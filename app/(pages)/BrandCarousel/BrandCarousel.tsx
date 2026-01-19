'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowLeftCircle, ArrowRight } from 'lucide-react';
import { Avatar } from 'flowbite-react';

// Replace with your actual images in /public/cards/
const cards = [
  {
    id: 1,
    title: 'Somalogic',
    description: 'Transforming research and healthcare ',
    image: '/clients/SomalogicLogo.png',
  },
  {
    id: 2,
    title: 'Card 2',
    description: 'Biotech company',
    image: '/clients/innatevertnoir.png',
  },
  { id: 3, title: 'Card 3', description: 'Innovative medicines company', image: '/clients/novartis.png' },
  { id: 4, title: 'Card 4', description: 'Vitro diagnostics (IVD) industry', image: '/clients/fapons.png' },
  {
    id: 5,
    title: 'Card 5',
    description: 'Global leader in medical technology 5',
    image: '/clients/Medtronic-Logo.wine.png',
  },
  {
    id: 6,
    title: 'Card 6',
    description: 'ResMed operating in the digital health space ',
    image: '/clients/resmed.png',
  },
];

export default function CardSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const cardWidth = 320; // must match CSS width

  // AUTO-SCROLL
  useEffect(() => {
    if (paused) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }, 3000);

    return () => clearInterval(interval);
  }, [paused]);

  // SCROLL HANDLER + INFINITE LOOP
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const index = Math.round(slider.scrollLeft / cardWidth);
    setActive(index % cards.length);

    if (slider.scrollLeft >= cardWidth * cards.length) {
      slider.scrollLeft = slider.scrollLeft - cardWidth * cards.length;
    }
  };

  const scrollTo = (index: number) => {
    sliderRef.current?.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
  };

  // KEYBOARD NAVIGATION
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') scrollTo(active + 1);
    if (e.key === 'ArrowLeft') scrollTo(active - 1);
  };

  return (
    <section
      className="relative mx-auto  outline-none mt-10 "
      tabIndex={0}
      onKeyDown={handleKey}
      aria-roledescription="carousel"
      aria-label="Card slider"
    >
      {/* SLIDER */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="flex overflow-x-hidden scroll-smooth snap-x  snap-mandatory gap-2 pb-6 [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {[...cards, ...cards].map((card, i) => (
          <div
            key={i}
            role="group"
            aria-label={`Slide ${i + 1}`}
            className="
              snap-start shrink-0
              w-[85%] sm:w-[45%] lg:w-[320px]
             p-4 rounded-lg bg-white
              transition hover:scale-[1.02]
              flex flex-col items-center group shadow-lg cursor-pointer
            "
          >
            {/* IMAGE */}
            {/* <div className="w-full h-30  flex items-center relative mb-4 mt-4 p-4 py-10">
              <Image src={card.image} alt={card.title} width={180} height={180} className="rounded-lg my-20 mx-auto" />
            </div> */}
            <Avatar
              img={card.image}
              rounded={false}
              size="xl"
              className="transition filter grayscale group-hover:grayscale-0"
            />
            {/* TITLE & DESCRIPTION */}

            <p className="mt-5 mb-2 text-primary-900 font-bold text-xl  text-center">{card.description}</p>
          </div>
        ))}
      </div>

      {/* ARROWS */}
      {/* <button
        aria-label="Previous slide"
        onClick={() => scrollTo(active - 1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:scale-110 active:scale-95"
      >
        <ArrowLeft />
      </button>

      <button
        aria-label="Next slide"
        onClick={() => scrollTo(active + 1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-md transition hover:scale-110 active:scale-95"
      >
        <ArrowRight />
      </button> */}

      {/* DOTS */}
      <div className="mt-4 flex justify-center gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => scrollTo(index)}
            className={`h-3 w-3 rounded-full transition ${
              active === index ? 'bg-gray-800 scale-110' : 'bg-gray-300 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
