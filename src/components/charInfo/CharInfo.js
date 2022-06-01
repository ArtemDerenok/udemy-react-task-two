import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            char: null,
            loading: false,
            error: false,
        }
    }
    
    componentDidMount() {
        this.updateChar();
    }
    
    componentDidUpdate(prevProps) {
        const {charId} = this.props;
        if (prevProps.charId !== charId) {
            this.updateChar();
        }
    }
    
    service = new MarvelService();
    
    onCharLoaded = (char) => {
        this.setState({char, loading: false});
    }
    
    onCharLoading = () => {
        this.setState({loading: true});
    }
    
    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }
    
    updateChar = () => {
        const {charId} = this.props;
        this.onCharLoading();
        
        if (!charId) {
            this.setState({loading: false})
            return;
        }
        
        this.service.getCharacter(charId)
            .then(res => this.onCharLoaded(res))
            .catch(e => this.onError());
    }
    
    render() {
        const {char, loading, error} = this.state;
        
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
}

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
