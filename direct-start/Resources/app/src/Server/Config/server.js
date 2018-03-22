const path = require("path")

module.exports = {
    https: false,
    port: 80,
    caFile: path.join( __dirname , "./ca-bundle.pem" ),
    keyFile: path.join( __dirname , "./antinux_me.key" ),
    certFile: path.join( __dirname , "./cert.pem" ),
    session: {
      secret: "Antinux",
      resave: true,
      saveUninitialized: true
    }
};
