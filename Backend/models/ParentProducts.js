const mongoose = require('mongoose');

const parentProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor',
    },
});

module.exports = mongoose.model('ParentProduct', parentProductSchema);