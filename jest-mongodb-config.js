module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "testdb"
    },
    binary: {
      version: "6.0.6",
      skipMD5: true
    },
    autoStart: false
  }
};