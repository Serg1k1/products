import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
    sortBy: "",
    activeFilter: "all",
    maxPrice: null
})

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filtersSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload
        },
        changeMaxPrice: (state, action) => {
            state.maxPrice = action.payload
        }
    }
})


const { actions, reducer } = filtersSlice;

export default reducer;
export const { filtersSortBy, changeActiveFilter, changeMaxPrice } = actions;
