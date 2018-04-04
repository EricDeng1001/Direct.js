/*
entering -> entered , this is the enter animation
entered -> exiting , this is the exiting animation
*/

export default {
  "*": {
    from: {
      "/notFound": {
        entering: {
          opacity: 0
        },
        entered: {
          opacity: 1
        },
        exiting: {
          opacity: 0
        },
        timingFunction: "linear",
        time: 800
      }
    },
    to: {
      "/notFound": {
        time: 0
      }
    }
  },
  "/": {
    "/test": {
      entering: {
        top: "100%"
      },
      entered: {
        top: "0"
      },
      exiting: {
        top: "-100%"
      }
    }
  }
};
