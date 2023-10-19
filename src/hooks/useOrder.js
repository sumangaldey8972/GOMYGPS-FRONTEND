import { useMutation, useQueryClient, useQuery } from "react-query/types"
import CreateOrder from "../Components/OrderComponents/CreateOrder/CreateOrder"
import { get_order_list } from "../Api/order"


export const useCreateOrder = () => {
    const queryClient = useQueryClient()
    return useMutation(CreateOrder, {
        onSuccess: (response) => {
            if (response.status) {
                queryClient.invalidateQueries('order-list')
            }
        }
    })
}


export const useGetOrderList = () => {
    return useQuery('order-list', get_order_list)
}