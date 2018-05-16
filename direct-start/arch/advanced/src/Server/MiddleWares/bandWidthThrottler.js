const ExpireBST = require("../../DataStructure/ExpireBST");

const parseIPv4 = require("../../Algorithm/parseIPv4");
const IPv4ToNumber = require("../../Algorithm/IPv4ToNumber");

const IPv4Comparer = ( nIp, oIp ) => IPv4ToNumber( nIp ) - IPv4ToNumber( oIp );

const { __bandWidthThrottling__ } = require("../../Constant/SystemCode");

const requestTable = {
  "/graphql": new ExpireBST( IPv4Comparer )
};

module.exports = ( req, res, next ) => {
  const path = req.path;

  if( path in requestTable ){
    if( requestTable[path].touch( parseIPv4( req.ip ), 10000 ) > 10 ){
      return res.status( 403 ).send({
        reason: __bandWidthThrottling__
      });
    }
  }

  next();
};
