require('dotenv').config()
const express = require('express')
const {geniusService} = require("./geniusService");
const {checkAccessToken} = require("./utils");
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/authenticate', async (req, res) => {
  const accessToken = await geniusService.authenticate();
  res.send(accessToken);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})