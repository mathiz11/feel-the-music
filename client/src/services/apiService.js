import axios from "axios";

const authenticate = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/authenticate`)
}

const search = (bearerToken, searchValue) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/search`, {searchValue}, {
        headers: {
            Authorization: bearerToken
        }
    })
}

const apiService = {
    authenticate,
    search
}

export default apiService