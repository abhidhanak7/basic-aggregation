// Pipeline Concept
// In UNIX command, shell pipeline means the possibility to execute an operation on some input and use the output as the input for the next command and so on. MongoDB also supports same concept in aggregation framework. There is a set of possible stages and each of those is taken as a set of documents as an input and produces a resulting set of documents (or the final resulting JSON document at the end of the pipeline). This can then in turn be used for the next stage and so on.

// Following are the possible stages in aggregation framework −

// $project − Used to select some specific fields from a collection.

// $match − This is a filtering operation and thus this can reduce the amount of documents that are given as input to the next stage.

// $group − This does the actual aggregation as discussed above.

// $sort − Sorts the documents.

// $skip − With this, it is possible to skip forward in the list of documents for a given amount of documents.

// $limit − This limits the amount of documents to look at, by the given number starting from the current positions.

// $unwind − This is used to unwind document that are using arrays. When using an array, the data is kind of pre-joined and this operation will be undone with this to have individual documents again. Thus with this stage we will increase the amount of documents for the next stage.



// ß


// let: { name: "$firstname", salary: "$salary" },
// pipeline: [
//     { $match: { gender: 'female', mobileno: '100099980' } },
// {  mobileno:100099980
//     $match: {
//         // "firstname": "shyam",
//         "gender": "male",
//         // "noofyears": "13"
//     }
// },
// gender:"female"
// { $project: { foreignField: "companyid" } },
// { $replaceRoot: { newRoot: "$date" } }
// ], as: "employees_docs",
// { $project: { _id: 0, date: { name: "$name", date: "$date" } } },
// let: { the_city: "$city", the_name: "$name"},




// {
//     $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ["$fromItems", 0] }, "$$ROOT"] } }
// },
// { $project: { fromItems: 0 } }




// const data = Company.aggregate([
// {
//     $lookup:
//     {
//         from: "employee",
//         localField: "_id",
//         foreignField: "companyid",
//         as: "employee_docs"
//     }
//     }
// ])

// console.log(data)


// $project: {
//         "score": { "$meta": "textScore"},
//         "Category": "$_id",
//         "_id": 0,
//         "count": 1




// paginatron  code

// app.get('/', async (req, res) => {
//         try {
//             // Adding Pagination
//             const limitValue = req.query.limit || 2;
//             const skipValue = req.query.skip || 0;
//             const posts = await postModel.find()
//                 .limit(limitValue).skip(skipValue);
//             res.status(200).send(posts);
//         } catch (e) {
//             console.log(e);
//         }
//     });

// const page = parseInt
// const PAGE_SIZE = 5;
// const $skip = (page) * PAGE_SIZE;
// { $skip: (page - 1) * PAGE_SIZE },
// { $limit: PAGE_SIZE },
// { $limit: 2 },


// { $gte: ["$noofemploye", "$$second_id"] }



// localField: "_id",0
// foreignField: "companyid",






// let salary = parseInt(req.query.salary)
//         let name = (req.query.name)

// { "$match": { "companyname": "tcs" } },


//    { "$match": { firstname: name } },
//                 { $match: { salary: { $gt: salary } } },


// {
//         $lookup:
//         {
//             from: "employees",
//             let: { the_id: "$_id", second_id: "$companyid", },
//             pipeline: [
//                 {
//                     $match:
//                     {
//                         $expr:
//                         {
//                             $eq:
//                                 [
//                                     "$companyid", "$$the_id"
//                                 ]
//                         }
//                     }
//                 },
//                 { "$match": { companyname: companyname } },
//                 { $project: { "_id": 0, "companyid": 0 } }
//             ],

//             as: "emplyee_data"
//         }
//     }
// $group:
// {
//     _id: { company: "$companyname" },
//     totalEmployee: { $sum: 1 },
//     averageSalary: { $avg: "$salary" }
// }



// { $match: { firstname: name } },
// { $project: { firstname: 1, _id: 0 } },
// { $sort: { firstname: 1 } }



// db.inventory.aggregate(
//         [
//            { $project: { itemDescription: { $concat: [ "$item", " - ", "$description" ] } } }
//         ]
//      )


// db.scores.aggregate( [
//         {
//           $addFields: {
//             totalHomework: { $sum: "$homework" } ,
//             totalQuiz: { $sum: "$quiz" }
//           }
//         },
//         {
//           $addFields: { totalScore:
//             { $add: [ "$totalHomework", "$totalQuiz", "$extraCredit" ] } }
//         }
//      ] )


// $addfield: {
//         name: { { $concat: ["$firstname", " - ", "$lastname"] } }
// }

// {
//         $addFields:{
//             'document.id': {$concat: ['$document.propertyId.prefix','$document.propertyId.number']}
//         }
//     },



// ADD FIELDS EXAMPLE 

//  addfileds api
// const addfieldss_get = async (req, res) => {
//     console.log("Params : ", req.query)
//     try {
//         let nameextract = req.query.search.split(' ');
//         console.log(nameextract);
//         // let filter = {}
//         // filter = {
//         //     firstname: { $regex: RegexEscape(req.query.search) }
//         // }
//         //     lastnamefilter = {
//         //         lastname: { $regex: RegexEscape(req.query.search) }
//         //     }
//         // if (nameextract === firstname && nameextract === lastname) {
//         const data = await Employee.aggregate([
//             {
//                 $match: {
//                     $or: [
//                         { firstname: { $regex: nameextract[0], } },
//                         { lastname: { $regex: nameextract[1], } }
//                     ]
//                 }
//             },
//             {
//                 $addFields: {
//                     fullname: {
//                         $concat: ["$firstname", " ", "$lastname"]
//                     }
//                 }
//             },
//             {
//                 $project: { __v: 0 }
//             }

//         ])
//         res.json(data)
//         } 
//         else {
//             const data = await Employee.aggregate([
//                 {
//                     $match: {
//                         $and: [
//                             { firstname: { $regex: nameextract[0], $options: "^" } },
//                             { lastname: { $regex: nameextract[1], $options: "^" } }
//                         ]
//                     }
//                 },
//                 {
//                     $addFields: {
//                         fullname: { $concat: ["$firstname", " ", "$lastname"] }
//                     }
//                 },
//                 {
//                     $project: { __v: 0 }
//                 }
//             ])
//             res.json(data)
//         }
//     } catch (error) {
//         res.status(404).send("error in get data of group" + error)
//     }
// }
