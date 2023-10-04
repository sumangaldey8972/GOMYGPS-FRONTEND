import { useMutation, useQuery, useQueryClient } from "react-query"
import { create_manufacturer, get_manufacture_list } from "../Api/manufacturer"


export const useCreateManufacture = () => {
    const queryClient = useQueryClient()
    return useMutation(create_manufacturer, {
        onSuccess: (response) => {
            if (response.status) {
                queryClient.invalidateQueries('manufacture-list')
            }
        }
    })
}


export const useGetManufacturList = (page, rowsPerPage, debounceSearch) => {
    return useQuery(['manufacture-list', page, rowsPerPage, debounceSearch], () => get_manufacture_list(page, rowsPerPage, debounceSearch))
}