import { useDispatch, useSelector } from "react-redux";
import { filtersSortBy } from "./filtersSlice";
import { useGetFiltersQuery } from "../api/filtersApiSlice";
import { changeActiveFilter, changeMaxPrice } from "./filtersSlice";
import classNames from 'classnames';

import './filters.css';

const Filters = () => {
    const dispatch = useDispatch();
    const { maxPrice, activeFilter } = useSelector(state => state.filters)

    const { data: filters = [], isFetching } = useGetFiltersQuery();

    const renderFilters = (arr) => {
        if (isFetching) {
            return <h2>Loading...</h2>
        }

        if (arr.length === 0) {
            return <h4>There are no filters</h4>
        }

        return arr.map(({ name, label }) => {
            const btnClass = classNames('btn', {
                'active': name === activeFilter
            });
            return (
                <button
                    key={name}
                    id={name}
                    className={btnClass}
                    onClick={() => dispatch(changeActiveFilter(name))}
                >{label}</button>
            )
        })
    }

    const btnElements = renderFilters(filters);

    return (
        <div className="filters">
            <div className="filters__sort-price">
                <h4 className="filters__title" >Sort by price</h4>
                <select onChange={(e) => dispatch(filtersSortBy(e.target.value))} className="filters__sort-select" name="element" id="element">
                    <option value="">Sort from...</option>
                    <option value="increase">From down to up</option>
                    <option value="decrease">From up to down</option>
                </select>
            </div>
            <div className="filters__type">
                <h4 className="filters__title" >Select filters</h4>
                <div className="filter__type-buttons">
                    {btnElements}
                </div>
            </div>
            <div className="filter__range">
                <h4 className="filters__title" >Select max price: {maxPrice}$</h4>
                <input onChange={(e) => dispatch(changeMaxPrice(e.target.value))} type="range" min="0" max="1000" step="1" />
            </div>
        </div>
    )
}

export default Filters;