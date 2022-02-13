class PingPlayers {
    /**
     * Maximum number of players on the server
     * @type {number}
     */
    max;

    /**
     * Current number of players on the server
     * @type {number}
     */
    current;

    /**
     * Create a new PingPlayers object
     * @param {number} max 
     * @param {number} current 
     */
    constructor(max, current) {
        this.max = max;
        this.current = current;
    }
}

module.exports = PingPlayers;