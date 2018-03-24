const path = require("path")

module.exports = {
    https: false,
    port: 80,
    caFile: path.join( __dirname , "./ca-bundle.pem" ),
    keyFile: path.join( __dirname , "./key.pem" ),
    certFile: path.join( __dirname , "./cert.pem" ),
    passphrase: "Antinux",
    session: {
      secret: "Antinux",
      resave: true,
      saveUninitialized: true
    }
};
