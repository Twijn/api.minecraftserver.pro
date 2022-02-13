const {Router} = require("express");
const con = require("../database");
const api = require("../api/");

const router = new Router();

router.get("/:name/favicon", (req, res) => {
    if (req.params?.name) {
        con.query("select logo, logo_type from server where shortname = ?;", [req.params.name], (err, response) => {
            if (!err) {
                if (response.length > 0) {
                    let logo = response[0].logo;
                    res.writeHead(200, {
                        'Content-Type': response[0].logo_type,
                        'Content-Length': logo.length
                    });
                    res.end(logo);
                } else {
                    res.status(404);
                    res.json({success: false, error: "Not found"});
                }
            } else res.json({success: false, error: err});
        });
    } else {
        res.json({success: false, error: "Missing 'name' parameter"});
    }
});

router.get("/:name/info", (req, res) => {
    if (req.params?.name) {
        api.getServer(req.params.name).then(async server => {
            let serverJson = server.json();
            let pings = await server.getPings(1);
            serverJson.status = null;
            serverJson.averageLatency = await servers[i].getAverageLatency();
            if (pings.length > 0) serverJson.status = pings[0];
            res.json({success: true, data: serverJson});
        }, err => {
            res.json({success: false, error: err});
        });
    } else {
        res.json({success: false, error: "Missing 'name' parameter"});
    }
});

module.exports = router;