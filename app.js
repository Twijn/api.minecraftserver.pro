const express = require("express");
const cors = require('cors')
const config = require("./config.json");

const pingInterval = require("./interval/pingInterval");

const app = express();

app.use(cors());

app.use('/server', require("./routes/server"));
app.use('/servers', require("./routes/servers"));

app.get('/', (req, res) => {
    res.status(404);
    res.json({success: false, error: "Not found"});
});

app.listen(config.port, () => {
    console.log("Express server started on port " + config.port);

    setInterval(pingInterval.execute, pingInterval.interval);
});