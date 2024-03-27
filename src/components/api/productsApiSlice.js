import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApiSlice = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => "/products",
        }),
        getSingleProduct: builder.query({
            query: (id) => `/products/${id}`
        })
    })
})

export const { useGetProductsQuery, useGetSingleProductQuery } = productsApiSlice