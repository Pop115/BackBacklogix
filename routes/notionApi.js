const express = require('express');
const router = express.Router();
const {Client} = require('@notionhq/client');

router.post('/database', async function (req, res, next) {

    const {databaseId, notionApiKey} = req.body;

    console.log(`Received database id ${databaseId} and notion api key ${notionApiKey}`)

    const notion = new Client({auth: notionApiKey});

    console.log("Querying Notion API")

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
        });
        console.log("Response from Notion API", response);
        res.send(response);
    }catch(error){
        //APIResponseError
        console.log("Notion API request failed");
        console.log(error);
    }
});


router.post('/patch', async function (req, res) {
    const {notionApiKey, pageId, patchedProperties} = req.body;
    console.log(`Received patch request for page id ${pageId} and notion api key ${notionApiKey}`)

    console.log(req.body);
    const notion = new Client({auth: notionApiKey});

    //TODO to update database rows, use this instead https://developers.notion.com/reference/patch-page
    
    const response = await notion.pages.update({
            auth: notionApiKey,
            page_id: pageId,
            properties: patchedProperties
        }
    );
    console.log("Response from Notion API", response);
    res.send(response);
});

module.exports = router;
