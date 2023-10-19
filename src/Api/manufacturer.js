import axios from "axios"
import { base_url } from "../config/url"

export const create_manufacturer = async (details) => {
    try {
        let response = await axios.post(`${base_url}/manufacturer_master/create_manufacturer`, {
            manufacturer_name: details.name,
            manufacturer_address: details.address,
            manufacturer_gst: details.gst,
            opening_stock: details.opening_stock,
        }, {
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


export const get_manufacture_list = async (page, rowsPerPage, debounceSearch) => {
    try {
        let response = await axios.get(`${base_url}/manufacturer_master/manufacturer_list?page=${Number(page)}&limit=${Number(rowsPerPage)}&search=${debounceSearch}`, {
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

export const manufacture_option = async ({ search, pageParam }) => {
    try {
        let response = await axios.get(`${base_url}/manufacturer_master/manufacturer_list?page=${pageParam}&limit=100&search=${search}`, {
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