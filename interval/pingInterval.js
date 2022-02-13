const con = require("../database");
const {ping} = require("minecraft-server-ping");
const config = require("../config.json");

module.exports = {
    interval: 30000,
    execute() {
        con.query("select id, ip, port from server;", (err, res) => {
            if (!err) {
                res.forEach(server => {
                    ping(server.ip, server.port).then(async pingResults => {
                        let contentType = null;
                        let blob = null;
                        if (pingResults.favicon) {
                            const m = /^data:(.+?);base64,(.+)$/.exec(pingResults.favicon)
                            if (!m) {
                                console.error(`Not a base64 image [${img_base64}]`)
                                return;
                            }
                            const [_, content_type, file_base64] = m;

                            blob = Buffer.from(file_base64,'base64');
                            contentType = content_type;
                        }
                        con.query("insert into ping (server_id, latency, version, protocol, players_max, players_current, description, pingtime, location_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?);", [
                            server.id,
                            pingResults.ping,
                            pingResults.version.name,
                            pingResults.version.protocol,
                            pingResults.players.max,
                            pingResults.players.online,
                            (typeof(pingResults.description) === "string" ? pingResults.description : null),
                            Date.now(),
                            config.ping_location,
                        ], err => {
                            console.error(err);
                        });

                        con.query("update server set logo = ?, logo_type = ?, version = ?, protocol = ? where id = ?;",
                        [
                            blob,
                            contentType,
                            pingResults.version.name,
                            pingResults.version.protocol,
                            server.id,
                        ], err => {
                            if (err) console.error(err);
                        });
                    }).catch(err => {
                        con.query("insert into ping (server_id, pingtime, location_id) values (?, ?, ?);", [
                            server.id,
                            Date.now(),
                            config.ping_location
                        ]);
                        console.error(err);
                    });
                });
            } else console.error(err);
        });
    }
};