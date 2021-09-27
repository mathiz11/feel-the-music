const { ClientCredentials } = require('simple-oauth2');
const axios = require("axios");

const config = {
    client: {
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET
    },
    auth: {
        tokenHost: process.env.TOKEN_HOST
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