const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  date: Date,
  duration: Number,
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'canceled'],
    default: 'scheduled'
  }
});

const AppointmentModel = mongoose.model('Appointment', appointmentSchema);

module.exports = {AppointmentModel};
