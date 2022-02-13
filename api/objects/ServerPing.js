class ServerPing {
    /**
     * Internal surrogate ID for the ping record
     * 
     * @type {number}
     */
    id;

    /**
     * Internal number in ms for the latency for this ping
     * 
     * @type {number}
     */
    latency;

    /**
     * Server version as reported by the server
     * 
     * @type {ServerVersion}
     */
    version;

    /**
     * Players as reported by the ping
     * 
     * @type {PingPlayers}
     */
    players;

    /**
     * String description of the server
     * 
     * @type {string}
     */
    description;

    /**
     * The timestamp in which the ping was added
     * 
     * @type {number}
     */
    time;
    
    /**
     * Constructor for a new ServerPing object
     * @param {number} id Surrogate ID for a ping
     * @param {number} latency Round-trip time in ms
     * @param {ServerVersion} version Server version object
     * @param {PingPlayers} players Players object
     * @param {*} description Description of the server (MOTD)
     * @param {*} time Timestamp where the ping took place
     */
    constructor(id, latency, version, players, description, time) {
        this.id = id;
        this.latency = latency;
        this.version = version;
        this.players = players;
        this.description = description;
        this.time = time;
    }
}

module.exports = ServerPing;