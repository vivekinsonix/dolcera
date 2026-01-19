'use client';

import { Button, Tooltip } from 'flowbite-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NewsletterModal from '../(pages)/newsletter/news-letter';
import { useDrawer } from '../context/DrawerContext';
import { apiClient } from '../services/apiService';
import CookiePreferencesModal from '../cookie-preferences/CookiePreferencesModal';
import ResponsibleDisclosureModal from '../components/responsible-disclosure/ResponsibleDisclosureModal';
import HoverOverlayImages from '../components/drawer/logoInso';

const FollowIcons = React.memo(() => {
  const openLink = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className="flex gap-2 text-xl">
      <Tooltip className=" shadow-lg" content="LinkedIn" placement="top">
        <img
          src="/linkdin.svg"
          alt="LinkedIn"
          className="w-5 h-5 cursor-pointer hover:scale-130"
          onClick={() => openLink('https://www.linkedin.com/company/insonixinc/')}
        />
      </Tooltip>

      <Tooltip className="shadow-lg" content="X (Twitter)" placement="top">
        <img
          src="/x.svg"
          alt="Twitter"
          className="w-5 h-5 bg-primary dark:bg-transparent cursor-pointer hover:scale-130"
          onClick={() => openLink('https://x.com/insonixHQ')}
        />
      </Tooltip>
    </div>
  );
});
FollowIcons.displayName = 'FollowIcons';

const ChatIcons = React.memo(() => {
  return (
    <div className="flex items-center gap-2 text-xl">
      <Tooltip className="shadow-lg" content="WhatsApp" placement="top">
        <img
          src="/whatsapp.svg"
          alt="Instagram"
          className="w-6 h-6 cursor-pointer hover:scale-130"
          onClick={() => window.open(`https://wa.me/919357770278?text=${encodeURIComponent('')}`, 'blank')}
        />
      </Tooltip>

      <Tooltip className=" shadow-lg" content="Teams" placement="top">
        <img
          src="/TEAMS_ICON.svg"
          alt="Microsoft Teams"
          className="w-7 h-7 cursor-pointer hover:scale-130"
          onClick={() => window.open('msteams://teams.microsoft.com/l/chat/0/0?users=ajeetboparai@hotmail.com')}
        />
      </Tooltip>
    </div>
  );
});
// Skeleton loader
const SkeletonBox = React.memo(({ className }: any) => (
  <div className={`bg-gray-300 animate-pulse rounded ${className}`} />
));
SkeletonBox.displayName = 'SkeletonBox';

export default function Footer() {
  const [loading, setLoading] = React.useState(true);
  const [footerData, setFooterData] = React.useState<any>({});
  const { openDrawer } = useDrawer();
  const [open, setOpen] = useState(false);
  const [openDisclosure, setOpenDisclosure] = useState(false);

  const fetchFooter = useCallback(() => {
    apiClient
      .get('/footer?populate=*')
      .then((res) => setFooterData(res?.data?.data))
      .catch((err) => console.error('Error fetching footer data:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchFooter();
  }, [fetchFooter]);

  // Memoized link slices
  const slicedLinks1 = useMemo(() => footerData?.links?.slice(0, 3) || [], [footerData?.links]);
  const slicedLinks2 = useMemo(() => footerData?.links?.slice(3, 5) || [], [footerData?.links]);
  const siteLinks = useMemo(
    () =>
      (footerData?.site_links || []).map((link: any) => ({
        ...link,
        finalUrl: link?.link ? `${window.location.origin}/${link.link}` : '#',
      })),
    [footerData?.site_links]
  );

  useEffect(() => {
    const open = () => setOpen(true);
    window.addEventListener('open-cookie-preferences', open);
    return () => window.removeEventListener('open-cookie-preferences', open);
  }, []);

  useEffect(() => {
    const open = () => setOpenDisclosure(true);
    window.addEventListener('open-responsible-disclosure', open);
    return () => window.removeEventListener('open-responsible-disclosure', open);
  }, []);

  if (loading) {
    return (
      <footer className="dark:bg-secondary-dark bg-secondary dark:text-white pt-16 pb-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + Social */}
          <div>
            <SkeletonBox className="h-10 w-56 mb-3" />
            <SkeletonBox className="h-10 w-44" />
          </div>

          {/* First links column */}
          <div className="flex flex-col space-y-3">
            <SkeletonBox className="h-4 w-32" />
            <SkeletonBox className="h-4 w-28" />
            <SkeletonBox className="h-4 w-24" />
          </div>

          {/* Second links column */}
          <div className="flex flex-col space-y-3">
            <SkeletonBox className="h-4 w-30" />
            <SkeletonBox className="h-4 w-28" />
          </div>

          {/* How to contact */}
          <div>
            <SkeletonBox className="h-6 w-40 mb-3" />
            <SkeletonBox className="h-4 w-64 mb-3" />
            <SkeletonBox className="h-10 w-32 rounded" />
          </div>
        </div>

        <div className="border-t mt-12 mb-8 border-gray-300"></div>
        <div className="container mx-auto px-6">
          <SkeletonBox className="h-3 w-72 mt-6" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="dark:bg-secondary-dark bg-primary-900 dark:text-white pt-16 pb-10">
      <div className="container mx-auto md:px-0 px-2 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + Social */}
        {/* Logo + Social */}
        <div className="flex flex-col gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mt-0">
            <div>
              <div className="mb-2"></div>
              <img src="/logo/logo_dolcera-dark.svg" alt="insonix" width="130" className=" mb-2 dark:hidden" />
              <img src="/logo/logo_dolcera-dark.svg" alt="insonix" width="130" className=" mb-2 hidden dark:block" />
              <p className="text-white mb-0">
                Dolcera is one of world’s largest patent analytics companies. Our team of in-house subject-matter
                experts analyze several million patents a year using our machine-learning platform.
              </p>
            </div>
          </div>

          {/* Follow us label */}
          {/* <div className="items-right  flex flex-col gap-1 ">
            <div className="flex gap-10 ">
              <div>
                <span className="text-sm block font-medium mb-2 dark:text-gray-300">Follow us on</span>
           
                <FollowIcons />
              </div>
              <div>
                <span className="text-sm block font-medium mb-2 dark:text-gray-300 ">Connect on</span>
                <ChatIcons />
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex flex-col space-y-2 text-white ">
          {siteLinks.map((link: any, i: number) => {
            if (link.label === 'Cookie Preferences') {
              return (
                <button
                  key={i}
                  onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
                  className="text-left hover:underline  cursor-pointer"
                >
                  {link.label}
                </button>
              );
            }
            if (link.label === 'Sitemap') {
              return (
                <Link key={i} href="#" style={{ cursor: 'pointer' }} className="hover:underline">
                  {link.label}
                </Link>
              );
            }

            if (link.label === 'Responsible Disclosure') {
              return (
                <button
                  key={i}
                  onClick={() => window.dispatchEvent(new Event('open-responsible-disclosure'))}
                  style={{ cursor: 'pointer' }}
                  className="text-left hover:underline cursor-pointer"
                >
                  {link.label}
                </button>
              );
            }

            return (
              <Link key={i} href="#about" className="hover:underline">
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Second links column */}
        <div className="flex flex-col space-y-2 text-white">
          <Link href="#about" className="hover:underline">
            About
          </Link>
          <Link href="#" className="hover:underline">
            Blog
          </Link>
          <Link href="#" className="hover:underline">
            Career
          </Link>
          <NewsletterModal />
        </div>

        {/* How-to-contact section */}
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-white !text-white">How can we assist you?</h3>
          <p className="text-white mb-6">
            We value the opportunity to connect with you. Please submit your inquiries and feedback, and our experienced
            professionals are ready to assist you.
          </p>
          <Button className="hover:scale-110">Contact Us</Button>
        </div>
      </div>

      {/* LOWER SECTION */}
      <div className="container mx-auto px-2 mt-4 border-t border-gray-600 text-center pt-2 ">
        <p className="text-xs text-white mt-1">2026 Dolcera. All rights reserved.</p>
      </div>
      {/* <CookiePreferencesModal open={open} onClose={() => setOpen(false)} />
      <ResponsibleDisclosureModal open={openDisclosure} onClose={() => setOpenDisclosure(false)} /> */}
    </footer>
  );
}
