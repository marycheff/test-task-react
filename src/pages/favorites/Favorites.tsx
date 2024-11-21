import { Table } from "antd"
import "antd/dist/reset.css"
import { ColumnsType } from "antd/lib/table"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import MyModal from "../../components/modal/MyModal"
import NavBar from "../../components/navbar/NavBar"
import { IFork } from "../../interfaces/IFork"
import { setFavorites } from "../../store/slices/favoritesSlice"
import { closeModal, openModal } from "../../store/slices/modalSlice"
import { AppDispatch, RootState } from "../../store/store"
import { getFavorites } from "../../utils/favorites"

const Favorites = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const modalState = useSelector((state: RootState) => state.modal)
    const favorites = useSelector((state: RootState) => state.favorites.forks)
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
            render: fork => (
                <button
                    className="btn-primary bg-red-500 hover:bg-red-600"
                    onClick={() => handleOpenModal(fork, "remove")}>
                    Удалить
                </button>
            ),
        },
    ]

    useEffect(() => {
        const storedFavorites = getFavorites()
        dispatch(setFavorites(storedFavorites))
    }, [modalState, dispatch])

    const handleOpenModal = (fork: IFork, mode: "add" | "remove") => {
        dispatch(openModal({ fork, mode }))
    }
    const handleModalClose = () => {
        dispatch(closeModal())
    }

    return (
        <>
            <NavBar />
            <div className="flex justify-center mt-3">
                <div className="w-3/4">
                    <h1 className="text-3xl text-center font-semibold text-black py-2 mb-1">Ваши избранные форки</h1>
                    {favorites.length === 0 && <h2>У вас нет избранных форков</h2>}

                    <div className="flex justify-between align-center">
                        <button className="btn-primary ml-1 px-5 mb-1" onClick={() => navigate(-1)}>
                            Назад
                        </button>
                        {favorites.length > 0 && <h2 className="text-right mb-1 mr-1">Всего: {favorites.length}</h2>}
                    </div>
                    <div>
                        <Table columns={columns} dataSource={favorites} rowKey="id" pagination={false} />
                    </div>
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

export default Favorites
