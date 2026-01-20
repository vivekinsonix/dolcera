'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';

import { useDrawer } from '../../context/DrawerContext';
import AppDrawer from './AppDrawer';
import CaseStudiesDropdown from './CaseStudiesDropdown';
// import WhoWeServe from './WhoWeServe';

const Logo = () => {
  return (
    <NavbarBrand as={Link} href="/">
      <Image src="/logo/logo.png" width={170} height={40} className="dark:hidden" alt="Insonix" />
      <Image src="/logo/logo.png" width={170} height={40} className="hidden dark:block" alt="Insonix" />
    </NavbarBrand>
  );
};

export type DropdownKey = 'who' | 'solutions' | null;

const Header: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const { isDrawerOpen, closeDrawer } = useDrawer();
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll listener (only matters on home page)
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Text color logic
  const navTextColor = isHomePage ? (scrolled ? 'text-black' : 'text-white') : 'text-black';

  return (
    <>
      <Navbar
        fluid
        rounded
        className={`fixed top-0 left-0 right-0 z-10 py-2 shadow-none transition-colors duration-300 ${
          isHomePage ? (scrolled ? 'bg-white shadow dark:bg-white' : 'bg-transparent') : 'bg-white dark:bg-white'
        }`}
      >
        <div className="flex w-full items-center justify-between">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <CaseStudiesDropdown
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              setIsMenuOpen={() => setIsMenuOpen(false)}
            />

            <Link href="/#clients" className={` ${navTextColor} hover:text-blue-400`}>
              Our Clients
            </Link>

            <Link href="/#projects" className={` ${navTextColor} hover:text-blue-400`}>
              Projects
            </Link>

            <Link href="/#teams" className={` ${navTextColor} hover:text-blue-400`}>
              Teams
            </Link>

            <Link href="/#blogs" className={` ${navTextColor} hover:text-blue-400`}>
              Blogs
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button outline>Contact Us</Button>
          </div>

          {/* Mobile Toggle */}
          <NavbarToggle onClick={() => setIsMenuOpen((prev) => !prev)} />
        </div>

        {/* Mobile Menu */}
        <NavbarCollapse className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden text-center px-3`}>
          <CaseStudiesDropdown
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            setIsMenuOpen={() => setIsMenuOpen(false)}
          />

          <Link
            href="/#blogs"
            onClick={() => setIsMenuOpen(false)}
            className={`inline-block text-left mt-3 dark:text-primary-50  pb-4 ${navTextColor} hover:text-blue-400`}
          >
            Blogs
          </Link>

          <Button outline className="my-3">
            Contact Us
          </Button>
        </NavbarCollapse>
      </Navbar>

      <AppDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default Header;
