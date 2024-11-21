import { Route, Routes } from "react-router-dom"

import Error404 from "./pages/404/Error404"
import Favorites from "./pages/favorites/Favorites"
import Home from "./pages/home/Home"
import SearchResults from "./pages/searchResults/SearchResults"

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    )
}

export default App
