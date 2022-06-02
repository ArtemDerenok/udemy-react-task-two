import { Component } from "react";
import './charList.scss';

class CharCard extends Component {
  
  onAddActiveClass = (e) => {
    e.target.classList.add('char__item_selected')
  }
  
  onDeleteActiveClass = (e) => {
    e.target.classList.remove('char__item_selected')
  }
  
  render() {
    const {onSelectedChar, charName, charId, imageSrc} = this.props;
    const imgStyle = {'objectFit' : 'fill'}
  
    
    return (
      <li tabIndex={0} onFocus={this.onAddActiveClass} onBlur={this.onDeleteActiveClass} className="char__item" onClick={() => onSelectedChar(charId)} >
        <img src={imageSrc} alt={charName} style={imageSrc === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? imgStyle : null} />
        <div className="char__name">{charName}</div>
      </li>
    )
  }
}

export default CharCard;
