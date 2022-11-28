import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { ICard } from '@root/models/ICard';
import { BASE_URL } from '@root/constants/constants';

export const cardAPI = createApi({
  reducerPath: 'cardAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  endpoints: (build) => ({
    fetchCatalog: build.query<ICard[], null>({
      query: () => ({
        url: '/catalog.json'
      })
    })
  })
});
