const { ClinicModel } = require("../Model/Clinic.model")
const { DoctorModel } = require("../Model/doctors.model")


const getClinic = async (req, res) => {
    try {
        const data = await ClinicModel.find().populate("doctors")
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send({ "msg": "404 Bad Request", "err": error.message })
    }
}


const GetClinicByID = async (req, res) => {
    try {
        const ID = req.params.id;
        const clinicData = await ClinicModel.findById({ _id: ID }).populate("doctors")
        res.status(201).send(clinicData)

    } catch (error) {
        res.status(401).send({ "msg": "Bad Request 404", "ok": false, "err": error.message })

    }
}


const postClinic = async (req, res) => {
    try {
        const Payload = req.body

        const Postdata = new ClinicModel(Payload)
        await Postdata.save()
        res.status(200).send({ "msg": "Clinic Added Succesfully", "ok": true, "data": Postdata })

    } catch (error) {
        res.status(404).send({ "msg": "404 Bad Request", "err": error.message })

    }

}

const updateClinic = async (req, res) => {
    try {
        const ID = req.params.id
        const payload = req.body

        await ClinicModel.findByIdAndUpdate({ _id: ID }, payload)
        res.status(200).send({ "msg": "Clinic Updated Succesfully", "ok": true })

    } catch (error) {
        res.status(404).send({ "msg": "404 Bad Request", "ok": false, "err": error.message })

    }
}

const deleteClinic = async (req, res) => {
    try {
        const ID = req.params.id
        await ClinicModel.findByIdAndDelete({ _id: ID })
        res.status(200).send({ "msg": "Clinic Deleted Succesfully", "ok": true })

    } catch (error) {
        res.status(404).send({ "msg": "404 Bad Request", "ok": false, "err": error.message })

    }
}

/*
 add doctor to clinic
---> /clinic/add-doctor/:id
In Body --> clinicID = ""
*/


const addDoctorToClinic = async (req, res) => {
    try {
        const DoctorID = req.params.id
        const clinicID = req.body.clinicID
        const doctor = await DoctorModel.findById(DoctorID)
        if (!doctor) {
            return res.status(404).send({ "msg": "Doctor Not Found" })
        }
        const clinic = await ClinicModel.findById(clinicID)
        if (!clinic) {
            return res.status(404).send({ "msg": "Clinic Not Found" })

        }
        clinic.doctors.push(DoctorID)
        await clinic.save()
        res.status(200).send({ "msg": "Doctor Added To Clinic Succesfully", "ok": true, "data": clinic })


    } catch (error) {
        res.status(404).send({ "msg": "404 Bad Request", "ok": false, "err": error.message })

    }
}
const getAllClinic = async (req, res) => {
    try {
        const data = await ClinicModel.find()
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send({ "msg": "404 Bad Request", "err": error.message })
    }
}
module.exports = { getClinic,GetClinicByID, postClinic, updateClinic, deleteClinic, addDoctorToClinic ,getAllClinic}