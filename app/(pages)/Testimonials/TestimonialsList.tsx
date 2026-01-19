'use client';

import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper'; // ✅ Correct type import

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const videoTestimonials = [
  {
    name: 'Dr HIRT Jean- Pascal',
    title: 'International senior expert, R&D, Loreal',
    videoUrl: '/t/2nd.mp4',
    thumbnail: '/t/Jean- Pascal.jpg',
    message: 'Dolceras PCS empowers our innovation efforts with reliable, easy-to-use technology scouting',
  },
  {
    name: 'Saadia Saifuddin',
    title: 'Cisco',
    videoUrl: '/t/3rd.mp4',
    thumbnail: '/t/Saadia Saifuddin.jpg',
    message:
      ' Dolceras tools, like PCS and classification analysis, streamline complex patent searches and technology landscape mapping, enhancing decision-making across sectors',
  },
  {
    name: 'Riccardo Carli',
    title: 'Managing Director of EVOip GmbH',
    videoUrl: '/t/Ricardo-Cali_EVOip.mp4',
    thumbnail: '/t/Cali.jpg',
    message:
      'Dolceras PCS AI features and intuitive interface make identifying patentable ideas easy, with unmatched value for the price ',
  },
];

export default function VideoTestimonialSlider() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null); // ✅ Correct typing

  const handlePlay = (index: number) => {
    setActiveVideo(index);
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handlePause = () => {
    setActiveVideo(null);
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false}
        pagination={{ clickable: true }}
        autoplay={{ delay: 7000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={1}
      >
        {videoTestimonials.map((testimonial, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col md:flex-row items-center bg-white  rounded-xl shadow-lg overflow-hidden">
              {/* Video */}
              <div className="w-full md:w-1/2 flex justify-center">
                <video
                  controls
                  poster={testimonial.thumbnail}
                  className={`w-full md:w-auto h-64 md:h-96 object-cover transition-transform duration-300 ${
                    activeVideo === i ? 'scale-110 z-50 relative' : ''
                  }`}
                  onPlay={() => handlePlay(i)}
                  onPause={handlePause}
                >
                  <source src={testimonial.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 p-6 relative  flex flex-col justify-center">
                {/* Chat bubble */}
                <div className=" bg-secondary-50 relative   text-gray-900  p-10 rounded-xl rounded-bl-none shadow-md">
                  <p className="mb-3 text-xl italic">"{testimonial.message}"</p>
                  <p className="font-semibold text-lg">{testimonial.name}</p>
                  <p className="text-lg text-primary-900 ">{testimonial.title}</p>

                  {/* Bubble tail */}
                  <div className="absolute top-24  -left-2 w-4 h-4 bg-secondary-50  rotate-48 -translate-y-2"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
