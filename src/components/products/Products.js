import { useState } from 'react';
import { useGetProductsQuery } from '../api/productsApiSlice';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import './products.css';

const Products = () => {
    const { data: products = [], isFetching } = useGetProductsQuery();

    const term = useSelector(state => state.search.searchTerm);
    const filters = useSelector(state => state.filters);

    const searchEmp = (elements, term) => {
        if (term.length === 0) {
            return elements;
        }

        return elements.filter((item) => {
            return item.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    const sortByPrice = (elements, value) => {
        const sortedProducts = elements.slice();
        if (value === '') {
            return elements
        };

        switch (value) {
            case "increase":
                return sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case "decrease":
                return sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                return elements;
        }
    };

    const sortByCategory = (elements, category) => {
        if (category === "all") {
            return elements;
        }

        return elements.filter((item) => item.category === category)
    }

    const sortByRange = (elements, value) => {
        if (value === null) {
            return elements;
        }

        return elements.filter((item) => item.price <= value);
    }

    const renderItems = (arr) => {
        if (isFetching) {
            return <h2>Loading</h2>
        }

        if (arr.length === 0) {
            return <h2 className='product__error' >There are no products found</h2>
        }

        return arr.map((item) => (
            <div key={item.id} className="products__item item-products">
                <div className="item-products__header">
                    <img src={item.image} alt="image" />
                </div>
                <div className="item-products__body">
                    <h4 className="item-products__title" >{item.title}</h4>
                    <span className="item-products__price">{item.price}$</span>
                </div>
                <div className="item-products__action">
                    <Link className="button" to={`/${item.id}`}>See more</Link>
                </div>
            </div>
        ))
    }

    const filteredArticles = sortByRange(sortByCategory(sortByPrice(searchEmp(products, term), filters.sortBy), filters.activeFilter), filters.maxPrice);

    const items = renderItems(filteredArticles);

    function Items({ currentItems }) {
        return (
            <>
                <div className="products__items">
                    {currentItems}
                </div>
            </>
        );
    }

    function PaginatedItems({ itemsPerPage }) {
        const [itemOffset, setItemOffset] = useState(0);

        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = items.length > 0 && !isFetching ? items.slice(itemOffset, endOffset) :
            isFetching ? <h2>Loading...</h2> : <h2 className='product__error' >There are no products found</h2>;
        const pageCount = Math.ceil(items.length / itemsPerPage);

        // Invoke when user click to request another page.
        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            setItemOffset(newOffset);
        };

        return (
            <>
                <Items currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={4}
                    pageCount={pageCount}
                    previousLabel="Previous"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageClassName="pagination-item"
                    nextClassName="pagination-item"
                    previousClassName="pagination-item"
                    pageLinkClassName="pagination-link"
                    previousLinkClassName="pagination-link"
                    nextLinkClassName="pagination-link"
                    breakLinkClassName="pagination-link"
                    activeClassName="pagination-active"
                />
            </>
        );
    }

    return (
        <>
            <div className="products">
                <PaginatedItems itemsPerPage={6} />
            </div>
        </>

    )
}
export default Products;