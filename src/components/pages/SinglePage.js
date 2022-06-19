import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SinglePage = ({Component, dataType}) => {
  
  const {loading, error, clearError, getComic, getCharacter} = useMarvelService();
  const [data, setData] = useState({});
  const {comicId, charId} = useParams();
  
  useEffect(() => {
    updateData();
  }, [comicId, charId])
  
  const onDataLoaded = (data) => {
    setData(data);
  }
  
  const updateData = () => {
    clearError();
    if (dataType === 'comic') {
      getComic(comicId).then(onDataLoaded);
    } else if (dataType === 'char') {
      getCharacter(charId).then(onDataLoaded);
    }
   
  }
  
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = <Component {...data} />
  return (
    <div className="single-page">
      {errorMessage}
      {spinner}
      {content}
    </div>
  )
}

export default SinglePage;
