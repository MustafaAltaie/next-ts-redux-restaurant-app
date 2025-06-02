import { api } from "../api/apiSlice";
import { ContactObj } from "../../types/Footer";
import { FooterFollow } from "../../types/FooterFollow";

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
        updateFooterFollow: builder.mutation<FooterFollow, Partial<FooterFollow>>({
            query: (data) => ({ url: '/api/footer/follow', method: 'PATCH', body: data }),
            invalidatesTags: ['footerFollow']
        }),
        readFooterFollow: builder.query<FooterFollow, void>({
            query: () => '/api/footer/follow',
            providesTags: ['footerFollow']
        })
    }),
    overrideExisting: true
});

export const {
    useUpdateFooterMutation,
    useReadFooterQuery,
    useUpdateFooterFollowMutation,
    useReadFooterFollowQuery,
} = footerApi;