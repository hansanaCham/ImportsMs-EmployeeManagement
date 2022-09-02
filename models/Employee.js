const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
  firstName: {
    type: string,
    required: true,
  },
  middleName: {
    type: string,
    required: true,
  },
  lastName: {
    type: string,
    required: true,
  },
  address: {
    type: string,
    required: true,
  },
  contactNo: {
    type: [string],
    required: true,
  },
  nic: {
    type: string,
    required: true,
  },
  designation: {
    type: string,
    required: true,
  },
  epmloyeeCode: {
    type: string,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Employee = mongoose.model('Employee', EmployeeSchema);
