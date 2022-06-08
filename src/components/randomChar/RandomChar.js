import { useState, useEffect } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from './../../services/MarvelService';
import getRandomNum from './../../utils/getRandomNum';
import Spinner from '../spinner/Spinner';
import ErrorMessage from './../errorMessage/errorMessage';
import './randomChar.scss';

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        updateChar()
    }, []);
    
    useEffect(() => {
        if (char) {
            onCutDescription();
        }
    }, [char]);
    
    const onCharLoaded = (charObj) => {
        setChar(charObj);
        setLoading(false);
    }
    
    const onCharLoading = () => {
        setLoading(true);
    }
    
    const marvelService = new MarvelService();
    
    const updateChar = () => {
        const id = getRandomNum(1011000, 1011400);
        onCharLoading();
        marvelService.getCharacter(id).then(res => {
            onCharLoaded(res)
        }).catch(e => {
            onError();
        });
    }
    
    const onError = () => {
        setLoading(false);
        setError(true);
    }
    
    const onCutDescription = () => {
        let newStr = char.description;
          
        if(newStr.length > 200) {
            setChar(char => ({...char, description: newStr.slice(0, 195) + '...',}))
        };
    }
        

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View char={char} /> : null; 
        
    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char: {name, description, thumbnail, homepage, wiki}}) => {
    return (
        <div className="randomchar__block">
        <img src={thumbnail} alt="Random character" className={ thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? 'randomchar__img_error' : 'randomchar__img'}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {!description ? 'Description is not found' : description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}

export default RandomChar;
