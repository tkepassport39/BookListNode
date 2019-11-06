const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String,
});

// making a model (a collection in DB), which is going to be Book. 
// Inside this collection it will have objects from BookSchema. Then exporting this.
module.exports = mongoose.model('Book', bookSchema);