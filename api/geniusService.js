const { ClientCredentials } = require('simple-oauth2');
const axios = require("axios");

const config = {
    client: {
        id: '3fK6xKqH8bo_kP34trhWZ30LHAcALZEhHI7UcmzGj6r2Eyj9HKNnzSPNT2HM5vxW',
        secret: 'CF8GJC-7H2ZSgskHkc7DnlgyH1ZkLPCXFqPo3-z-55QKsLkDmaFvBN9YOgke8lDk9XOwxPzjW2LALI7w6LkC3Q'
    },
    auth: {
        tokenHost: 'https://api.genius.com/oauth'
    }
};

const authenticate  = async () => {
    const client = new ClientCredentials(config);

    try {
        return await client.getToken({});
    } catch (error) {
        console.log('Access Token error', error.message);
    }
}

const research  = async (searchValue, token) => {
    return axios.get(`http://api.genius.com/search?q=${encodeURI(searchValue)}`, {
        headers: {Authorization: token}
    })
}

const getSong  = (id, token) => {
    return axios.get(`http://api.genius.com/songs/${id}`, {
        headers: {Authorization: token}
    })
}

const getArtist = (id, token) => {
    return axios.get(`http://api.genius.com/artists/${id}?text_format=html`, {
        headers: {Authorization: token}
    })
}

const getSongFromArtist = (id, token) => {
    return axios.get(`http://api.genius.com/artists/${id}/songs?sort=popularity&per_page=3`, {
        headers: {Authorization: token}
    })
}

module.exports={
    geniusService:{authenticate}
}