import { useNavigate } from "react-router-dom"
import SearchBar from "../searchbar/SearchBar"

const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between mt-4 items-center mx-6">
            <SearchBar />
            <button className="btn-primary" onClick={() => navigate("/")}>
                Главная
            </button>
        </div>
    )
}

export default NavBar
