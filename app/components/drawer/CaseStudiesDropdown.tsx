'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from 'flowbite-react';
import { ChevronDown, PencilRuler, TextSearch } from 'lucide-react';

import { useDrawer } from '@/app/context/DrawerContext';
import { DropdownKey } from './header';
import { useCaseStudies } from './useCaseStudies';

interface Props {
  openDropdown: DropdownKey;
  setOpenDropdown: (key: DropdownKey) => void;
  setIsMenuOpen: () => void;
}

const CaseStudiesDropdown: React.FC<Props> = React.memo(({ openDropdown, setOpenDropdown }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const isOpen = openDropdown === 'solutions';
  const { loading } = useCaseStudies();
  const { closeDrawer } = useDrawer();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener (home page only)
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navTextColor = isHomePage ? (scrolled ? 'text-black' : 'text-white') : 'text-black';

  // Close on outside click
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
    { name: 'Patent Landscaping', icon: PencilRuler },
    { name: 'Patent Search', icon: TextSearch },
  ];

  return (
    <div className="relative md:py-0 pb-4" ref={wrapperRef}>
      <button onClick={toggle} className={`flex items-center gap-1 ${navTextColor} hover:text-blue-400`}>
        Services
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 md:w-64 w-full bg-white dark:bg-primary shadow-lg rounded z-50">
          {loading ? (
            <div className="p-4 flex justify-center">
              <Spinner />
            </div>
          ) : (
            Products.map((product, index) => {
              const IconComponent = product.icon;
              return (
                <Link
                  key={index}
                  href="/#services"
                  onClick={() => {
                    setOpenDropdown(null);
                    closeDrawer();
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-left dark:text-white hover:text-white hover:bg-primary"
                >
                  <IconComponent size={22} />
                  <p className="text-lg font-semibold">{product.name}</p>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
});

export default CaseStudiesDropdown;
