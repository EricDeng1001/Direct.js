/*
entering -> entered, this is the enter animation
entered -> exiting, this is the exiting animation
*/
import "Styles/routesAnimations";

const entered = "entered ";

export default {
  direct: {
    "*": {
      timeout: 0
    }
  },
  "*": {
    "*": {
      entering: "rightFade entering",
      entered,
      exiting: "leftFade exiting",
      timeout: 800,
      sameTime: true
    },
    from: {
      "/notFound": {
        entering: "rot720 entering",
        exiting: "noDisplay exiting",
      }
    },
    to: {
      "/notFound": {
        entering: "fade entering",
        exiting: "fade exiting",
      },
    }
  },
};
