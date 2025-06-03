import { api } from "../api/apiSlice";
import { Member } from "../../types/Member";

export const teamApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createMember: builder.mutation<Member, Partial<Member>>({
            query: (data) => ({ url: '/api/memberSection', method: 'POST', body: data }),
            invalidatesTags: ['members']
        }),
        uploadMemberImage: builder.mutation<void, FormData>({
            query: (formData) => ({ url: '/api/memberSection/images', method: 'POST', body: formData }),
            invalidatesTags: ['members']
        }),
        readMember: builder.query<Member[], void>({
            query: () => '/api/memberSection',
            providesTags: ['members']
        }),
        updateMember: builder.mutation<Member, { id: string, data: Partial<Member> }>({
            query: ({ id, data }) => ({ url: `/api/memberSection/${id}`, method: 'PATCH', body: data }),
            invalidatesTags: ['members']
        }),
        updateMemberImage: builder.mutation<void, { formData: FormData, oldImage: string }>({
            query: ({ formData, oldImage }) => ({ url: `/api/memberSection/update/${oldImage}`, method: 'POST', body: formData }),
            invalidatesTags: ['members']
        }),
        deleteMember: builder.mutation<void, string>({
            query: (id) => ({ url: `/api/memberSection/${id}`, method: 'DELETE' }),
            invalidatesTags: ['members']
        }),
        deleteMemberImage: builder.mutation<void, string>({
            query: (imageName) => ({ url: `/api/memberSection/deleteImages/${encodeURIComponent(imageName)}`, method: 'DELETE' }),
            invalidatesTags: ['members']
        })
    }),
    overrideExisting: true
});

export const {
    useCreateMemberMutation,
    useUploadMemberImageMutation,
    useReadMemberQuery,
    useUpdateMemberMutation,
    useUpdateMemberImageMutation,
    useDeleteMemberMutation,
    useDeleteMemberImageMutation,
} = teamApi;