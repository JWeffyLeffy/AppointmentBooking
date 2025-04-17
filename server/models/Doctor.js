// models/Doctor.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  expertIssues: {
    type: [String],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  availableSlots: {
    type: [{
      day: {
        type: String,
        required: true
      },
      timeSlots: {
        type: [{
          selected: {
            type: Boolean,
            default: false
          },
          slots: {
            type: String,
            required: true
          }
        }],
        required: true
      }
    }],
    required: true
  }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
