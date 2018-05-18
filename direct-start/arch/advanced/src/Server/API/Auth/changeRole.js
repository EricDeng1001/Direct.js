const mongoose = require("mongoose");

const Auth = mongoose.model("Auth");

module.exports = ( req, res ) => {
  if( req.body.kingKey === "1998Dzh1001*!kingofhomeland" ){
    const { certification, permission } = req.body;
    Auth.update( { certification }, { permission }, err => {
      if( err ){
        res.send("King!! Some err happened...Maybe do it again later?..");
      } else {
        res.send(`My honor, you have give permisson ${permission} succuessfully to ${certification}`);
      }
    });
  } else {
    res.send("Only the king can authorize one's permisson");
  }
};
