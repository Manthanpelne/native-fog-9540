const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  name: String,
  address: String,
  image:String,
  phone: String,
  email: String,
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
    }
  ]
});

const ClinicModel = mongoose.model('Clinic', clinicSchema);

module.exports = { ClinicModel };
