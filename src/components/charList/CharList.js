import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import CharCard from './CharCard';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import './charList.scss';

const CharList = ({onSelectedChar}) => {
    
    const [charList, setCharList] = useState([]);
    const [loading, setLoadingValue] = useState(true);
    const [error, setErrorValue] = useState(false);
    const [newListItemsLoading, setNewListItemsLoadingValue] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEndedValue] = useState(false);
    
    const service = new MarvelService();
      
    useEffect(() => {
        onCharLoading();
        updateChars();
    }, [])
    
    const onCharsLoaded = (charsList) => {
        let ended = false;
        
        if (charsList.length < 9) {
            ended = true;
        }
        
        setCharList(chars => chars.concat(charsList));
        setLoadingValue(false);
        setNewListItemsLoadingValue(false);
        setOffset(offset => offset + 9);
        setCharEndedValue(ended);
    }
    
    const onCharLoading = () => {
        setLoadingValue(true);
    }
    
    const onNewCharsLoading = () => {
        setNewListItemsLoadingValue(true);
    }
    
   const updateChars = (offset) => {
        onNewCharsLoading();
        service.getAllCharacters(offset)
            .then(res => onCharsLoaded(res))
            .catch(e => onError());
    }
    
    const onError = () => {
        setLoadingValue(false);
        setErrorValue(true);
    }
    
 
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading) ? charList.map(item => <CharCard onSelectedChar={onSelectedChar} key={item.id} charName={item.name} charId={item.id} imageSrc={item.thumbnail} />) : null;
        
    return (
        <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {content}
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
