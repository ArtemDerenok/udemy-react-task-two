import { Component } from 'react';
import PropTypes from 'prop-types';
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
            newItemsLoading: false,
            offset: 210,
            charEnded: false,
        }
    }
    
    service = new MarvelService();
    
    componentDidMount() {
        this.onCharLoading();
        this.updateChars();
    }
    
    onCharsLoaded = (charsList) => {
        let ended = false;
        
        if (charsList.length < 9) {
            ended = true;
        }
        
        this.setState(({chars, offset}) => ({
            chars: chars.concat(charsList),
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended,
        }))
    }
    
    onCharLoading = () => {
        this.setState({loading: true});
    }
    
    onNewCharsLoading = () => {
        this.setState({newItemsLoading: true});
    }
    
    updateChars = (offset) => {
        this.onNewCharsLoading();
        this.service.getAllCharacters(offset)
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
        const {chars, loading, error, offset, newItemsLoading, charEnded} = this.state;
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
            <button disabled={newItemsLoading} style={{'display': charEnded ? 'none' : 'block'}} className="button button__main button__long" onClick={() => this.updateChars(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
        )
    }
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
};

export default CharList;
