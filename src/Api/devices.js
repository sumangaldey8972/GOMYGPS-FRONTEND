import axios from "axios"
import { base_url } from "../config/url"

export const get_device_list = async (page, rowsPerPage, debounceSearch) => {
    try {
        let response = await axios.get(`${base_url}/device/list_devices?page=${Number(page)}&limit=${Number(rowsPerPage)}&search=${debounceSearch}`, {
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

export const create_single_device = async (device_details) => {
    try {
        let response = await axios.post(`${base_url}/device/create_single_device`, device_details, {
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