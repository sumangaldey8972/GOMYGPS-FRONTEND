import axios from "axios"
import { base_url } from "../config/url"


export const create_order = async (order_details) => {
    try {
        let response = await axios.post(`${base_url}/order/create_new_order`, {
            device_id: order_details.device_id,
            customer_name: order_details.customer_name,
            mobile_number: order_details.mobile_number.toString(),
            rto_code: order_details.rto_code,
            device_type: order_details.device_type,
            validity_in_years: order_details.validity_in_years
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic TjhYUVRlZTZIQ1hqR2tEam1NQUx6SkFReVFlS2ZHODg6bW1qUUgxYkhHSnJjZzdWYw==',
            },
            withCredentials: true
        })
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export const get_order_list = async (page, rowsPerPage, debounceSearch) => {
    try {
        let response = await axios.get(`${base_url}/order/list_orders?page=${Number(page)}&limit=${Number(rowsPerPage)}&search=${debounceSearch}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic TjhYUVRlZTZIQ1hqR2tEam1NQUx6SkFReVFlS2ZHODg6bW1qUUgxYkhHSnJjZzdWYw==',
            },
            withCredentials: true
        })
        return response.data
    } catch (error) {
        return error.response.data
    }
}