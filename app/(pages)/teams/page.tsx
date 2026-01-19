import SeoHead from '@/app/components/seo/seoHead';
import TeamPage from './TeamPage';

export const revalidate = 60; // cache page for 60 seconds (ISR)

export default async function BlogsPage() {
  const pageSEO = {
    title: 'Latest Blogs | Insonix',
    description: 'Explore the latest insights, articles, and resources from the Insonix team.',
    keywords: 'blogs, tech articles, case studies, insonix',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`,
  };

  return (
    <>
      <SeoHead {...pageSEO} image="/default-og.jpg.png" />
      <TeamPage />
    </>
  );
}
