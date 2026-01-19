'use client';

import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { useDrawer } from '../../context/DrawerContext';
import AppDrawer from './AppDrawer';
import CaseStudiesDropdown from './CaseStudiesDropdown';
import WhoWeServe from './WhoWeServe';

const Logo = () => {
  return (
    <NavbarBrand as={Link} href="/">
      <Image src="/logo/logo.png" width={170} height={40} className="dark:hidden" alt="Insonix" />
      <Image src="/logo/logo_dolcera-dark.svg" width={170} height={40} className="hidden dark:block" alt="Insonix" />
    </NavbarBrand>
  );
};

export type DropdownKey = 'who' | 'solutions' | null;

const Header: React.FC = () => {
  const { isDrawerOpen, openDrawer, closeDrawer } = useDrawer();
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <>
      <Navbar
        fluid
        rounded
        className={`fixed top-0 left-0 right-0 z-10 py-2 shadow-none transition-colors duration-300 ${
          scrolled ? 'bg-white dark:bg-gray-900' : 'backdrop-blur-none bg-transparent'
        }`}
      >
        <div className="flex w-full items-center justify-between">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {/* <WhoWeServe
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              setIsMenuOpen={() => setIsMenuOpen(false)}
            /> */}
            <CaseStudiesDropdown
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
              setIsMenuOpen={() => setIsMenuOpen(false)}
            />
            <Link
              href="/#clients"
              className={`dark:text-primary-50 ${
                scrolled ? 'text-black' : 'text-white'
              } hover:text-blue-400 text-lg md:text-base`}
            >
              Our Clients
            </Link>
            <Link
              href="/#projects"
              className={`dark:text-primary-50 ${
                scrolled ? 'text-black' : 'text-white'
              } hover:text-blue-400 text-lg md:text-base`}
            >
              Projects
            </Link>
            <Link
              href="/#teams"
              className={`dark:text-primary-50 ${
                scrolled ? 'text-black' : 'text-white'
              } hover:text-blue-400 text-lg md:text-base`}
            >
              Teams
            </Link>
            <Link
              href="/#blogs"
              className={`dark:text-primary-50 ${
                scrolled ? 'text-black' : 'text-white'
              } hover:text-blue-400 text-lg md:text-base`}
            >
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
        <NavbarCollapse className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden text-center px-3 mt-0`}>
          {/* <WhoWeServe
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            setIsMenuOpen={() => setIsMenuOpen(false)}
          /> */}
          <CaseStudiesDropdown
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            setIsMenuOpen={() => setIsMenuOpen(false)}
          />
          <Link
            href="/#blogs"
            onClick={() => setIsMenuOpen(false)}
            className="inline-block text-left pb-4 dark:text-primary-50 text-lg md:text-base"
          >
            Blogs
          </Link>
          <Button
            outline
            className="mt-3"
            // onClick={() => {
            //   setIsMenuOpen(false);
            //   isDrawerOpen ? closeDrawer() : openDrawer();
            // }}
          >
            Contact Us
          </Button>
        </NavbarCollapse>
      </Navbar>

      <AppDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  );
};

export default Header;
