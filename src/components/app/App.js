import { useState, lazy, Suspense} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import decoration from '../../resources/img/vision.png';
import {ComicsPage, SingleComic, SinglePage, SingleChar} from '../pages';
import Spinner from "../spinner/Spinner";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './app.scss';
const NotFound = lazy(() => import('../pages/NotFound'))
const MainPage = lazy(() => import('../pages/MainPage'))

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null)
    
    const onSelectedChar = (id) => {
        setSelectedChar(id)
    }
    
    const location = useLocation();

    return (
            <div className="app">
            <AppHeader/>
            <main>
            <Suspense fallback={<Spinner />}>
                <TransitionGroup>
                <CSSTransition timeout={300} classNames='page' key={location.key}>
                    <Routes location={location}>
                        <Route path="/" element={<MainPage onSelectedChar={onSelectedChar} selectedChar={selectedChar} />} />
                        <Route path="/comics" element={<ComicsPage />} />
                        <Route path="/comics/:comicId" element={<SinglePage Component={SingleComic} dataType='comic' />} />
                        <Route path="/characters/:charId" element={<SinglePage Component={SingleChar} dataType='char' />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </CSSTransition>
                </TransitionGroup>
            </Suspense>    
            <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
            </div>
    )
}

export default App;
