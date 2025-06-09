const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',  
    }
});

module.exports = moongoose.model('Review', reviewSchema);