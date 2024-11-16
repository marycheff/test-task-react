// Валидация owner/repository
export const validateOwnerRepository = (input: string) => {
    const re = /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/
    return re.test(input)
}

// Валидация параметра страницы
export const validatePageParam = (pageParam: string) => {
    const pageNumber = Number(pageParam)
    return pageParam && !isNaN(pageNumber) && pageNumber > 0 && Number.isInteger(pageNumber)
}
// Валидация параметра репозитория
export const validateRepositoryParam = (repositoryParam: string) => {
    return repositoryParam && /^[\w-]+\/[\w-]+$/.test(repositoryParam)
}
