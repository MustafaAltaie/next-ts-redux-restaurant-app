import { api } from "../api/apiSlice";

export const passwordApi = api.injectEndpoints({
    endpoints: (builder) => ({
        checkPassword: builder.mutation<{ valid: boolean }, string>({
            query: (password) => ({ url: '/api/password', method: 'POST', body: { password } }),
            invalidatesTags: ['password']
        }),
    }),
    overrideExisting: true
});

export const { useCheckPasswordMutation } = passwordApi;