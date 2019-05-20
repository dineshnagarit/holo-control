const holoNetworkModel = require('../dao/mongodb/functions');
const responseHandler = require('../helpers/responseHandler');
const responseType = require('../helpers/responseType');
const request = require("request-promise-native");


/**
 * Start - Start a mixed reality capture
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let startMRCRecording = (req, res, next) => {
  const options = {
    method: 'GET',
    uri:process.env.HOLO_UR_WIFI + '/api/holographic/simulation/recording/start';
  }
  try {
    let result = await request(options);
    let response = {
      code: responseType.OK,
      data: result,
      message: 'Scene recording has been started successfully.'
    };
    responseHandler.sendData(req, res, response);
  } catch (e) {
    next(e);
  }
};


/**
 * Stop the current mixed reality capture (MRC) recording
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let stopMRCRecording = (req, res, next) => {
  const options = {
    method: 'GET',
    uri:process.env.HOLO_UR_WIFI + '/api/holographic/mrc/video/control/stop';
  }
  try {
    let result = await request(options);
    let response = {
        code: responseType.OK,
        data: [],
        message: 'Scene recording has been started successfully.'
     };
    responseHandler.sendData(req, res, response);
  } catch (e) {
    next(e);
  }
};


/**
 * Restarts the targeted device
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let restartDevice = (req, res, next) => {
  const options = {
    method: 'POST',
    uri: process.env.HOLO_UR_WIFI + '/api/control/restart';
    json: {}
  }
  try {
    let result = await request(options);
    let response = {
        code: responseType.OK,
        data: [],
        message: 'Hololens device has been rebooted successfully.'
      };
    responseHandler.sendData(req, res, response);
  } catch (e) {
    next(e);
  }
  
};



/**
 * Shuts down the targeted device
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let shutDownDevice = (req, res, next) => {
  const options = {
    method: 'POST',
    uri: process.env.HOLO_UR_WIFI + '/api/control/shutdown';
    json: {}
  }
  try {
    let result = await request(options);
    let response = {
        code: responseType.OK,
        data: [],
        message: 'Hololens device has been shutdown successfully.'
     };
    responseHandler.sendData(req, res, response);
  } catch (e) {
    next(e);
  }
};


/**
 * Get all active processes
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let getAllActiveDeviceProcesses = (req, res, next) => {
  
  const options = {
    method: 'GET',
    uri: process.env.HOLO_UR_WIFI + '/api/resourcemanager/processes';
  }
  try {
    let result = await request(options);
    let response = {
        code: responseType.OK,
        data: result,
        message: 'Listed active processes successfully.'
    };
    responseHandler.sendData(req, res, response);
  } catch (e) {
    next(e);
  }
  
};


module.exports = {
  startMRCRecording,
  stopMRCRecording,
  restartDevice,
  shutDownDevice,
  getAllActiveDeviceProcesses
};
