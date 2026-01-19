import Image from 'next/image';
import Link from 'next/link';

const advisors = [
  '/teams/samir.jpg',
  '/teams/LG.jpg',
  '/teams/mb.jpg',
  '/teams/Arron_Zhu.jpg',
  '/teams/Stanely_Zheng.jpg',
  '/teams/SeshuRaju.png',
];

export default function PartnerAdvisoryCouncil() {
  return (
    <section id="teams" className="relative overflow-hidden py-24">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image src="/bg-teams.png" alt="Background" fill className="object-cover" priority />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/75 to-white/60" />

      {/* Soft curve highlight */}
      <div className="absolute -right-40 top-0 -z-10 h-[600px] w-[900px] rounded-full bg-gradient-to-br from-indigo-100 via-white to-pink-100 opacity-60 blur-3xl" />

      {/* CONTENT */}
      <div className="relative  text-center mx-auto container px-4 ">
        {/* Section heading */}
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">Expert Advisors</p>

        <h1 className="mb-16 text-3xl font-extrabold leading-tight dark:text-white  md:text-5xl">Our Team</h1>

        <div className="grid grid-cols-1 items-center text-left gap-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl font-semibold tracking-tight dark:!text-white ">Partner Advisory Council.</h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed dark:!text-gray-200 text-slate-600">
              We partner with industry leaders who bring specialized expertise and deep insights, working together to
              help organizations navigate and overcome complex business challenges.
            </p>

            <Link
              href="/teams"
              className="mt-8 inline-flex items-center gap-2 text-base font-medium text-primary hover:text-primary-900"
            >
              Meet the Advisors
              <span className="text-xl">›</span>
            </Link>
          </div>

          {/* RIGHT GRID */}
          <div className="grid grid-cols-3 gap-6">
            {advisors.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-2xl
                bg-gradient-to-br from-indigo-100 via-white to-pink-100"
              >
                <Image src={src} alt="Advisor" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
