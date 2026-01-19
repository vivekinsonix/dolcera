'use client';

import { useEffect, useState } from 'react';
import BlogsHomePage from './(pages)/bloghome/page';
import Careers from './(pages)/careers/careers';
import Hero from './(pages)/hero/hero';
import ALLPortfolio from './(pages)/portfolio/allcasestudy/page';
import Services from './(pages)/service/page';
import { useDrawer } from './context/DrawerContext';
import { get_home_page_data } from './services/homePageService';
import { AboutResponse } from './utils/Interfaces';
import BrandCarousel from './(pages)/BrandCarousel/BrandCarousel';
import Clients from './(pages)/BrandCarousel/clients';
import Testimonials from './(pages)/Testimonials/Testimonials';
import ServicesType from './(pages)/servicestype/page';
import PartnerAdvisoryCouncil from './(pages)/teamshome/page';

let cachedHomeData: AboutResponse | null = null;

export default function Home() {
  const [home_data, setHome_data] = useState<AboutResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { openDrawer } = useDrawer();

  useEffect(() => {
    const fetchData = async () => {
      if (cachedHomeData) {
        setHome_data(cachedHomeData);
        return;
      }

      try {
        setLoading(true);
        const response = await get_home_page_data();
        const data = response?.data || null;
        setHome_data(data);

        cachedHomeData = data;
      } catch (error) {
        console.error('Failed to fetch home page data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScheduleClick = () => {
    openDrawer();
  };

  return (
    <main className="dark:bg-foreground">
      <Hero
        subHeading={home_data?.Main?.sub_heading}
        heading={home_data?.Main?.heading}
        loading={loading}
        ourLegacy={home_data?.Our_Legacy || {}}
        coreDifferentiars={home_data?.Our_Core_Differentiators || []}
        onSchedule={handleScheduleClick}
      />
      {/* <Services /> */}
      <ALLPortfolio />
      <Clients />
      <ServicesType />
      <BlogsHomePage />
      <PartnerAdvisoryCouncil />
      <Testimonials />
      {/* <Careers /> */}
    </main>
  );
}
