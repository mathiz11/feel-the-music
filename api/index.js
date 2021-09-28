require('dotenv').config()
const express = require('express')
const geniusService = require("./geniusService");
const { checkAccessToken } = require("./utils");
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")

app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/api/authenticate', async (req, res) => {
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
                imageUrl: hit.result.song_art_image_thumbnail_url,
                title: hit.result.title,
                artist: {
                    id: hit.result.primary_artist.id,
                    name: hit.result.primary_artist.name,
                    imageUrl: hit.result.primary_artist.image_url,
                    isVerified: hit.result.primary_artist.is_verified || 0,
                },
                statsPageView: hit.result.stats.pageviews,
            }))

            const tabViewed = hits.map(hit => hit.statsPageView)
            let indexOfMostViewed = tabViewed.reduce((iMax, x, i, tabViewed) => x > tabViewed[iMax] ? i : iMax, 0)
            hits[indexOfMostViewed].top = true
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
            const artistResult = await geniusService.getArtist(id, token);
            const artist = artistResult.data.response.artist;
            const songResult = await geniusService.getSongFromArtist(id, token)
            const artistSongs = songResult.data.response.songs.map(song => ({
                id: song.id,
                imageUrl: song.song_art_image_thumbnail_url,
                title: song.title
            }))
            const descriptionArtist = ({
                imageUrl: artist.image_url,
                name: artist.name,
                isVerified: artist.is_verified,
                followers: artist.followers_count,
                facebook: artist.facebook_name,
                twitter: artist.twitter_name,
                instagram: artist.instagram_name,
                description: artist.description.html,
                recentSongs: artistSongs
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
