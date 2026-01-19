import { getOpenings } from '@/app/services/jobService';
import { JobItem } from '@/app/utils/Interfaces';
import { Careers_Details } from './Careers_Details';
export const revalidate = 60;
export const dynamicParams = true;
export async function generateStaticParams() {
  try {
    const job = await getOpenings();
    return job?.data?.map((b: JobItem) => ({
      id: b.slug,
    }));
  } catch (err) {
    console.warn('generateStaticParams: failed to fetch blogs', err);
    return [];
  }
}

export default async function JobPage(props: any) {
  const resolvedProps = await props;
  const params = await resolvedProps.params;
  const slug: string | undefined = params?.id;

  return <Careers_Details slug={slug ?? ''} />;
}
