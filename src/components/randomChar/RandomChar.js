import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from './../../services/MarvelService';
import getRandomNum from './../../utils/getRandomNum';

class RandomChar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            char: {},
        }
    }
    
    componentDidMount() {
        this.updateChar();
    }
    
    onCharLoaded = (char) => {
        this.setState({char});
        this.onCutDescription();
    }
    
    marvelService = new MarvelService();
    
    updateChar = () => {
        const id = getRandomNum(1011000, 1011400);
        
        this.marvelService.getCharacter(id)
        .then(res => this.onCharLoaded(res));
    }
    
    onCutDescription = () => {
        let newStr = this.state.char.description;
          
        if(newStr.length > 200) {
            this.setState(({char}) => ({
                char: {
                    ...char,
                    description: newStr.slice(0, 195) + '...'
                }
            }))
        };
    }
    
    render() {
        const {char: {name, description, thumbnail, homepage, wiki}} = this.state;
        
        return (
            <div className="randomchar">
                <div className="randomchar__block">
                    <img src={thumbnail} alt="Random character" className="randomchar__img"/>
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
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

export default RandomChar;