const request = require('supertest')
const app = require('./index')
const { authenticate } = require('./geniusService')

describe('API Tests', () => {

    var clientToken;

    beforeEach(async () => {
        var authentication = await authenticate();
        clientToken = authentication.token.access_token;
    })

    it('should test the example route', async () => {
        const res = await request(app)
            .get('/')
        expect(res.statusCode).toEqual(200)
        expect(res.text).toEqual('Hello World!')
    });

    it('should search without criteria', async () => {
        const res = await request(app)
            .post('/api/search')
            .set({ 'Authorization': 'Bearer ' + clientToken, 'Accept': 'application/json' })
            .send({
                searchValue: 'JUL'
            })

        expect(res.statusCode).toEqual(200)
        expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should search an artist', async () => {
        const res = await request(app)
            .post('/api/artist')
            .set({ 'Authorization': 'Bearer ' + clientToken })
            .send({
                id: 74283 //id de Jul
            })

        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toBe('JuL');
    });

    it('should search an song', async () => {
        const res = await request(app)
            .post('/api/song')
            .set({ 'Authorization': 'Bearer ' + clientToken })
            .send({
                id: 378195 //id de Sia
            })

        expect(res.statusCode).toEqual(200);
        expect(res.body.artist.name).toBe('Sia');
    });
})
