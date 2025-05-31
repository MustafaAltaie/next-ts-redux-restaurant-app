import { api } from "../api/apiSlice";
import { Order } from "../../types/Order";

export const orderApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<Order, Partial<Order>>({
            query: (data) => ({ url: '/api/order', method: 'POST', body: data }),
            invalidatesTags: ['order']
        }),
        readOrders: builder.query<Order[], void>({
            query: () => '/api/order',
            providesTags: ['order']
        }),
        deleteOrder: builder.mutation<void, string>({
            query: (id) => ({ url: `/api/order/${id}`, method: 'DELETE' }),
            invalidatesTags: ['order']
        })
    }),
    overrideExisting: true,
});

export const {
    useCreateOrderMutation,
    useReadOrdersQuery,
    useDeleteOrderMutation,
} = orderApi;