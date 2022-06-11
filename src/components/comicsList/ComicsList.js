import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from './../../services/MarvelService';
import ComicsCard from './ComicsCard';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const ComicsList = () => {
    
    const [comicsList, setComicslist] = useState([]);
    const {loading, error, clearError, getAllComics} = useMarvelService();
    const [newListItemsLoading, setNewListItemsLoadingValue] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEndedValue] = useState(false);
    
    useEffect(() => {
        updateComics(offset, true);
    }, []);
    
    const onComicsLoaded = (comics) => {
        let ended = false;
        
        if (comics.length < 8) {
            ended = true;
        }
        
        setComicsEndedValue(ended);
        setNewListItemsLoadingValue(false);
        setOffset(offset => offset + 8);
        setComicslist(comicsList => comicsList.concat(comics));
        
    }
    
    const updateComics = (offcet, initial) => {
        clearError();
        initial ? setNewListItemsLoadingValue(false) : setNewListItemsLoadingValue(true);
        getAllComics(offcet).then(onComicsLoaded)
    }
    
    const spinner = loading && !newListItemsLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    
    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                {comicsList.map(item => <ComicsCard key={item.id} name={item.name} id={item.id} thumbnail={item.thumbnail} price={item.price} url={item.url} />)}
            </ul>
            <button disabled={newListItemsLoading} style={{'display': comicsEnded ? 'none' : 'block'}} className="button button__main button__long" onClick={() => updateComics(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
