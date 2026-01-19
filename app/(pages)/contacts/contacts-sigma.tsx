'use client';

import SigmaGraph from './sigma';

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 text-center dark:bg-primary dark:text-gray-200 bg-secondary">
      <div className="container mx-auto">
        {/* Section header */}
        <div className="mb-12">
          <p className="text-sm font-medium dark:text-gray-400 mb-2 uppercase tracking-wider">Your Next Move</p>
          <h2 className="text-3xl md:text-5xl font-extrabold">
            Ready to Build Something <br className="sm:hidden" /> Exceptional?
          </h2>
        </div>

        {/* Short pitch */}
        <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-10 text-gray-800 dark:text-gray-300">
          Your vision deserves a top-tier team. Let discuss your project and turn your ideas into a reality that stands
          out.
        </p>

        <SigmaGraph />
      </div>
    </section>
  );
}
