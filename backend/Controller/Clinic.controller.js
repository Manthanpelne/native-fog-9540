const { ClinicModel } = require("../Model/Clinic.model")


const getClinic = async (req, res) => {
    try {
        const data = await ClinicModel.find().populate("doctors")
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send({ "msg": "404 Bad Request", "err": error.message })
    }
}
const postClinic = async (req, res) => {
    try {
        const Payload = req.body
        // const isClinicPresent = await ClinicModel.find()
        // if (isClinicPresent) {
        //     return res.status(404).send({ "msg": "Clinic is present Already", "ok": false })
        // }
        const Postdata = new ClinicModel(Payload)
        await Postdata.save()
        res.status(200).send({ "msg": "Clinic Added Succesfully", "ok": true, "data": Postdata })

    } catch (error) {
        res.status(404).send({ "msg": "404 Bad Request", "err": error.message })

    }

}
module.exports = { getClinic, postClinic }