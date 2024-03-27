import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const searchAdapter = createEntityAdapter();

const initialState = searchAdapter.getInitialState({
    searchTerm: ''
})

const searchListSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        findProduct: (state, action) => {
            state.searchTerm = action.payload
        }
    }
});

const { actions, reducer } = searchListSlice;

export const { findProduct } = actions;

export default reducer;