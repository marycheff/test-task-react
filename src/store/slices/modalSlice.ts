import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ModalState {
    isOpen: boolean
    recordId: number | null
    mode: "add" | "remove" | null
}

const initialState: ModalState = {
    isOpen: false,
    recordId: null,
    mode: null,
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ recordId: number; mode: "add" | "remove" }>) => {
            state.isOpen = true
            state.recordId = action.payload.recordId
            state.mode = action.payload.mode
        },
        closeModal: state => {
            state.isOpen = false
            state.recordId = null
            state.mode = null
        },
    },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
