// Добавление в  избранное
const addToFavorites = (id: number): void => {
    const favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]")
    if (!favorites.includes(id)) {
        favorites.push(id)
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }
}

// Удаление из избранного
const removeFromFavorites = (id: number): void => {
    const favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]")
    const updatedFavorites: number[] = favorites.filter(favoriteId => favoriteId !== id)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
}

// Получение id форка из избранного
const getFavoriteById = (id: number): number | undefined => {
    const favorites: number[] = JSON.parse(localStorage.getItem("favorites") || "[]")
    return favorites.find(favorite => favorite === id)
}

export { addToFavorites, getFavoriteById, removeFromFavorites }
