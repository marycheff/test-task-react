import axios from "axios"
import { IFork } from "../interfaces/IFork"

const GITHUB_API_URL = "https://api.github.com"

// Если в process.env есть токен, то используем его
const headers = {} as { Authorization: string }
const token = import.meta.env.VITE_GITHUB_API_TOKEN
if (token) {
    headers.Authorization = `Bearer ${token}`
}

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
    headers,
})

// Обращение к API
export const getRepositoryForks = async (owner: string, repository: string, page: number) => {
    try {
        // Получение количества форков
        const repositoryResponse = await githubApi.get(`/repos/${owner}/${repository}`)
        const forksCount = repositoryResponse.data.forks_count

        // Получение данных форков
        const forksResponse = await githubApi.get(`/repos/${owner}/${repository}/forks`, {
            params: {
                per_page: import.meta.env.VITE_FORKS_PER_PAGE || 10,
                page,
            },
        })

        // Преобразование в объект
        const forks = forksResponse.data.map((fork: IFork) => ({
            id: fork.id,
            name: fork.full_name,
            owner: fork.owner.login,
            stars: fork.stargazers_count,
            link: fork.html_url,
        }))

        return { forks, forksCount, error: null }
    } catch (error) {
        // Обработка ошибок
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 403) {
                return {
                    forks: [],
                    forksCount: 0,
                    error: "Ошибка 403: Скорее всего, у вас нет токена доступа к GitHub API",
                }
            }
        }
        return {
            forks: [],
            forksCount: 0,
            error: "Не удалось загрузить данные о форках! Проверьте правильность введенных данных",
        }
    }
}
