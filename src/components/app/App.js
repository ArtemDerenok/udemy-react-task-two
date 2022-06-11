import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import decoration from '../../resources/img/vision.png';
import {MainPage, ComicsPage, NotFound, SingleComic} from '../pages';

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null)
    
    const onSelectedChar = (id) => {
        setSelectedChar(id)
    }

    return (
            <div className="app">
            <AppHeader/>
            <main>
            <Routes>
                <Route path="/" element={<MainPage onSelectedChar={onSelectedChar} selectedChar={selectedChar} />} />
                <Route path="/comics" element={<ComicsPage />} />
                <Route path="/comics/:comicId" element={<SingleComic />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
            </div>
    )
}

export default App;
