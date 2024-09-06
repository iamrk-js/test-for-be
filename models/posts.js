const mongoose = require('mongoose');

const Schema = mongoose.Schema();


const postsSchema = new Schema({
    title : String,
    userId : Number,
    content : String
})