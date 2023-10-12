import { base_url } from "../config/url"
import axios from "axios"

export const login = async (creds) => {
    try {
        let response = await axios.post(`${base_url}/user/login`, {
            email_address: creds.email_id,
            password: creds.password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic TjhYUVRlZTZIQ1hqR2tEam1NQUx6SkFReVFlS2ZHODg6bW1qUUgxYkhHSnJjZzdWYw==',
            },
            withCredentials: true
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}

export const check_session = async () => {
    try {
        const response = await axios.get(`${base_url}/session/check_session`, {
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

export const destroy_session = async () => {
    try {
        let response = await axios.delete(`${base_url}/session/destroy_session`, {
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