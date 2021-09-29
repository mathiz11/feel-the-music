import axios from "axios";

const authenticate = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/authenticate`)
}

const search = (bearerToken, searchValue) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/search`, { searchValue }, {
        headers: {
            Authorization: bearerToken
        }
    })
}

const getArtistById = (bearerToken, artistId) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/artist`, { id: artistId }, {
        headers: {
            Authorization: bearerToken
        }
    })
}

const getSongById = (bearerToken, songId) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/api/song`, { id: songId }, {
        headers: {
            Authorization: bearerToken
        }
    })
}

const apiService = {
    authenticate,
    search,
    getArtistById,
    getSongById
}

export default apiService