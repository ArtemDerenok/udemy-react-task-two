import './singlePage.scss';
import { Link } from "react-router-dom"

const SingleChar = ({name, thumbnail, description}) => {
  return (
    <>
     <img src={thumbnail} alt={name} className="single-page__img" /><div className="single-page__info">
        <h2 className="single-page__name">{name}</h2>
        <p className="single-page__descr">{description ? description : 'Description is not found!'}</p>

      </div><Link to='/' className="single-page__back">Back to all</Link>
    </>
  )
}

export default SingleChar;
