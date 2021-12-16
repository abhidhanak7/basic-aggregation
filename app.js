//basic requirments
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const authRoute = require('../agregationn/Routes/authroutes')
const port = 8080
const mongoDB = 'mongodb://localhost/aggregatee';



//mongoose connecting code
mongoose.connect(mongoDB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("connection successfull"))
    .catch((err) => console.log(err))



app.use(express.json())
app.use(authRoute)



app.listen(port, () => {
    console.log(`listning to the port ${port}`)
})

