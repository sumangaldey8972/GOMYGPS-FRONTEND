import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "react-query"
import { create_nultiple_device, create_single_device, divce_options, get_device_list } from "../Api/devices"


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

export const useCreateMultipleDevice = () => {
    const queryClient = useQueryClient()
    return useMutation(create_nultiple_device, {
        onSuccess: (response) => {
            if (response.status) {
                queryClient.invalidateQueries('device-list')
            }
        }
    })
}

export const useGetDeviceOption = (search) => {
    return useInfiniteQuery(['device-options', search], ({ pageParam = 1 }) => divce_options({ search, pageParam }), {
        select: (data) => {
            let device_options = [];
            data.pages.forEach((eachPage) => {
                eachPage.body.docs.forEach((e) => {
                    device_options.push({ label: e.vltd_number, value: e.vltd_number, id: e._id })
                })
            })
            return device_options
        },
        getNextPageParam: (_last, pages) => pages[pages.length - 1].body.nextPage ?? undefined
    })
}