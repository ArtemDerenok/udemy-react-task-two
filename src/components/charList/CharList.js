import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import CharCard from './CharCard';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import './charList.scss';

class CharList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            chars: [],
            loading: true,
            error: false,
        }
    }
    
    service = new MarvelService();
    
    componentDidMount() {
        this.updateChars();
    }
    
    onCharsLoaded = (chars) => {
        this.setState({chars, loading: false})
    }
    
    onCharLoading = () => {
        this.setState({loading: true});
    }
    
    updateChars = () => {
        this.onCharLoading();
        this.service.getAllCharacters()
            .then(res => this.onCharsLoaded(res))
            .catch(e => this.onError());
    }
    
    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }
    
    render() {
        const {chars, loading, error} = this.state;
        const {onSelectedChar} = this.props;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(error || loading) ? chars.map(item => <CharCard onSelectedChar={onSelectedChar} key={item.id} charName={item.name} charId={item.id} imageSrc={item.thumbnail} />) : null;
        
        return (
            <div className="char__list">
            <ul className="char__grid">
                {errorMessage}
                {spinner}
                {content}
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
        )
    }
}

export default CharList;
