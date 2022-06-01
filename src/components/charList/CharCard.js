import { Component } from "react";
import './charList.scss';

class CharCard extends Component {
  
  render() {
    const {onSelectedChar, charName, charId, imageSrc} = this.props;
    const imgStyle = {'objectFit' : 'fill'}
  
    
    return (
      <li className="char__item" onClick={() => onSelectedChar(charId)} >
        <img src={imageSrc} alt={charName} style={imageSrc === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? imgStyle : null} />
        <div className="char__name">{charName}</div>
      </li>
    )
  }
}

export default CharCard;
