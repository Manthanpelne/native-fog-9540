const { ClinicModel } = require("../Model/Clinic.model")
const { DoctorModel } = require("../Model/doctors.model")

const getDoctors = async (req, res) => {
    try {
        const data = await DoctorModel.find().populate("clinic")
        res.status(201).send(data)
    } catch (error) {
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })
    }
}
// 
const addDoctor = async (req, res) => {
    try {
        const payload = req.body
        const { name } = req.body
        const ClinicID = req.params.ClinicId
        const isClinicPresent = await ClinicModel.findOne({_id:ClinicID})
        if (!isClinicPresent) {
            return res.status(404).send({ "msg": "clinic is not present" })

        }

        const isDoctorPresent = await DoctorModel.findOne({ name: name })
        if (isDoctorPresent) {
            return res.send({ "msg": "doctor is already present" })
        }
        // payload.clinic = ClinicID
        const data = new DoctorModel(payload)

        await data.save()
        if (!isClinicPresent.doctors.includes(data._id)) {
            isClinicPresent.doctors.push(data._id)
        }
        await isClinicPresent.save()
        res.status(201).send({ "msg": "Doctor Added SuccesFully", "ok": true })
    } catch (error) {
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}

const updateDoctor = async (req, res) => { //admin
    const ID = req.params.id
    const Payload = req.body
    try {
        await DoctorModel.findByIdAndUpdate({ _id: ID }, Payload)
        res.status(201).send({ "msg": "Doctor Updated SuccesFully", "ok": true })

    } catch (error) {
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}

const DeleteDoctor = async (req, res) => {//admin
    try {
        const ID = req.params.id
        await DoctorModel.findByIdAndDelete({ _id: ID })
        res.status(201).send({ "msg": "Doctor Deleted SuccesFully", "ok": true })

    } catch (error) {
        // res.send(error.message)
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}

//----------> Get User By Perticular ID

const GetDoctorByID = async (req, res) => {
    try {
        const ID = req.params.id;
        const DoctorsData = await DoctorModel.findById({ _id: ID })
        res.status(201).send(DoctorsData)

    } catch (error) {
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}




// ! ................. Working On IT !!!!
//---------> Get Doctor Appointments <----------//

//------> doctor/appoint/:id

const getAppointments = async (req, res) => {
    try {
        const ID = req.params.id
        let doctor = await DoctorModel.findById(ID).populate("appointments")

        if (!doctor) {
            return res.status(401).send({ "msg": "Doctor Not Found", "ok": false })
        }
        let appointments = doctor.appointments
        res.status(201).send(appointments)

    } catch (error) {
        console.log(error);
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}

//----------> Search RegExp

//==>GET ->> /doctor/searchDoc?name=name&location=location

const getSearchedData = async (req, res) => {
    try {
        const { name, location } = req.query
        let query = {};
        if (name) {
            const regEx_Name = new RegExp(name, "i")
            query.name = { $regex: regEx_Name }

        }
        if (location) {
            const regEx_location = new RegExp(location, "i")
            query.location = { $regex: regEx_location }

        }

        // console.log(name, location);
        // console.log(query)
        const searchDoctor = await DoctorModel.find(query).populate("clinic")
        res.status(200).send(searchDoctor)
    } catch (error) {
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}



module.exports = { getDoctors, addDoctor, updateDoctor, DeleteDoctor, getAppointments, GetDoctorByID, getSearchedData }