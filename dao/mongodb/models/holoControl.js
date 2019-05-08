const mongoose = require('mongoose'),
  schema = mongoose.Schema,
  uuidv5 = require('uuid/v5'),
  uuidv1 = require('uuid'),
  hashSum = require('hash-sum');

  const holoControlSchema = new schema(
  {
    id: {
      type: String,
      unique: true
    }, 
    operationType: {
      type: String,
      required: false
    },
    status: {
      type: String,
      required: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdOn: {
      type: Date,
      default: Date.now()
    },
    updatedOn: [{
      time: { type: Date, default: Date.now() },
      updatedBy: String 
    }]
  },
  {
    versionKey: false
  }
);

holoControlSchema.pre('save', function (next) {
  let uuid = uuidv5(uuidv1(), uuidv5.DNS);
  this.id = hashSum(uuid);
  next();
});

module.exports = mongoose.model('holocontrol', holoControlSchema);
