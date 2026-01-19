// pages/team.js
import { Card, Avatar, Button } from 'flowbite-react';
import { Linkedin, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Alice Johnson',
    role: 'CEO',
    image: '/teams/samir.jpg',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Lakshmikant Goenka',
    role: 'Managing Director',
    image: '/teams/LG.jpg',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Ed Rozenberg',
    role: 'Managing Director',
    image: '/teams/profile_photo.jpg',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Sandeep Mandava',
    role: 'VP, High Tech',
    image: '/teams/profile_photo.jpg',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Robert Oschman',
    role: 'Director, Consumer Products',
    image: '/teams/profile_photo.jpg',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Manik Bala',
    role: 'VP, Marketing and Sales Ops',
    image: '/teams/mb.jpg',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Arron Zhu',
    role: 'Director, Sales',
    image: '/teams/Arron_Zhu.jpg',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Stanely Zheng',
    role: 'Director, Marketing',
    image: '/teams/Stanely_Zheng.jpg',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Sumair Riyaz',
    role: 'Director, Consulting Practice',
    image: '/teams/profile_photo_W.jpg',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Sateesh Thipirisetti',
    role: 'High Tech Practice',
    image: '/teams/profile_photo.jpg',
    social: { linkedin: '#', twitter: '#' },
  },
];

export default function TeamPage() {
  return (
    <section className="min-h-screen w-full dark:bg-foreground ">
      <main className="container mx-auto max-w-7xl px-4 py-10">
        <header className="my-10 text-center ">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl mt-5">Meet Our Team</h1>
          <p className="mt-2 text-gray-400">The people who make everything possible</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 md:mt-16">
          {teamMembers.map((member, idx) => (
            <Card
              key={idx}
              className="p-8 rounded-2xl bg-primary-50  shadow-lg text-center flex flex-col items-center transition-transform duration-300 hover:scale-[1.03]"
            >
              <Avatar img={member.image} rounded={true} size="xl" className="mb-4" />
              {member.social.linkedin && (
                <div className="flex justify-center">
                  <LinkedinIcon className="hover:text-white hover:bg-primary rounded-sm cursor-pointer w-10 h-10 p-2 cursor" />
                </div>
              )}
              <h2 className="text-xl md:text-2xl font-bold mb-3 leading-snug">{member.name}</h2>
              <p className="text-gray-600  mb-4 leading-relaxed">{member.role}</p>

              <Link href="#" className="text-blue-500 hover:text-blue-700 hover:underline">
                Learn More →
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </section>
  );
}
