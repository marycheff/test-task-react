export interface IForkApi {
    id: number
    full_name: string
    stargazers_count: number
    html_url: string
    owner: {
        login: string
    }
}