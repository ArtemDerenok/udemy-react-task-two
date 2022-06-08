import './charList.scss';

const CharCard = ({onSelectedChar, charName, charId, imageSrc}) => {
  
  const onAddActiveClass = (e) => {
    e.target.classList.add('char__item_selected')
  }
  
  const onDeleteActiveClass = (e) => {
    e.target.classList.remove('char__item_selected')
  }
  
  const imgStyle = {'objectFit' : 'fill'}
  
  return (
      <li tabIndex={0} onFocus={onAddActiveClass} onBlur={onDeleteActiveClass}          className="char__item" onClick={() => onSelectedChar(charId)} >
        <img src={imageSrc} alt={charName} style={imageSrc === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? imgStyle : null} />
        <div className="char__name">{charName}</div>
      </li>
  )
}

export default CharCard;
