import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./slices/forksSlice"
import modalReducer from "./slices/modalSlice"

const store = configureStore({
    reducer: {
        forks: searchReducer,
        modal: modalReducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
