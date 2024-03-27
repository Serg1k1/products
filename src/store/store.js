import { configureStore } from '@reduxjs/toolkit';

import { productsApiSlice } from '../components/api/productsApiSlice';
import { filtersApiSlice } from '../components/api/filtersApiSlice';
import filters from '../components/filters/filtersSlice';
import search from '../components/header/headerSearchSlice';

const store = configureStore({
  reducer: { search, filters, [productsApiSlice.reducerPath]: productsApiSlice.reducer, [filtersApiSlice.reducerPath]: filtersApiSlice.reducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productsApiSlice.middleware, filtersApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store