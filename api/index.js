const con = require("../database");

const Server = require("./objects/Server");
const ServerLogo = require("./objects/ServerLogo");
const ServerVersion = require("./objects/ServerVersion");

/**
 * Main API methods
 * 
 * @author Twijn
 */
class API {
    #parseServerObject(object) {
        return new Server(
            object.id,
            object.shortname,
            object.name,
            object.description,
            new ServerLogo(object.logo, object.logo_type),
            new ServerVersion(object.version, object.protocol),
            object.ip,
            object.port,
            object.added,
            object.updated
        );
    }

    getTopServers() {
        return new Promise((resolve, reject) => {
            con.query("select id, shortname, name, description, logo, version, protocol, ip, port, added, updated from server;", (err, serverres) => {
                if (!err) {
                    let results = [];

                    serverres.forEach(server => {
                        results = [
                            ...results,
                            this.#parseServerObject(server),
                        ]
                    });

                    resolve(results);
                } else {
                    reject(err);
                }
            });
        });
    }

    /**
     * Returns a server based on a shortname
     * @param {string} shortname 
     * @returns {Promise<Server>}
     */
    getServer(shortname) {
        return new Promise((resolve, reject) => {
            con.query("select id, shortname, name, logo, version, protocol, ip, port, added, updated from server where shortname = ?;", [shortname], (err, serverres) => {
                if (!err) {
                    if (serverres.length > 0) {
                        let server = this.#parseServerObject(serverres[0])
    
                        resolve(server);
                    } else {
                        reject("Server was not found!");
                    }
                } else {
                    reject(err);
                }
            });
        });
    }
}

module.exports = new API();