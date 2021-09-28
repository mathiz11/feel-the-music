require('dotenv').config()
const express = require('express')
const geniusService = require("./geniusService");
const { checkAccessToken } = require("./utils");
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/authenticate', async (req, res) => {
    const accessToken = await geniusService.authenticate();
    res.send(accessToken);
})

app.post('/api/search', checkAccessToken, async (req, res) => {
    const searchValue = req.body.searchValue;
    const token = req.headers.authorization;

    if (searchValue) {
        try {
            const results = await geniusService.research(searchValue, token);
            const hits = results.data.response.hits.map(hit => ({
                id: hit.result.id,
                song_art_image_thumbnail_url: hit.result.song_art_image_thumbnail_url,
                title: hit.result.title,
                artistName: hit.result.primary_artist.name,
                artistImage_url: hit.result.primary_artist.image_url,
                artistIsVerified: hit.result.primary_artist.is_verified,
                artistId: hit.result.primary_artist.id,
                statPageView: hit.result.stats.pageviews,
            }))

            let tabViewed = [];

            hits.forEach(hit => {
                if (!hit.statPageView) hit['statPageView'] = 0;
                tabViewed.push(hit.statPageView)
            })

            let indexOfMostViewed = tabViewed.reduce((iMax, x, i, tabViewed) => x > tabViewed[iMax] ? i : iMax, 0);
            hits[indexOfMostViewed].Top = true;
            res.json(hits)

        } catch (error) {
            console.log(error)
            res.sendStatus(500)
        }
    } else {
        res.sendStatus(401);
    }
})

app.post('/api/song', checkAccessToken, async (req, res) => {
    const id = req.body.id;
    const token = req.headers.authorization;
    if (id) {
        const result = await geniusService.getSong(id, token);
        //ToDo Faire un traitement sur les data recup
        res.json(result.data)
    } else {
        res.sendStatus(401);
    }
})

app.post('/api/artist', checkAccessToken, async (req, res) => {
    const id = req.body.id;
    const token = req.headers.authorization;

    if (id) {
        try {
            const result = await geniusService.getArtist(id, token);
            const artist = result.data.response.artist;
            const descriptionArtist = ({
                image_url: artist.image_url,
                artistName: artist.name,
                artistIsVerified: artist.is_verified,
                artistFollowers_count: artist.followers_count,
                artistFacebook_name: artist.facebook_name,
                artistTwitter_name: artist.twitter_name,
                artistInstagram_name: artist.instagram_name,
                artistDescriptionHtml: artist.description.html
            })
            res.json(descriptionArtist)
        } catch (error) {
            console.log(error)
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(401);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app
