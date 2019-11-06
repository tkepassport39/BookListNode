const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age: Number
});

// making a model (a collection in DB), which is going to be Author. 
// Inside this collection it will have objects from authorSchema. Then exporting this.
module.exports = mongoose.model('Author', authorSchema);