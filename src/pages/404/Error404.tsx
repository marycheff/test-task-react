import NavBar from "../../components/navbar/NavBar"

const Error404 = () => {
    return (
        <div>
            <NavBar />
            <div className="flex flex-col items-center justify-start min-h-screen pt-72">
                <h1>Ошибка 404</h1>
                <h2>Некорректная ссылка. Вернитесь на главную или введите корректный репозиторий в поиске</h2>
            </div>
        </div>
    )
}

export default Error404
