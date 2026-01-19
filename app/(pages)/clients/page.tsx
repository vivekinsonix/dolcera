import { Card, Avatar, Button } from 'flowbite-react';

const teamMembers = [
  {
    name: 'Pharma/Biotech',
    image: '/clients/SomalogicLogo.png',
  },
  {
    name: 'Pharma/Biotech',
    image: '/clients/innatevertnoir.png',
  },
  {
    name: 'Pharma/Biotech',
    image: '/clients/fapons.png',
  },
  {
    name: 'Pharma/Biotech',
    image: '/clients/novartis.png',
  },
  {
    name: 'Medical devices',
    image: '/clients/ResMed_logo.svg',
  },
  {
    name: 'Pharma/Biotech',
    image: '/clients/Medtronic-Logo.wine.png',
  },
];

export default function TeamPage() {
  return (
    <section className="min-h-screen w-full dark:bg-foreground dark:text-white">
      <main className="container mx-auto max-w-7xl px-4 py-10">
        <header className="my-10 text-center ">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl mt-5">Our Clients</h1>
          <p className="mt-2 text-gray-400">Our Clients</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 md:mt-16">
          {teamMembers.map((member, idx) => (
            <Card
              key={idx}
              className="p-8 rounded-2xl  border border-gray-100 dark:border-secondary-dark shadow-lg text-center flex flex-col items-center transition-transform duration-300 hover:scale-[1.03]"
            >
              <Avatar img={member.image} rounded={false} size="xl" className="mb-4" />

              <h2 className="text-xl dark:!text-primary md:text-2xl font-bold mb-3 leading-snug">{member.name}</h2>
            </Card>
          ))}
        </div>
      </main>
    </section>
  );
}
