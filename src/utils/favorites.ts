import { IFork } from "../interfaces/IFork"

// Добавление в  избранное
const addToFavorites = (fork: IFork): void => {
    const favorites: IFork[] = JSON.parse(localStorage.getItem("favorites") || "[]")
    const exists = favorites.some(favorite => favorite.id === fork.id)
    if (!exists) {
        favorites.push(fork)
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }
}

// Удаление из избранного
const removeFromFavorites = (forkId: number): void => {
    const favorites: IFork[] = JSON.parse(localStorage.getItem("favorites") || "[]")
    const updatedFavorites = favorites.filter(fork => fork.id !== forkId)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
}

// Получение форка из избранного
const getFavorite = (fork: IFork): IFork | undefined => {
    const favorites: IFork[] = JSON.parse(localStorage.getItem("favorites") || "[]")
    return favorites.find(favorite => favorite.id === fork.id)
}

// Получение избранного
export const getFavorites = (): IFork[] => {
    return JSON.parse(localStorage.getItem("favorites") || "[]")
}

export { addToFavorites, getFavorite, removeFromFavorites }
