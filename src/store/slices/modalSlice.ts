import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFork } from "../../interfaces/IFork"


interface ModalState {
    isOpen: boolean
    fork: IFork | null
    mode: "add" | "remove" | null
}

const initialState: ModalState = {
    isOpen: false,
    fork: null,
    mode: null,
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ fork: IFork; mode: "add" | "remove" }>) => {
            state.isOpen = true
            state.fork = action.payload.fork
            state.mode = action.payload.mode
        },
        closeModal: state => {
            state.isOpen = false
            state.fork = null
            state.mode = null
        },
    },
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
