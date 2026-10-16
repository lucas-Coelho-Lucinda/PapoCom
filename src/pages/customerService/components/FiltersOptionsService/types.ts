export interface FiltersOptionsServiceProps {
    filterUser: (user: string | string[]) => void
    filterQueue: (queue: string | string[]) => void
    filterContactNumber: (contact: string) => void
}