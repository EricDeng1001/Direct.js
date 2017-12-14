const lastState = localStorage['lastState'];
//check lastState
//do changes

export default {
  ModalManager: {
    Modals: [],
    alert: false,
    masked: false
  },
  Sample: {
  show: false,
  loading: false,
  loaded: 0,
  lastFailedReason: '',
  lat: -99999,
  lng: -99999
}
  //your state tree;
};
