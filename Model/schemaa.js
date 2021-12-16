const mongoose = require('mongoose');
// var aggregatePaginate = require('mongoose-aggregate-paginate-v2');




const companyschema = new mongoose.Schema({
    companyname: {
        type: String,
    },
    noofyears: {
        type: Number,
    },
    noofemployee: {
        type: Number
    },
    cnum: {
        type: Number
    }
})




// companyschema.plugin(aggregatePaginate);
const userSchemaa = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    companyid: {
        type: mongoose.Schema.Types.ObjectId, ref: 'companies'
    },
    mobileno: {
        type: Number
    },
    gender: {
        type: String
    },
    salary: {
        type: Number
    }
})


// userSchemaa.plugin(aggregatePaginate);
const Company = mongoose.model('company', companyschema);
const Employee = mongoose.model('employee', userSchemaa);


module.exports = { Company, Employee };

