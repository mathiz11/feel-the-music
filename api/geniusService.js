const { ClientCredentials } = require('simple-oauth2');
const axios = require("axios");

const config = {
    client: {
        id: process.env.GENIUS_CLIENT_ID,
        secret: process.env.GENIUS_CLIENT_SECRET
    },
    auth: {
        tokenHost: process.env.GENIUS_TOKEN_HOST
    }
};

const authenticate = async () => {
    const client = new ClientCredentials(config);

    try {
        return await client.getToken({});
    } catch (error) {
        console.log('Access Token error', error.message);
    }
}

const research = async (searchValue, token) => {
    return axios.get(process.env.GENIUS_API_URL + `search?q=${encodeURI(searchValue)}`, {
        headers: { Authorization: token }
    })
}

const getSong = (id, token) => {
    return axios.get(process.env.GENIUS_API_URL + `songs/${id}?text_format=html`, {
        headers: { Authorization: token }
    })
}

const getArtist = (id, token) => {
    return axios.get(process.env.GENIUS_API_URL + `artists/${id}?text_format=html`, {
        headers: { Authorization: token }
    })
}

const getSongFromArtist = (id, token) => {
    return axios.get(process.env.GENIUS_API_URL + `artists/${id}/songs?sort=popularity&per_page=3`, {
        headers: { Authorization: token }
    })
}

module.exports = {
    authenticate,
    research,
    getSong,
    getArtist,
    getSongFromArtist
}

