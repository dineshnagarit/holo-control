const holoControlModel = require('../models/holoControl');
const CusError = require('../../../helpers/cusError');
const responseType = require('../../../helpers/responseType');

module.exports = (rowSet, updatedBy) => {
  let operationType = rowSet.operationType,
      status = rowSet.status,
      isActive = rowSet.isActive

  if (!operationType) { throw new CusError(responseType.BAD_REQUEST, 'Operation type is not defined'); }
  if (!status) { throw new CusError(responseType.BAD_REQUEST, 'Status is not provided.'); }
  
  return holoControlModel.create({
    operationType,
    status
  });

};
