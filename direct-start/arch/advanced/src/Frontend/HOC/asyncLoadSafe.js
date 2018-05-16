import React from "react";
import asyncLoad from "direct-core/asyncLoad";

import Loading from "Animation/Loading";

export default di => asyncLoad(
  di,
  err => console.log( err ),
  undefined,
  <div style={{width:"100%",height:"100%"}}>
    <Loading center />
  </div>
);
