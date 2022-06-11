import './singleComic.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useMarvelService from './../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

const SingleComic = () => {
    
    const [comic, setComic] = useState({});
    const {comicId} = useParams();
    const {loading, error, clearError, getComic} = useMarvelService();
    
    useEffect(() => {
      updateComic();
    }, [comicId])
    
    const onComicLoaded = (comic) => {
      setComic(comic);
    }
    
    const updateComic = () => {
      clearError();
      getComic(comicId).then(onComicLoaded);
    }
    
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    
    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {<View name={comic.name} thumbnail={comic.thumbnail} description={comic.description} pages={comic.pages} price={comic.price} />}
        </div>
    )
}

const View = ({name, thumbnail, description, pages, price}) => {
  return (
    <>
      <img src={thumbnail} alt={name} className="single-comic__img" /><div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description ? description : 'Description is not found!'}</p>
        <p className="single-comic__descr">{pages} pages</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{price}</div>
      </div><Link to='/comics' className="single-comic__back">Back to all</Link>
    </>
  )
}

export default SingleComic;
