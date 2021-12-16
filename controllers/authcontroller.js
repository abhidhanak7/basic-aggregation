//---------------------------------------REQUIREMENTS
const Company = require('../Model/schemaa').Company
const Employee = require('../Model/schemaa').Employee
const RegexEscape = require('regex-escape')
const { models, isValidObjectId } = require('mongoose');







//<---------------------COMPANY SIGNUP POST ROUTE
const comapanysignup_post = async (req, res) => {
    try {
        const companydata = new Company({
            companyname: req.body.companyname,
            noofyears: req.body.noofyears,
            noofemployee: req.body.noofemployee,
            cnum: req.body.cnum
        })
        const result = await companydata.save()  //(abc)
        res.json(result);
    } catch (err) {
        res.send(err)

    }
}







//<------------------------EMPLOYEE SINUP POST ROUTE
const employeesignup_post = async (req, res) => {
    console.log("req.body: ", req.body)
    try {
        const employeedata = new Employee({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            companyid: req.body.companyid,
            mobileno: req.body.mobileno,
            gender: req.body.gender,
            salary: req.body.salary
        })
        const result = await employeedata.save()
        res.json(result);
    } catch (err) {
        res.send(err)

    }
}







//<--------AGREGATION GET DATA ROUTE BY FETCHING DATA---------7
const gettdata_get = async (req, res) => {
    try {
        let limit = parseInt(req.query.limit)
        let page = parseInt(req.query.page)
        let skip = limit * page - limit
        let salary = parseInt(req.query.salary)
        let name = (req.query.name)
        const data = await Company.aggregate([
            // { "$match": { "companyname": "tcs" } },
            { "$limit": skip + limit },
            { "$skip": skip },
            {
                $lookup:
                {
                    from: "employees",
                    let: { the_id: "$_id", second_id: "$companyid", },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $eq: ["$companyid", "$$the_id"]
                                }
                            }
                        },
                        { "$match": { firstname: name } },
                        { $match: { salary: { $gt: salary } } },
                        { $project: { _id: 0, } },
                    ],
                    as: "employees_data"
                }
            }
        ])
        await res.send(data);
    } catch (err) {
        console.log(err)
        res.status(400).send("error of getdata" + err)
    }
}







//<-------------------------------for search data--2
const searchdata_get = async (req, res) => {
    try {
        let name = (req.query.name)
        let lastname = (req.query.lastname)
        const data = await Company.aggregate([
            {
                $lookup: {
                    from: "employees",
                    let: { the_id: "$_id", second_id: "$companyid", },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [{
                                        $eq: ["$companyid", "$$the_id"],
                                    }
                                    ],
                                }
                            }
                        },
                        { "$match": { firstname: name, lastname: lastname, } },
                        {
                            $project: {
                                _id: 0,
                            }
                        }
                    ],
                    as: "emolyee_name"
                }
            }
        ])
        await res.send(data);
    } catch (error) {
        res.status(404).send("error in data" + error)
    }
}





//<--------------------------------pagination in emolyee fetch data
const searchemp_get = async (req, res) => {
    console.log(req.query)
    try {
        let limit = parseInt(req.query.limit)
        let page = parseInt(req.query.page)
        let skip = limit * page - limit
        const result = await Employee.aggregate([
            { "$limit": skip + limit },
            { "$skip": skip },
        ])
        res.send(result);
    } catch (err) {
        res.send(err)
    }
}







//<----------example of aggregate----1-------&&&&----------3
const example_get = async (req, res) => {
    try {
        const result = await Company.aggregate([
            // { $match: { "companyname": "tcs" } },
            {
                $match: {
                    $expr: {
                        // $lte: ["$noofyears", 7],
                        $lte: ["$noofemployee", 500],
                    }
                }
            },
            {
                $lookup:
                {
                    from: "employees",
                    let: { the_id: "$_id", second_id: "$companyid" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and: [{
                                    },
                                    {
                                        $eq: ["$companyid", "$$the_id"]
                                    }
                                    ],  
                                }
                            }  
                        },
  
                        { $project: { "_id": 0, "companyid": 0 } }
                    ],  

                    as: "emplyee_data"
                }  
            }
        ])
        res.send(result);
    } catch (err) {  
        res.send(err)
    }
}

  


//<-----------------------for push values----4
const pushh_get = async (req, res) => {
    try {
        const data = await Company.aggregate([
            {
                $group: {
                    _id: "$companyname",
                    data: {
                        $push: "$$ROOT"
                        //     noofyears: "$noofyears",
                        //     noofemployee: "$noofemployee",
                        //}
                    }
                }
            }
        ])
        res.json(data)

    } catch (error) {
        res.status(404).send("error in get data of group" + error)
    }
}



// group BY IN EMPLOYEE TABLE---5
const group_get = async (req, res) => {
    try {
        const data = await Employee.aggregate([
            {
                $group:
                {
                    _id: { companyid: "$_id" },
                    totalEmployee: { $sum: 1 },
                    firstname: { $avg: "$salary" }
                }
            }
        ])
        res.json(data)

    } catch (error) {
        res.status(404).send("error in get data of group" + error)
    }
}






// SEARCH USING REGULAR EXPRESSION REGEX----6
const rgx_get = async (req, res) => {
    try {
        let filter = {}
        if (req.query.search) {
            filter = {
                firstname: { $regex: RegexEscape(req.query.search) }
            }
            lastnamefilter = {
                lastname: { $regex: RegexEscape(req.query.search) }
            }
            const data = await Employee.aggregate([
                {
                    $match: {
                        $or: [
                            filter, lastnamefilter
                        ]
                    }
                },
            ])
            res.json(data)
        }
        else {
            res.status(404).send("not found any user like this")
        }
    
    } catch (error) {
        res.status(404).send("error in get data of group" + error)
    }
}










//  addfileds api search with full name-----8
const addfieldss_get = async (req, res) => {
    console.log("Params : ", req.query)
    try {
        let nameextract = req.query.search.split(' ');
        // console.log(nameextract);
        if (nameextract[1] == null) {
            const data = await Employee.aggregate([
                {
                    $match: {
                        $or: [
                            { firstname: { $regex: nameextract[0], } },
                            { lastname: { $regex: nameextract[0], } }
                        ]
                    }
                },
                {
                    $addFields: {
                        fullname: {
                            $concat: ["$firstname", " ", "$lastname"]
                        }
                    }
                },
                {
                    $project: { __v: 0 }
                }

            ])
            res.json(data)
        }
        else {
            const data = await Employee.aggregate([
                {
                    $match: {
                        $and: [
                            { firstname: { $regex: nameextract[0] } },
                            { lastname: { $regex: nameextract[1] } }
                        ]
                    }
                },
                {
                    $addFields: {
                        fullname: { $concat: ["$firstname", " ", "$lastname"] }
                    }
                },
                {
                    $project: { __v: 0 }
                }
            ])
            res.json(data)
        }
    } catch (error) {
        res.status(404).send("error in get data of group" + error)
    }
}








// <-----------------------------EXPORTING FILES
module.exports = {
    comapanysignup_post,
    employeesignup_post,
    gettdata_get,
    searchdata_get,
    searchemp_get,
    example_get,
    pushh_get,
    group_get,
    rgx_get,
    addfieldss_get,
}
