/**
 * This is our server side
 * This section is handling the request from the GitHub webhook
 */


//* This is all the main imports to run the server
const express = require('express')
const bodyParser = require("body-parser")
const SmeeClient = require('smee-client')
const dotenv = require('dotenv')
const anomalyDetection = require('./index')

dotenv.config()
//Todo Open an .env file and enter a PORT 
const PORT = process.env.PORT || 8000

// creating server and parsing data
const app = express()
const parse = bodyParser
app.use(parse.json())

const smee = new SmeeClient({
    //Todo Create a webhook proxy url from smee.io and enter to .env file
    source: process.env.WEBHOOK_PROXY_URL,
    target: `http://localhost:${PORT}/events`,
    logger: console
})

// connect ant open the smee socket 
events = smee.start()
// creating a new instance of the class object
const detect = new anomalyDetection

/**
 * This http request handles all the request that is forwarded from the smee proxy
 * Here we handle the requests and directing them to the right functions in the anomalyDetection class if necessary 
 */
app.post('/events', async (req, res) => {

    try {
        const result = await req.body

        if (result.team && result.action == "created" && result.team.name === "hacker") {
            detect.teamHacker()
        } else if (result.pusher && result.repository) {
            detect.pushNoise()
        } else if (result.repository && result.action == "deleted") {
            detect.deleteInTen(result.repository.created_at)
        }

        res.status(200).end()

    } catch (error) {
        events.end()
        res.status(error).end()
    }
})


// binding and listening to the connection and port
app.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('listen to port ', PORT);
    }
})
