class ServerVersion {
    /**
     * The name of the server version.
     * 
     * @type {string}
     */
    name;

    /**
     * The number protocol of the server version.
     * 
     * @type {number}
     */
    protocol;

    /**
     * Constructor for a new ServerVersion object
     * @param {string} name Name of the version
     * @param {number} protocol Protocol number
     */
    constructor(name, protocol) {
        this.name = name;
        this.protocol = protocol;
    }
}

module.exports = ServerVersion;