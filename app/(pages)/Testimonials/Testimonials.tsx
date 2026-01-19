'use client';

import VideoTestimonials from './TestimonialsList';

export default function Testimonials() {
  return (
    <>
      <>
        <section id="projects" className="py-16 md:py-24 dark:bg-foreground bg-white">
          <div className="container mx-auto text-center">
            <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Testimonials</p>
            <h1 className="text-3xl md:text-5xl  font-extrabold leading-tight"> What Our Clients Say</h1>
            <div className="mt-10">
              <VideoTestimonials />
            </div>
          </div>
        </section>
      </>
    </>
  );
}
