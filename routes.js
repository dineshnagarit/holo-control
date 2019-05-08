const holoController = require('./controllers/holo.controller');

module.exports = (app) => {

  app.get('/api/holo/start-mrc-recording/',
    holoController.startMRCRecording
  );

  app.get('/api/holo/stop-mrc-recording/',
    holoController.stopMRCRecording
  );


  app.post('/api/holo/restart-device/',
    holoController.restartDevice
  );

  app.post('/api/holo/shut-down-device/',
    holoController.shutDownDevice
  );

  app.get('/api/holo/activeprocess/',
    holoController.getAllActiveDeviceProcesses
  );
};
