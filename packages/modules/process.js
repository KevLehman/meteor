try {
  // The application can run `npm install process` to provide its own
  // process stub; otherwise this module will provide a partial stub.
  process = global.process || require("process");
} catch (noProcess) {
  process = {};
}

if (Meteor.isServer) {
  // Make require("process") work on the server in all versions of Node.
  meteorInstall({
    node_modules: {
      "process.js": function (r, e, module) {
        module.exports = process;
      }
    }
  });
}

if (typeof process.env !== "object") {
  process.env = {};
}

Object.keys(meteorEnv).forEach(function (key) {
  process.env[key] = meteorEnv[key];
});

process.nextTick = process.nextTick || Meteor._setImmediate;
