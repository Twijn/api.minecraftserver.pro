const con = require("../../database");
const config = require("../../config.json");

const ServerPing = require("./ServerPing");
const ServerVersion = require("./ServerVersion");
const PingPlayers = require("./PingPlayers");

class Server {
    /**
     * Internal Surrogate ID for a server
     * 
     * @type {number?}
     */
    id;

    /**
     * Internal and external name for the server for links and other uses
     * 
     * @type {string}
     */
    shortname;

    /**
     * External name for the server
     * 
     * @type {string}
     */
    name;

    /**
     * Description of the server.
     * 
     * @type {string}
     */
    description;
    
    /**
     * Server logo object for the server
     * 
     * @type {ServerLogo?}
     */
    logo;

    /**
     * Server version
     * 
     * @type {ServerVersion?}
     */
    version;

    /**
     * Server IP without the port
     * 
     * @type {string}
     */
    ip;

    /**
     * Server port
     * 
     * @type {number}
     */
    port;

    /**
     * Date added to minecraftserver.pro
     * 
     * @type {number}
     */
    added;

    /**
     * Date updated on minecraftserver.pro
     * 
     * @type {number}
     */
    updated;

    /**
     * Constructor for a new Server object
     * @param {number?} id Surrogate ID for a Server. If you're creating a new server, set this to null.
     * @param {string} shortname Internal and external name for the server - used for links.
     * @param {string} name External name for the server - used for viewing.
     * @param {string} description Description of the server
     * @param {ServerLogo?} logo Server logo as retrieved by the most recent ping
     * @param {ServerVersion?} version Version object that was last received from the server
     * @param {string} ip Server IP
     * @param {number} port Server Port
     * @param {number} added Timestamp where the server was added
     * @param {number} updated Timestamp where the server was last updated
     */
    constructor(id, shortname, name, description, logo, version, ip, port, added, updated) {
        this.id = id;
        this.shortname = shortname;
        this.name = name;
        this.description = description;
        this.logo = logo;
        this.version = version;
        this.ip = ip;
        this.port = port;
        this.added = added;
        this.updated = updated;
    }

    /**
     * Retrieves the most recent pings for this server
     * @param {number} [limit=10] 
     * @returns {Promise<ServerPing[]>}
     */
    getPings(limit = 10) {
        return new Promise((resolve, reject) => {
            con.query("select id, latency, version, protocol, players_max, players_current, description, pingtime from ping where server_id = ? order by pingtime desc limit ?;", [this.id, limit], (err, res) => {
                if (!err) {
                    let result = [];

                    res.forEach(ping => {
                        result = [
                            ...result,
                            new ServerPing(
                                ping.id,
                                ping.latency,
                                new ServerVersion(ping.version, ping.protocol),
                                new PingPlayers(ping.players_max, ping.players_current),
                                ping.description,
                                ping.pingtime
                            )
                        ]
                    });

                    resolve(result);
                } else reject(err);
            });
        });
    }

    /**
     * Returns average latency over the last number of pings
     * @param {number} [pings=20] 
     * @returns {Promise<number>}
     */
    getAverageLatency(pings = 20) {
        return new Promise((resolve, reject) => {
            this.getPings(pings).then(pings => {
                if (pings.length === 0) {
                    resolve(3000);
                    return;
                }

                let sum = 0;
                pings.forEach(ping => {
                    if (ping.latency) sum += ping.latency;
                });
                resolve(sum / pings.length);
            }, reject);
        });
    }

    /**
     * Turns the object into a JSON object
     * 
     * @returns {object}
     */
    json() {
        return {
            id: this.id,
            shortname: this.shortname,
            name: this.name,
            description: this.description,
            logoUrl: this.logo?.blob ? `${config.api_url}server/${this.shortname}/favicon` : null,
            version: this.version,
            ip:{
                host: this.ip,
                port: this.port,
            },
            added: this.added,
            updated: this.updated
        };
    }
}

module.exports = Server;