const { FeedbackModel } = require("../Model/feedback.model")


const GetAllFeedback = async (req, res) => {
    try {

        const data = await FeedbackModel.find()
        if (data.length == 0) {
            return res.status(401).send({ "msg": "No FeedBack Available", "ok": false })
        }
        res.status(200).send(data)


    } catch (error) {
        res.status(404).send({ "msg": "404 Bad request", "ok": false, "err": error.message })

    }
}

const AddFeedBack = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body
        const form = new FeedbackModel({ name, email, phone, message })
        await form.save()
        res.status(201).send({ "msg": "Feedback Added Succesfully", "ok": true })
    } catch (error) {
        res.status(401).send({ "msg": "404 Bad request", "ok": false, "err": error.message })
    }
}
module.exports = { GetAllFeedback, AddFeedBack }