import { get_what_we_builds } from '@/app/services/homePageService';
import { notFound } from 'next/navigation';
import Details from '../../Details';
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const result = await get_what_we_builds();
  const items = result?.data ?? []; // Use a clear name

  if (!Array.isArray(items)) {
    console.error('Expected an array but got:', items);
    return [];
  }

  return items
    .map((b: any) => {
      const slug = b.attributes?.slug || b.slug;
      if (!slug || typeof slug !== 'string') return null;
      return { id: slug };
    })
    .filter(Boolean) as { id: string }[];
}

export default async function (props: any) {
  const resolvedProps = await props;
  const params = await resolvedProps.params;
  const id: string = params?.id;
  if (!id) {
    return notFound();
  }

  return <Details id={id} />;
}
