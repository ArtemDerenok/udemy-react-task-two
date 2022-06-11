import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

const MainPage = ({onSelectedChar, selectedChar}) => {
  return (
    <>
      <ErrorBoundary>
        <RandomChar/>
      </ErrorBoundary> 
      <div className="char__content">
         <ErrorBoundary>
            <CharList onSelectedChar={onSelectedChar} />
         </ErrorBoundary>
         <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
      </div> 
    </>
  )
};

export default MainPage;
