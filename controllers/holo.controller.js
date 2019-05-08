const holoNetworkModel = require('../dao/mongodb/functions');
const responseHandler = require('../helpers/responseHandler');
const responseType = require('../helpers/responseType');
const axios = require('axios');


/**
 * Start - Start a mixed reality capture
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let startMRCRecording = (req, res, next) => {
  let apiUrl = process.env.HOLO_UR_WIFI + '/api/holographic/simulation/recording/start';
  axios.get(apiUrl)
    .then(deviceResponse => {
      let response = {
        code: responseType.OK,
        data: [],
        message: 'Scene recording has been started successfully.'
      };
      responseHandler.sendData(req, res, response);
    })
    .catch(error => {
      next(error);
    });
};


/**
 * Stop the current mixed reality capture (MRC) recording
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let stopMRCRecording = (req, res, next) => {
  let apiUrl = process.env.HOLO_UR_WIFI + '/api/holographic/mrc/video/control/stop';
  axios.get(apiUrl)
    .then(deviceResponse => {
      let response = {
        code: responseType.OK,
        data: [],
        message: 'Scene recording has been started successfully.'
      };
      responseHandler.sendData(req, res, response);
    })
    .catch(error => {
      next(error);
    });
};


/**
 * Restarts the targeted device
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let restartDevice = (req, res, next) => {
  let apiUrl = process.env.HOLO_UR_WIFI + '/api/control/restart';
  axios.post(apiUrl, {})
    .then(deviceResponse => {
      let response = {
        code: responseType.OK,
        data: [],
        message: 'Hololens device has been rebooted successfully.'
      };
      responseHandler.sendData(req, res, response);
    })
    .catch(error => {
      next(error);
    });
};



/**
 * Shuts down the targeted device
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let shutDownDevice = (req, res, next) => {
  let apiUrl = process.env.HOLO_UR_WIFI + '/api/control/shutdown';
  axios.post(apiUrl, {})
    .then(deviceResponse => {
      let response = {
        code: responseType.OK,
        data: [],
        message: 'Hololens device has been shutdown successfully.'
      };
      responseHandler.sendData(req, res, response);
    })
    .catch(error => {
      next(error);
    });
};


/**
 * Get all active processes
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let getAllActiveDeviceProcesses = (req, res, next) => {
  let apiUrl = process.env.HOLO_UR_WIFI + '/api/resourcemanager/processes';
  axios.get(apiUrl)
    .then(deviceResponse => {
      let response = {
        code: responseType.OK,
        data: deviceResponse,
        message: 'Listed active processes successfully.'
      };
      responseHandler.sendData(req, res, response);
    })
    .catch(error => {
      next(error);
    });
};


module.exports = {
  startMRCRecording,
  stopMRCRecording,
  restartDevice,
  shutDownDevice,
  getAllActiveDeviceProcesses
};
