import './singlePage.scss';
import { Link } from 'react-router-dom';


const SingleComic = ({name, thumbnail, description, pages, price}) => {
  return (
    <>
      <img src={thumbnail} alt={name} className="single-page__img" /><div className="single-page__info">
        <h2 className="single-page__name">{name}</h2>
        <p className="single-page__descr">{description ? description : 'Description is not found!'}</p>
        <p className="single-page__descr">{pages} pages</p>
        <p className="single-page__descr">Language: en-us</p>
        <div className="single-page__price">{price}</div>
      </div><Link to='/comics' className="single-page__back">Back to all</Link>
    </>
  )
}

export default SingleComic;
