var express = require('express');
var router = express.Router();
const axios = require('axios');

steamGames = [];
steamGamesApiUrl = "https://api.steampowered.com/ISteamApps/GetAppList/v2/?access_token="
steamGameInfoApiUrl = "https://store.steampowered.com/api/appdetails"

router.post('/steamGames', async function (req, res, next) {

    const {steamApiKey} = req.body;

    console.log(`Received request to retrieve steam games`)

    try {
        const response = await axios.get(steamGamesApiUrl + steamApiKey);
        console.log(response);
        if (response.status === 200) {
            const data = response.data;
            res.json(data);
        } else {
            res.status(response.status).send(response.statusText);
        }
    } catch (error) {
        console.error('Error calling Steam API:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/gameInfo", async function (req, res) {

    const {appId, steamUserId} = req.body;

    try {
        const response = await axios.get(steamGameInfoApiUrl + "?appids=" + appId + "&steamid=" + steamUserId);
        console.log(response);
        if (response.status === 200) {
            const data = response.data;
            res.json(data);
        } else {
            res.status(response.status).send(response.statusText);
        }
    } catch (error) {
        console.error('Error calling Steam API:', error.message);
        res.status(500).send('Internal Server Error');
    }

});

module.exports = router;
