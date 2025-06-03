import { api } from "../api/apiSlice";
import { Item } from '../../types/MilkShake';

export const section2Api = api.injectEndpoints({
    endpoints: (builder) => ({
        createMilkShake: builder.mutation<Item, Partial<Item>>({
            query: (data) => ({ url: '/api/section2', method: 'POST', body: data }),
            invalidatesTags: ['section2'],
        }),
        uploadMilkShakeImage: builder.mutation<void, FormData>({
            query: (formData) => ({ url: '/api/section2/section2-images', method: 'POST', body: formData }),
            invalidatesTags: ['section2'],
        }),
        readMilkShakes: builder.query<Item[], void>({
            query: () => '/api/section2',
            providesTags: ['section2']
        }),
        deleteMilkShake: builder.mutation<void, string>({
            query: (id) => ({ url: `/api/section2/${id}`, method: 'DELETE' }),
            invalidatesTags: ['section2']
        }),
        deleteSec2Image: builder.mutation<void, string>({
            query: (image) => ({ url: `/api/section2/delete/${encodeURIComponent(image)}`, method: 'DELETE' }),
            invalidatesTags: ['section2']
        }),
        updateMilkShake: builder.mutation<Item, { id: string, data: Partial<Item> }>({
            query: ({ id, data }) => ({ url: `/api/section2/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: ['section2']
        }),
        updateSec2Image: builder.mutation<void, { formData: FormData; oldImageName: string }>({
            query: ({ formData, oldImageName }) => ({ url: `/api/section2/update/${oldImageName}`, method: 'POST', body: formData }),
            invalidatesTags: ['section2'],
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateMilkShakeMutation,
    useUploadMilkShakeImageMutation,
    useReadMilkShakesQuery,
    useDeleteMilkShakeMutation,
    useDeleteSec2ImageMutation,
    useUpdateMilkShakeMutation,
    useUpdateSec2ImageMutation,
} = section2Api;