import { useMutation, useQuery, useQueryClient } from "react-query"
import { create_single_device, get_device_list } from "../Api/devices"


export const useGetDeviceList = (page, rowsPerPage, debounceSearch) => {
    return useQuery(['device-list', page, rowsPerPage, debounceSearch], () => get_device_list(page, rowsPerPage, debounceSearch))
}

export const useCreateDevice = () => {
    const queryClient = useQueryClient()
    return useMutation(create_single_device, {
        onSuccess: (response) => {
            if (response.status) {
                queryClient.invalidateQueries('device-list')
            }
        }
    })
}