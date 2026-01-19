'use client';

import { useDrawer } from '@/app/context/DrawerContext';
import { Spinner } from 'flowbite-react';
import { ChevronDown, PencilRuler, TextSearch } from 'lucide-react';
import Links from 'next/link';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { DropdownKey } from './header';
import { useCaseStudies } from './useCaseStudies';

interface Props {
  openDropdown: DropdownKey;
  setOpenDropdown: (key: DropdownKey) => void;
  setIsMenuOpen: () => void;
}

const CaseStudiesDropdown: React.FC<Props> = React.memo(({ openDropdown, setOpenDropdown, setIsMenuOpen }) => {
  const isOpen = openDropdown === 'solutions';
  const { data, loading } = useCaseStudies();
  const { closeDrawer } = useDrawer();

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, setOpenDropdown]);

  const toggle = useCallback(() => {
    setOpenDropdown(isOpen ? null : 'solutions');
  }, [isOpen, setOpenDropdown]);
  const Products = [
    {
      name: 'Patent Landscaping',
      icon: PencilRuler,
    },
    {
      name: 'Patent Search',
      icon: TextSearch,
    },
  ];
  const [scrolled, setScrolled] = useState(false); // ✅ Track scroll

  // ✅ Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="relative md:py-0 pb-4" ref={wrapperRef}>
      <button
        onClick={toggle}
        className={`flex items-center gap-1 dark:text-primary-50 hover:text-primary cursor-pointer text-lg md:text-base ${
          scrolled ? 'text-black' : 'text-white'
        }`}
      >
        Services
        <ChevronDown size={16} className={isOpen ? 'rotate-180' : ''} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 md:w-64 w-full  bg-white dark:bg-primary dark:text-secondary shadow-lg rounded z-50">
          {loading ? (
            <div className="p-4 flex justify-center">
              <Spinner />
            </div>
          ) : (
            Products.map((product, index) => {
              const IconComponent = product.icon; // get the product-specific icon
              return (
                <Links
                  key={index}
                  href="/#services"
                  className="flex items-center gap-3   px-4 py-2 text-left dark:text-white hover:text-white hover:bg-primary"
                >
                  <IconComponent size={22} /> {/* render Lucide icon */}
                  <div>
                    <p className="text-lg font-semibold">{product.name}</p>
                  </div>
                </Links>
              );
            })
          )}
        </div>
      )}
    </div>
  );
});

export default CaseStudiesDropdown;
