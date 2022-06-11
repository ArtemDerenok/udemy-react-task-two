import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import CharCard from './CharCard';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import './charList.scss';

const CharList = ({onSelectedChar}) => {
    
    const [charList, setCharList] = useState([]);
    const [newListItemsLoading, setNewListItemsLoadingValue] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEndedValue] = useState(false);
    
    const {loading, error, getAllCharacters, clearError} = useMarvelService();
      
    useEffect(() => {
        updateChars(offset, true);
    }, [])
    
    const onCharsLoaded = (charsList) => {
        let ended = false;
        
        if (charsList.length < 9) {
            ended = true;
        }
        
        setCharList(chars => chars.concat(charsList));
        setNewListItemsLoadingValue(false);
        setOffset(offset => offset + 9);
        setCharEndedValue(ended);
    }
    

   const updateChars = (offset, initial) => {
        clearError();
        initial ? setNewListItemsLoadingValue(false) : setNewListItemsLoadingValue(true);
        getAllCharacters(offset).then(res => onCharsLoaded(res))  
    }
    
  
 
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newListItemsLoading ? <Spinner /> : null;
        
    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {charList.map(item => <CharCard onSelectedChar={onSelectedChar} key={item.id} charName={item.name} charId={item.id} imageSrc={item.thumbnail} />)}
            </ul>
            <button disabled={newListItemsLoading} style={{'display': charEnded ? 'none' : 'block'}} className="button button__main button__long" onClick={() => updateChars(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
        )
    
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
};

export default CharList;
