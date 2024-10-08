import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

const endpoint = "https://pokeapi.co/api/v2";

export const useFetchQuery = (path: string) => {
    return useQuery({
        queryKey: [path],
        queryFn: async () => {
            return fetch(endpoint + path).then(r => r.json())
        }
    })
}

export const useInfiniteFetchQuery = (path: string) => {
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: endpoint + path,
        queryFn: async ({pageParam}) => {
            return fetch(pageParam, {
                headers: {
                    Accept: 'application/json'
                }
            }).then(r => r.json())
        },
        getNextPageParam: (lastPage) => {
            if ("next" in lastPage) {
                return lastPage.next
            }
            return null
        }
    })
}
