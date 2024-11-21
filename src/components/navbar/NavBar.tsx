import { useNavigate } from "react-router-dom"
import SearchBar from "../searchbar/SearchBar"

const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between mt-4 items-center mx-6">
            <SearchBar />
            <div>
                <button className="btn-primary mr-2" onClick={() => navigate("/favorites")}>
                    Избранное
                </button>
                <button className="btn-primary" onClick={() => navigate("/")}>
                    Главная
                </button>
            </div>
        </div>
    )
}

export default NavBar
