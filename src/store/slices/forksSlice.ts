import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getRepositoryForks } from "../../api/githubApi"
import { IFork } from "../../interfaces/IFork"

interface ForksState {
    forks: IFork[]
    error: string | null
    isLoading: boolean
    totalPages: number
    page: number
    forksCount: number
}

const initialState: ForksState = {
    forks: [],
    error: null,
    isLoading: false,
    totalPages: 1,
    page: 1,
    forksCount: 0,
}

interface FetchForksProps {
    owner: string
    repositoryName: string
    page: number
    error?: string
}

export const fetchForks = createAsyncThunk(
    "forks/fetchForks",
    async ({ owner, repositoryName, page }: FetchForksProps) => {
        const { forks, forksCount, error } = await getRepositoryForks(owner, repositoryName, page)
        if (error) {
            throw new Error(error)
        }
        return { forks, forksCount }
    }
)

const forksSlice = createSlice({
    name: "forks",
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchForks.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchForks.fulfilled, (state, action) => {
                state.isLoading = false
                state.forks = action.payload.forks
                state.forksCount = action.payload.forksCount
            })
            .addCase(fetchForks.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message || null
            })
    },
})

export const { setPage } = forksSlice.actions
export default forksSlice.reducer
