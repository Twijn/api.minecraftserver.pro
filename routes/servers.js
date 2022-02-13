const {Router} = require("express");
const api = require("../api/");

const router = new Router();

router.get("/top", (req, res) => {
    api.getTopServers().then(async servers => {
        let result = [];

        for (let i = 0; i < servers.length; i++) {
            let serverJson = servers[i].json();
            let pings = await servers[i].getPings(1);
            serverJson.status = null;
            serverJson.averageLatency = await servers[i].getAverageLatency();
            if (pings.length > 0) serverJson.status = pings[0];
            result = [
                ...result,
                serverJson,
            ];
        }

        res.json({success: true, data: result});
    }).catch(err => {
        res.json({success: false, error: err});
    });
});

module.exports = router;