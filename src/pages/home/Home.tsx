import SearchBar from "../../components/searchbar/SearchBar"

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-72">
            <h1>Поиск форков у репозитория на GitHub</h1>
            <h2>Введите автора и название репозитория и получите его forks</h2>
            <SearchBar />
        </div>
    )
}

export default Home
