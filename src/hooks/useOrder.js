import { useMutation, useQuery, useQueryClient } from "react-query"
import { create_order, get_order_list } from "../Api/order"


export const useCreateOrder = () => {
    const queryClient = useQueryClient()
    return useMutation(create_order, {
        onSuccess: (response) => {
            if (response.status) {
                queryClient.invalidateQueries('order-list')
            }
        }
    })
}


export const useGetOrderList = (page, rowsPerPage, debounceSearch) => {
    return useQuery(['order-list', page, rowsPerPage, debounceSearch], () => get_order_list(page, rowsPerPage, debounceSearch))
}