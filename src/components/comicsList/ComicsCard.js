import { Link } from "react-router-dom";

const ComicsCard = ({name, id, thumbnail, price}) => {
  return (
    <li className="comics__item">
      <Link to={`/comics/${id}`}>
        <img src={thumbnail} alt={name} className="comics__item-img"/>
        <div className="comics__item-name">{name}</div>
        <div className="comics__item-price">{price}</div>
      </Link>
    </li>
  )
};

export default ComicsCard
