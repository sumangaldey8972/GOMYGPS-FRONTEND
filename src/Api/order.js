import axios from "axios"
import { base_url } from "../config/url"


export const create_order = async (order_details) => {
    try {
        let response = await axios.post(`${base_url}/order/create_new_order`, {}, {
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

export const get_order_list = async () => {
    try {
        let response = await axios.get(`${base_url}/order/list_orders`, {
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