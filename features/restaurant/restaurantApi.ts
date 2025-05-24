import { api } from '../api/apiSlice';

export const tempApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadHomeImages: builder.mutation<void, FormData>({
      query: (formData) => ({ url: '/api/home-images', method: 'POST', body: formData }),
      invalidatesTags: ['home-images']
    }),
    getHomeImages: builder.query<string[], void>({
      query: () => '/api/home-images',
      providesTags: ['home-images']
    }),
    deleteHomeImages: builder.mutation<void, string>({
      query: (image) => ({ url: `/api/home-images/${image}`, method: 'DELETE' }),
      invalidatesTags: ['home-images']
    })
  }),

  overrideExisting: true,
});

export const { useUploadHomeImagesMutation, useGetHomeImagesQuery, useDeleteHomeImagesMutation } = tempApi;