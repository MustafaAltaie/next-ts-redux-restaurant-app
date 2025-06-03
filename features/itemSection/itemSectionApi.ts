import { api } from "../api/apiSlice";
import { Item } from "../../types/Item";

export const itemApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createItem: builder.mutation<Item, Partial<Item>>({
            query: (data) => ({ url: '/api/itemSection', method: 'POST', body: data }),
            invalidatesTags: ['items']
        }),
        uploadItemImage: builder.mutation<void, FormData>({
            query: (formData) => ({ url: '/api/itemSection/images', method: 'POST', body: formData }),
            invalidatesTags: ['items']
        }),
        readItem: builder.query<Item[], void>({
            query: () => '/api/itemSection',
            providesTags: ['items']
        }),
        updateItem: builder.mutation<Item, { id: string, data: Partial<Item> }>({
            query: ({ id, data }) => ({ url: `/api/itemSection/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: ['items']
        }),
        changeItemImage: builder.mutation<void, { formData: FormData, oldImage: string }>({
            query: ({ formData, oldImage }) => ({ url: `/api/itemSection/update/${oldImage}`, method: 'POST', body: formData }),
            invalidatesTags: ['items']
        }),
        deleteItem: builder.mutation<void, string>({
            query: (id) => ({ url: `/api/itemSection/${id}`, method: 'DELETE' }),
            invalidatesTags: ['items']
        }),
        deleteItemImage: builder.mutation<void, string>({
            query: (filename) => ({ url: `/api/itemSection/deleteImages/${encodeURIComponent(filename)}`, method: 'DELETE' }),
            invalidatesTags: ['items']
        }),
    }),
    overrideExisting: true,
});

export const {
    useCreateItemMutation,
    useUploadItemImageMutation,
    useReadItemQuery,
    useUpdateItemMutation,
    useChangeItemImageMutation,
    useDeleteItemMutation,
    useDeleteItemImageMutation,
} = itemApi;