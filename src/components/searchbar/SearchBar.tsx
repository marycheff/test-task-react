import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { validateOwnerRepository } from "../../utils/validation"
const SearchBar = () => {
    const navigate = useNavigate()
    const [repository, setRepository] = useState("")
    const [error, setError] = useState("")

    // Валидация запроса
    const handleSearch = () => {
        if (!validateOwnerRepository(repository)) {
            setError("Некорректный формат owner/repository")
            return
        }
        navigate(`/search?page=1&repository=${repository}`)
        setRepository("")
    }

    // Поиск при нажатии на Enter
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div>
            <div className="w-80 flex items-center px-4 bg-gray-50 rounded-md shadow-md">
                <input
                    className="input-box"
                    type="text"
                    placeholder="owner/repository"
                    value={repository}
                    onChange={e => setRepository(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                {repository && (
                    // Кнопка очистки
                    <IoMdClose
                        className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
                        onClick={() => setRepository("")}
                    />
                )}
                {/* Кнопка поиска */}
                <FaSearch className="text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch} />
            </div>
            {/* Вывод ошибки, если она есть */}
            {error && <p className="text-xs ml-1 text-red-500">{error}</p>}
        </div>
    )
}

export default SearchBar
