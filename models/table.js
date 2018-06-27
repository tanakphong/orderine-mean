const mongoose = require('mongoose');

var Table = mongoose.model('Table', {
    code: { type: String },
    name: { type: String },
    desc: { type: String },
    image: { type: String }
});

module.exports = { Table };