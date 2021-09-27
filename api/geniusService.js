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

module.exports={
    geniusService:{authenticate}
}