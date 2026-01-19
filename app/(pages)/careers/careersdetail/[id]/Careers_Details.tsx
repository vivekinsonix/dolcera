'use client';

import SeoHead from '@/app/components/seo/seoHead';
import FormRenderer from '@/app/components/formRenderer/FormRenderer';
import { RichTextViewer } from '@/app/components/richtext/RichTextViewer';
import SubHeader from '@/app/layout/SubHeaderfile';
import { getFormQuestions, getOpeningBySlug, submitJobApplication } from '@/app/services/jobService';
import SpinnerService from '@/app/services/SpinnerService';
import ToastService from '@/app/services/toasterService';
import { DynamicField, JobItem } from '@/app/utils/Interfaces';
import { validateForm } from '@/app/utils/utility';
import { Button, Card } from 'flowbite-react';
import { useCallback, useEffect, useState, useMemo } from 'react';

export interface IJobSubmitPayload {
  job?: string;
  answers?: Record<string, unknown>;
  name?: string;
  email?: string;
}

export const Careers_Details = ({ slug }: { slug: string }) => {
  const [job, setJob] = useState<JobItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<DynamicField[]>([]);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch job and fields
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [jobRes, fieldsRes] = await Promise.all([getOpeningBySlug(slug), getFormQuestions()]);
        setJob(jobRes || null);
        setFields(fieldsRes?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  // Handle submit
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!job) return;

      const result = validateForm(fields, formData);

      if (!result.valid) {
        setErrors(result.errors);
        return;
      }

      setErrors({});
      SpinnerService.showSpinner();

      try {
        const payload: IJobSubmitPayload = {
          job: job.documentId,
          answers: formData,
          name: (formData.full_name || formData.name || '') as string,
          email: (formData.email || '') as string,
        };

        await submitJobApplication(payload);
        ToastService.showToast('Application Submitted!', 'success');
        setFormData({});
      } catch (err) {
        ToastService.showToast('Failed to submit application', 'error');
      } finally {
        SpinnerService.hideSpinner();
      }
    },
    [fields, formData, job]
  );

  // Always call hooks first, then conditionally render
  const seo = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://insonix.com';
    return {
      title: job?.Seo?.metaTitle || job?.title || '',
      description: job?.Seo?.metaDescription || job?.description?.substring(0, 160) || '',
      keywords: job?.Seo?.keywords || job?.skills?.join(', ') || 'job, career, Insonix',
      canonical: job?.Seo?.canonicalURL || `${baseUrl}/careers/careersdetail/${job?.slug}`,
      image: '/default-og.jpg.png',
    };
  }, [job]);

  // -----------------------------
  // Conditional render of content
  // -----------------------------

  return (
    <>
      {loading ? (
        <div className="min-h-[50vh] flex items-center justify-center text-gray-400">Loading...</div>
      ) : job ? (
        <>
          <SeoHead
            title={seo.title}
            description={seo.description}
            keywords={seo.keywords}
            image={seo.image}
            url={seo.canonical}
          />

          <SubHeader
            loading={loading}
            title={job.title}
            description={`${job.location} - ${job.experience}`}
            subtitle={job.description}
            backgroundImage="/images/careers-hero.jpg"
            tags={job?.skills?.map((t: any) => t?.name)}
          />

          <section id="careers" className="dark:bg-primary bg-white  px-4 dark:text-gray-200 pb-16 ">
            <div className="container mx-auto grid md:grid-cols-2 gap-8 mt-6">
              {/* LEFT CONTENT */}
              <div className="prose dark:prose-invert prose-h2::mt-0 max-w-none ">
                {job.requirements && (
                  <div>
                    <h2 className="text-2xl font-bold mt-0">Requirements</h2>
                    <RichTextViewer content={job.requirements} />
                  </div>
                )}

                {job.responsibilities && (
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Responsibilities</h2>
                    <RichTextViewer content={job.responsibilities} />
                  </div>
                )}
              </div>

              {/* RIGHT FORM */}
              {/* RIGHT FORM */}
              <div className="md:sticky md:top-24 self-start">
                <Card className="p-8 dark:bg-secondary-dark shadow-xl mb-5">
                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <h3 className="text-lg font-semibold mb-2">Apply now</h3>
                    <FormRenderer fields={fields} formData={formData} setFormData={setFormData} errors={errors} />
                    <Button type="submit" className="mt-4">
                      Submit Application
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="min-h-[50vh] flex items-center justify-center text-red-600">Job not found.</div>
      )}
    </>
  );
};

export default Careers_Details;
