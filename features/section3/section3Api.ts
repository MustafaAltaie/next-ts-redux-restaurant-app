import { api } from "../api/apiSlice";
import { Item } from '../../types/Dish';

export const section3Api = api.injectEndpoints({
    endpoints: (builder) => ({
        createDish: builder.mutation<Item, Partial<Item>>({
            query: (data) => ({ url: '/api/section3', method: 'POST', body: data }),
            invalidatesTags: ['section3']
        }),
        uploadImage: builder.mutation<void, FormData>({
            query: (formData) => ({ url: '/api/section3/images', method: 'POST', body: formData }),
            invalidatesTags: ['section3']
        }),
        readDishes: builder.query<Item[], void>({
            query: () => 'api/section3',
            providesTags: ['section3']
        }),
        deleteDish: builder.mutation<void, string>({
            query: (id) => ({ url: `/api/section3/${id}`, method: 'DELETE' }),
            invalidatesTags: ['section3']
        }),
        deleteImage: builder.mutation<void, string>({
            query: (imageName) => ({ url: `/api/section3/delete-images/${encodeURIComponent(imageName)}`, method: 'DELETE' }),
            invalidatesTags: ['section3']
        }),
        updateDish: builder.mutation<Item, { id: string, data: Partial<Item> }>({
            query: ({ id, data }) => ({ url: `/api/section3/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: ['section3']
        }),
        updateImage: builder.mutation<void, { formData: FormData, oldImage: string }>({
            query: ({ formData, oldImage }) => ({ url: `/api/section3/update/${oldImage}`, method: 'POST', body: formData }),
            invalidatesTags: ['section3']
        })
    }),
    overrideExisting: true,
});

export const {
    useCreateDishMutation,
    useUploadImageMutation,
    useReadDishesQuery,
    useDeleteDishMutation,
    useDeleteImageMutation,
    useUpdateDishMutation,
    useUpdateImageMutation,
} = section3Api;