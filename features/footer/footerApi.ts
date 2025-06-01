import { api } from "../api/apiSlice";
import { ContactObj } from "../../types/Footer";

export const footerApi = api.injectEndpoints({
    endpoints: (builder) => ({
        updateFooter: builder.mutation<ContactObj, Partial<ContactObj>>({
            query: (data) => ({ url: '/api/footer', method: 'PATCH', body: data }),
            invalidatesTags: ['footer']
        }),
        readFooter: builder.query<ContactObj, void>({
            query: () => '/api/footer',
            providesTags: ['footer']
        }),
    }),
    overrideExisting: true
});

export const { useUpdateFooterMutation, useReadFooterQuery } = footerApi;