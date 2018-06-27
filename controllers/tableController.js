const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Table } = require('../models/table');

// => localhost:3000/table/
router.get('/', (req, res) => {
    Table.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Table :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No record with given id : ${req.params.id}`);

    Table.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Table :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var tbl = new Table({
        code: req.body.code,
        name: req.body.name,
        desc: req.body.desc,
        image: req.body.image,
    });
    tbl.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Table Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var tbl = {
        code: req.body.code,
        name: req.body.name,
        desc: req.body.desc,
        image: req.body.image,
    };
    Table.findByIdAndUpdate(req.params.id, { $set: tbl }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Table Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No record with given id : ${req.params.id}`);

    Table.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Table Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;