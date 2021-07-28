import axios from 'axios'

export const api = route => {
    let url = 'http://localhost'
    const port = 8000

    url += ':' + port

    return 'https://backend-assignment-fulfil.herokuapp.com'
}


export const Api = {
    get(route, params) {
        return axios.get(api(route), {
            params,
        })
    },
    post(route, data) {
        return axios.post(api(route), data)
    },
    put(route, data) {
        return axios.put(api(route), data)
    },
    delete(route) {
        return axios.delete(api(route))
    },
}