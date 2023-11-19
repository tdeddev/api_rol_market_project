const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require('body-parser')
const axios = require('axios')
const itemRouter = require('./routers/itemRouter')
// global var
const port = 4000;
const BASE_URL = 'https://apps.maxion.gg/api/market/list?status=LISTING&category=headgear&serverId=1'
const BASE_URL_WEAPON = 'https://apps.maxion.gg/api/market/list?status=LISTING&category=weapon&serverId=1'
const BASE_URL_ALL = 'https://apps.maxion.gg/api/market/list?status=LISTING&serverId=1'
const BASE_URL_Img = 'https://apps.maxion.gg/_next/image?url=https%3A%2F%2Frop2e-collection-cdn.s3-bkk.nipa.cloud%2F'
const buy_url = 'https://apps.maxion.gg/roverse/detail/'
// Middle ware
app.use(bodyparser.json())
app.use(cors())
app.use('/api', itemRouter)
//router
app.get('/', (req, res) => {
    res.send('Api ok')
})

//start server
app.listen(port, () => console.log(`App on port ${port}`))
