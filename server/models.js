const mongoose = require('mongoose')
const Schema = mongoose.Schema

const user = mongoose.model('User', new Schema({
    firstName: String,
    lastName: String,
    email: String,
    mob: Number,
    college: String,
    collegeID: String,
    events: {
       Literary: [{
            name: String,
            teamName: String,
            teamSize: Number
        }],
        Dramatics: [{
            name: String,
            teamName: String,
            teamSize: Number
        }],
        MusicAndSpicMacay: [{
            name: String,
            teamName: String,
            teamSize: Number
        }],
        FineArts: [{
            name: String,
            teamName: String,
            teamSize: Number
        }],
        FilmAndPhotography: [{
            name: String,
            teamName: String,
            teamSize: Number
        }],
        EDcell: [{
            name: String,
            teamName: String,
            teamSize: Number
        }]
    },
    workshops: {
        Literary: [{
            name: String
        }],
        Dramatics: [{
            name: String
        }],
        MusicAndSpicMacay: [{
            name: String
        }],
        FineArts: [{
            name: String
        }],
        FilmAndPhotography: [{
            name: String
        }],
        EDcell: [{
            name: String
        }]
    }, 
    blitzID: Number,
    blitzPIN: Number,
    isMNIT: Boolean,
    accomodation: Boolean
}))

module.exports = {
    user
}