import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "react-query"
import { create_manufacturer, get_manufacture_list, manufacture_option } from "../Api/manufacturer"

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

export const useGetManufactureOptions = (search) => {
    return useInfiniteQuery(['manufacture-options', search], ({ pageParam = 1 }) => manufacture_option({ search, pageParam }), {
        select: (data) => {
            let manufacture_option = [];
            data.pages.forEach((eachPage) => {
                eachPage.body.docs.forEach((e) => {
                    console.log(e)
                    manufacture_option.push({ label: e.manufacturer_name, value: e.manufacturer_name, id: e._id })
                })
            })
            return manufacture_option
        },
        getNextPageParam: (_last, pages) => pages[pages.length - 1].body.nextPage ?? undefined
    })
}