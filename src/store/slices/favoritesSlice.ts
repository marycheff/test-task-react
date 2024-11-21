import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IFork } from "../../interfaces/IFork"

interface FavoritesState {
    forks: IFork[]
}

const initialState: FavoritesState = {
    forks: [],
}

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setFavorites: (state, action: PayloadAction<IFork[]>) => {
            state.forks = action.payload
        },
    },
})

export const { setFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
