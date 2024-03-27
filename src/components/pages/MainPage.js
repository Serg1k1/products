import Header from '../header/Header';
import Products from '../products/Products';
import Filters from '../filters/Filters';

const MainPage = () => {
    return (
        <>
            <Header />
            <main className="page__container">
                <Filters />
                <Products />
            </main>
        </>
    )
}

export default MainPage;