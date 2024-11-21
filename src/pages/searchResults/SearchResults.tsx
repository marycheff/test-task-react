import { Table } from "antd"
import "antd/dist/reset.css"
import { ColumnsType } from "antd/lib/table"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import MyModal from "../../components/modal/MyModal"
import NavBar from "../../components/navbar/NavBar"
import { IFork } from "../../interfaces/IFork"
import { fetchForks, setPage } from "../../store/slices/forksSlice"
import { closeModal, openModal } from "../../store/slices/modalSlice"
import { AppDispatch, RootState } from "../../store/store"

import { getFavorite } from "../../utils/favorites"
import { validatePageParam, validateRepositoryParam } from "../../utils/validation"
import Error404 from "../404/Error404"
import "./SearchResults.css"
const SearchResults = () => {
    const navigate = useNavigate()

    const dispatch: AppDispatch = useDispatch()
    // Состояния
    const forks = useSelector((state: RootState) => state.forks.forks)
    const error = useSelector((state: RootState) => state.forks.error)
    const isLoading = useSelector((state: RootState) => state.forks.isLoading)
    const forksCount = useSelector((state: RootState) => state.forks.forksCount)
    const modalState = useSelector((state: RootState) => state.modal)

    // Параметры поиска
    const [searchParams] = useSearchParams()
    const pageParam = searchParams.get("page")
    const repositoryParam = searchParams.get("repository")
    const [owner, repositoryName] = repositoryParam ? repositoryParam.split("/") : [null, null]
    const page = pageParam ? parseInt(pageParam) : null

    // Колонки в таблице
    const columns: ColumnsType<IFork> = [
        {
            title: "Название",
            dataIndex: "name",
            key: "name",
            width: "25%",
        },
        {
            title: "Владелец",
            dataIndex: "owner",
            key: "owner",
            width: "20%",
        },
        {
            title: "Звезд",
            dataIndex: "stars",
            key: "stars",
            width: "5%",
        },
        {
            title: "Ссылка",
            dataIndex: "link",
            key: "link",
            width: "35%",
            render: link => (
                <a href={link} target="_blank">
                    {link}
                </a>
            ),
        },
        {
            title: "Избранное",
            key: "favorite",
            width: "15%",
            render: fork =>
                getFavorite(fork) ? (
                    <button
                        className="btn-primary bg-orange-400 hover:bg-orange-500"
                        onClick={() => handleOpenModal(fork, "remove")}>
                        В избранном
                    </button>
                ) : (
                    <button className="btn-primary" onClick={() => handleOpenModal(fork, "add")}>
                        Добавить
                    </button>
                ),
        },
    ]

    useEffect(() => {
        if (owner && repositoryName && page) {
            dispatch(fetchForks({ owner, repositoryName, page }))
        }
    }, [dispatch, owner, repositoryName, page])

    // Проверка валидности параметров
    if (!validatePageParam(pageParam || "") || !validateRepositoryParam(repositoryParam || "")) {
        return <Error404 />
    }

    // Хендлеры
    const handleOpenModal = (fork: IFork, mode: "add" | "remove") => {
        dispatch(openModal({ fork, mode }))
    }

    const handleModalClose = () => {
        dispatch(closeModal())
    }
    const handlePageChange = (newPage: number) => {
        dispatch(setPage(newPage))
        dispatch(
            fetchForks({
                owner: owner || "",
                repositoryName: repositoryName || "",
                page: newPage,
            })
        )
        navigate(`/search?page=${newPage}&repository=${owner || ""}/${repositoryName || ""}`)
    }

    return (
        <>
            <NavBar />
            <div className="flex justify-center mt-3">
                <div className="w-3/4">
                    <h3 className="text-sm text-center text-gray-500">
                        {owner}/{repositoryName}
                    </h3>
                    <h1 className="text-3xl text-center font-semibold text-black py-2 mb-1">Таблица форков</h1>

                    {error ? (
                        <h2>{error}</h2>
                    ) : (
                        <>
                            {forksCount > 0 && <h2 className="text-right mb-1 mr-1">Всего: {forksCount}</h2>}
                            {!isLoading && forksCount == 0 && <h2>У этого репозитория нет форков</h2>}
                            <Table
                                columns={columns}
                                dataSource={forks}
                                rowKey="id"
                                loading={isLoading}
                                pagination={{
                                    showSizeChanger: false,
                                    current: page || 0,
                                    pageSize: import.meta.env.VITE_FORKS_PER_PAGE || 10,
                                    total: forksCount,
                                    onChange: handlePageChange,
                                }}
                            />
                        </>
                    )}
                </div>
            </div>
            {modalState.isOpen && modalState.fork && (
                <MyModal
                    isOpen={modalState.isOpen}
                    fork={modalState.fork}
                    mode={modalState.mode}
                    onClose={handleModalClose}
                />
            )}
        </>
    )
}

export default SearchResults
