const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();
const Leaders = require("../model/leaders");

leaderRouter.use(bodyParser.json());

leaderRouter.route("/")
.get((req,res,next) => {
    Leaders.find({})
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(lead)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res,next) => {
    Leaders.create(req.body)
    .then((lead) => {
        console.log("Leader created!!")
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(lead)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end("PUT operations not supported on /leaders");
})
.delete((req,res,next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp)
    }, (err) => next(err))
    .catch((err) => next(err))
});

leaderRouter.route("/:leaderId")
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(lead)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end("POST operations not supported on /leaders/" + req.params.leaderId);
})
.put((req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {new:true})
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(lead)
    }, (err) => next(err))
    .catch((err) => next(err))
})
.delete((req,res,next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((lead) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(lead)
    }, (err) => next(err))
    .catch((err) => next(err))
});

module.exports = leaderRouter;