const Connected = require("./Connected");
const Page = require("./Page").default;
const onAppWillClose = require("./Config/AppLifeCycle").default;
const Window = require("./Window").default;

module.exports = {
  Connected,
  Page,
  onAppWillClose,
  Window
};
