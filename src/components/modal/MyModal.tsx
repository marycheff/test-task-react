import { FC } from "react"
import { MdClose } from "react-icons/md"
import Modal from "react-modal"
import { addToFavorites, removeFromFavorites } from "../../utils/favorites"
import "./MyModal.css"

Modal.setAppElement("#root")

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        padding: "20px",
        width: "17rem",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.25)",
    },
}

interface MyModalProps {
    isOpen: boolean
    recordId: number | null
    mode: "add" | "remove" | null
    onClose: () => void
}

const MyModal: FC<MyModalProps> = ({ isOpen, recordId, mode, onClose }) => {
    const handleConfirm = () => {
        if (recordId) {
            if (mode === "add") {
                addToFavorites(recordId)
            } else if (mode === "remove") {
                removeFromFavorites(recordId)
            }
        }
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <div className="relative">
                <button
                    className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                    onClick={onClose}>
                    <MdClose className="text-xl text-slate-400" />
                </button>
                <div className="py-3">
                    <h2>{mode === "add" ? "Добавить в избранное?" : "Удалить из избранного?"}</h2>
                    <div className="flex justify-evenly mt-4">
                        <button className="btn-primary px-4" onClick={handleConfirm}>
                            Да
                        </button>
                        <button className="btn-secondary px-4" onClick={onClose}>
                            Нет
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default MyModal
