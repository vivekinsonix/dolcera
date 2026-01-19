import { IJobSubmitPayload } from '../(pages)/careers/careersdetail/[id]/Careers_Details';
import { apiClient } from './apiService';

export function getOpenings() {
  return apiClient.get('/job-openings').then((res) => res.data);
}

export function getOpenings_Ids() {
  const data = apiClient
    .get('/job-openings')
    .then((res) => res.data.data.map((opening: any) => opening.slug.toString()));
  return data;
}

export function getPaginatedOpenings(pageno = 1, records = 10) {
  return apiClient
    .get(`/job-openings?createdAt:desc&pagination[page]=${pageno}&populate=skills&pagination[pageSize]=${records}`)
    .then((res) => res.data);
}

export function getOpening(id: string | number) {
  return apiClient.get(`/job-openings/${id}?populate=*`).then((res) => res.data);
}

export function createApplication(data: unknown) {
  return apiClient.post('/job-applications', { data }).then((res) => res.data);
}

export async function getOpeningBySlug(slug: string) {
  const baseParams = {
    populate: 'skills',
    filters: { slug: { $eq: slug } },
  };

  const requests = [
    apiClient.get('/job-openings', { params: { ...baseParams } }),
    apiClient.get('/job-openings', { params: { ...baseParams, status: 'draft' } }),
  ];

  const responses = await Promise.allSettled(requests);

  for (const res of responses) {
    if (res.status === 'fulfilled' && res.value.data.data?.[0]) {
      return res.value.data.data[0];
    }
  }

  return null;
}

export function getCareersBenifits() {
  return apiClient.get('/careers-benefits?createdAt:desc&&populate=*').then((res) => res.data);
}

export function getCareersCulture() {
  return apiClient.get('/career-cultures?createdAt:desc&&populate=*').then((res) => res.data);
}

export function getFormQuestions() {
  return apiClient.get('/questions').then((res) => res.data);
}

export function submitJobApplication(data: IJobSubmitPayload) {
  return apiClient.post('/job-applications', { data }).then((res) => res.data);
}
