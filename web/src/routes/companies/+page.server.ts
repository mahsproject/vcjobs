import { error } from '@sveltejs/kit';
import { serverApi } from '#lib/server/api.js';
import { companyFiltersFromParams, companyFiltersToParams } from '#lib/companyFilters.js';
import { pageExists, pageOffset, pageWithinWindow, parsePage } from '#lib/pagination.js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
  const facets = companyFiltersToParams(companyFiltersFromParams(url.searchParams));
  const pageNumber = parsePage(url.searchParams);
  if (!pageWithinWindow(pageNumber)) error(404, 'Page not found');
  const initial = await serverApi(fetch).listCompanies('', 500, pageOffset(pageNumber), facets);
  if (!pageExists(pageNumber, initial.total)) error(404, 'Page not found');
  return { initial, pageNumber };
};
