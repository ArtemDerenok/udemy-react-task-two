import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = ({charId}) => {
    const [char, setCharValue] = useState(null);
    const [loading, setLoadingValue] = useState(false);
    const [error, setErrorValue] = useState(false);
      
    useEffect(() => {
        updateChar();
    }, [charId]);
    
    const service = new MarvelService();
    
    const onCharLoaded = (char) => {
        setCharValue(char);
        setLoadingValue(false);
    };
    
    const onCharLoading = () => {
        setLoadingValue(true);
    };
    
    const onError = () => {
        setLoadingValue(false);
        setErrorValue(true);
    };
    
    const updateChar = () => {
        onCharLoading();
        
        if (!charId) {
            setLoadingValue(false);
            return;
        }
        
        service.getCharacter(charId)
            .then(res => onCharLoaded(res))
            .catch(e => onError());
    };
    

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <View char={char} /> : null;
        
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

CharInfo.propTypes = {
    charId: PropTypes.number
};

const View = ({char}) => {
    
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const comicsCopy = [...comics]
    const imgStyle = {'objectFit' : 'fill'}
    
    if(comicsCopy.length > 10) {
        comicsCopy.length = 10;
    }

    return (
        <><div className="char__basics">
            <img src={thumbnail} alt={name} style={thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? imgStyle : null} />
            <div>
                <div className="char__info-name">thor</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div><div className="char__descr">
                {!description ? 'There is no description for this character' : description}
            </div><div className="char__comics">Comics:</div><ul className="char__comics-list">
                {comicsCopy.length !== 0 ? comicsCopy.map((item, index) => {
                    return (
                        <li key={index} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                }) : 'There are no comics for this character'}
            </ul></>
    )
}

export default CharInfo;
