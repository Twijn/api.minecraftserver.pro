class ServerLogo {
    /**
     * Blob for the server logo
     * 
     * @type {any}
     */
    blob;

    /**
     * Content type for the logo
     * 
     * @type {string}
     */
    contentType;

    /**
     * Constructor for a new ServerLogo
     * @param {any} blob Blob for the server logo
     * @param {string} contentType Content type of the blob
     */
    constructor(blob, contentType) {
        this.blob = blob;
        this.contentType = contentType;
    }
}

module.exports = ServerLogo;