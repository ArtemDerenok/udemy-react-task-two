import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/errorMessage";

const NotFound = () => {
  return (
    <div>
      <ErrorMessage />
      <Link to='/'style={{'display': 'block', 'textAlign': 'center', 'marginTop': '20px'}} ><h2>Home</h2></Link>
    </div>
  )
};

export default NotFound;
