var express = require('express')
var app = express()
// const mongoose = require("mongoose")
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(express.json())
var port = 3000



// const uri = 'mongodb://localhost:27017/testDB';

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000,
//     autoIndex: false, // Don't build indexes
//     maxPoolSize: 10, // Maintain up to 10 socket connections
//     serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//     socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//     family: 4 // Use IPv4, skip trying IPv6
// }

// const connectWithDB = () => {
//     mongoose.connect(uri, options, (err, db) => {
//       if (err) console.error(err);
//       else console.log("database connection")
//     })
// }

// connectWithDB()

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/myDatabase')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

const users = require("./routes/user")
const task = require("./routes/task")

app.use("/api", users)
app.use("/api", task)

app.get("/", (req, res)=>{
    res.send("hello world")
})


app.listen(port,()=>{
    console.log(`your app is listening on ${port}`)
})