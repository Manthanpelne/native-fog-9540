const express = require('express');
const { AddFeedBack, GetAllFeedback } = require('../Controller/feedbackForm.controller');
const FeedBackRouter = express.Router()

FeedBackRouter.get("/", GetAllFeedback)
FeedBackRouter.post("/add", AddFeedBack)

module.exports = { FeedBackRouter }