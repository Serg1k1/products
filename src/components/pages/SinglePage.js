import { useParams } from 'react-router-dom';
import { useGetSingleProductQuery } from '../api/productsApiSlice';
import { Link } from 'react-router-dom';

import './singlePage.css';

const SinglePage = () => {
    const { id } = useParams();

    const { data, isLoading } = useGetSingleProductQuery(id);
    console.log(data);

    return (
        <div className="single__container">
            <Link to={'/'} className="single__back-link">Back to main page</Link>
            {isLoading ? <h2>Loading</h2> : <div className="single__info">
                <img src={data.image} alt="image" />
                <div className='single__content'>
                    <h2 className="single__title">{data.title}</h2>
                    <p className="single__description">{data.description}</p>
                    <span className="single__price">{data.price}$</span>
                </div>
            </div>}
        </div>
    );
}

export default SinglePage;